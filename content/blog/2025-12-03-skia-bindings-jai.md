---
id: skia-bindings-jai
title: "Automating the Art: Programmatically Generating Skia Bindings for Jai"
excerpt: Connecting a high-performance compiled language like Jai to a massive C++ library like Google's Skia is usually a task synonymous with "pain." Here's how we automated it.
date: "2025-12-03"
author: Timothy Eichler
color: var(--accent-magenta)
---

Connecting a high-performance compiled language like Jai to a massive C++ library like Google's Skia (the graphics engine behind Chrome, Android, and Flutter) is usually a task synonymous with "pain."

**Repository:** [github.com/uncrumpled2/jai-skia](https://github.com/uncrumpled2/jai-skia)

Skia is huge. It makes heavy use of C++ specific features: inheritance, templates, smart pointers, and vtables. Writing bindings by hand for such a library isn't just tedious—it's a maintenance nightmare.

Instead of writing wrappers by hand, we used Jai's built-in metaprogramming capabilities to write a script that writes the code for us. Here is how we bridged the gap between Jai and Skia, and why it was worth it.

## The Tool: Bindings_Generator

Jai ships with a module called Bindings_Generator. Unlike simple regex-based scripts people often write in Python, this tool is a heavyweight. It links against libclang, parses the actual C++ Abstract Syntax Tree (AST), and understands the deep structure of the types.

It maps C++ classes to Jai structs, calculates vtable layouts for virtual functions, handles enum conversions, and manages name mangling.

## The Process: How We Did It

We created a generator script (generate.jai) that configures the binding options. Here is the concrete workflow we established:

### 1. The "Wrapper" Header

We can't just point the generator at a folder. We created a wrapper.h file that acts as a single entry point, including the specific Skia headers we care about:

```cpp
// wrapper.h
#include "include/core/SkCanvas.h"
#include "include/core/SkSurface.h"
#include "include/core/SkPaint.h"
#include "include/encode/SkPngEncoder.h"
// ...
```

### 2. Mimicking the Compiler

The hardest part of generating bindings is making libclang happy. If the parser can't find standard headers (like `<cmath>` or `<stddef.h>`) or doesn't know the architecture macros, it fails.

We had to aggressively configure the Generate_Bindings_Options to mimic a GCC build on Linux:

```jai
array_add(*options.extra_clang_arguments, "-x", "c++", "-std=c++17");
array_add(*options.extra_clang_arguments, "-DSK_BUILD_FOR_UNIX"); // Critical for Skia
// We also manually added system include paths (/usr/include/...)
// so Clang could find standard C++ headers.
```

### 3. The "Chicken and Egg" Problem

Usually, the generator wants to load the compiled library (libskia.so or .a) during generation. It does this to verify which symbols actually exist and strips out declarations that aren't in the binary.

However, we wanted a generator that could run before we dealt with the complex build process of Skia.

**The Fix:** We set `options.strip_flags = 0` to force the generator to output everything, regardless of whether the library was present. We then wrote a small post-processing routine in Jai to open the generated file and replace the placeholder `__UnknownLib` with our library name `libskia`.

### 4. Automating the "Gluing"

Generating the raw bindings was only half the battle. The generated code contained C++ patterns that don't map 1:1 to Jai, requiring significant post-processing. We automated this entirely within `generate.jai`:

*   **Operator Overloading:** C++ `operator+=` became `operator_plus_equals`.
*   **Template Emulation:** We injected a robust `std` struct definition to mock C++ `std::unique_ptr`, `std::vector`, `std::atomic`, and `std::tuple`.
*   **Missing Linkage:** We automatically comment out static internal symbols (starting with `_ZL`) that aren't exported by the shared library.
*   **Type Fixing:** We corrected malformed struct definitions caused by complex C++ SFINAE templates (like `AutoTMalloc`) and fixed enum types that were incorrectly identified as `bool`.

## The Result: By the Numbers

The output is a single file, skia_bindings.jai.

- **Functions Generated:** ~1,954
- **Structs/Classes Mapped:** ~215
- **Total Lines of Code:** ~15,600+

### The ROI (Return on Investment)

If a developer were to manually write high-quality bindings (handling type conversion, vtables, and correct memory layouts), they might average 50 lines of correct code per hour.

- **Manual Estimate:** ~300 hours (roughly 7.5 work weeks)
- **Our Approach:** ~1 hour of configuration and debugging
- **Update Cost:** ~10 seconds (running the script again when Skia updates)

We now have a fully functional drawing API. We successfully created a raster surface, drew a rectangle, and encoded it to a PNG, all from Jai, calling into the optimized C++ Skia core.

## Trade-offs and Negatives

It isn't all sunshine and rainbows. There are distinct trade-offs to this approach:

1. **API Opaqueness:** The generator creates "Raw" C-style structs. While it handles inheritance via composition (e.g., SkCanvas contains SkRefCnt), you lose the syntactic sugar of C++. You have to manually call `Destructor_Base` instead of relying on a C++ smart pointer destructor.

2. **Build System Friction:** Generating the code is easy; linking it is hard. Skia uses its own build system (GN/Ninja). We still have to build Skia separately and ensure the binary matches the ABI expected by our generated code. We had to specifically build Skia as a shared component (`is_component_build=true`) to ensure symbols were exported.

3. **Bloat:** We generated 15,000 lines of code. We probably only need 5% of that for a simple application. This increases compilation time and noise in the namespace.

4. **Inline Functions:** Heavily optimized C++ libraries like Skia put a lot of logic in header-only inline functions. libclang sees these, but they aren't exported in the .so file. The generator often has to skip these (or we have to comment them out), meaning we lose some convenience methods (like 2-arg `SkImageInfo::MakeN32Premul`) and have to use the more verbose raw structs.

5. **ABI Mismatches:** Some C++ calling conventions don't translate cleanly through FFI. We discovered that passing `sk_sp<T>` (Skia's smart pointer) **by value** from Jai to C++ corrupts the pointer. The Itanium C++ ABI passes single-pointer structs in registers, but Jai's FFI layer doesn't match this behavior exactly. This required writing wrapper functions to work around the issue.

## The sk_sp Problem (and Solution)

After getting basic drawing working, we hit a wall trying to use custom fonts. Code like this would crash or produce garbage:

```jai
// This looks correct but doesn't work!
typeface_sp := SkFontMgr.makeFromFile(fontmgr, "DejaVuSans.ttf", 0);
SkFont.Constructor(*font, typeface_sp, 24.0);  // typeface_sp passed by value
// Result: font.fTypeface.fPtr contains garbage
```

The `sk_sp<SkTypeface>` parameter was being corrupted during the FFI call. After debugging, we traced it to an ABI mismatch: the C++ side expected the pointer in a register (RSI), but Jai was passing it differently.

### The Fix: A Helper Library

We couldn't just "fix" the FFI—that would require compiler changes. Instead, we wrote a small C++ helper library (`skia_ref_helper.cpp`) that exposes reference counting functions:

```cpp
extern "C" {
    void sk_ref_cnt_ref(void* ptr) {
        if (ptr) {
            int32_t* refcnt = reinterpret_cast<int32_t*>(static_cast<char*>(ptr) + 8);
            __atomic_add_fetch(refcnt, 1, __ATOMIC_RELAXED);
        }
    }
    void sk_ref_cnt_unref(void* ptr) { /* ... calls destructor when count hits 0 */ }
}
```

This is necessary because `SkRefCntBase::ref()` and `unref()` are inlined in Skia's headers and not exported from `libskia.so`.

### Safe Wrappers

With reference counting available, we added safe wrapper functions to the generated bindings that bypass the problematic by-value `sk_sp` parameters:

```jai
SkFont_make :: (typeface: *SkTypeface, size: SkScalar) -> SkFont {
    font: SkFont;
    SkFont.Constructor(*font);  // Default constructor (no sk_sp parameter)
    SkFont.setSize(*font, size);
    // Manually set the typeface pointer and manage refcount
    if typeface then sk_ref_cnt_ref(typeface);
    font.fTypeface.fPtr = typeface;
    return font;
}
```

Now custom fonts work correctly:

```jai
sp_fontmgr := SkFontMgr_New_Custom_Directory("/usr/share/fonts/truetype/dejavu");
sp_typeface := SkFontMgr.makeFromFile(sp_fontmgr.fPtr, "DejaVuSans.ttf", 0);
font := SkFont_make(sp_typeface.fPtr, 24.0);  // Works!
SkCanvas.drawSimpleText(canvas, "Hello!", 6, .kUTF8, 100, 100, font, paint);
```

This pattern—identifying FFI edge cases and writing targeted workarounds—is likely to recur with any large C++ library. The key insight is that automated bindings get you 95% of the way there; the remaining 5% requires understanding the underlying ABI.

## Summary

Despite the friction of C++ build systems, the ability to programmatically generate 15,000 lines of bindings in seconds is a superpower. It turns a multi-month porting project into an afternoon task, allowing us to use industry-standard graphics libraries in a modern language immediately.
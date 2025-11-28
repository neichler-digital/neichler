│ # Neichler Design System                                                                                             │
│                                                                                                                      │
│ ## Brand Identity                                                                                                    │
│                                                                                                                      │
│ **Agency Name:** Neichler                                                                                            │
│ **Tagline:** Inspired Design                                                                                         │
│                                                                                                                      │
│ ---                                                                                                                  │
│                                                                                                                      │
│ ## Color Palette (Monokai-Inspired Dark Theme)                                                                       │
│                                                                                                                      │
│ ### Primary Colors                                                                                                   │
│ ```                                                                                                                  │
│ --bg-primary:      #272822    /* Deep charcoal - main background */                                                  │
│ --bg-secondary:    #1e1f1a    /* Darker shade - cards, sections */                                                   │
│ --bg-elevated:     #3e3d32    /* Elevated surfaces */                                                                │
│ ```                                                                                                                  │
│                                                                                                                      │
│ ### Accent Colors (Monokai Signature)                                                                                │
│ ```                                                                                                                  │
│ --accent-pink:     #f92672    /* Vibrant pink - primary CTA, highlights */                                           │
│ --accent-cyan:     #66d9ef    /* Electric cyan - links, interactive */                                               │
│ --accent-green:    #a6e22e    /* Bright green - success, emphasis */                                                 │
│ --accent-yellow:   #e6db74    /* Soft yellow - warnings, secondary accent */                                         │
│ --accent-orange:   #fd971f    /* Warm orange - tertiary accent */                                                    │
│ --accent-purple:   #ae81ff    /* Soft purple - special elements */                                                   │
│ ```                                                                                                                  │
│                                                                                                                      │
│ ### Text Colors                                                                                                      │
│ ```                                                                                                                  │
│ --text-primary:    #f8f8f2    /* Off-white - main text */                                                            │
│ --text-secondary:  #75715e    /* Muted brown-grey - secondary text */                                                │
│ --text-muted:      #49483e    /* Dark grey - subtle text, borders */                                                 │
│ ```                                                                                                                  │
│                                                                                                                      │
│ ### Utility                                                                                                          │
│ ```                                                                                                                  │
│ --gradient-fade:   linear-gradient(90deg, #272822 0%, #27282200 100%)                                                │
│ --border-subtle:   #49483e                                                                                           │
│ ```                                                                                                                  │
│                                                                                                                      │
│ ---                                                                                                                  │
│                                                                                                                      │
│ ## Typography                                                                                                        │
│                                                                                                                      │
│ ### Font Family                                                                                                      │
│ **Primary:** Source Code Pro                                                                                         │
│ - Monospace aesthetic reinforces technical credibility                                                               │
│ - Clean, readable at all sizes                                                                                       │
│ - Weights: 300 (light), 400 (regular), 600 (semibold), 700 (bold)                                                    │
│                                                                                                                      │
│ ### Type Scale                                                                                                       │
│ ```                                                                                                                  │
│ --text-xs:    0.75rem   /* 12px - captions, labels */                                                                │
│ --text-sm:    0.875rem  /* 14px - small text, nav */                                                                 │
│ --text-base:  1rem      /* 16px - body text */                                                                       │
│ --text-lg:    1.125rem  /* 18px - lead text */                                                                       │
│ --text-xl:    1.25rem   /* 20px - small headings */                                                                  │
│ --text-2xl:   1.5rem    /* 24px - section titles */                                                                  │
│ --text-3xl:   2rem      /* 32px - page titles */                                                                     │
│ --text-4xl:   2.5rem    /* 40px - hero subtitle */                                                                   │
│ --text-5xl:   3.5rem    /* 56px - hero title */                                                                      │
│ --text-6xl:   4.5rem    /* 72px - display/impact */                                                                  │
│ ```                                                                                                                  │
│                                                                                                                      │
│ ### Line Heights                                                                                                     │
│ ```                                                                                                                  │
│ --leading-tight:   1.2    /* Headings */                                                                             │
│ --leading-normal:  1.5    /* Body text */                                                                            │
│ --leading-relaxed: 1.75   /* Long-form reading */                                                                    │
│ ```                                                                                                                  │
│                                                                                                                      │
│ ---                                                                                                                  │
│                                                                                                                      │
│ ## Hero Section Specification                                                                                        │
│                                                                                                                      │
│ ### Layout                                                                                                           │
│ ```                                                                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐                                                      │
│ │                                                             │                                                      │
│ │  ██ NEICHLER ██              ░░░▓▓▓███████████████████████ │                                                       │
│ │                              ░░░░▓▓▓▓▓████ GENERATIVE ████ │                                                       │
│ │  inspired design             ░░░░░▓▓▓▓▓▓███ LINES ████████ │                                                       │
│ │                              ░░░░░░▓▓▓▓▓▓▓▓████████████████ │                                                      │
│ │  ← GRADIENT FADE →           ░░░░░░░▓▓▓▓▓▓▓▓▓██████████████ │                                                      │
│ │                                                             │                                                      │
│ │  [CTA Button]                                               │                                                      │
│ └─────────────────────────────────────────────────────────────┘                                                      │
│ ```                                                                                                                  │
│                                                                                                                      │
│ ### Left Side (Text)                                                                                                 │
│ - "NEICHLER" in bold, large type (--text-6xl or larger)                                                              │
│ - Animated transition to tagline "inspired design"                                                                   │
│ - Animation: Text reveals with subtle typewriter or fade effect                                                      │
│ - Gradient overlay fades from solid bg-primary (left) to transparent (right)                                         │
│                                                                                                                      │
│ ### Right Side (Generative Art)                                                                                      │
│ - Canvas/WebGL generative algorithm                                                                                  │
│ - Inspired by Karsten Schmidt's (thi.ng) aesthetic                                                                   │
│ - Dancing/flowing lines using Monokai accent colors                                                                  │
│ - Colors to use: accent-pink, accent-cyan, accent-green, accent-purple                                               │
│ - Movement: Smooth, organic, mathematical (Perlin noise, flow fields, or similar)                                    │
│ - Should feel: Impressive, immersive, alive, technically sophisticated                                               │
│                                                                                                                      │
│ ### Animation Sequence                                                                                               │
│ 1. Page loads → Generative lines begin animating immediately                                                         │
│ 2. Brief pause (300ms)                                                                                               │
│ 3. "NEICHLER" fades/types in                                                                                         │
│ 4. Transition animation (1-2s)                                                                                       │
│ 5. "inspired design" appears below/replacing with smooth animation                                                   │
│                                                                                                                      │
│ ---                                                                                                                  │
│                                                                                                                      │
│ ## Spacing System                                                                                                    │
│                                                                                                                      │
│ ```                                                                                                                  │
│ --space-1:   0.25rem   /* 4px */                                                                                     │
│ --space-2:   0.5rem    /* 8px */                                                                                     │
│ --space-3:   0.75rem   /* 12px */                                                                                    │
│ --space-4:   1rem      /* 16px */                                                                                    │
│ --space-6:   1.5rem    /* 24px */                                                                                    │
│ --space-8:   2rem      /* 32px */                                                                                    │
│ --space-12:  3rem      /* 48px */                                                                                    │
│ --space-16:  4rem      /* 64px */                                                                                    │
│ --space-24:  6rem      /* 96px */                                                                                    │
│ --space-32:  8rem      /* 128px */                                                                                   │
│ ```                                                                                                                  │
│                                                                                                                      │
│ ---                                                                                                                  │
│                                                                                                                      │
│ ## Component Styling                                                                                                 │
│                                                                                                                      │
│ ### Buttons                                                                                                          │
│ - Primary: bg accent-pink, text white, hover brightens                                                               │
│ - Secondary: border accent-cyan, text accent-cyan, hover fills                                                       │
│ - Minimal padding, sharp or slightly rounded corners (2-4px)                                                         │
│                                                                                                                      │
│ ### Cards/Sections                                                                                                   │
│ - bg-secondary or bg-elevated                                                                                        │
│ - Subtle border (border-subtle) or no border                                                                         │
│ - Generous padding (space-8 to space-12)                                                                             │
│                                                                                                                      │
│ ### Links                                                                                                            │
│ - accent-cyan for interactive links                                                                                  │
│ - Underline on hover (not default)                                                                                   │
│                                                                                                                      │
│ ### Code Blocks                                                                                                      │
│ - bg-elevated background                                                                                             │
│ - Syntax highlighting using Monokai colors naturally                                                                 │
│                                                                                                                      │
│ ---                                                                                                                  │
│                                                                                                                      │
│ ## Design Principles                                                                                                 │
│                                                                                                                      │
│ 1. **Restraint** - Let whitespace breathe. Don't overcrowd.                                                          │
│ 2. **Hierarchy** - Clear visual hierarchy through size and color contrast                                            │
│ 3. **Consistency** - Stick to the system. No one-off colors or sizes.                                                │
│ 4. **Performance** - Every visual element must justify its existence                                                 │
│ 5. **Accessibility** - Ensure sufficient contrast ratios despite dark theme                                          │
│                                                                                                                      │
│ ---                                                                                                                  │
│                                                                                                                      │
│ ## Responsive Breakpoints                                                                                            │
│                                                                                                                      │
│ ```                                                                                                                  │
│ --screen-sm:   640px    /* Mobile landscape */                                                                       │
│ --screen-md:   768px    /* Tablet */                                                                                 │
│ --screen-lg:   1024px   /* Desktop */                                                                                │
│ --screen-xl:   1280px   /* Large desktop */                                                                          │
│ --screen-2xl:  1536px   /* Extra large */                                                                            │
│ ```                                                                                                                  │
│                                                                                                                      │
│ Hero generative art should scale gracefully - potentially simplified on mobile for performance.                      │

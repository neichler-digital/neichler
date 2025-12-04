# Development Notes & Gotchas

## @thi.ng/rdom Hiccup Styling

### Issue: Object styles not applying in dynamically mapped elements

When using `.map()` to generate hiccup elements, **object-style** declarations may not be applied correctly:

```typescript
// This may NOT work for dynamically mapped elements:
...paragraphs.map((para) => [
  "p",
  {
    style: {
      fontSize: "var(--text-lg)",
      marginBottom: "24px",  // <-- Won't apply!
    },
  },
  para,
])
```

### Fix: Use string styles instead

```typescript
// This WORKS:
...paragraphs.map((para) => [
  "p",
  {
    style: "font-size: var(--text-lg); margin-bottom: 24px;",
  },
  para,
])
```

### Why this happens

The @thi.ng/rdom library handles style objects differently in certain contexts. When elements are generated dynamically via `.map()` and spread into a parent, string styles are more reliably applied.

### When to use which

| Context | Style Format |
|---------|--------------|
| Static elements | Object `{ style: { marginBottom: "24px" } }` - usually works |
| Mapped/dynamic elements | String `{ style: "margin-bottom: 24px;" }` - more reliable |

### Reference

See `src/components/blog.ts` `applyStyles()` function for an example of string-based styling that works correctly with dynamic content.

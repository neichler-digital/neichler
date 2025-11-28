# Iterative Website Builder for Neichler Software Development Agency

You are helping build a professional website for a software development agency. Work iteratively with the user, using the TodoWrite tool to track progress through phases.

## Agency Identity & Philosophy

**Core Values (embody these without naming sources directly):**
- **Simplicity over complexity** - Solutions should be as simple as possible, but no simpler. Avoid accidental complexity. Question every abstraction.
- **Data-oriented design** - Treat data as data. Prefer plain data structures over elaborate object hierarchies. Make the implicit explicit.
- **Craftsmanship & intentionality** - Take time to understand problems deeply before solving. Ship when ready, not when rushed.
- **Local & in-house development** - Personal relationships, direct communication, no outsourcing
- **Agile methodology** - Iterative delivery, continuous feedback, adaptable to change

**Tone:** Professional, thoughtful, confident without arrogance. Appeal to discerning clients who value quality over quantity.

---

## Progress Tracker

### Phase 1: Design & Content Strategy
- [x] Overall visual design system (colors, typography, spacing) - **DONE** (see `.claude/design-system.md`)
- [x] Site structure & navigation - **DONE**
- [x] Hero section design - **DONE** (generative flow field animation with Monokai colors)
- [x] Content tone & messaging guidelines - **DONE** (defined in design system)

### Phase 2: Core Pages Content
- [x] **About Us** - Agency story, mission, what makes us different - **DONE**
- [x] **Values** - Our development philosophy (simplicity, data-driven, craftsmanship) - **DONE** (3 value cards)
- [ ] **How We Work** - Step-by-step collaboration process
- [ ] **Team/Employees** - Detailed backgrounds, expertise, personalities

### Phase 3: Services & Capabilities
- [x] **Services** - Mobile, Web, AI development, Consulting - **DONE** (4 service cards)
- [ ] **Technology** - Tech stack we're passionate about and skilled in
- [ ] **Projects/Portfolio** - Showcase of work (even if placeholder initially)

### Phase 4: Engagement & Conversion
- [x] **Contact Us** - Contact form with name/email/message - **DONE**
- [ ] **Book a Meeting** - Calendar integration (Calendly or similar)
- [ ] **Work With Us** - For potential clients AND talent/developers

### Phase 5: Content & Community
- [ ] **Blog** - Technical articles, insights, case studies

### Phase 6: Implementation
- [x] Tech stack decision - **DONE** (thi.ng/rdom + TypeScript + Vite)
- [x] Project setup & build system - **DONE**
- [x] Component development - **DONE** (nav, hero, about, services, contact, footer)
- [x] Responsive design - **DONE** (mobile/tablet/desktop)
- [x] Performance optimization - **DONE** (30KB bundle, 10KB gzipped)
- [ ] GitHub Pages deployment setup
- [ ] Namecheap domain configuration

---

## What's Been Built

### Tech Stack
- **Framework:** thi.ng/rdom (hiccup-style reactive DOM)
- **Language:** TypeScript
- **Build:** Vite
- **Styling:** CSS custom properties (Monokai-inspired dark theme)
- **Font:** Source Code Pro (Google Fonts)

### Components Created
```
src/
├── main.ts              # App entry point
└── components/
    ├── hero.ts          # Generative flow field animation + text
    ├── nav.ts           # Fixed header with mobile menu
    ├── about.ts         # Company story + 3 value cards
    ├── services.ts      # 4 service cards with hover effects
    ├── contact.ts       # Two-column layout with form
    └── footer.ts        # Logo + social links
```

### Design System
- **Colors:** Monokai-inspired (pink, cyan, green, purple, orange accents)
- **Background:** Dark charcoal (#272822)
- **Typography:** Source Code Pro, scale from 0.75rem to 4.5rem
- **Spacing:** 4px to 128px scale

### Hero Section Features
- Generative flow field animation using Perlin noise
- Lines dance using Monokai accent colors
- Left-to-right gradient fade overlay
- "NEICHLER" + "inspired design" with staggered fade-in animation
- CTA button with hover effect

---

## Outstanding Tasks

### High Priority
1. **Work/Portfolio section** - Showcase projects (can use placeholders)
2. **Team section** - Team member cards with photos/bios
3. **GitHub Pages deployment** - Set up CI/CD for auto-deploy

### Medium Priority
4. **Technology section** - Tech stack showcase
5. **How We Work section** - Process/methodology explanation
6. **Book a Meeting** - Calendly embed or similar
7. **Work With Us** - Careers/collaboration page

### Lower Priority
8. **Blog** - Article listing and detail pages
9. **SEO optimization** - Meta tags, Open Graph, structured data
10. **Contact form backend** - Connect to Formspree/Netlify Forms
11. **Domain configuration** - Namecheap DNS setup

---

## Technical Considerations

**Performance requirements:**
- Target < 1s first contentful paint
- Minimal JavaScript bundle (currently 30KB / 10KB gzipped)
- Consider static generation where possible
- Optimize images and assets

**Hosting:**
- GitHub Pages for hosting
- Namecheap for domain
- Consider CDN if needed

---

## How to Use This Command

1. Start each session by reviewing the Progress Tracker above
2. Pick the next incomplete task
3. Work iteratively - propose, get feedback, refine
4. Mark tasks complete in this file as you go
5. Ask clarifying questions when needed

---

## Starting a New Session

Begin by:
1. Checking the Progress Tracker above for current status
2. Running `npm run dev` to start the dev server (http://localhost:3000)
3. Asking the user what they'd like to work on next

**Quick commands:**
- `npm run dev` - Start development server
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build

# Casa Oro Real

A bilingual landing page for **Casa Oro Real**, a liturgical restoration service specializing in gold and silver plating for chalices, custodias, and sacred art objects. Built as a freelance project for a client in Argentina.

## Live Site

**[casaororeal.com](https://www.casaororeal.com)** — Hosted on GitHub Pages

---

## Features

- **Interactive Before/After Slider** — Draggable comparison slider showcasing restoration transformations
- **Gallery with Categories** — Accordion-style gallery organized by item type (Chalices, Custodias, etc.)
- **Before/After Photo Toggle** — Click to switch between before and after states on gallery items
- **Lightbox Modal** — Enlarged side-by-side comparison view
- **Bilingual Support** — Full Spanish and Portuguese translations with language switcher
- **Mobile-First Responsive** — Optimized for all device sizes
- **WhatsApp Integration** — Floating contact button for quick inquiries
- **SEO Optimized** — Meta tags, Open Graph, Google Analytics

---

## Why Vanilla HTML/CSS/JS?

This project intentionally uses vanilla technologies rather than React or other frameworks. For a single-page landing site with limited interactivity, a framework would add unnecessary complexity, bundle size, and load time. The modular SCSS architecture demonstrates the same organizational principles used in component-based systems, but with better performance for this use case.

A React/Vue/Next.js stack would be the appropriate choice for a multi-page application with user authentication, e-commerce, CMS integration, or complex state management.

---

## Project Structure

```
casa-oro-real/
├── src/
│   └── styles/               # SCSS source files
│       ├── main.scss         # Entry point (imports all partials)
│       ├── _variables.scss   # Colors, fonts, breakpoints
│       ├── _mixins.scss      # Reusable style helpers
│       ├── _base.scss        # Reset, typography, utilities
│       ├── _header.scss      # Desktop + mobile navigation
│       ├── _hero.scss        # Hero section + comparison slider
│       ├── _gallery.scss     # Gallery accordion + photo toggler
│       ├── _process.scss     # Trust process steps
│       ├── _contact.scss     # CTA section
│       ├── _footer.scss      # Footer + WhatsApp float
│       └── _lightbox.scss    # Modal overlay
├── images/                   # Optimized images
│   ├── gallery/              # Before/after restoration photos
│   └── icons/                # Favicon
├── index.html                # Single page application
├── script.js                 # Core JavaScript functionality
├── style.css                 # Compiled CSS (from SCSS)
├── package.json              # npm scripts for SCSS compilation
├── CNAME                     # GitHub Pages custom domain
└── LICENSE                   # All Rights Reserved
```

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)

### Setup

```bash
# Install dependencies
npm install

# Compile SCSS to CSS (production, minified)
npm run sass

# Watch for changes during development
npm run sass:watch

# Compile with source maps (debugging)
npm run sass:dev
```

### Making Style Changes

1. Edit the relevant `.scss` file in `src/styles/`
2. Run `npm run sass` to compile
3. The `style.css` file will be updated automatically

---

## Design System

### Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `$color-gold` | `#c09f58` | Primary brand, buttons, accents |
| `$color-gold-dark` | `#a88a4a` | Hover states |
| `$color-dark-blue` | `#2c3e50` | Headings, footer background |
| `$color-cream-bg` | `#FFFEF9` | Page background |
| `$color-text` | `#4a4a4a` | Body text |

### Typography

- **Headings**: EB Garamond (serif)
- **Body**: Source Sans Pro (sans-serif)

### Breakpoints

- **XL**: 1200px
- **LG**: 992px (tablet)
- **MD**: 768px (mobile landscape)
- **SM**: 480px (mobile portrait)

---

## License

All Rights Reserved — see [LICENSE](LICENSE) for details.

---

## Author

**Felipe Villada**  
[felipevillada.com](https://www.felipevillada.com)
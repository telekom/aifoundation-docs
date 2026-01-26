# CLAUDE.md - AI Foundation Services Documentation

This file provides guidance for AI assistants working with this codebase.

## Project Overview

**AI Foundation Services Documentation** is a static documentation website built with Docusaurus v3 for Deutsche Telekom's T-Systems AI Foundation Services. It provides documentation for LLM serving APIs, pricing information, guides, and integration details.

- **Live URL**: https://docs.llmhub.t-systems.net/
- **Organization**: Deutsche Telekom (telekom GitHub org)
- **Framework**: Docusaurus 3.9.2 with React 18

## Quick Reference

```bash
# Install dependencies
npm install      # or: bun install

# Start dev server
npm run start    # or: bun run start

# Build for production
npm run build    # or: bun run build

# Test production build locally
npm run serve    # or: bun run serve

# Clear cache (useful for debugging)
npm run clear
```

**Node.js requirement**: 18.0 or higher

## Directory Structure

```
aifoundation-docs/
├── docs/                           # Markdown documentation files
│   ├── 01_Overview.md             # Main landing page
│   ├── 02_Introduction.md         # Service offerings
│   ├── 03_Quickstart.md           # Getting started guide
│   ├── 04_Model Serving/          # API and integration guides
│   ├── 05_SmartChat RAG API/      # RAG API documentation
│   └── 06_Services and Pricing.md # Pricing FAQ
│
├── src/
│   ├── components/                 # React components
│   │   ├── AvailableModels.js     # Model showcase cards
│   │   ├── FetchJson.js           # JSON fetching utility
│   │   └── PlansPageFeatures/     # Pricing page components
│   │       ├── ModelPlans.js
│   │       ├── RatePlans.js
│   │       ├── PlansPage.js
│   │       ├── PlansFilter/       # Filtering components
│   │       ├── PlansWidgets/      # UI widgets (tooltips)
│   │       └── PlansData/         # Versioned pricing data
│   │           └── PlansModelData/
│   │               ├── v1.13/
│   │               ├── v1.19.0/
│   │               └── v1.20.2/   # Current pricing version
│   │
│   ├── theme/                      # Docusaurus theme overrides
│   │   ├── Navbar/                # Custom navigation
│   │   ├── Footer/                # Telekom-branded footer
│   │   └── ColorModeToggle/       # Dark/light mode
│   │
│   ├── shared/                     # Shared utilities
│   │   ├── lib/                   # Custom hooks and helpers
│   │   │   ├── useMyI18n.js       # i18n hook
│   │   │   ├── useStringHelper.js # String utilities
│   │   │   └── countryHelper.ts   # Country/flag helpers
│   │   └── locales/               # Translation files
│   │       ├── en.json            # English
│   │       └── de.json            # German
│   │
│   ├── css/
│   │   └── custom.css             # Global styles (~1500 lines)
│   │
│   └── pages/                      # Custom pages
│
├── static/                         # Static assets
│   ├── files/                     # PDFs (service docs)
│   └── img/                       # Images
│
├── .github/workflows/
│   └── static.yml                 # GitHub Pages deployment
│
├── docusaurus.config.js           # Main config
├── sidebars.js                    # Sidebar structure
└── package.json                   # Dependencies
```

## Key Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| Docusaurus | Documentation framework | 3.9.2 |
| React | UI components | 18.3.1 |
| Telekom Scale | Design system (Web Components) | 3.0.0-beta.158 |
| i18next | Internationalization | 25.7.2 |
| MDX | Markdown with JSX | 3.1.1 |

## Code Conventions

### Component Patterns

- **Functional components** with React hooks (useState, useRef, useMemo)
- **Web Components integration** via Telekom Scale Design System
- **Custom event listeners** for Scale component events (`scale-change`)

```javascript
// Example: Web Component event handling
useEffect(() => {
  const select = selectRef.current;
  const handleChange = (event) => setValue(event.detail.value);
  select?.addEventListener('scale-change', handleChange);
  return () => select?.removeEventListener('scale-change', handleChange);
}, []);
```

### Naming Conventions

- **Components**: PascalCase (`ModelPlans.js`, `AvailableModels.js`)
- **Hooks/utilities**: camelCase (`useMyI18n.js`, `useCapitalizeFirstLetter`)
- **CSS classes**: kebab-case with `my-` prefix (`.my-px-2`, `.my-column`)
- **Data files**: lowercase with dashes (`all-pricing--2026-01-19.json`)

### Styling

- Use **CSS custom properties** for theming (`--telekom-*`, `--ifm-*`)
- Use existing **utility classes** from `custom.css` (`.my-*-{1..15}` for spacing)
- Ensure components work in both **light and dark modes**

### i18n Pattern

```javascript
import { useMyI18n } from '../shared/lib';

function MyComponent() {
  const { t } = useMyI18n();
  return <h1>{t('PLANS.MODELS.TITLE')}</h1>;
}
```

Translation keys use dot notation: `CATEGORY.SUBCATEGORY.KEY`

## Important Workflows

### Updating Pricing Data

Pricing data is versioned in `src/components/PlansPageFeatures/PlansData/PlansModelData/`:

1. Create a new version folder (e.g., `v1.21.0/`)
2. Export Rate Plans JSON from AIFS Serving UI
3. Add the JSON file to the new folder
4. Create an `index.js` that exports the data
5. Update the parent `index.js` to import the new version

```javascript
// PlansModelData/index.js
import {AllPlansV1_21_0} from "./v1.21.0";
export const PlansHistory = AllPlansV1_21_0;
```

### Adding Documentation Pages

1. Create `.md` or `.mdx` file in `docs/` directory
2. Use numeric prefix for ordering (e.g., `07_NewSection.md`)
3. For interactive content, use `.mdx` and import React components
4. Add `_category_.json` for new subdirectories

### Deployment

Deployment is automated via GitHub Actions on push to `main`:

1. Builds with `npm run build`
2. Deploys to GitHub Pages
3. No manual intervention needed

## Common Tasks

### Adding a New Component

1. Create component in `src/components/`
2. Use functional component with hooks
3. Import Telekom Scale components as needed
4. Add translations to `src/shared/locales/en.json` and `de.json`

### Modifying Theme

Theme overrides are in `src/theme/`. To customize:

1. Run `npm run swizzle @docusaurus/theme-classic ComponentName`
2. Choose "Eject" or "Wrap" based on customization needs
3. Modify the ejected component

### Working with Scale Components

```jsx
// Import React bindings
import { ScaleButton, ScaleDropdownSelect } from '@telekom/scale-components-react';

// Or use HTML custom elements directly
<scale-icon-action-copy-paste accessibility-title="Copy" />
```

## Testing Locally

```bash
# Full build test (recommended before PR)
npm run build && npm run serve

# Development with hot reload
npm run start

# Clear cache if experiencing issues
npm run clear && npm run start
```

## Git Workflow

- Main branch: `main`
- Feature branches: `feature/description` or `claude/description-sessionId`
- Deployment: Automatic on merge to `main`
- PRs should target `main` branch

## Important Files

| File | Purpose |
|------|---------|
| `docusaurus.config.js` | Main configuration (URL, plugins, theme) |
| `sidebars.js` | Documentation sidebar structure |
| `src/css/custom.css` | Global styles and utility classes |
| `src/shared/locales/*.json` | Translation strings |
| `PlansModelData/index.js` | Current pricing data version |

## Gotchas and Tips

1. **Package manager consistency**: Don't mix npm and bun in the same session
2. **Package files ignored**: `package.json` and `package-lock.json` are in `.gitignore`
3. **Broken links**: Set to `ignore` in config - check manually before deployment
4. **Scale components**: Use React bindings or handle custom events for HTML elements
5. **Dark mode**: Always test components in both light and dark modes
6. **Model data**: Uses second-to-last entry in PlansHistory array for display

## Environment Requirements

- Node.js 18.0+
- npm or bun package manager
- Modern browser for development (Chrome, Firefox, Safari)

## Links

- **Production**: https://docs.llmhub.t-systems.net/
- **Telekom Scale Design System**: https://telekom.github.io/scale/
- **Docusaurus Docs**: https://docusaurus.io/docs

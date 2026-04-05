# Docusaurus → Astro Starlight Migration Spec

This document describes every change needed to migrate the `telekom/aifoundation-docs` repository from Docusaurus 3.9.2 to Astro 6.x with Starlight 0.38.x. It is written against the **current upstream/main** state and can be used to recreate the migration from scratch.

---

## 1. Package & Build System

### 1.1 Replace package.json

**Remove all Docusaurus/React dependencies:**
- `@docusaurus/core`, `@docusaurus/preset-classic`
- `@easyops-cn/docusaurus-search-local`, `docusaurus-plugin-search-local`
- `@telekom/scale-components`, `@telekom/scale-components-react`
- `i18next`, `react-i18next`, `i18next-browser-languagedetector`, `i18next-http-backend`
- `prism-react-renderer`
- `react`, `react-dom`
- `clsx`, `country-flag-icons`, `util`
- `@mdx-js/react`

**New package.json:**
```json
{
  "name": "aifoundation-docs",
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/starlight": "^0.38.2",
    "astro": "^6.0.1",
    "sharp": "^0.34.2"
  },
  "engines": {
    "node": ">=18.0"
  }
}
```

### 1.2 Remove Docusaurus config files
- Delete `docusaurus.config.js`
- Delete `babel.config.js`
- Delete `sidebars.js`
- Delete `package-lock.json`
- Delete `static/setDefaultMode.js`

### 1.3 Add Astro config files

**astro.config.mjs:**
```js
// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://telekom.github.io',
  base: '/',
  integrations: [
    starlight({
      title: 'AI Foundation Services',
      logo: {
        src: './src/assets/favicon_180x180.png',
      },
      favicon: '/img/favicon_180x180.png',
      customCss: ['./src/styles/custom.css'],
      expressiveCode: {
        themes: ['dracula'],
      },
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        de: { label: 'Deutsch', lang: 'de' },
      },
      sidebar: [
        // SEE SECTION 4 FOR SIDEBAR STRUCTURE
      ],
    }),
  ],
});
```

**tsconfig.json:**
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

**src/content.config.ts:**
```ts
import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
```

---

## 2. Directory Structure Changes

### 2.1 Static assets: `static/` → `public/`

Rename the directory. Astro uses `public/` instead of `static/`.

All contents remain the same:
- `public/.nojekyll`
- `public/CNAME`
- `public/files/` (PDFs)
- `public/img/` (all images and logos)

**Remove:** `static/setDefaultMode.js` (Docusaurus-specific theme script).

### 2.2 Documentation: `docs/` → `src/content/docs/en/`

All `.mdx` files from `docs/` move to `src/content/docs/en/` with path changes described in Section 3.

### 2.3 German translations: create `src/content/docs/de/`

Mirror the `en/` structure. Each page gets a German translation. Starlight handles locale routing automatically — `/en/page` and `/de/page`.

### 2.4 Add `src/assets/favicon_180x180.png`

Copy `static/img/favicon_180x180.png` → `src/assets/favicon_180x180.png` (Starlight needs it in assets for the logo import).

### 2.5 Delete Docusaurus-specific directories
- `src/theme/` (entire directory — Navbar, Footer, Heading, ColorModeToggle, Root.js)
- `src/pages/` (Docusaurus pages — index.module.css, markdown-page.md)
- `src/css/custom.css` (replaced by `src/styles/custom.css`)
- `src/i18n.js` (replaced by Starlight's built-in i18n)
- `versioned_docs/` and `versioned_sidebars/` (if present)
- `versions.json`

### 2.6 Keep (with modifications)
- `src/components/` — React components get renamed `.js` → `.jsx`, plus new Astro wrapper components
- `src/shared/` — utility functions stay
- `.github/workflows/static.yml` — updated (see Section 7)

---

## 3. Content Migration Map

### 3.1 File path mapping (upstream docs/ → new src/content/docs/en/)

| Upstream path | New path |
|---|---|
| `docs/overview.mdx` | `src/content/docs/en/index.mdx` |
| `docs/getting-started/quickstart.mdx` | `src/content/docs/en/quickstart.mdx` |
| `docs/getting-started/authentication.mdx` | `src/content/docs/en/getting-started/authentication.mdx` |
| `docs/getting-started/models.mdx` | `src/content/docs/en/getting-started/models.mdx` |
| `docs/guides/chat-completions.mdx` | `src/content/docs/en/guides/chat-completions.mdx` |
| `docs/guides/embeddings.mdx` | `src/content/docs/en/guides/embeddings.mdx` |
| `docs/guides/audio.mdx` | `src/content/docs/en/guides/audio.mdx` |
| `docs/guides/multimodal.mdx` | `src/content/docs/en/guides/multimodal.mdx` |
| `docs/guides/function-calling.mdx` | `src/content/docs/en/guides/function-calling.mdx` |
| `docs/guides/image-generation.mdx` | `src/content/docs/en/guides/image-generation.mdx` |
| `docs/guides/reasoning.mdx` | `src/content/docs/en/guides/reasoning.mdx` |
| `docs/guides/streaming.mdx` | `src/content/docs/en/guides/streaming.mdx` |
| `docs/guides/asynchronous-requests.mdx` | `src/content/docs/en/guides/asynchronous-requests.mdx` |
| `docs/guides/fine-tuning.mdx` | `src/content/docs/en/guides/fine-tuning.mdx` |
| `docs/guides/visual-rag.mdx` | `src/content/docs/en/guides/visual-rag.mdx` |
| `docs/integrations/langchain.mdx` | `src/content/docs/en/integrations/langchain.mdx` |
| `docs/integrations/llama-index.mdx` | `src/content/docs/en/integrations/llama-index.mdx` |
| `docs/reference/api-endpoints.mdx` | `src/content/docs/en/reference/api-endpoints.mdx` |
| `docs/reference/error-codes.mdx` | `src/content/docs/en/reference/error-codes.mdx` |
| `docs/reference/rate-limits.mdx` | `src/content/docs/en/reference/rate-limits.mdx` |
| `docs/smart-chat/overview.mdx` | `src/content/docs/en/smart-chat/overview.mdx` |
| `docs/smart-chat/api-reference.mdx` | `src/content/docs/en/smart-chat/api-reference.mdx` |
| `docs/smart-chat/global-chat.mdx` | `src/content/docs/en/smart-chat/global-chat.mdx` |
| `docs/smart-chat/local-chat.mdx` | `src/content/docs/en/smart-chat/local-chat.mdx` |
| `docs/plans.mdx` | `src/content/docs/en/services-and-pricing.mdx` |
| `docs/faq.mdx` | `src/content/docs/en/faq.mdx` |
| `docs/04_Model Serving/Plans/*.mdx` | `src/content/docs/en/plans/*.mdx` (individual plan pages) |

### 3.2 Frontmatter changes

**Docusaurus frontmatter (remove):**
```yaml
---
sidebar_position: 1
sidebar_label: "Overview"
slug: /
id: overview
tags: [getting-started]
---
```

**Starlight frontmatter (replace with):**
```yaml
---
title: Overview
---
```

Starlight controls sidebar order/labels from `astro.config.mjs`, not frontmatter. The `title` frontmatter field is the only required one. Optional: `description`, `sidebar: { label, order, hidden }`.

### 3.3 MDX content changes

1. **Remove Docusaurus imports:** Delete any `import {Tabs, TabItem} from '@theme/Tabs'` or similar Docusaurus theme imports.

2. **Add Starlight imports:** Replace with:
   ```mdx
   import { Tabs, TabItem } from '@astrojs/starlight/components';
   import { CardGrid, LinkCard } from '@astrojs/starlight/components';
   ```

3. **Admonitions:** Docusaurus uses `:::note` / `:::tip` / `:::warning` syntax. Starlight uses the same syntax natively — these should work without changes. If any use JSX `<Admonition>` components, replace with `:::` syntax.

4. **Image paths:** Update from `![alt](image.png)` (relative to docs/) to `![alt](/img/image.png)` (relative to public/).

5. **Internal links:** Change from Docusaurus slug-based links to Starlight path-based:
   - `[link](/overview)` → `[link](/en/)`
   - `[link](/quickstart)` → `[link](/en/quickstart)`
   - `[link](/guides/chat-completions)` → `[link](/en/guides/chat-completions)`

6. **Component usage in MDX:** Astro components (`.astro`) can be imported directly in MDX. React components need `client:load` or `client:visible` directives — but when wrapped in an Astro component, the wrapper handles this.

---

## 4. Sidebar Configuration

The sidebar is defined in `astro.config.mjs`. Map the upstream sidebar structure:

```js
sidebar: [
  { label: 'Overview', slug: 'index' },
  {
    label: 'Getting Started',
    items: [
      { label: 'Quickstart', slug: 'quickstart' },
      { label: 'Authentication', slug: 'getting-started/authentication' },
      { label: 'Models', slug: 'getting-started/models' },
    ],
  },
  {
    label: 'Guides',
    items: [
      { label: 'Chat Completions', slug: 'guides/chat-completions' },
      { label: 'Embeddings', slug: 'guides/embeddings' },
      { label: 'Audio', slug: 'guides/audio' },
      { label: 'Multimodal', slug: 'guides/multimodal' },
      { label: 'Function Calling', slug: 'guides/function-calling' },
      { label: 'Image Generation', slug: 'guides/image-generation' },
      { label: 'Reasoning', slug: 'guides/reasoning' },
      { label: 'Streaming', slug: 'guides/streaming' },
      { label: 'Asynchronous Requests', slug: 'guides/asynchronous-requests' },
      { label: 'Fine-Tuning', slug: 'guides/fine-tuning' },
      { label: 'Visual RAG', slug: 'guides/visual-rag' },
    ],
  },
  {
    label: 'Integrations',
    items: [
      { label: 'LangChain', slug: 'integrations/langchain' },
      { label: 'Llama Index', slug: 'integrations/llama-index' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { label: 'API Endpoints', slug: 'reference/api-endpoints' },
      { label: 'Error Codes', slug: 'reference/error-codes' },
      { label: 'Rate Limits', slug: 'reference/rate-limits' },
    ],
  },
  {
    label: 'SmartChat',
    items: [
      { label: 'Overview', slug: 'smart-chat/overview' },
      { label: 'API Reference', slug: 'smart-chat/api-reference' },
      { label: 'Global Chat', slug: 'smart-chat/global-chat' },
      { label: 'Local Chat', slug: 'smart-chat/local-chat' },
    ],
  },
  { label: 'Services & Pricing', slug: 'services-and-pricing' },
  { label: 'FAQ', slug: 'faq' },
  {
    label: 'Links',
    items: [
      { label: 'SmartChat ↗', link: 'https://public.oweb-chat.llmhub.t-systems.net/', attrs: { target: '_blank' } },
      { label: 'LLM Playground ↗', link: 'https://playground.llmhub.t-systems.net/', attrs: { target: '_blank' } },
      { label: 'Model Status ↗', link: 'https://uptime.llmhub.t-systems.net/status/health', attrs: { target: '_blank' } },
    ],
  },
],
```

---

## 5. Component Migration

### 5.1 File renames: `.js` → `.jsx`

All React component files must be renamed from `.js` to `.jsx` for Astro compatibility:
- `AvailableModels.js` → `AvailableModels.jsx`
- `FetchJson.js` → `FetchJson.jsx`
- `PlansPageFeatures/ModelPlans.js` → `ModelPlans.jsx`
- `PlansPageFeatures/ModelPlansTable.js` → `ModelPlansTable.jsx`
- `PlansPageFeatures/PlansPage.js` → `PlansPage.jsx`
- `PlansPageFeatures/PlansFilter/ModelPlansFilter.js` → `ModelPlansFilter.jsx`
- `PlansPageFeatures/PlansFilter/ModelPlansTableExtendedFilter.js` → `ModelPlansTableExtendedFilter.jsx`
- `PlansPageFeatures/PlansWidgets/PricingListTooltip.js` → `PricingListTooltip.jsx`
- `PlansPageFeatures/RatePlans.js` → `RatePlans.jsx`

### 5.2 TypeScript → JavaScript

- `src/shared/lib/countryHelper.ts` → `src/shared/lib/countryHelper.js` (remove type annotations)

### 5.3 New Astro wrapper components

React components can't be used directly in Starlight MDX without hydration directives. Create Astro wrapper components that import the React component with `client:load`:

**src/components/AvailableModels.astro:**
- Server-side renders the available models grid using pricing data from `PlansData`
- Parses model data: display name, cloud provider, deployment region, country flags
- Shows top 3 models by default with a "Show More / Show Less" toggle
- Copy-to-clipboard for model names
- Contains inline `<style>` and `<script>` tags (no React needed for this one — fully Astro)

**src/components/PlansPage.astro:**
- Server-side renders the pricing/plans page
- Imports pricing data from `PlansData` and country helper
- Renders rate plans table (5 tiers: Basic, Standard 1000-4000) with cloud providers, token pricing, RPM
- Renders models table with inline filtering (search, price range, server location, cloud)
- Sortable table headers
- Contains inline `<style>` and `<script>` for filter logic, rendering, sorting
- Fully server-rendered with client-side interactivity via inline script

### 5.4 Remove Docusaurus-specific code

- Remove `useMyI18n` usage from React components (replace with Starlight's i18n or hardcode for now)
- Remove `@docusaurus/Link`, `@docusaurus/useDocusaurusContext`, and other Docusaurus hooks
- Remove Scale component imports (`@telekom/scale-components-react`)

### 5.5 Keep PlansData directory

The pricing data JSON files and version indexes are framework-agnostic. Keep:
- `src/components/PlansPageFeatures/PlansData/PlansModelData/v1.13/`
- `src/components/PlansPageFeatures/PlansData/PlansModelData/v1.19.0/`
- `src/components/PlansPageFeatures/PlansData/PlansModelData/v1.20.2/`

---

## 6. Styling

### 6.1 Delete old CSS
- Delete `src/css/custom.css` (Docusaurus custom CSS — 1460 lines)
- Delete `src/pages/index.module.css`
- Delete `src/components/HomepageFeatures/styles.module.css`

### 6.2 Create new CSS: `src/styles/custom.css`

**Deutsche Telekom brand colors (Starlight CSS variables):**
```css
:root {
  --sl-color-accent-low: #3d0019;
  --sl-color-accent: #e20074;       /* Telekom Magenta */
  --sl-color-accent-high: #ff4da6;
}

:root[data-theme='light'] {
  --sl-color-accent-low: #fce4ef;
  --sl-color-accent: #e20074;
  --sl-color-accent-high: #9e0050;
}
```

**Additional styles needed:**
- **Overview hover cards:** `.card-grid`, `.hover-card` with 3 color variants, scale animation on hover
- **Flex/layout utility classes:** `.my-row`, `.my-column`, `.my-flex`, `.my-align-*`, `.my-justify-*`, `.my-gap-*`, `.my-px-*`, `.my-py-*`, `.my-mx-*`, `.my-my-*`, `.my-width-*`
- **Typography utilities:** `.font-size-32`, `.font-size-24`, `.font-weight-600`
- **Plans page:** `.filter-border`, `.plans-tag`, `.plans-table` (full-width, collapsed borders), `.sort-icon` (magenta active), `.plans-filter`, `.pricing-tooltip`, `.plans-dialog`
- **Extended filter panel:** `.extended-filter-overlay` (fixed overlay), `.extended-filter-panel` (350px right sidebar, z-index 201)
- **Available models card:** `.available-models-card`, `.copy-icon`

---

## 7. CI/CD (GitHub Actions)

### 7.1 Update `.github/workflows/static.yml`

Only change: artifact upload path from `build` to `dist`.

```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: dist
```

Everything else (Bun setup, `bun install`, `bun run build`) works with Astro.

---

## 8. .gitignore Updates

**Add:**
```
# Astro
.astro/
dist/

# Claude Code
.claude/settings.local.json
```

**Remove (no longer relevant):**
```
.docusaurus
.cache-loader
/build
```

**Keep:**
```
/node_modules
.DS_Store
.env*
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.idea
note.txt
```

---

## 9. German Translation Approach

For each English page in `src/content/docs/en/`, create a corresponding German page in `src/content/docs/de/` with:

1. **Translated frontmatter title** (e.g., `title: Overview` → `title: Überblick`)
2. **Translated prose/descriptions** — all explanatory text translated to German
3. **Code blocks left in English** — Python/bash/curl code is not translated
4. **Same component imports** — identical component usage
5. **Same image references** — images are shared, not duplicated
6. **Translated link labels** but same URLs for external links
7. **Updated internal link paths** — `/en/page` → `/de/page`

Starlight automatically provides the locale switcher UI.

---

## 10. What NOT to Migrate

- `src/theme/` — Starlight has its own theme system, custom Docusaurus theme overrides are not needed
- `src/i18n.js` and `i18next` config — Starlight handles i18n natively
- `src/pages/` — Starlight generates pages from content collections
- `versions.json` and `versioned_docs/` — Starlight doesn't have built-in versioning (handle separately if needed)
- `babel.config.js` — not needed with Astro
- `sidebars.js` — sidebar is in astro.config.mjs
- Scale components (`@telekom/scale-components`) — replace with Starlight built-in components or custom CSS
- `static/setDefaultMode.js` — Starlight handles dark/light mode natively

---

## 11. Checklist Summary

- [ ] Replace `package.json`, run `bun install`
- [ ] Create `astro.config.mjs`, `tsconfig.json`, `src/content.config.ts`
- [ ] Delete Docusaurus config files
- [ ] Rename `static/` → `public/`
- [ ] Copy favicon to `src/assets/`
- [ ] Move docs from `docs/` → `src/content/docs/en/` (update frontmatter, imports, links)
- [ ] Create German translations in `src/content/docs/de/`
- [ ] Rename React components `.js` → `.jsx`
- [ ] Create Astro wrapper components (AvailableModels.astro, PlansPage.astro)
- [ ] Replace `src/css/custom.css` with `src/styles/custom.css` (Starlight variables + utility classes)
- [ ] Delete `src/theme/`, `src/pages/`, `src/i18n.js`
- [ ] Update `.github/workflows/static.yml` (build path → dist)
- [ ] Update `.gitignore`
- [ ] Verify build with `bun run build`
- [ ] Verify dev server with `bun run dev`

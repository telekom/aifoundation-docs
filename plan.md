# LLM Hub Docs — Improvement Plan

**Branch**: `docs-improvements`
**Source**: Two-pass review of https://docs.llmhub.t-systems.net/
- Pass 1 — five-angle expert review: UX, technical writing, information architecture, performance/SEO, business positioning.
- Pass 2 — live-browser visual audit: desktop 1440×900, mobile 390×844, EN + DE locales, light + dark themes.

**Scope**: 49 concrete, actionable tasks grouped by priority. Each task is small enough to ship as its own PR.

---

## How to use this plan

- Work phase by phase. Phase 1 (P0) unlocks the most value — especially task 1.1, which fixes SEO across all 124 pages with one line.
- Each task has **Goal**, **Files**, **Steps**, **Acceptance**. Check boxes as you go.
- IDs beginning with **V** came from the live visual audit; IDs like 1.x / 2.x / 3.x came from the original five-angle review. Both streams were merged into the priority they belong in.
- **Bilingual rule**: every content change in `src/content/docs/` must also be applied to the mirror under `src/content/docs/de/`. If translation isn't ready, commit the English change and open a follow-up tagged `de-translation`.
- **Versioning rule**: don't touch `src/content/docs/v1/` unless a task explicitly says so. Changes there shouldn't leak into archived versions.
- **Pre-flight for every task**: `bun install && bun run dev`, visit the changed page, confirm nothing breaks. For SEO changes, also `bun run build` and inspect `dist/` output.

---

## Master task index

### Phase 1 — P0  — 15 tasks
| ID | Task | Est |
|---|---|---|
| 1.1 | Fix canonical domain (`astro.config.mjs` one-liner) | 5 min |
| 1.2 | Add `robots.txt` with sitemap directive | 5 min |
| 1.3 | Redirect legacy Google-indexed URLs | 30 min |
| 1.4 | Fix duplicate homepage `<title>` | 2 min |
| 1.8 | Create canonical `/getting-started/api-keys` page | 3 hrs |
| 1.10 | Rewrite homepage hero for position, not category | 1 day |
| 1.11 | Remove or resolve footer dead links | 1 hr |
| V1 | Fix broken dark-mode CSS | 2 hrs |
| V2 | Fix mobile layout of Available Models grid | 1 hr |
| V3 | Translate DE sidebar labels | 3 hrs |
| V6 | Replace "Hello from AIFS" in hero code sample | 5 min |

### Phase 2 — P1 (next sprint) — 16 tasks
| ID | Task |
|---|---|
| 2.1 | Add meta descriptions to every page |
| 2.2 | Add default `og:image` |
| 2.3 | Scope `flag-icons` CSS (drop 490KB bundle) |
| 2.4 | Add `llms.txt` |
| 2.5 | Add ICP-split entry points on homepage |
| 2.6 | Add `index.mdx` to Guides and Integrations |
| 2.7 | Expand Rate Limits table to all five tiers |
| 2.8 | Collapse Plans sub-pages into a comparison view |
| 2.9 | Fix accessibility issues on homepage |
| 2.10 | Create Enterprise Trust page |
| 2.11 | Fix German FAQ rate-limits link |
| 2.12 | Terminology consolidation pass |
| V4 | Translate AvailableModels component labels on /de/ |
| V5 | Fix truncated theme toggle label on /de/ |
| V7 | Fix "Burst RPM" column on Plans page (define + widen) |
| V8 | Differentiate link pills vs metadata badges on Plans |

### Phase 3 — P2 (backlog) — 18 tasks
| ID | Task |
|---|---|
| 3.1 | Changelog + RSS feed |
| 3.2 | "Switch from OpenAI" migration guide |
| 3.3 | Internal-champion one-pager |
| 3.4 | JSON-LD structured data |
| 3.5 | Handle or drop `v1/` archive |
| 3.6 | Complete LangChain + LlamaIndex RAG examples |
| 3.7 | Bilingual parity audit + build-time lint |
| 3.8 | Collapse "Links" sidebar section |
| 3.9 | Group Guides sidebar (two-level) |
| 3.10 | Search UX polish (empty state) |
| 3.11 | Video + CDN performance |
| 3.12 | Troubleshooting section |
| 3.13 | Inbound-link consolidation |
| 3.14 | Breadcrumbs |
| V9 | Fix Plans page prev/next nav chain |
| V10 | Dead footer links — visual duplicate of 1.11 |
| V11 | Heading hierarchy inversion (TOC before H1) |
| V12 | Verify `<html lang>` attribute on all DE pages |

---

## Phase 1 — P0 (ship this week)

High-leverage, low-effort. Do these in roughly the listed order.

### [x] 1.1 Fix canonical domain
**Goal**: Stop Google from consolidating rank on `telekom.github.io`. Cascades to fix canonical tags, all 124 sitemap URLs, hreflang hrefs, and `og:url` in one change.

**Files**: `astro.config.mjs`

**Steps**:
1. Change `site: 'https://telekom.github.io'` → `site: 'https://docs.llmhub.t-systems.net'` (line 8).
2. `bun run build`.
3. Grep `dist/` for `telekom.github.io` — should return zero results.
4. Open `dist/sitemap-0.xml` — every `<loc>` should use the new domain.

**Acceptance**:
- No `telekom.github.io` references anywhere in the built output.
- `<link rel="canonical">`, `<link rel="alternate" hreflang>`, `<meta property="og:url">` all use `docs.llmhub.t-systems.net`.
- After deploy: `curl -s https://docs.llmhub.t-systems.net/ | grep canonical` shows new domain.

---

### [x] 1.2 Add `robots.txt` with sitemap directive
**Goal**: Give crawlers a standards-compliant entry point to the sitemap.

**Files**: `public/robots.txt` (new)

**Steps**:
1. Create `public/robots.txt`:
   ```
   User-agent: *
   Allow: /

   Sitemap: https://docs.llmhub.t-systems.net/sitemap-index.xml
   ```
2. `bun run build` and confirm `dist/robots.txt` exists.

**Acceptance**:
- After deploy: `curl -I https://docs.llmhub.t-systems.net/robots.txt` → 200.
- Sitemap URL in robots.txt resolves to 200.

---

### [x] 1.3 Redirect legacy Google-indexed URLs
**Goal**: Stop serving hard 404s for URLs currently in Google's index (`/Quickstart`, `/Introduction`, `/Model%20Serving/langchain`, `/Services%20and%20Pricing`).

**Files**: `astro.config.mjs` (add `redirects` map) OR `public/404.html` (client-side fallback)

**Steps**:
1. In `astro.config.mjs`, add top-level:
   ```js
   redirects: {
     '/Quickstart': '/getting-started/quickstart',
     '/Introduction': '/',
     '/Model Serving/langchain': '/integrations/langchain',
     '/Services and Pricing': '/plans',
   },
   ```
2. Build and test: `bun run build && bunx --bun http-server dist` then `curl -I http://localhost:8080/Quickstart` — should see 301.
3. Submit URL removal requests in Google Search Console for any URL that can't be redirected.

**Acceptance**:
- Every dead URL from the review redirects to a live page with a 301 (or meta-refresh on GH Pages).
- Google Search Console: "Coverage → Excluded" for removed URLs within 7 days.

---

### [x] 1.4 Fix duplicate homepage `<title>`
**Goal**: `<title>` currently renders as `AI Foundation Services | AI Foundation Services` — confirmed live.

**Files**: `src/content/docs/index.mdx` (and `src/content/docs/de/index.mdx`)

**Steps**:
1. Change frontmatter `title: "AI Foundation Services"` → `title: "Overview"` (line 2 of each).
2. Rebuild, view page source, confirm `<title>Overview | AI Foundation Services</title>`.

**Acceptance**:
- Browser tab reads `Overview | AI Foundation Services`.
- SERP preview tools (e.g. https://www.sistrix.com/serp-snippet-generator/) show readable title.

---

### [ ] 1.5 Add expected response + ESM note to Quickstart code samples
**Goal**: New developer can distinguish success from silent misconfiguration.

**Files**: `src/content/docs/getting-started/quickstart.mdx` (+ `de/` mirror)

**Steps**:
1. Under each curl/Python/JS tab, append a fenced block with a representative truncated response:
   ```json
   {
     "id": "chatcmpl-...",
     "object": "chat.completion",
     "model": "Llama-3.3-70B-Instruct",
     "choices": [{ "index": 0, "message": { "role": "assistant", "content": "..." } }]
   }
   ```
2. In the Node.js sample: either wrap the `await` in `async function main() { ... } main()`, or add a note: *"Requires Node 18+ with `"type": "module"` in package.json for top-level await."*
3. Smoke-test both Python and Node samples against the live API with a real key.

**Acceptance**:
- Response shape shown alongside request for every tab.
- Copy-paste Node sample runs cleanly on a fresh `npm init -y` + `type: module` project.

---

### [ ] 1.6 Fix fine-tuning sample model reference
**Goal**: Guide example must use a model that is actually supported.

**Files**: `src/content/docs/guides/fine-tuning.mdx` (+ `de/` mirror)

**Steps**:
1. Read the prerequisites block — note the two supported models (currently `Mistral-Nemo-Instruct-2407` and `Llama-3.1-70B-Instruct`).
2. Replace `model="Llama-3.3-70B-Instruct"` in the job creation snippet with a listed supported model.
3. If the list is stale, confirm with platform team and update both prerequisites and sample.

**Acceptance**:
- Prerequisites list and code sample reference the same model.
- A fine-tune request with the sample body returns a valid job ID against the real API.

---

### [ ] 1.7 Explain SmartChat auth model
**Goal**: SmartChat uses username/password → token; this is never introduced before the API Reference dumps placeholders.

**Files**: `src/content/docs/smartchat/api-reference.mdx` (+ `de/` mirror)

**Steps**:
1. At the very top of the page (above any code), add a "Before you begin" callout:
   - How to get credentials (`ai@t-systems.com`, link to the Overview page).
   - Explain the token endpoint, TTL, and refresh behavior.
   - Link to Authentication for the core API as contrast: *"The LLM Serving API uses bearer API keys; SmartChat uses a separate credential exchange. Do not mix them."*
2. Mirror in German.

**Acceptance**:
- A developer reading top-to-bottom never encounters a placeholder without knowing what to put there.

---

### [ ] 1.8 Create canonical `/getting-started/api-keys` page
**Goal**: Every "how do I get an API key?" question lands on the same URL — shareable, linkable from marketing.

**Files**: `src/content/docs/getting-started/api-keys.mdx` (new), `src/content/docs/de/getting-started/api-keys.mdx` (new), `astro.config.mjs`

**Steps**:
1. Create the page. Content:
   - One paragraph: what an API key is in this context.
   - Step-by-step: visit https://apikey.llmhub.t-systems.net/, sign in, create a key, scope it.
   - "For production / paid plans, see [Plans](/plans)."
   - Cross-link from Quickstart and FAQ (update both to point here instead of repeating instructions).
2. Add to sidebar (`astro.config.mjs`) under Getting Started, between Quickstart and Authentication.
3. De-duplicate: remove the API-key steps from Quickstart; link to this page instead.

**Acceptance**:
- Search for "api key" on the live site returns this page first.
- FAQ and Quickstart both link out instead of duplicating.

---

### [ ] 1.9 Create `/reference/service-levels` SLA page
**Goal**: A B2B buyer asking "what's the SLA?" must get an in-doc answer, not a PDF download.

**Files**: `src/content/docs/reference/service-levels.mdx` (new), German mirror, `astro.config.mjs`

**Steps**:
1. Extract SLA content from `public/files/Leistungsbeschreibung-LLM-Serving-Service.pdf`. Include at minimum:
   - Uptime commitment per plan tier.
   - Support response times.
   - Credit / remediation policy.
   - Link to live status (https://uptime.llmhub.t-systems.net/).
   - Link to the full PDF at the bottom for procurement.
2. Add to sidebar under Reference, after Rate Limits.

**Acceptance**:
- A buyer with the question "what's the SLA?" can answer it without downloading the PDF.

---

### [ ] 1.10 Rewrite homepage hero for position, not category
**Goal**: Make the moat visible on page one.

**Files**: `src/content/docs/index.mdx` (+ `de/` mirror)

**Steps**:
1. Replace the opening paragraph (line 8) with a position statement. Draft:
   > **LLM inference your CISO, DPO, and developers all sign off on.** OpenAI-compatible API, 30+ models, hosted exclusively in Germany and the EU — zero US data transfer. One-line switch from OpenAI.
2. Keep the hero badges but tighten: `Hosted in Germany` · `GDPR + DPA included` · `OpenAI-compatible`.
3. Keep the two LinkCards; consider a third for the new Enterprise Trust page (task 2.10) once it exists.

**Acceptance**:
- Within 10 seconds, a new visitor can answer: "what is this, who is it for, why would I pick it over OpenAI?"
- German mirror carries the same positioning (idiomatic, not literal).

---

### [x] 1.11 Remove or resolve footer dead links
**Goal**: Three legal links (`href="#"`) on a compliance-positioned product is a trust and compliance risk. Confirmed live on both EN and DE footers (also covered as visual finding V10).

**Files**: `src/components/Footer.astro`

**Steps**:
1. Get real URLs from legal for: Terms and conditions (AGB), Consumer protection (Verbraucherschutz), Product information sheet (Produktinformationsblatt).
2. Replace all six `href: '#'` entries (3 EN + 3 DE) in `src/components/Footer.astro` lines 10–12 and 18–20.
3. If URLs aren't ready, **remove** those three entries entirely rather than ship `#` links.

**Acceptance**:
- Zero `href="#"` in the rendered footer.
- All footer links resolve to 200.

---

### [x] V1 Fix broken dark mode on content area
**Goal**: Toggling the theme to "Dark" updates `<html data-theme="dark">` and the computed body background becomes `rgb(23, 24, 28)`, but the rendered content area stays white/cream. Dark-mode users see a broken mixed-theme page. Likely cause: hardcoded colors in `src/styles/custom.css` overriding Starlight's CSS variables.

**Files**: `src/styles/custom.css`, possibly `src/components/AvailableModels.astro` and `src/components/PlansPage.astro`.

**Steps**:
1. Reproduce: visit any docs page, set `localStorage.setItem('starlight-theme', 'dark')`, reload. Observe the content background stays light.
2. In DevTools, inspect the main content element. Find the CSS rule that wins — likely a hardcoded `background: #fff` or `color: #000` in `custom.css` or a component style, not using `var(--sl-color-bg)` / `var(--sl-color-text)`.
3. Replace hardcoded colors with Starlight CSS variables throughout `src/styles/custom.css` and any component `<style>` block.
4. Test both themes after each edit.

**Acceptance**:
- Toggling to Dark changes the content background to the Starlight dark palette on every page: homepage, a guide, Plans, SmartChat.
- No hardcoded hex or rgb backgrounds remain in custom.css except where theme-neutral (e.g. the purple "Looking for pricing?" callout).

---

### [x] V2 Fix mobile layout of Available Models grid
**Goal**: At 500px viewport (and presumably all mobile widths), each card renders at ~76px wide in a fixed 3-column grid. Model name, cloud, flag, and location all wrap or disappear.

**Files**: `src/components/AvailableModels.astro`

**Steps**:
1. Inspect the grid CSS — likely `grid-template-columns: repeat(3, 1fr)` without a media query.
2. Switch to responsive CSS:
   ```css
   .models-grid {
     display: grid;
     gap: 1rem;
     grid-template-columns: 1fr;
   }
   @media (min-width: 640px) { .models-grid { grid-template-columns: repeat(2, 1fr); } }
   @media (min-width: 960px) { .models-grid { grid-template-columns: repeat(3, 1fr); } }
   ```
3. Increase `INITIAL_COUNT` from 3 to 6 (2×3 grid on desktop, still reasonable on mobile) — combines naturally with task 2.9.

**Acceptance**:
- At 390px width, cards stack to 1 column with fully readable model names.
- At 768px width, 2 columns.
- At 1024px+, 3 columns (current behavior).

---

### [x] V3 Translate DE sidebar labels
**Goal**: On `/de/` pages, the main content and right rail translate, but every sidebar label remains in English. German visitors navigate a mixed-language UI.

**Files**: `astro.config.mjs` (Starlight sidebar `translations` per locale), or move sidebar to a per-locale i18n file.

**Steps**:
1. Starlight supports per-locale labels via the `translations` key on each sidebar item:
   ```js
   { label: 'Getting Started', translations: { de: 'Erste Schritte' }, items: [...] }
   ```
2. Translate ~40 labels. Source translations from the DE MDX frontmatter titles where possible — keep terminology consistent.
3. Consider extracting to `src/i18n/de.json` for maintainability as the list grows.

**Acceptance**:
- On any `/de/` page, every sidebar label is in German.
- Sidebar labels on `/de/` match the H1 of the DE page they link to.

---

### [ ] V6 Replace "Hello from AIFS" in hero code sample
**Goal**: The homepage "Try It Now" code block shows `"content": "Hello from AIFS"` — "AIFS" is never defined anywhere else on the site. First impression includes an undefined acronym in the first code block a visitor reads.

**Files**: `src/content/docs/index.mdx` (+ `de/` mirror)

**Steps**:
1. Replace `"Hello from AIFS"` with neutral/branded copy. Options:
   - `"Hello, world"` (neutral)
   - `"Hello from LLM Hub"` (reinforces short-form brand)
   - `"Say hi in one line — and we're done."` (matches rewritten hero in task 1.10)
2. Check consistency with task 2.12 (terminology pass).

**Acceptance**:
- No "AIFS" in user-facing copy on any page (grep should return 0).

---

## Phase 2 — P1 (next sprint)

### [x] 2.1 Add meta descriptions to every page
**Goal**: Improve SERP CTR; currently zero pages have `<meta name="description">`.

**Files**: every `.mdx` under `src/content/docs/` (both locales)

**Steps**:
1. Write a `description` field (max ~155 chars) in each page's frontmatter.
2. Prioritize: index, getting-started/*, plans, faq, reference/* first — these attract the most SERP traffic.
3. Starlight auto-emits `<meta name="description">` from frontmatter.

**Acceptance**:
- `curl -s https://docs.llmhub.t-systems.net/ | grep 'name="description"'` returns a useful sentence.
- Screaming Frog or similar audit shows 0 missing descriptions.

---

### [ ] 2.2 Add default `og:image`
**Goal**: Shares on LinkedIn, Slack, Twitter currently preview without an image.

**Files**: `public/img/og-default.png` (new, 1200×630), Starlight head override via `components.Head` or a custom `<Head>` partial.

**Steps**:
1. Create branded OG image at `public/img/og-default.png` (T-Systems branding, "LLM Hub" wordmark, short tagline).
2. Inject via Starlight's Head override (create `src/components/Head.astro`, register in `astro.config.mjs` under `components.Head`) that emits:
   ```html
   <meta property="og:image" content="https://docs.llmhub.t-systems.net/img/og-default.png" />
   <meta name="twitter:image" content="https://docs.llmhub.t-systems.net/img/og-default.png" />
   ```
3. Test with https://www.opengraph.xyz/ or LinkedIn Post Inspector.

**Acceptance**:
- LinkedIn share preview shows the image.
- Twitter card validator passes.

---

### [x] 2.3 Scope `flag-icons` CSS
**Goal**: Current bundle is 490KB uncompressed / 100KB gzipped because `flag-icons` is imported globally.

**Files**: `astro.config.mjs` (remove from `customCss`), `src/components/AvailableModels.astro` and any other consumer.

**Steps**:
1. Identify which components actually use `flag-icons` classes (`fi fi-de`, etc.): `grep -rn "fi fi-" src/`.
2. Remove `'flag-icons/css/flag-icons.min.css'` from `customCss` in `astro.config.mjs`.
3. In each consumer component, add a scoped `<style>` import:
   ```astro
   <style is:global>
     @import 'flag-icons/css/flag-icons.min.css';
   </style>
   ```
   (or a tighter variant if only a handful of flags are used — `flag-icons/css/flag-icon.min.css` + individual flag SVGs).
4. Verify homepage CSS bundle size after rebuild (expect 20–30% reduction).

**Acceptance**:
- `ls -lh dist/_astro/*.css` shows main CSS reduced by ≥ 20%.
- Flag icons still render on pages that use them (AvailableModels, etc.).

---

### [x] 2.4 Add `llms.txt`
**Goal**: Expected by AI crawlers — particularly relevant since this product *is* an LLM platform.

**Files**: `public/llms.txt` (new), optionally `public/llms-full.txt`.

**Steps**:
1. Follow llmstxt.org spec. `llms.txt`:
   ```
   # LLM Hub (T-Systems AI Foundation Services)

   > Sovereign, GDPR-compliant LLM inference API. OpenAI-compatible. Hosted in Germany and the EU.

   ## Docs

   - [Quickstart](https://docs.llmhub.t-systems.net/getting-started/quickstart)
   - [Authentication](https://docs.llmhub.t-systems.net/getting-started/authentication)
   - [Models](https://docs.llmhub.t-systems.net/getting-started/models)
   - [API Endpoints](https://docs.llmhub.t-systems.net/reference/api-endpoints)
   - [Rate Limits](https://docs.llmhub.t-systems.net/reference/rate-limits)
   - [Plans](https://docs.llmhub.t-systems.net/plans)
   ```
2. Optional: generate `llms-full.txt` (all content concatenated) via a build script.

**Acceptance**:
- `curl https://docs.llmhub.t-systems.net/llms.txt` → 200 with correct content.

---

### [ ] 2.5 Add ICP-split entry points on homepage
**Goal**: Route the three distinct personas (developer, enterprise buyer, existing customer) to their paths.

**Files**: `src/content/docs/index.mdx` (+ `de/` mirror), possibly a new `src/components/PersonaCards.astro`.

**Steps**:
1. Below the hero, add three prominent cards:
   - **"For developers"** → link to Quickstart. One line of value.
   - **"For enterprise buyers"** → link to new Enterprise Trust page (task 2.10). One line of value.
   - **"For existing customers"** → link to Reference + Changelog. One line of value.
2. Replace/supplement the current two-card row.

**Acceptance**:
- Homepage has a visible three-track choice above the fold.
- Click-through analytics (once instrumented) shows non-trivial traffic to each.

---

### [x] 2.6 Add `index.mdx` to Guides and Integrations
**Goal**: `/guides/` and `/integrations/` currently 404 (no landing page at the section root).

**Files**: `src/content/docs/guides/index.mdx` (new), `src/content/docs/integrations/index.mdx` (new), German mirrors, `astro.config.mjs`.

**Steps**:
1. Create overview pages summarizing the section and linking to children.
2. Update sidebar entries in `astro.config.mjs` to make the section clickable (replace `label` with a `link` to the index, or use `autogenerate` + custom index).

**Acceptance**:
- `curl -I https://docs.llmhub.t-systems.net/guides/` → 200.
- Clicking the section label in the sidebar goes to the overview, not nowhere.

---

### [x] 2.7 Expand Rate Limits table to all five tiers
**Goal**: Currently only Basic and Standard-4000 are in the inline table; intermediate tiers are only in the PDF.

**Files**: `src/content/docs/reference/rate-limits.mdx` (+ `de/` mirror), possibly `src/components/PlansPageFeatures/`.

**Steps**:
1. Source the full matrix from the PlansData component or Leistungsbeschreibung PDF.
2. Rebuild the table to show all 5 tiers (Basic, Standard 1000/2000/3000/4000) with per-tier RPM, TPM, concurrent requests.
3. Keep the PDF link as a supplementary resource.

**Acceptance**:
- A developer choosing between Standard-1000 and Standard-2000 can self-qualify without downloading anything.

---

### [ ] 2.8 Collapse Plans sub-pages into a comparison view
**Goal**: 5 near-identical plan pages add navigation weight without helping comparison.

**Files**: `src/content/docs/plans/index.mdx` (expand), remove or gut `plans/basic.mdx` + `plans/standard-*.mdx` (+ `de/` mirrors), `astro.config.mjs`.

**Steps**:
1. Enhance `PlansPage.astro` (or the existing Plans Overview) to be a single, comparable, side-by-side table across all tiers.
2. Reframe rows away from pure €/MTok: lead with use-case (Pilot, Production, Sovereign Enterprise), then compliance features (DPA included, audit logs, dedicated instance), then pricing.
3. Either delete the individual plan pages or keep them as thin deep-links from the comparison table (not in the sidebar).
4. Update redirects for any old plan URLs.

**Acceptance**:
- One page answers "which plan do I need?" with a side-by-side comparison.
- Buyer reads compliance value *before* reading rate numbers.

---

### [x] 2.9 Fix accessibility issues on homepage
**Goal**: Heading hierarchy, skip link target, footer landmark duplication, clipboard-copy feedback.

**Files**: `src/components/AvailableModels.astro`, `src/components/Footer.astro`, potentially a custom Head partial.

**Steps**:
1. In `AvailableModels.astro` line 111: change `<h4>` → `<h3>` so the H2 → H3 hierarchy holds.
2. Increase `INITIAL_COUNT` from 3 to 6 or 9 (matches V2) and add a count badge to the section heading: `Available Models (${total})`.
3. Add copy-feedback to the clipboard button (line 244): toggle the icon to a checkmark for 1.5s on success.
4. In `Footer.astro`: either drop `<Default>` and render a single combined footer, or add `aria-label="Site"` to `.site-footer` to distinguish the two landmarks.
5. Find the skip link (Starlight default) and confirm it targets `#starlight__main` or equivalent, not `#_top`. If Starlight's skip link is the issue, file it upstream or override.

**Acceptance**:
- axe DevTools shows 0 critical issues on homepage.
- Screen reader outline has no heading-level skips.
- Keyboard user hitting Tab+Enter on skip link lands inside main content, not at page top.

---

### [ ] 2.10 Create Enterprise Trust page
**Goal**: The moat (sovereign infra, BSI, DPA) must be visible without downloading a PDF.

**Files**: `src/content/docs/enterprise/trust.mdx` (new — new top-level section), German mirror, `astro.config.mjs`.

**Steps**:
1. Draft a single page covering:
   - Data residency guarantees (Germany-only T-Cloud vs EU-only hyperscaler tiers).
   - Contractual: DPA template, GDPR role (processor vs controller), AV-Verträge.
   - Certifications: ISO 27001, BSI C5, SOC 2 (whichever are held — confirm with compliance team).
   - Infrastructure: Open Telekom Cloud / hyperscaler breakdown per model.
   - Link to full Leistungsbeschreibung PDF for procurement.
2. Add a new top-level sidebar entry "Enterprise" above Plans, or insert under Reference — decide with product team.
3. Cross-link from homepage (task 2.5 card #2) and from Plans.

**Acceptance**:
- A CISO can answer "can I take this to my DPO?" from the page alone.
- Link from homepage to this page renders prominently.

---

### [x] 2.11 Fix German FAQ rate-limits link
**Goal**: Small but visible broken internal link in the bilingual surface.

**Files**: `src/content/docs/de/faq.mdx`.

**Steps**:
1. Change `/reference/rate-limits` → `/de/reference/rate-limits` in the Rate Limits question.
2. Lint-check: grep the `de/` tree for any other bare English-locale links.

**Acceptance**:
- All internal links in `src/content/docs/de/**` that point to doc pages start with `/de/`.

---

### [ ] 2.12 Terminology consolidation pass
**Goal**: "AIFS", "AI Foundation Services", "LLM Hub", "LLM Serving" are used interchangeably. Pick one.

**Files**: docs-wide + `astro.config.mjs` `title`.

**Steps**:
1. Product decision: primary name (recommend "AI Foundation Services") + short form ("LLM Hub"). Document in CLAUDE.md or a short CONTRIBUTING.md.
2. Global pass: `grep -rn "AIFS\|LLM Serving\|AIFoundation\|AlFoundation"` — normalize.
3. On first use per page, introduce as `AI Foundation Services (LLM Hub)` then use short form.

**Acceptance**:
- Zero orphaned "AIFS" or typo "AlFoundation" references.
- Consistent naming across nav, titles, body copy.

---

### [x] V4 Translate AvailableModels component labels on /de/
**Goal**: On the DE homepage, model cards render with English labels: `Cloud:`, `Server Location:`, `Data Processing:`, `Show More (29 more)`. Only the section H2 is translated.

**Files**: `src/components/AvailableModels.astro`, `src/shared/locales/de.json` (+ `en.json`).

**Steps**:
1. Extract hardcoded labels to `src/shared/locales/{en,de}.json` (this file already exists per CLAUDE.md — use it).
2. Detect locale from `Astro.currentLocale` or the URL and pick the right label map.
3. Translate: "Cloud" → "Cloud" (keep), "Server Location" → "Serverstandort", "Data Processing" → "Datenverarbeitung", "Show More (N more)" → "N weitere anzeigen".

**Acceptance**:
- DE homepage model cards show all labels in German.
- EN homepage unchanged.

---

### [ ] V5 Fix theme toggle label truncated on /de/
**Goal**: Theme selector shows "Auto" on EN, "Syst..." (truncated "System") on DE. Truncated label is worse than the English default.

**Files**: Starlight built-in i18n for theme selector + a CSS width fix in `custom.css`.

**Steps**:
1. Inspect the theme selector element — check if truncation is due to `max-width` or flex shrinking.
2. Expand the width of the theme select in `custom.css` (target `starlight-theme-select select` or equivalent).
3. If the DE translation is "System" (follow system theme), that's correct — just needs space. If it should be "Automatisch", update the translation.

**Acceptance**:
- Both locales show the full label without truncation at 1440px and 1024px widths.

---

### [x] V7 Fix "Burst RPM" column on Plans page
**Goal**: The Rate Plans table has a column labeled `RPM / BurstRPM` with headers stacked awkwardly. "Burst RPM" is never defined on the page.

**Files**: `src/content/docs/plans/index.mdx` or `src/components/PlansPage.astro` / `src/components/PlansPageFeatures/`.

**Steps**:
1. Split into two clearly-labeled columns: "Sustained RPM" and "Burst RPM".
2. Add a short footnote or tooltip: *"Burst RPM = max requests within a 10-second window; sustained RPM is the per-minute steady-state limit."* (Confirm exact definition with platform team.)
3. Widen the column to avoid the stacked header.

**Acceptance**:
- Column header readable in a single line at 1280px viewport.
- A developer can answer "what's the difference between 15 RPM and 20 burst?" from the page.

---

### [ ] V8 Differentiate link pills vs metadata badges on Plans
**Goal**: In the Rate Plans table, plan names (Basic, Standard 1000, etc.) and cloud values (T-Cloud, Azure, GCP) both render as magenta pills. Pills look clickable but aren't links — visual hierarchy is lost.

**Files**: `src/components/PlansPage.astro` (and/or `src/components/PlansPageFeatures/`).

**Steps**:
1. Pick one style for interactive pills (links), another for metadata badges.
2. Convention: link pills → magenta with underline-on-hover; metadata badges → neutral gray or muted outline.
3. Update the cloud column to use a neutral badge style (tag-like, not button-like).

**Acceptance**:
- User can distinguish "clickable" from "informational" at a glance.
- Plan names remain visually prominent (they're the row header).

---

## Phase 3 — P2 (backlog)

Prioritize based on team capacity. Roughly listed by impact × effort ratio.

### [ ] 3.1 Changelog + RSS feed
- Add `src/content/docs/changelog.mdx` (or a content collection `src/content/changelog/`).
- Wire up `@astrojs/rss` → `/rss.xml`.
- Link from footer.

### [ ] 3.2 "Switch from OpenAI" migration guide
- Promote the existing claim to a dedicated page.
- Headline: *"Already on OpenAI? You're 90% done."*
- Side-by-side code diff (OpenAI → LLM Hub).
- Compliance closing argument at the bottom.

### [ ] 3.3 Internal-champion one-pager
- Downloadable PDF or dedicated web page: *"Share with your team."*
- 3 reasons to pick LLM Hub over Azure OpenAI.
- 1-row compliance comparison table.
- Quickstart link + contact.

### [ ] 3.4 JSON-LD structured data
- `WebSite` + `Organization` on homepage.
- `TechArticle` + `BreadcrumbList` on docs pages (via Starlight Head override).
- `FAQPage` on `/faq`.

### [ ] 3.5 Handle or drop `v1/` archive
- Either add a version banner + changelog explaining what v1 represents, or remove until there's a real breaking change to archive.
- Current state (byte-for-byte copy of `main`) is worse than nothing.

### [ ] 3.6 Complete LangChain + LlamaIndex RAG examples
- Current pages stop at init.
- Add 20–30 line full pipeline: split → embed → vector store → retrieve → generate.
- Test end-to-end against real API.

### [ ] 3.7 Bilingual parity audit + build-time lint
- Sample 12 random DE pages.
- Confirm real translation vs machine-stale.
- Set up a lint hook: fail build if a doc exists in en but not in de (or vice versa).

### [ ] 3.8 Collapse "Links" sidebar section
- Move Playground link into Getting Started.
- Move Model Status link into Reference (or new Service Levels page).
- Keep SmartChat link if SmartChat stays as a first-class section.

### [ ] 3.9 Group Guides sidebar (two-level)
- "Core API": Chat, Streaming, Embeddings, Function Calling.
- "Advanced": Fine-Tuning, Async, Visual RAG, Reasoning, Multimodal, Audio, Image Generation.

### [ ] 3.10 Search UX polish
- Custom Pagefind wrapper with "No results — try X or browse Y" empty state.
- Consider surfacing section context in results.

### [ ] 3.11 Video + CDN performance
- Confirm `public/img/create-tsi.mp4` (15.9 MB) has `preload="none"` wherever embedded, or move to YouTube/Vimeo embed.
- Evaluate Cloudflare in front of GitHub Pages for HTML gzip + longer cache TTLs.

### [ ] 3.12 Troubleshooting section
- Rename or expand Reference → Error Codes into "Errors & Troubleshooting."
- Common 401/403/429/5xx patterns with remediation steps, not just a glossary.

### [ ] 3.13 Inbound-link consolidation
- Work with marketing team: `t-systems.com/ai-foundation-services` should link to `docs.llmhub.t-systems.net`.
- Add docs link to the GitHub repo README.

### [ ] 3.14 Breadcrumbs
- Enable Starlight breadcrumbs (if supported) or ship a small custom component.

### [ ] V9 Fix Plans page prev/next nav chain
- Plans Overview's prev/next footer points to "Global Chat" (SmartChat) → "Plans" → "Basic". Sequence doesn't reflect a coherent user journey.
- Reconsider sidebar order: Plans probably belongs before SmartChat (pricing is pre-sales; SmartChat is a specific product).
- Alternative: use frontmatter `prev`/`next` overrides to break the chain at natural section boundaries.
- Tie to task 2.8 (collapsing Plans sub-pages) — fix navigation at the same time.

### [ ] V10 Dead footer links — see 1.11
Duplicate of Phase 1 task 1.11. Listed here to reflect the visual-review evidence; resolving 1.11 resolves this.

### [ ] V11 Heading hierarchy inversion (TOC before H1)
- Every page's first DOM heading is `<h2>On this page</h2>` (right-rail TOC), before the main `<h1>`.
- Standard Starlight behavior. May be fine for screen readers that navigate by landmarks.
- Option: override the TOC component to use `<div role="complementary" aria-label="On this page">` with the label as a non-heading element.
- Run a screen reader test (VoiceOver or NVDA) before deciding.

### [ ] V12 Verify `<html lang>` attribute on all DE pages
- Needs full-site verification: every `/de/*` page should have `<html lang="de">`, every EN page `<html lang="en">`.
- If any DE page is rendering `lang="en"`, audit Starlight's `locales` config in `astro.config.mjs`.

---

## Sequencing recommendation

1. **Day 1** (quick wins, all <1 hour): 1.1, 1.2, 1.4, 1.11, V6. Five small PRs that collectively unblock SEO, fix the most visible bugs, and remove the compliance-risk dead links.
2. **Day 2**: V1 (dark mode), V2 (mobile grid). Two visual bugs with contained blast radius.
3. **Day 3–4**: 1.5, 1.6, 1.7 (content correctness blocks in Quickstart, Fine-tuning, SmartChat).
4. **Day 5**: 1.3, 1.8, 1.9 (redirects + new canonical pages).
5. **Day 6–7**: 1.10 (hero rewrite — needs product/marketing alignment), V3 (DE sidebar translation).
6. **Sprint 2**: Phase 2 — order 2.1 → 2.4 → 2.10 → 2.5 → 2.9 first (SEO + trust + persona routing + a11y compound fastest). Interleave V4, V5, V7, V8 with adjacent tasks (V4 with 2.12, V7/V8 with 2.8).
7. **Ongoing**: Phase 3 as capacity allows. V9–V12 are true backlog unless screen-reader testing escalates V11.

---

## Done criteria for this plan

- All P0 tasks (1.1–1.11, V1, V2, V3, V6) shipped and deployed.
- Google Search Console shows legacy 404s cleared within 30 days of 1.1 + 1.3.
- PageSpeed Insights homepage: Performance ≥ 90, LCP < 2.5s.
- Lighthouse a11y ≥ 95 on homepage and a representative guide.
- Enterprise buyer persona test: give a CISO-profile tester 5 minutes with the site and have them answer "can we buy this?" without opening the Leistungsbeschreibung PDF.
- Developer persona test: someone unfamiliar with the product goes from homepage to first successful API call in under 5 minutes without asking for help.
- DE persona test: a German-speaking visitor can navigate sidebar → Plans → Quickstart entirely in German.

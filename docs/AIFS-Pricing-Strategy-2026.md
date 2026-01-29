# AIFS Model Catalog & Pricing Strategy 2026

## Executive Summary

This document proposes an updated model catalog and competitive pricing strategy for T-Systems AI Foundation Services (AIFS). The strategy is designed to:

1. **Match hyperscaler pricing** on commercial models (OpenAI, Anthropic, Google, Mistral)
2. **Beat IONOS and STACKIT** on open-source/OTC-hosted models
3. **Introduce new high-demand models** (GPT-5.2, Claude Opus 4.5, GLM-4.7, Devstral 2)
4. **Create tiered rate plans** that incentivize minimum consumption commitments to finance GPU fleet operations

---

## 1. Competitive Landscape

### EU-Sovereign LLM Providers

| Provider | Region | Commercial Models | Open-Source Models | Differentiator |
|----------|--------|:-:|:-:|----------------|
| **T-Systems AIFS** | DE (OTC, Azure, GCP, AWS) | Yes | Yes | Full spectrum, GDPR, Telekom brand |
| **IONOS AI Model Hub** | DE | No | ~5 models | Cheapest GPT-OSS 120B |
| **STACKIT (Schwarz)** | DE/AT | No | ~8 models | Simple flat-rate pricing |
| **Azure OpenAI (EU)** | SE, FR | OpenAI only | No | Direct Microsoft relationship |
| **Google Vertex AI** | EU | Google only | No | Gemini ecosystem |

### Current AIFS Weaknesses

| Issue | Impact |
|-------|--------|
| OTC models 5-8x more expensive than IONOS | Losing open-source customers |
| Gemini 2.5 Flash at 820% markup | Budget tier non-competitive |
| Claude 4.5 Sonnet at 140% markup | Mid-tier overpriced vs direct |
| Missing GPT-5.2, Claude Opus 4.5, GLM-4.7 | Losing flagship customers |
| No sovereign coding package | Missing developer market |
| Flat OTC pricing regardless of model size | Small models absurdly expensive |

---

## 2. Market Pricing Reference (USD per 1M tokens)

### Hyperscaler / Direct API Pricing

| Model | Provider | Input | Output | Context | Released |
|-------|----------|------:|-------:|--------:|----------|
| **GPT-5.2** | OpenAI | $1.75 | $14.00 | 400K | Dec 2025 |
| **GPT-5.2 Pro** | OpenAI | $21.00 | $168.00 | 400K | Dec 2025 |
| **GPT-5** | OpenAI | $1.25 | $10.00 | 128K | Jun 2025 |
| **GPT-5 Mini** | OpenAI | $0.25 | $2.00 | 128K | Jun 2025 |
| **GPT-5 Nano** | OpenAI | $0.05 | $0.40 | 128K | Jun 2025 |
| **GPT-5 Codex** | OpenAI | $1.35 | $10.70 | 128K | Jul 2025 |
| **GPT-4.1** | OpenAI | $2.00 | $8.00 | 128K | Apr 2025 |
| **GPT-4.1 Mini** | OpenAI | $0.40 | $1.60 | 128K | Apr 2025 |
| **GPT-4.1 Nano** | OpenAI | $0.10 | $0.40 | 128K | Apr 2025 |
| **o3** | OpenAI | $2.00 | $8.00 | 200K | Jan 2025 |
| **o4-mini** | OpenAI | $1.10 | $4.40 | 200K | Apr 2025 |
| **Claude Opus 4.5** | Anthropic | $5.00 | $25.00 | 200K | Jan 2026 |
| **Claude Sonnet 4.5** | Anthropic | $3.00 | $15.00 | 200K | Dec 2025 |
| **Claude Sonnet 4** | Anthropic | $3.00 | $15.00 | 200K | May 2025 |
| **Claude Haiku 4.5** | Anthropic | $1.00 | $5.00 | 200K | Dec 2025 |
| **Gemini 3 Pro** | Google | $2.00 | $12.00 | 1M | Nov 2025 |
| **Gemini 2.5 Pro** | Google | $1.25 | $10.00 | 1M | Mar 2025 |
| **Gemini 2.5 Flash** | Google | $0.30 | $2.50 | 1M | Mar 2025 |
| **Mistral Large 3** | Mistral | $0.50 | $1.50 | 128K | Dec 2025 |
| **Mistral Medium 3** | Mistral | $0.40 | $2.00 | 128K | Sep 2025 |
| **Mistral Small 3.2** | Mistral | $0.20 | $0.60 | 128K | Aug 2025 |
| **Devstral 2 (123B)** | Mistral | $0.40 | $2.00 | 256K | Dec 2025 |
| **Devstral Small 2 (24B)** | Mistral | $0.10 | $0.30 | 256K | Dec 2025 |
| **GLM-4.7 (358B)** | Zhipu AI | $0.63 | $2.31 | 200K | Dec 2025 |
| **GLM-4.7 Flash (30B)** | Zhipu AI | $0.07 | $0.40 | 200K | Jan 2026 |

### IONOS AI Model Hub (EUR)

| Model | Input | Output |
|-------|------:|-------:|
| **GPT-OSS 120B** | €0.15 | €0.65 |
| **Llama 3.3 70B** | €0.65 | €0.65 |
| **Llama 3.1 405B** | €1.75 | €1.75 |
| **BGE-M3 (embedding)** | €0.02 | — |

### STACKIT AI Model Serving (EUR)

| Model | Input | Output |
|-------|------:|-------:|
| **Most models** | €0.45 | €0.65 |
| **Llama 3.1** | lower | lower |
| **e5-mistral-7b (embedding)** | €0.02 | — |

---

## 3. Proposed AIFS Model Catalog (36 Models)

### Tier 1 — Flagship (Enterprise)

| # | Model | Provider | Region | Input | Output | Context | Why |
|---|-------|----------|--------|------:|-------:|--------:|-----|
| 1 | **GPT-5.2** | OpenAI | Azure-SE | $1.75 | $14.00 | 400K | Latest OpenAI flagship |
| 2 | **Claude Opus 4.5** | Anthropic | AWS-EU | $5.00 | $25.00 | 200K | Most capable Claude |
| 3 | **Gemini 3 Pro** | Google | GCP-EU | $2.00 | $12.00 | 1M | Latest Google flagship |
| 4 | **o3** | OpenAI | Azure-SE | $2.00 | $8.00 | 200K | Advanced reasoning |

> **Pricing strategy:** Match hyperscaler 1:1. Value proposition is EU sovereignty + single API, not price.

### Tier 2 — High Performance (Professional)

| # | Model | Provider | Region | Input | Output | Context | Why |
|---|-------|----------|--------|------:|-------:|--------:|-----|
| 5 | **GPT-5** | OpenAI | Azure-SE | $1.25 | $10.00 | 128K | Proven flagship |
| 6 | **Claude Sonnet 4.5** | Anthropic | AWS-EU | $3.00 | $15.00 | 200K | Best balanced Claude |
| 7 | **Claude Sonnet 4** | Anthropic | AWS-EU | $3.00 | $15.00 | 200K | Stable workhorse |
| 8 | **GPT-4.1** | OpenAI | Azure-FR | $2.00 | $8.00 | 128K | Enterprise standard |
| 9 | **Gemini 2.5 Pro** | Google | GCP-EU | $1.25 | $10.00 | 1M | Long-context leader |
| 10 | **o4-mini** | OpenAI | Azure-SE | $1.10 | $4.40 | 200K | Efficient reasoning |
| 11 | **GLM-4.7** | Zhipu (OTC) | OTC-DE | $0.60 | $2.20 | 200K | Sovereign alternative |

> **Pricing strategy:** Match hyperscaler 1:1 for commercial. GLM-4.7 at near-direct pricing for sovereign option.

### Tier 3 — Cost-Effective (Growth)

| # | Model | Provider | Region | Input | Output | Context | Why |
|---|-------|----------|--------|------:|-------:|--------:|-----|
| 12 | **GPT-5 Mini** | OpenAI | Azure-SE | $0.25 | $2.00 | 128K | Budget GPT-5 |
| 13 | **GPT-5 Codex** | OpenAI | Azure-SE | $1.35 | $10.70 | 128K | Code-specialized |
| 14 | **Claude Haiku 4.5** | Anthropic | AWS-EU | $1.00 | $5.00 | 200K | Fast + cheap Claude |
| 15 | **Gemini 2.5 Flash** | Google | GCP-EU | $0.30 | $2.50 | 1M | Budget multimodal |
| 16 | **Mistral Large 3** | Mistral | GCP-EU | $0.50 | $1.50 | 128K | Best Mistral value |
| 17 | **Mistral Medium 3** | Mistral | GCP-EU | $0.40 | $2.00 | 128K | Balanced Mistral |
| 18 | **GPT-4.1 Mini** | OpenAI | Azure-FR | $0.40 | $1.60 | 128K | Budget GPT-4.1 |

> **Pricing strategy:** Match hyperscaler 1:1. Mistral priced at direct Mistral API rates.

### Tier 4 — Budget / High-Volume

| # | Model | Provider | Region | Input | Output | Context | Why |
|---|-------|----------|--------|------:|-------:|--------:|-----|
| 19 | **GPT-5 Nano** | OpenAI | Azure-SE | $0.05 | $0.40 | 128K | Ultra-cheap |
| 20 | **GPT-4.1 Nano** | OpenAI | Azure-FR | $0.10 | $0.40 | 128K | Cheapest GPT |
| 21 | **Mistral Small 3.2** | Mistral | GCP-EU | $0.20 | $0.60 | 128K | Cheapest Mistral |
| 22 | **GLM-4.7 Flash** | Zhipu (OTC) | OTC-DE | $0.07 | $0.38 | 200K | Ultra-cheap sovereign |

> **Pricing strategy:** Match or beat direct. GLM-4.7 Flash as cheapest sovereign LLM in EU market.

### Tier 5 — Open-Source (OTC Germany) — Beat IONOS & STACKIT

| # | Model | Size | Input | Output | vs IONOS | vs STACKIT |
|---|-------|-----:|------:|-------:|----------|------------|
| 23 | **GPT-OSS 120B** | 120B | **€0.13** | **€0.60** | 13% cheaper | 38% cheaper |
| 24 | **Llama 3.3 70B** | 70B | **€0.55** | **€0.55** | 15% cheaper | ~equal |
| 25 | **Qwen 3 Next 80B** | 80B | **€0.65** | **€0.65** | N/A (unique) | N/A |
| 26 | **Qwen 3 30B** | 30B | **€0.35** | **€0.35** | N/A (unique) | 46% cheaper |
| 27 | **Qwen 3 VL 30B** | 30B | **€0.40** | **€0.40** | N/A (unique) | 38% cheaper |
| 28 | **Teuken 7B** | 7B | **€0.10** | **€0.10** | 33% cheaper | 78% cheaper |

> **Pricing strategy:** Size-based pricing. Beat IONOS on every comparable model. Differentiate with unique models (Qwen 3 family, Teuken).

### Sovereign Open-Source Coding Package

| # | Model | Size | Input | Output | SWE-bench | Why |
|---|-------|-----:|------:|-------:|----------:|-----|
| 29 | **Devstral 2** | 123B | **€0.35** | **€1.80** | 72.2% | SOTA open-source code agent |
| 30 | **Devstral Small 2** | 24B | **€0.09** | **€0.27** | 68.0% | Runs on single GPU |
| 31 | **Qwen 2.5 Coder 32B** | 32B | **€0.35** | **€0.35** | — | Code completion |
| 32 | **GLM-4.7 Flash** | 30B | **€0.07** | **€0.38** | 73.8% | Best coding MoE |

> **Pricing strategy:** Package as "AIFS Sovereign Code" bundle. All models 100% EU-hosted, open-weight, GDPR-compliant. Beat Mistral direct pricing by 10%. No competitor (IONOS/STACKIT) offers this.

### Tier 6 — Embedding Models

| # | Model | Region | Input | Output | Notes |
|---|-------|--------|------:|-------:|-------|
| 33 | **Embedding Ada 002** | Azure-FR | $0.10 | $0.10 | OpenAI standard |
| 34 | **Jina Embeddings v2 Code** | OTC-DE | **€0.02** | — | Match IONOS BGE-M3 |
| 35 | **Jina Embeddings v2 De** | OTC-DE | **€0.02** | — | German-optimized |
| 36 | **Embedding BGE-M3** | OTC-DE | **€0.02** | — | Match IONOS |
| 37 | **TSI Col Qwen 2 2b** | OTC-DE | **FREE** | — | Differentiator |

> **Pricing strategy:** Match IONOS at €0.02. Promote free TSI embedding as competitive advantage.

### Tier 7 — Specialized

| # | Model | Type | Input | Output |
|---|-------|------|------:|-------:|
| 38 | **GPT Image 1** | Image Gen | $12.72 | $50.85 |
| 39 | **Whisper Large v3** | Audio | $36.00 | $36.00 |
| 40 | **Whisper Large v3 Turbo** | Audio | $23.00 | $23.00 |

---

## 4. Models Retired (Remove from Catalog)

| Model | Reason | Replacement |
|-------|--------|-------------|
| GPT-4o | Superseded | GPT-5 |
| GPT-4o Mini | Superseded | GPT-5 Mini |
| o1 | Superseded, overpriced ($19.48/$77.92) | o3 |
| o1 Mini | Superseded | o4-mini |
| o3 Mini | Overlaps with o4-mini | o4-mini |
| Claude 3.7 Sonnet | Superseded | Claude Sonnet 4 |
| Mistral Large 2411 | Superseded | Mistral Large 3 |
| Mistral Small 24B 2501 | Superseded | Mistral Small 3.2 |
| Llama Bildungs LLM 0.9 | Niche, low demand | Remove |

---

## 5. Rate Plan Tiering Strategy

### Goal: Drive Minimum Commitments to Finance GPU Fleet

The current rate plan structure (Basic, Standard 1000-4000) needs restructuring to:
1. Make the free/Basic tier attractive enough to onboard customers
2. Create clear value jumps that incentivize upgrades
3. Ensure Standard tiers generate predictable revenue for GPU fleet financing

### Proposed Rate Plan Structure

| Plan | Min. Monthly Commitment | Target Customer | OTC Discount | Commercial Discount | TPM Limit | RPM Limit |
|------|------------------------:|-----------------|:------------:|:-------------------:|----------:|----------:|
| **Explorer** | €0 (pay-as-you-go) | Evaluation | 0% | 0% | 100K | 60 |
| **Starter** | €250/mo | Startups, PoCs | 10% | 0% | 500K | 300 |
| **Professional** | €1,000/mo | SMBs, dev teams | 20% | 5% | 2M | 1,000 |
| **Business** | €3,000/mo | Enterprise teams | 30% | 10% | 5M | 3,000 |
| **Enterprise** | €10,000/mo | Large enterprise | 40% | 15% | 20M | 10,000 |
| **Sovereign** | €25,000/mo | Public sector, regulated | 50% | 15% | 50M | 30,000 |

### Key Design Principles

**1. Explorer (Free tier) — Onboarding funnel**
- All models available but rate-limited (100K TPM, 60 RPM)
- No commitment, pay-as-you-go at list price
- Goal: Get developers trying the platform, convert to Starter within 30 days

**2. Starter (€250) — First commitment**
- 5x the rate limits of Explorer
- 10% OTC discount kicks in (makes open-source models noticeably cheaper)
- €250 is low enough for a team lead to approve without procurement
- Goal: Lock in small teams, establish usage patterns

**3. Professional (€1,000) — Growth driver**
- This is where GPT-OSS 120B, Llama, Qwen become very competitive:

| Model | Explorer Price | Professional Price | IONOS Price |
|-------|-------------:|------------------:|------------:|
| GPT-OSS 120B | €0.13 / €0.60 | **€0.10 / €0.48** | €0.15 / €0.65 |
| Llama 3.3 70B | €0.55 / €0.55 | **€0.44 / €0.44** | €0.65 / €0.65 |
| Devstral 2 | €0.35 / €1.80 | **€0.28 / €1.44** | N/A |

- 5% commercial discount sweetens GPT-5.2, Claude Opus deals
- Goal: Primary revenue tier, most customers land here

**4. Business (€3,000) — Enterprise entry**
- 30% OTC discount makes open-source models dramatically cheap:

| Model | Explorer Price | Business Price | IONOS Price |
|-------|-------------:|------------------:|------------:|
| GPT-OSS 120B | €0.13 / €0.60 | **€0.09 / €0.42** | €0.15 / €0.65 |
| Llama 3.3 70B | €0.55 / €0.55 | **€0.39 / €0.39** | €0.65 / €0.65 |
| GLM-4.7 Flash | €0.07 / €0.38 | **€0.05 / €0.27** | N/A |

- 10% commercial discount: Claude Opus 4.5 drops to $4.50/$22.50
- Goal: Enterprise teams running production workloads

**5. Enterprise (€10,000) — Volume commitment**
- 40% OTC discount: Open-source models at near-cost
- 15% commercial discount: GPT-5.2 at $1.49/$11.90
- 20M TPM enables serious production throughput
- Goal: Large-scale production deployments

**6. Sovereign (€25,000) — Public sector / regulated**
- Maximum discounts on everything
- 50M TPM for high-throughput government/healthcare applications
- Dedicated support, SLA guarantees
- Goal: Public sector contracts, maximum commitment

### Revenue Model for GPU Fleet Financing

**Assumptions:**
- 100 GPU cluster (H100) costs ~€300K/month
- Average utilization target: 70%
- Break-even requires ~€430K/month gross revenue

**Target customer mix:**

| Plan | Target # Customers | Monthly Revenue Each | Total Revenue |
|------|-------------------:|--------------------:|--------------:|
| Explorer | 500 | €50 avg (pay-as-you-go) | €25,000 |
| Starter | 200 | €400 avg (€250 min + overage) | €80,000 |
| Professional | 100 | €1,800 avg | €180,000 |
| Business | 30 | €5,000 avg | €150,000 |
| Enterprise | 8 | €18,000 avg | €144,000 |
| Sovereign | 3 | €35,000 avg | €105,000 |
| **Total** | **841** | | **€684,000** |

**Key insight:** The OTC discount tiers are designed so that:
- Explorer/Starter customers pay enough to cover marginal compute cost
- Professional+ customers' minimum commitments provide predictable base revenue
- The €250 Starter minimum alone from 200 customers = €50K guaranteed monthly
- The €1,000+ Professional minimums from 100 customers = €100K guaranteed monthly
- **Total guaranteed minimums: ~€350K/month** covers 80% of GPU fleet costs

### TPM/RPM Allocation Strategy

**OTC-Hosted Models (GPU fleet):**

| Plan | Input TPM | Output TPM | RPM | Concurrent Requests |
|------|----------:|-----------:|----:|--------------------:|
| Explorer | 100K | 100K | 60 | 5 |
| Starter | 500K | 500K | 300 | 20 |
| Professional | 2M | 2M | 1,000 | 50 |
| Business | 5M | 5M | 3,000 | 100 |
| Enterprise | 20M | 20M | 10,000 | 300 |
| Sovereign | 50M | 50M | 30,000 | 500 |

**Commercial Models (Azure/GCP/AWS pass-through):**

| Plan | Input TPM | Output TPM | RPM |
|------|----------:|-----------:|----:|
| Explorer | 200K | 200K | 100 |
| Starter | 1M | 1M | 500 |
| Professional | 5M | 5M | 2,000 |
| Business | 10M | 10M | 5,000 |
| Enterprise | 30M | 30M | 15,000 |
| Sovereign | 50M | 50M | 30,000 |

> Commercial models have higher TPM because they use hyperscaler capacity, not our GPUs. This incentivizes customers to also use commercial models alongside OTC models.

---

## 6. Competitive Positioning Summary

### Price Position Map (Output $/1M tokens)

```
$0.10 ─ Teuken 7B ───────────── Cheapest EU-sovereign LLM
$0.27 ─ Devstral Small 2 ────── Cheapest EU code model
$0.35 ─ Qwen 3 30B
$0.38 ─ GLM-4.7 Flash ────────── Cheapest 200K-context sovereign
$0.40 ─ GPT-5 Nano, GPT-4.1 Nano
$0.55 ─ Llama 3.3 70B ────────── 15% cheaper than IONOS
$0.60 ─ GPT-OSS 120B, Mistral Small ── GPT-OSS 13% cheaper than IONOS
$1.50 ─ Mistral Large 3
$1.80 ─ Devstral 2 ───────────── SOTA open-source code agent
$2.00 ─ GPT-5 Mini, Mistral Med 3
$2.20 ─ GLM-4.7
$2.50 ─ Gemini 2.5 Flash
$4.40 ─ o4-mini
$5.00 ─ Claude Haiku 4.5
$8.00 ─ GPT-4.1, o3
$10.00─ GPT-5, Gemini 2.5 Pro
$12.00─ Gemini 3 Pro
$14.00─ GPT-5.2
$15.00─ Claude Sonnet 4/4.5
$25.00─ Claude Opus 4.5
```

### Unique Competitive Advantages

| Advantage | IONOS | STACKIT | Azure EU | **AIFS** |
|-----------|:-----:|:-------:|:--------:|:--------:|
| Commercial models (GPT, Claude, Gemini) | No | No | Partial | **Yes** |
| Open-source on sovereign cloud | Yes | Yes | No | **Yes** |
| Cheapest GPT-OSS 120B | Current leader | No | No | **New leader** |
| GLM-4.7 (Chinese sovereign AI) | No | No | No | **Unique** |
| Sovereign coding package | No | No | No | **Unique** |
| Free embedding model | No | No | No | **Unique** |
| Single API for all providers | No | No | No | **Unique** |
| Tiered pricing with volume discounts | No | No | Limited | **Yes** |

---

## 7. Implementation Priorities

### Phase 1 — Immediate (Week 1-2)
1. Reprice OTC models to beat IONOS (GPT-OSS 120B, Llama 3.3, Teuken)
2. Reprice Gemini 2.5 Flash from $1.38/$11.03 to $0.30/$2.50
3. Reprice Claude 4.5 Sonnet from $7.28/$27.38 to $3.00/$15.00
4. Reprice embeddings from €0.48 to €0.02

### Phase 2 — New Models (Week 3-6)
1. Add GPT-5.2 at Azure pricing ($1.75/$14.00)
2. Add Claude Opus 4.5 at Anthropic pricing ($5.00/$25.00)
3. Add Claude Haiku 4.5 ($1.00/$5.00)
4. Add Mistral Large 3 ($0.50/$1.50), update Mistral Small

### Phase 3 — Sovereign Differentiation (Week 6-10)
1. Deploy GLM-4.7 and GLM-4.7 Flash on OTC
2. Deploy Devstral 2 and Devstral Small 2 on OTC
3. Launch "AIFS Sovereign Code" package
4. Promote free TSI Col Qwen embedding

### Phase 4 — Rate Plan Restructuring (Week 8-12)
1. Implement new 6-tier rate plan structure
2. Migrate existing customers to closest matching tier
3. Launch Explorer (free) tier for developer acquisition
4. Introduce Sovereign tier for public sector

---

## Sources

- [Azure OpenAI Pricing](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/)
- [OpenAI API Pricing](https://platform.openai.com/docs/pricing)
- [GPT-5.2 Details](https://llm-stats.com/models/gpt-5.2-2025-12-11)
- [Anthropic Claude Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [Google Gemini Pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [Mistral AI Pricing](https://mistral.ai/pricing)
- [IONOS AI Model Hub](https://cloud.ionos.com/managed/ai-model-hub)
- [IONOS Price List (DE)](https://docs.ionos.com/cloud/support/general-information/price-list/ionos-cloud-se-de)
- [STACKIT AI Model Serving](https://www.stackit.de/en/product/stackit-ai-model-serving/)
- [STACKIT Pricing](https://www.stackit.de/en/pricing/cloud-services/paas/prices-stackit-ai-model-serving/)
- [GLM-4.7 Details](https://llm-stats.com/models/glm-4.7)
- [GLM-4.7 Flash](https://openrouter.ai/z-ai/glm-4.7-flash)
- [Devstral 2 Launch](https://mistral.ai/news/devstral-2-vibe-cli)
- [DeepSeek Pricing](https://api-docs.deepseek.com/quick_start/pricing)

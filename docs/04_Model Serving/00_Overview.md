---
sidebar_position: 1
id: model-serving-overview
title: Overview
---

# Model Serving

The Model Serving section provides comprehensive documentation for using the T-Systems LLM Serving API. Our API is fully compatible with OpenAI's API format, making it easy to integrate with existing applications and frameworks.

## What's Included

| Guide | Description |
|-------|-------------|
| [API Usage Guide](./openai) | Complete reference for chat completions, embeddings, audio, vision, and more |
| [Fine-Tuning API](./finetune) | Customize models with your own data using LoRA and other techniques |
| [LangChain Integration](./langchain) | Build RAG applications using LangChain framework |
| [Llama-Index Integration](./llama-index) | Build RAG applications using Llama-Index framework |
| [Visual RAG](./visualrag) | Beta feature for RAG with both text and image indexing |
| [Plans & Pricing](./Plans) | View available rate plans and model pricing |

## Model Capabilities Overview

### Large Language Models (LLMs)

| Model | Provider | Context | Strengths | Best For |
|-------|----------|---------|-----------|----------|
| **GPT-4.1** | OpenAI (Azure) | 128K | Reasoning, coding, instruction following | Complex tasks, coding assistance |
| **GPT-4.1-mini** | OpenAI (Azure) | 128K | Balance of capability and speed | General-purpose applications |
| **Claude Sonnet 4** | Anthropic | 200K | Nuanced writing, analysis, coding | Long-form content, detailed analysis |
| **Claude 3.7 Sonnet** | Anthropic | 200K | Strong reasoning, safety | Enterprise applications |
| **Gemini 2.5 Pro** | Google | 1M | Multimodal, long context | Document analysis, research |
| **Gemini 2.5 Flash** | Google | 1M | Fast responses, multimodal | High-throughput applications |
| **Llama 3.3 70B** | Meta (OTC) | 128K | Open-source, strong performance | Cost-effective inference |
| **DeepSeek-R1-Distill-Llama-70B** | DeepSeek (OTC) | 64K | Reasoning, math | Technical problem-solving |
| **Qwen 3 32B** | Alibaba (OTC) | 32K | Multilingual, coding | Asian language support |

### Reasoning Models

| Model | Provider | Description |
|-------|----------|-------------|
| **o3** | OpenAI | Advanced reasoning with chain-of-thought |
| **o3-mini** | OpenAI | Efficient reasoning model |
| **o4-mini** | OpenAI | Latest compact reasoning model |
| **o1-mini** | OpenAI | Specialized for STEM reasoning |

### Vision Models

| Model | Capabilities |
|-------|--------------|
| **Gemini 2.5 Flash/Pro** | Image understanding, document analysis |
| **Qwen2.5-VL-72B-Instruct** | Visual question answering, OCR |
| **GPT-4.1** | Image analysis, chart interpretation |

### Embedding Models

| Model | Dimensions | Languages | Use Case |
|-------|------------|-----------|----------|
| **text-embedding-bge-m3** | 1024 | Multilingual | General-purpose embeddings |
| **jina-embeddings-v2-base-de** | 768 | German, English | German language applications |
| **jina-embeddings-v2-base-code** | 768 | Code | Code search and similarity |

### Audio Models

| Model | Capabilities |
|-------|--------------|
| **whisper-large-v3** | Speech-to-text transcription, translation |
| **whisper-large-v3-turbo** | Faster transcription |

### Image Generation

| Model | Description |
|-------|-------------|
| **gpt-image-1** | High-quality image generation from text prompts |

## Quick Start

```bash
# Set environment variables
export API_KEY="your_api_key_here"
export API_BASE="https://llm-server.llmhub.t-systems.net/v2"
```

```python
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.getenv('API_KEY'),
    base_url=os.getenv('API_BASE'),
)

# List available models
for model in client.models.list():
    print(model.id)
```

## Deployment Regions

All models are hosted in GDPR-compliant regions:

| Cloud | Region | Models |
|-------|--------|--------|
| **Open Telekom Cloud (OTC)** | Germany | Open-source models (Llama, Mistral, Qwen, etc.) |
| **Azure** | Germany, France | OpenAI models (GPT-4.1, o3, etc.) |
| **Google Cloud** | EU | Gemini models |
| **AWS** | EU | Anthropic Claude models |

## See Also

- [Quickstart Guide](../Quickstart) - Get started in minutes
- [SmartChat RAG API](../SmartChat%20RAG%20API/eRAG%20API%20Reference) - Build RAG applications with managed infrastructure
- [Services and Pricing](../Services%20and%20Pricing) - Detailed pricing information and FAQ

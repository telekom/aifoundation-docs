---
sidebar_position: 2
---

import React from 'react';
import AvailableModels from '@site/src/components/AvailableModels';

 # Introduction

AI Foundation Services is a private, secure, and scalable model inference platform. Our mission is to provide you with tools to keep up with the latest AI innovations. Whether you're a startup integrating AI into your products or an enterprise with existing applications, we want to support you.

Explore our Key Offerings:
- [**LLM Hub Serving API:**](#llm-hub-serving-api) Access a variety of open-source and proprietary LLMs through an OpenAI-compatible API.
- [**Fine Tuning API:**](#fine-tuning-api) Customize LLMs with own data for optimal performance in your specific use case.
- [**T-Systems SmartChat:**](#t-systems-smartchat) Enhance your conversations with an intuitive UI that supports document uploads and RAG.
- [**SmartChat API:**](#t-systems-smartchat) Integrate powerful AI capabilities, includign RAG functionality, into your applications. 

Discover our tools to enhance your experience:
- [**LLM Playground:**](#llm-playground) Fine-tune and experiment with various models in a user-friendly environment.  
- [**API Key Portal:**](#api-key-portal) Easily manage your API keys and monitor usage and costs.
- [**Create-TSI:**](#create-tsi) Streamline the implementation of AI models with our comprehensive toolset.

---

## Key Offerings

### LLM Hub Serving API {#llm-hub-serving-api}

Our LLM Hub Serving API provides flexible solutions for your AI needs. Your data is hosted in Germany and the EU, fully compliant with GDPR regulations. Choose the setup that fits your requirements:

**Shared Instance:**
- **Standardized APIs:** Access the latest LLMs through OpenAI-compatible APIs.
- **Shared Resources:** Utlize shared resources for efficient model inference.
- **Cost-Effective Pricing:** Benefit from a pay-as-you-go pricing model.

**Private Instance:**
- **Exclusive Model Hosting:** Host private models on Open Telekom Cloud.
- **Dedicated Resources:** Ensure optimal performance with resources dedicated to your models.
- **Fine-Tuning Service:** Enhance your models with our optional fine-tuning service.
- **Monthly Fees:** Benefit from predictable fees for consistent budgeting.

**Cloud Options:**  
We offer deployment on multiple cloud platforms for optimal performance and flexibility:
- **Open Telekom Cloud:** Access open-source LLMs hosted securely in Germany or Switzerland.
- **MS Azure/AWS/GCP:** Connect to proprietary models from leading cloud providers.

#### Available LLM-APIs on AI Foundation Services

<AvailableModels />

---

### Fine Tuning API {#fine-tuning-api}

Our Fine-Tuning API allows to tailor models to your needs using own data. Achieve high customization and accuracy with minimal effort.

**Key Features:**
- **Advanced Fine-Tuning:** Use techniques like Low-Rank Adaptation (LoRA) or Direct Policy Optimization (DPO) with Reinforcement Learning from Human Feedback (RLHF).
- **Easy Data Upload:** Upload your training data to customize models.
- **Seamless Integration:** Integrate with existing systems using OpenAI API compatibility.
- **Flexible Deployment:** Deploy trained models on shared or private instances.

---

### T-Systems SmartChat & SmartChat API{#t-systems-smartchat}

Our T-Systems SmartChat UI is an overlay that integrates with the LLM Serving infrastructure and symplifies the use of AI models. Upload documents and use Retrieval-Augmented Generation (RAG) for accurate interactions.  

For advanced integrations, use the SmartChat API with full access to the RAG system. Build dynamic conversational interfaces for customer service or internal knowledge bases.

**Key Features:**
- **End-to-End Hosting:** Manage your company document base with comprehensive hosting.
- **RAG Access:** Use features like document upload and RAG via UI or API.
- **Customization and Evaluation:** Customize and evaluate over 50 retrieval settings.
- **24/7 Support:** Rely on round-the-clock support for smooth operation.
- **Monthly Fees:** Benefit from predictable fees for consistent budgeting.

[Magenta SmartChat](https://smartchat.llmhub.t-systems.net/)

<div style={{ width: '100%', margin: '0 auto' }}>
  <img src="/img/smart-chat.png" alt="Smartchat" style={{ width: '100%', height: 'auto', display: 'block' }} />
</div>

---

## Additional Tools to Enhance Your Experience

### LLM Playground {#llm-playground}

Experiment with various LLMs, embedding models, prompt templates, and documents. Use the LLM Playground to identify the best configurations for your specific use case.

[LLM Playground](https://playground.llmhub.t-systems.net/)

<div style={{ width: '100%', margin: '0 auto' }}>
  <img src="/img/playground.png" alt="Playground" style={{ width: '100%', height: 'auto', display: 'block' }} />
</div>

---
### API Key Portal {#api-key-portal}

Manage your LLM API keys and monitor token usage and occuring costs efficiently.

[LLM API Key Portal](https://apikey.llmhub.t-systems.net/)

<div style={{ width: '100%', margin: '0 auto' }}>
  <img src="/img/api-portal.png" alt="API Portal" style={{ width: '100%', height: 'auto', display: 'block' }} />
</div>

---

### Create-TSI {#create-tsi}

Generate AI applications with low code using our generative AI RAG toolkit and LlamaIndex. Build intelligent applications with advanced AI models and RAG techniques.

[Create TSI on GitHub](https://github.com/telekom/create-tsi)

<div style={{ width: '100%', margin: '0 auto' }}>
  <video style={{ width: '100%', height: 'auto', display: 'block' , marginBottom: '25px'}} controls>
    <source src="/img/create-tsi.mp4" type="video/mp4"> </source>
  </video>
</div>



---

## Get Started

<div style={{ display: 'flex', justifyContent: 'space-around', gap: '16px', marginTop: '20px' }}>
  <div style={{ flex: '1 1 30%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#E6EAF0', color: '#333', textAlign: 'center', height: '130px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s, boxShadow 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.01)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; }}>
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdBDhCijYUIUeyJVTLzCy0rm55XgD2nG5supwtGRHXVfaX-fw/viewform" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
      <h3>Trial API Key</h3>
      <p>Get started and explore our services.</p>
    </a>
  </div>

  <div style={{ flex: '1 1 30%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#D8E2F1', color: '#333', textAlign: 'center', height: '130px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s, boxShadow 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.01)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; }}>
    <a href="./Quickstart" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
      <h3>Quickstart</h3>
      <p>Follow our guides to quickly implement our services.</p>
    </a>
  </div>

  <div style={{ flex: '1 1 30%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#EFE7DD', color: '#333', textAlign: 'center', height: '130px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s, boxShadow 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.01)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; }}>
    <a href="./Model Serving/openai" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
      <h3>Advanced Start</h3>
      <p>Explore our API Reference for advanced usage.</p>
    </a>
  </div>
</div>
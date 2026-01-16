---
sidebar_position: 1
slug: /
title: Overview
---

import React, { useState } from 'react';
import AvailableModels from '@site/src/components/AvailableModels';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';

# Overview

Welcome to AI Foundation Services - your gateway to private, secure, and scalable model inference. Our platform integrates cloud services, tools, and APIs to support your AI implementation. With the T-Systems LLM API Key, you can access a variety of open-source and proprietary LLMs. Hosted in Germany and the EU, our platform ensures GDPR-compliant data security. Get started and integrate existing or build new AI applications.
 
**Request a Free Trial API key:** [Create a new account at our API Key page!](https://apikey.llmhub.t-systems.net/)

**OR: Purchase an Open-Source Model API key via Open Telekom Cloud Marketplace:** [OTC Marketplace](https://marketplace.otc.t-systems.com/)

### Key Features
 
- **Ease of use:** Simple, OpenAI-compatible APIs for querying and fine-tuning LLMs.
- **Diverse LLM Options:** Access to a variety of open-source and proprietary LLMs.
- **Secure Hosting:** GDPR-compliant hosting in Germany and the EU.
- **SmartChat/RAG:** Enhanced conversations with SmartChat and RAG solutions.
- **Fully managed:** Auto-scaling and pay-as-you-go features for smooth operation.
- **Self-developed Tools:** Access to tools like the LLM Playground and API key portal.
 
---


## Available LLM-APIs on AI Foundation Services

NOTE: The model list underneath is being currently redesigned, for an updated model list please refer to [the Serving Plans page](https://marketplace.otc.t-systems.com/](https://docs.llmhub.t-systems.net/Model%20Serving/Plans).

<AvailableModels />

---

## AI Foundations Services at a Glance

<div style={{ width: '100%', margin: '0 auto' }}>
  <img src="/img/AIFS-Overview.png" alt="AIFS-Overview" style={{ width: '100%', height: 'auto', display: 'block' }} />
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
    <a href="./Introduction" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
      <h3>Further Information</h3>
      <p>Discover the full range of features and services we offer.</p>
    </a>
  </div>

  <div style={{ flex: '1 1 30%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#EFE7DD', color: '#333', textAlign: 'center', height: '130px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s, boxShadow 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.01)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; }}>
    <a href="./Model Serving/openai" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
      <h3>Quickstart</h3>
      <p>Follow our guides to quickly implement our services.</p>
    </a>
  </div>
</div>


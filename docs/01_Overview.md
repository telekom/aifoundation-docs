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

Welcome to AI Foundation Services - your gateway to private, secure, and scalable model inference. Hosted in Germany and the EU, our platform ensures your data remains in safe hands, adhering strictly to GDPR guidelines. With our T-Systems LLM API Key, you unlock access to a diverse range of open-source and proprietary LLMs, all formatted with an OpenAI-compatible API. Get started effortlessly with zero-effort migration and integration of your existing AI applications.
 
**Request a Trial API key:** [Fill out our form](https://docs.google.com/forms/d/e/1FAIpQLSdBDhCijYUIUeyJVTLzCy0rm55XgD2nG5supwtGRHXVfaX-fw/viewform)


### Key Features
 
- **Ease of use:** We provide simple APIs for querying and fine-tuning LLMs, tailored to your specific needs.
- **Fully managed:** Enjoy features like auto-scaling and pay-as-you-go, keeping your models operational without manual intervention.
- **German/EU-Hosted Security:** Your data is in safe hands with our GDPR-compliant hosting in Germany and the EU.
- **Diverse LLM Options:** Access a wide range of open-source and proprietary LLMs with our T-Systems LLM API Key.
- **SmartChat/RAG:** Enhance your conversational AI with SmartChat and RAG solutions, enabling more accurate and context-aware interactions.
-  **Additional Tools:** Benefit from tools like the LLM Playground and API Key Portal, designed to streamline your development process and enhance your user experience.
 
---


## Available LLM-APIs on AI Foundation Services

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
      <p>Get started with a trial API key to explore our services.</p>
    </a>
  </div>

  <div style={{ flex: '1 1 30%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#D8E2F1', color: '#333', textAlign: 'center', height: '130px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s, boxShadow 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.01)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; }}>
    <a href="./Introduction" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
      <h3>Further Information</h3>
      <p>Discover the full range of features and services we offer.</p>
    </a>
  </div>

  <div style={{ flex: '1 1 30%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#EFE7DD', color: '#333', textAlign: 'center', height: '130px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s, boxShadow 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.01)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; }}>
    <a href="./Quickstart" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
      <h3>Quickstart</h3>
      <p>Follow our guides to quickly get up and running with our services.</p>
    </a>
  </div>
</div>


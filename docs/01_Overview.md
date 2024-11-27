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

## Available LLM-APIs on AI Foundation Services

**Request a Trial API key:** [Fill out our form](https://docs.google.com/forms/d/e/1FAIpQLSdBDhCijYUIUeyJVTLzCy0rm55XgD2nG5supwtGRHXVfaX-fw/viewform)

Our LLM model serving enables effortless querying of open-source LLM models like Llama3, Mistral, and other open-source models through a simple, OpenAI-compatible API.

<AvailableModels />

---

## Our Services

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>

  <div style={{ flex: '1 1 45%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#E6EAF0', color: '#333', textAlign: 'center', height: '200px', overflow: 'hidden' }}>
    <Link to="./introduction#magenta-smartchat" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
      <h3>Magenta SmartChat</h3>
      <p>Build conversational assistants using our LLM endpoints and RAG API.</p>
    </Link>
    <img src="/img/smart-chat.png" alt="Magenta SmartChat" style={{ position: 'absolute', bottom: '10px', right: '10px', width: '120px', height: '120px', objectFit: 'cover', opacity: '0.3', transform: 'scale(1.2)', zIndex: 0 }} />
  </div>

  <div style={{ flex: '1 1 45%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#D8E2F1', color: '#333', textAlign: 'center', height: '200px', overflow: 'hidden' }}>
    <Link to="./introduction#llm-playground" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
      <h3>LLM Playground</h3>
      <p>Experiment with different LLMs, prompt templates, and documents with your API key.</p>
    </Link>
    <img src="/img/playground.png" alt="LLM Playground" style={{ position: 'absolute', bottom: '10px', right: '10px', width: '120px', height: '120px', objectFit: 'cover', opacity: '0.3', transform: 'scale(1.2)', zIndex: 0 }} />
  </div>

  <div style={{ flex: '1 1 45%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#EFE7DD', color: '#333', textAlign: 'center', height: '200px', overflow: 'hidden' }}>
    <Link to="./introduction#create-tsi" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
      <h3>Create TSI</h3>
      <p>A generative AI RAG toolkit that generates AI applications with low code.</p>
    </Link>
    <img src="/img/create-tsi.png" alt="Create TSI" style={{ position: 'absolute', bottom: '10px', right: '10px', width: '120px', height: '120px', objectFit: 'cover', opacity: '0.3', transform: 'scale(1.2)', zIndex: 0 }} />
  </div>

  <div style={{ flex: '1 1 45%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#F9E0DD', color: '#333', textAlign: 'center', height: '200px', overflow: 'hidden' }}>
    <Link to="./introduction#api-key-portal" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
      <h3>API Key Portal</h3>
      <p>Manage your LLM API keys and monitor token usage effectively.</p>
    </Link>
    <img src="/img/api-portal.png" alt="API Key Portal" style={{ position: 'absolute', bottom: '10px', right: '10px', width: '120px', height: '120px', objectFit: 'cover', opacity: '0.3', transform: 'scale(1.2)', zIndex: 0 }} />
  </div>

</div>

---

## Our API Suite
:::tip
Begin with our APIs by exploring the [**Quickstart Guide**](./Quickstart.md) 🚀 for setup and integration instructions.
Our API suite provides everything you need to interact seamlessly with advanced language models, allowing for customization, secure data handling, and efficient deployment across various applications.
::: 

---

**Our API services offer** 

<Tabs>
  <TabItem label="API Reference" value="api-reference">
    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ flex: '1 1 45%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#faf8eb', color: '#333', textAlign: 'center', height: '200px', overflow: 'hidden' }}>
        <a href="/Model Serving/openai" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
          <h3>API Reference</h3>
          <p>A comprehensive guide covering every endpoint, parameter, and example to streamline the integration of our APIs into your applications.</p>
        </a>
        <img src="/img/api.png" alt="API Reference Icon" style={{ position: 'absolute', bottom: '10px', right: '10px', width: '160px', height: '100px', objectFit: 'cover', opacity: '0.2', transform: 'scale(1.2)', zIndex: 0 }} />
      </div>
    </div>
  </TabItem>

  <TabItem label="Fine-Tuning API" value="fine-tune">
    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ flex: '1 1 45%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#D8E2F1', color: '#333', textAlign: 'center', height: '200px', overflow: 'hidden' }}>
        <a href="/Model Serving/finetune" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
          <h3>Fine-Tuning API</h3>
          <p>Customize and enhance models by fine-tuning them with your unique data, helping you achieve higher accuracy and relevance for specific use cases.</p>
        </a>
        <img src="/img/artificial-intelligence-deep-learning-22108.png" alt="Fine-Tuning API Icon" style={{ position: 'absolute', bottom: '10px', right: '10px', width: '120px', height: '120px', objectFit: 'cover', opacity: '0.2', transform: 'scale(1.2)', zIndex: 0 }} />
      </div>
    </div>
  </TabItem>

  <TabItem label="RAG API" value="rag">
    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ flex: '1 1 45%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#EFE7DD', color: '#333', textAlign: 'center', height: '200px', overflow: 'hidden' }}>
        <a href="/RAG%20API%20Reference" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
          <h3>RAG API</h3>
          <p>Efficiently search and retrieve information to augment responses with the most relevant data, making your models contextually aware and information-rich.</p>
        </a>
        <img src="/img/RAG_image.png" alt="RAG API Icon" style={{ position: 'absolute', bottom: '10px', right: '10px', width: '120px', height: '120px', objectFit: 'cover', opacity: '0.2', transform: 'scale(1.2)', zIndex: 0 }} />
      </div>
    </div>
  </TabItem>
</Tabs>

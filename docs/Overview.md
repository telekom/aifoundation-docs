---
sidebar_position: 1
slug: /
title: Overview
---

import React, { useState } from 'react';
import AvailableModels from '@site/src/components/AvailableModels';

# Overview
<div style={{
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid var(--ifm-color-emphasis-200)',
  backgroundColor: 'var(--ifm-background-color)',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
}}>
  <div style={{ flex: 1 }}>
    <h3 style={{
      margin: '0 0 8px',
      fontSize: '1.2em',
      fontWeight: 'bold',
      color: 'var(--ifm-heading-color)',
    }}>
      Developer quickstart
    </h3>
    <p style={{ margin: '0 0 16px', color: 'var(--ifm-color-emphasis-600)' }}>
      Set up your environment and make your first API request in minutes
    </p>
    <p style={{
      display: 'flex',
      alignItems: 'center',
      color: 'var(--ifm-color-emphasis-500)',
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '20px', height: '20px', marginRight: '4px' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 3"></path>
      </svg>
      5 min
    </p>
  </div>

  <div style={{
    flex: 1,
    position: 'relative',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: 'var(--ifm-color-emphasis-100)',
    color: 'var(--ifm-code-color)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '100%',
  }}>
    <pre style={{ margin: 0, fontSize: '0.85em', color: 'var(--ifm-code-color)' }}>
      <code>
        {`import openai
client = OpenAI()

completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "write a haiku about ai"}
    ]
)`}
      </code>
    </pre>
  </div>
</div>

## Available LLM-APIs on AI Foundation Services

Our LLM model serving enables effortless querying of open-source LLM models like Llama3, Mistral, and other open-source models through a simple, OpenAI-compatible API.

<AvailableModels />

---

## Our Services

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>

<div style={{ flex: '1 1 45%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#E6EAF0', color: '#333', textAlign: 'center', height: '200px', overflow: 'hidden' }}>
  <a href="/introduction#magenta-smartchat" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
    <h3>Magenta SmartChat</h3>
    <p>Build conversational assistants using our LLM endpoints and RAG API.</p>
  </a>
  <img src="/img/smart-chat.png" alt="Magenta SmartChat" style={{ position: 'absolute', bottom: '10px', right: '10px', width: '120px', height: '120px', objectFit: 'cover', opacity: '0.3', transform: 'scale(1.2)', zIndex: 0 }} />
</div>

<div style={{ flex: '1 1 45%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#D8E2F1', color: '#333', textAlign: 'center', height: '200px', overflow: 'hidden' }}>
  <a href="/introduction#llm-playground" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
    <h3>LLM Playground</h3>
    <p>Experiment with different LLMs, prompt templates, and documents with your API key.</p>
  </a>
  <img src="/img/playground.png" alt="LLM Playground" style={{ position: 'absolute', bottom: '10px', right: '10px', width: '120px', height: '120px', objectFit: 'cover', opacity: '0.3', transform: 'scale(1.2)', zIndex: 0 }} />
</div>

<div style={{ flex: '1 1 45%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#EFE7DD', color: '#333', textAlign: 'center', height: '200px', overflow: 'hidden' }}>
  <a href="/introduction#create-tsi" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
    <h3>Create TSI</h3>
    <p>A generative AI RAG toolkit that generates AI applications with low code.</p>
  </a>
  <img src="/img/create-tsi.png" alt="Create TSI" style={{ position: 'absolute', bottom: '10px', right: '10px', width: '120px', height: '120px', objectFit: 'cover', opacity: '0.3', transform: 'scale(1.2)', zIndex: 0 }} />
</div>

<div style={{ flex: '1 1 45%', position: 'relative', borderRadius: '8px', padding: '16px', backgroundColor: '#F9E0DD', color: '#333', textAlign: 'center', height: '200px', overflow: 'hidden' }}>
  <a href="/introduction#api-key-portal" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
    <h3>API Key Portal</h3>
    <p>Manage your LLM API keys and monitor token usage effectively.</p>
  </a>
  <img src="/img/api-portal.png" alt="API Key Portal" style={{ position: 'absolute', bottom: '10px', right: '10px', width: '120px', height: '120px', objectFit: 'cover', opacity: '0.3', transform: 'scale(1.2)', zIndex: 0 }} />
</div>

</div>

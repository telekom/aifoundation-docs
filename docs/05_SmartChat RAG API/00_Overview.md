---
sidebar_position: 1
id: smartchat-overview
title: Overview
---

# SmartChat RAG API

The SmartChat RAG API provides a fully managed Retrieval-Augmented Generation (RAG) solution. Unlike the direct Model Serving API, SmartChat handles document ingestion, vector storage, retrieval, and chat session management for you.

## When to Use SmartChat RAG API

| Use Case | SmartChat RAG API | Model Serving API |
|----------|-------------------|-------------------|
| Need managed document storage | Yes | No - bring your own |
| Want built-in RAG pipeline | Yes | No - build with LangChain/Llama-Index |
| Require chat session history | Yes | No - manage yourself |
| Need user/role management | Yes | No |
| Want maximum flexibility | Limited | Yes |
| Simple API integration | More complex auth | OpenAI-compatible |

## Key Features

- **Document Management**: Upload, ingest, and manage documents through the API
- **Knowledge Bases**: Organize documents into global and local knowledge bases
- **Chat Sessions**: Maintain conversation history and context
- **Configurable RAG**: Customize over 50 retrieval settings
- **Multi-user Support**: Role-based access control for enterprise use
- **24/7 Support**: Enterprise-grade reliability

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     SmartChat RAG API                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ File Manager │  │ Ingest Master│  │ Config Mgr   │          │
│  │ (Upload)     │  │ (Processing) │  │ (Settings)   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Chat Session │  │ Query        │  │ User Manager │          │
│  │ Manager      │  │ Pipeline     │  │ (Auth/Roles) │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Documentation Guide

| Document | Description |
|----------|-------------|
| [API Reference](./eRAG%20API%20Reference) | Complete API documentation with service endpoints |
| [Global KB Chat Guide](./global_chat_guide) | How to chat using the global knowledge base |
| [Local KB Chat Guide](./local_chat_guide) | How to upload files and chat with local context |

## Authentication

SmartChat RAG API uses Bearer token authentication, which is different from the API key authentication used in the Model Serving API.

```python
import requests
import json

base_url = "<BASE_URL>"

# Authenticate
payload = json.dumps({
    "username": "<USERNAME>",
    "password": "<PASSWORD>"
})
headers = {'Content-Type': 'application/json'}

response = requests.post(f"{base_url}/api/v1/auth/user", headers=headers, data=payload)

# Use token for subsequent requests
headers["Authorization"] = f"Bearer {response.json()['access_token']}"
```

## Services

| Service | Path | Purpose |
|---------|------|---------|
| **API Gateway** | `/` | Authentication entrypoint |
| **Config Manager** | `/config-manager` | RAG configuration management |
| **User Manager** | `/user-manager` | Users, roles, and groups |
| **File Manager** | `/file-manager` | Document upload and management |
| **Ingest Master** | `/ingest-master` | Document ingestion orchestration |
| **Chat Session Manager** | `/chat-session-manager` | Session and history management |
| **Query Pipeline** | `/query-pipeline` | Chat response generation |

## Quick Example: Global Knowledge Base Chat

```python
import requests
import json

base_url = "<BASE_URL>"

# 1. Authenticate
auth_response = requests.post(
    f"{base_url}/api/v1/auth/user",
    headers={'Content-Type': 'application/json'},
    data=json.dumps({"username": "<USER>", "password": "<PASS>"})
)
headers = {
    'Content-Type': 'application/json',
    'Authorization': f"Bearer {auth_response.json()['access_token']}"
}

# 2. Get configuration
configs = requests.get(f"{base_url}/config-manager/api/v1/user/configs", headers=headers).json()
default_config = [c for c in configs if c["userGroupId"] == "default"][0]

# 3. Create chat session
session = requests.post(
    f"{base_url}/chat-session-manager/api/v1/sessions/",
    headers=headers,
    json={
        "title": "My Chat",
        "config": {
            "localConfigId": default_config["localKbConfigs"][0]["id"],
            "globalContext": True,
            "chatModel": default_config["localKbConfigs"][0]["allowed_llms"][0]["name"]
        }
    }
).json()

# 4. Chat
response = requests.post(
    f"{base_url}/query-pipelines/api/v1/chat",
    headers=headers,
    json={"sessionId": session["sessionId"], "userPrompt": "Summarize the context"}
)
print(response.json())
```

## Getting Access

To get access to the SmartChat RAG API:

1. Contact the AIFS team via **AIFoundation@t-systems.com**
2. Receive your credentials and base URL
3. Follow the guides above to integrate

## See Also

- [Model Serving API](../Model%20Serving/model-serving-overview) - Direct LLM API access with OpenAI compatibility
- [LangChain Integration](../Model%20Serving/langchain) - Build custom RAG with LangChain
- [Llama-Index Integration](../Model%20Serving/llama-index) - Build custom RAG with Llama-Index
- [Visual RAG](../Model%20Serving/visualrag) - RAG with image and text indexing

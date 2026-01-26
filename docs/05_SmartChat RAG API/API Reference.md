---
sidebar_position: 2
id: eRAG API Reference
title: API Reference
tags:
  - Getting started
  - RAG
  - API
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

You can interact with the API via HTTP requests from any language through our API Gateway. Behind the gateway there are a set of [services](#services) that you will need to communicate with to achieve a certain task. To communicate with one service, you will need to add the **\<service_path\>** between the **\<base_url\>** and the endpoint **\<route\>** you're trying to hit. This means, requests are of the format **\<base_url/>/\<service_path\>/\<route\>**.

E.g. **https://api-gateway.ai.t-systems.net/config-manager/redoc**, where:
* **\<base_url\>**: **https://api-gateway.ai.t-systems.net**
* **\<service_path\>**: **config-manager**
* **\<route\>**: **redoc**

## Registration

For registration please contact the AIFS team via example@t-systems.com

## Authentication

To authenticate you need to obtain a **Bearer Token** from the [authentication endpoint](https://api-gateway.ai.t-systems.net/redoc#tag/Auth/operation/get_user_token_api_v1_auth_user_post) and then set the **access_token** in the header of all your subsequent requests.

### Example Authentication
<Tabs>
  <TabItem value="cURL" label="cURL" default>
    ```
    # Authenticate via 
    curl --location '<BASE_URL>/api/v1/auth/user' \
    --header 'Content-Type: application/json' \
    --data '{
      "username": "<USERNAME>",
      "password": "<PASSWORD>"
    }'

    # And then get chat sessions via
    curl --location '<BASE_URL>/chat-session-manager/api/v1/sessions/' \
    --header 'Authorization: Bearer <ACCESS_TOKEN>'
    ```
  </TabItem>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    import requests
    import json

    base_url = "<BASE_URL>"

    payload = json.dumps({
      "username": "<USERNAME>",
      "password": "<PASSWORD>"
    })
    headers = {
      'Content-Type': 'application/json'
    }

    response = requests.post(f"{base_url}/api/v1/auth/user", headers=headers, data=payload)

    headers["Authorization"] = f"Bearer {response.json()['access_token']}"

    response = requests.get(f"{base_url}/chat-session-manager/api/v1/sessions/", headers=headers)

    print(response.json())

    ```
  </TabItem>
</Tabs>


## Services

| Name  | \<service_path\>  | Docs  | Description |
|:---:|:---:|:---:|:---:|
| **API Gateway** | - | [link](https://api-gateway.ai.t-systems.net/redoc)  | Entrypoint for authentication and all backend services. |
| **Config Manager** | **config-manager** | [link](https://api-gateway.ai.t-systems.net/config-manager/redoc)  | Management of Tenant and RAG Configurations. |
| **User Manager** | **user-manager** | [link](https://api-gateway.ai.t-systems.net/user-manager/redoc)  | Management of Users, Roles, and User-Groups. |
| **File Manager** | **file-manager** | [link](https://api-gateway.ai.t-systems.net/file-manager/redoc)  | Management of Files, File-Groups, Knowledge Bases (KBs) and File-Access-Management. |
| **Ingest Master** | **ingest-master** | [link](https://api-gateway.ai.t-systems.net/ingest-master/redoc)  | Orchestration of file ingestion tasks, based on the selected ingestion pipeline via the Config Manager. |
| **Chat Session Manager** | **chat-session-manager** | [link](https://api-gateway.ai.t-systems.net/chat-session-manager/redoc)  | Management of chat sessions, session configurations, session history, and messages feedback. |
| **Query Pipeline** | **query-pipeline** | [link](https://api-gateway.ai.t-systems.net/query-pipeline/redoc)  | Generation of chat responses based on the selected query pipeline via the Config Manager. |

---

## See Also

- [SmartChat RAG Overview](./smartchat-overview) - Overview and comparison with Model Serving API
- [Global KB Chat Guide](./global_chat_guide) - How to chat using the global knowledge base
- [Local KB Chat Guide](./local_chat_guide) - How to upload files and chat with local context
- [Model Serving API](../Model%20Serving/model-serving-overview) - Direct LLM API access with OpenAI compatibility
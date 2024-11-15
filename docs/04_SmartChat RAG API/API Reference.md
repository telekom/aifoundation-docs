---
sidebar_position: 6
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

E.g. **https://api-gateway.erag.prod.llmhub.t-systems.net/config-manager/redoc**, where:
* **\<base_url\>**: **https://api-gateway.erag.prod.llmhub.t-systems.net**
* **\<service_path\>**: **config-manager**
* **\<route\>**: **redoc**

## Registration

For registration please contact the AIFS team via example@t-systems.com

## Authentication

To authenticate you need to obtain a **Bearer Token** from the [authentication endpoint](https://api-gateway.erag.prod.llmhub.t-systems.net/redoc#tag/Auth/operation/get_user_token_api_v1_auth_user_post) and then set the **access_token** in the header of all your subsequent requests.

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
| **API Gateway** | - | [link](https://api-gateway.erag.prod.llmhub.t-systems.net/redoc)  | Entrypoint for authentication and all backend services. |
| **Config Manager** | **config-manager** | [link](https://api-gateway.erag.prod.llmhub.t-systems.net/config-manager/redoc)  | Management of Tenant and RAG Configurations. |
| **User Manager** | **user-manager** | [link](https://api-gateway.erag.prod.llmhub.t-systems.net/user-manager/redoc)  | Management of Users, Roles, and User-Groups. |
| **File Manager** | **file-manager** | [link](https://api-gateway.erag.prod.llmhub.t-systems.net/file-manager/redoc)  | Management of Files, File-Groups, Knowledge Bases (KBs) and File-Access-Management. |
| **Ingest Master** | **ingest-master** | [link](https://api-gateway.erag.prod.llmhub.t-systems.net/ingest-master/redoc)  | Orchestration of file ingestion tasks, based on the selected ingestion pipeline via the Config Manager. |
| **Chat Session Manager** | **chat-session-manager** | [link](https://api-gateway.erag.prod.llmhub.t-systems.net/chat-session-manager/redoc)  | Management of chat sessions, session configurations, session history, and messages feedback. |
| **Query Pipelines** | **query-pipelines** | [link](https://api-gateway.erag.prod.llmhub.t-systems.net/query-pipelines/redoc)  | Generation of chat responses based on the selected query pipeline via the Config Manager. |
| **Web Extraction** | **web-extraction-api** | [link](https://api-gateway.erag.prod.llmhub.t-systems.net/web-extraction-api/redoc)  | Web crawling with built-in file management and ingestion. |
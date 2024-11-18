---
sidebar_position: 1
id: chat-completion-api
title: Chat Completion API
tags:
  - OpenAI API
  - Chat Models
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Chat Completion API

**The role and the content of the prompt for each role is required.**

<Tabs>
  <TabItem value="py" label="Python" default>
    ```python showLineNumbers
    model = "Llama-3.1-70B-Instruct"  # choose one of available LLM (not the embedding model)
    stream = True 

    chat_response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "You are a helpful assistant named Llama-3."},
            {"role": "user", "content": "What is Open Telekom Cloud?"},
        ],
        temperature=0.1,
        max_tokens=256,
        stream=stream
    )

    if not stream:
        print(chat_response.choices[0].message.content)
    else:
        for chunk in chat_response:
            if chunk.choices:
                if chunk.choices[0].delta.content is not None:
                    print(chunk.choices[0].delta.content, end="", flush=True)
    ```
  </TabItem>

  <TabItem value="curl" label="cURL">
    ```bash showLineNumbers
    curl -X POST https://llm-server.llmhub.t-systems.net/v2/chat/completions \
    -H "Authorization: Bearer YOUR_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "model": "Llama-3.1-70B-Instruct",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant named Llama-3."},
            {"role": "user", "content": "What is Open Telekom Cloud?"}
        ],
        "temperature": 0.1,
        "max_tokens": 256,
        "stream": true
    }'
    ```
  </TabItem>
</Tabs>

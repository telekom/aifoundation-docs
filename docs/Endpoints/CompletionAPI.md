---
sidebar_position: 2
id: completion-api
title: Completion API
tags:
  - OpenAI API
  - Text Models
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Completion API

**With this API, the raw text will be sent directly to the LLM without a special tag template.**

<Tabs>
  <TabItem value="py" label="Python" default>
    ```python showLineNumbers
    model = "Llama-3.1-70B-Instruct"  # choose one of the available LLMs (not the embedding model)
    stream = True 

    completion = client.completions.create(
        model=model,
        prompt="What is Python programming language?",
        stream=stream,
        temperature=0.2,
        max_tokens=128
    )

    if not stream:
        print(completion.choices[0].text)

    else:
        for chunk in completion:
            if chunk.choices:
                if chunk.choices[0].text is not None:
                    print(chunk.choices[0].text, end="", flush=True)
    ```
  </TabItem>

  <TabItem value="curl" label="cURL">
    ```bash showLineNumbers
    curl -X POST https://llm-server.llmhub.t-systems.net/v2/completions \
    -H "Authorization: Bearer YOUR_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "model": "Llama-3.1-70B-Instruct",
        "prompt": "What is Python programming language?",
        "temperature": 0.2,
        "max_tokens": 128,
        "stream": true
    }'
    ```
  </TabItem>
</Tabs>

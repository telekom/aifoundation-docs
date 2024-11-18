---
sidebar_position: 3
id: embedding-api
title: Embedding API
tags:
  - OpenAI API
  - Embedding Models
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Embedding API

<Tabs>
  <TabItem value="py" label="Python" default>
    ```python showLineNumbers
    model = "jina-embeddings-v2-base-de"

    texts = ["I am Batman and I'm rich", "I am Spiderman", "I am Ironman and I'm a billionaire", "I am Flash", "I am the president of USA"]
    embeddings = client.embeddings.create(
        input=texts, model=model
    )

    print('Embedding dimension: ', len(embeddings.data[0].embedding))
    print('Number of embedding vectors: ', len(embeddings.data))
    print('Token usage: ', embeddings.usage)
    ```
  </TabItem>

  <TabItem value="curl" label="cURL">
    ```bash showLineNumbers
    curl -X POST https://llm-server.llmhub.t-systems.net/v2/embeddings \
    -H "Authorization: Bearer YOUR_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "model": "jina-embeddings-v2-base-de",
        "input": ["I am Batman and I'm rich", "I am Spiderman", "I am Ironman and I'm a billionaire", "I am Flash", "I am the president of USA"]
    }'
    ```
  </TabItem>
</Tabs>

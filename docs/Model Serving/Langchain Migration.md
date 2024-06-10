---
sidebar_position: 5
id: langchain
title: LangChain Integration
tags:
  - RAG
  - Vector search
  - Embedding models
  - In context learning
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction
For RAG use case, it is very important to leverage the state-of-the-art framework to perform search, filter context
and refinement of user query. This section show a quick tutorial how you can use our services API with LangChain to demonstrate the in-context learning capability of LLM. 

## Quickstart

**Step 0: Install prerequiste package**
```
pip install langchain
pip install langchain-openai
```

**Step 1: Provide Base URL and API key to check available model name**

<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    import os
    import openai
    from openai import OpenAI

    print("OpenAI version: ",openai.__version__)
    client = OpenAI(
        api_key=os.getenv('API_KEY'),
        base_url=os.getenv('API_BASE'),
    )

    print("==========Available models==========")
    models = client.models.list()
    for model in models.data:
      print(model.id)
    ```
  </TabItem>
</Tabs>

:::info
Above code will show all the LLM and Embedding models that available dedicated for your key.  
:::

Example output:

```
==========Available models==========
Llama-3-70B-Instruct
Mixtral-8x7B-Instruct-v0.1
CodeLlama-2
jina-embeddings-v2-base-de
text-embedding-bge-m3
gpt-35-turbo
text-embedding-ada-002
gpt-4-32k-canada
gpt-4-32k-france
mistral-large-32k-france
gpt-4-turbo-128k-france
```

**Step 2: Initialize LLM with OpenAILike class.**
<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    from langchain_openai import ChatOpenAI
    import os

    model = "Llama-3-70B-Instruct"

    llm = ChatOpenAI(openai_api_key=os.getenv('API_KEY'), 
                  openai_api_base=os.getenv('API_BASE'),
                  model_name="Mixtral-8x7B-Instruct-v0.1",
                 streaming=True)
    
    # Test run
    for chunk in llm.stream("Write me a song about sparkling water."):
      if chunk.content:
        print(chunk.content,end="", flush=True)
    ```
  </TabItem>
</Tabs>

Example output:

```
(Verse 1)
In the heat of the day, when the sun is high,
I reach for something to quench my thirst, not just any old drink will do.
I want something crisp, something clean, something that sparkles and shines,
...
```

**Step 3: Choose an embedding models.**
<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    from typing import List
    from langchain_openai import OpenAIEmbeddings
    import os

    class OTC_Embeddings(OpenAIEmbeddings):
        def embed_documents(self, texts: List[str]) -> List[List[float]]:
            """Compute doc embeddings using a HuggingFace transformer model.

            Args:
                texts: The list of texts to embed.

            Returns:
                List of embeddings, one for each text.
            """
            

            #texts = list(map(lambda x: x.replace("\n", " "), texts))

            embeddings = self.client.create(
                input=texts, model=self.model
            )
            embed_list = [embed.embedding for embed in embeddings.data]
            return embed_list 

        async def aembed_documents(self, texts: List[str]) -> List[List[float]]:
            embeddings = await self.async_client.create(
                input=texts, model=self.model
            )
            embed_list = [embed.embedding for embed in embeddings.data]
            return embed_list 


        def embed_query(self, text: str) -> List[float]:
            """Compute query embeddings using a HuggingFace transformer model.

            Args:
                text: The text to embed.

            Returns:
                Embeddings for the text.
            """
            return self.embed_documents([text])[0]

        async def aembed_query(self, text: str) -> List[float]:
            """Compute query embeddings using a HuggingFace transformer model.

            Args:
                text: The text to embed.

            Returns:
                Embeddings for the text.
            """
            embed =  await self.aembed_documents([text])
            return embed[0]


    # Test run
    embed_model = OTC_Embeddings(openai_api_key=os.getenv('API_KEY'), 
                                openai_api_base=os.getenv('API_BASE'),
                                model="text-embedding-bge-m3")
    embeddings = embeddings_model.embed_documents(
        [
          "Hi there!",
          "Oh, hello!",
          "What's your name?",
          "My friends call me World",
          "Hello World!"
        ]
    )
    print(len(embeddings), len(embeddings[0]))
    ```
  </TabItem>
</Tabs>

Example output:

```
(5, 1024)
```



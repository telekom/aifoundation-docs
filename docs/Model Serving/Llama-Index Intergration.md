---
sidebar_position: 4
id: llama-index
title: Llama-Index Integration
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
and refinement of user query. This section show a quick tutorial how you can use our services API with Llama-Index to demonstrate the in-context learning capability of LLM. 

## Quickstart

**Step 0: Install prerequiste package**
```
pip install llama-index
pip install llama-index-llms-azure-openai
pip install llama-index-embeddings-openai
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
Llama-3.1-70B-Instruct
Mistral-Nemo-Instruct-2407
Mixtral-8x7B-Instruct-v0.1
DeepSeek-Coder-V2-Lite-Instruct
jina-embeddings-v2-base-de
text-embedding-bge-m3
gpt-35-turbo
text-embedding-ada-002
gpt-4o
gpt-4-turbo-128k-france
claude-3-5-sonnet
gemini-1.5-pro
gemini-1.5-flash
Llama-3.1-405B-Instruct-US
Mistral-Large-2407
claude-3-5-sonnet-v2-US
```

**Step 2: Initialize LLM with OpenAILike class.**
<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    import os
    import httpx
    from llama_index.llms.azure_openai import AzureOpenAI

    llm = AzureOpenAI(
        deployment_name="gpt-4o",
        api_key=api_key=os.getenv('API_KEY'),
        azure_endpoint=os.getenv('API_BASE'),
        api_version="2023-07-01-preview",
    )
    
    # Test run
    response_iter = llm.stream_complete("""You are the funniest comedian. Tell me a joke.""")
    for response in response_iter:
      print(response.delta, end="", flush=True)
    ```
  </TabItem>
</Tabs>

Example output:

```
Thank you, thank you! I'm glad you think so! Here's a joke for you:

"I told my wife she was drawing her eyebrows too high. She looked surprised."

Hope that made you LOL!
```

**Step 3: Choose an embedding models.**
<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    from llama_index.embeddings.openai import OpenAIEmbedding

    embed_model_name = "jina-embeddings-v2-base-de" # GERMAN & ENGLISH
    #embed_model_name = "text-embedding-bge-m3" # Multilingual

    embed_model= OpenAIEmbedding(
            model_name=embed_model_name,
            api_key=os.getenv('API_KEY'),
            api_base=os.getenv('API_BASE'),
    )

    # Test run
    query_embedding = embed_model.get_query_embedding("Iam Ironman")
    print("Embedding vector dimension size: ",len(query_embedding))
    ```
  </TabItem>
</Tabs>

Example output:

```
Embedding vector dimension size: 768
```

## Simple RAG demonstration

**Download Alphabet Inc. financial report as example document**

```
!rm -rf example_data
!mkdir example_data
!cd example_data && wget https://abc.xyz/assets/a7/5b/9e5ae0364b12b4c883f3cf748226/goog-exhibit-99-1-q1-2023-19.pdf
```

**Indexing the documentation**
<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
    from llama_index.core.postprocessor import LongContextReorder
    from llama_index.core.node_parser import SentenceSplitter
    from llama_index.core.memory import ChatMemoryBuffer

    data_dir='./example_data'
    chunk_size = 512 # maxmimum number of token in each chunk
    chunk_overlap = 20 

    documents = SimpleDirectoryReader(input_dir=data_dir, filename_as_id=True).load_data()


    index = VectorStoreIndex.from_documents(documents=documents, 
                                            transformations=[SentenceSplitter(chunk_size=chunk_size,chunk_overlap=chunk_overlap)],
                                            embed_model=embed_model)
    ```
  </TabItem>
</Tabs>

**Initialize Context Chat Engine**
<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    CONTEXT_CHAT_PROMPT='''\
    You are an helpful AI assistant named Llama-3 that answer the question base on the context provided.
    If the context doesn't help, truthfully answer with: I can't find that information in the given context.
    Context information is following:

    {context_str}

    Base on the context given above and the conversation history, focus to answer the question at the end below.
    Always answer in the same language as the given question.
    '''

    context_chat_engine = index.as_chat_engine(llm=llm,
                                                streaming=True, 
                                                chat_mode="context",
                                                context_template=CONTEXT_CHAT_PROMPT,
                                                node_postprocessors=[LongContextReorder()], 
                                                memory=ChatMemoryBuffer.from_defaults(token_limit=6000), 
                                                similarity_top_k=10)

    ```
  </TabItem>
</Tabs>

**Ask question about the provided context**

<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    #context_chat_engine.reset()
    response = context_chat_engine.stream_chat("How much revenue did Alphabet generate in 2023?")
    for token in response.response_gen:
        print(token, end="")
  ```
  </TabItem>
</Tabs>

Example output:

```
According to the context, Alphabet generated $69,787 million in revenue in the quarter ended March 31, 2023.
```

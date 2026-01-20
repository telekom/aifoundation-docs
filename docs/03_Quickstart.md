---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Quickstart Guide for Developers

This guide will walk you through setting up the OpenAI package to interact with our LLM models and embeddings. In just a few steps, you’ll be ready to use our language, vision, and embedding models through a simple and unified API.

---

### Step 1: Install the OpenAI Package

To get started, install the OpenAI package using `pip`. This package allows you to access all our models, including language generation, chat, embeddings, and vision capabilities.

```bash
pip install openai
```

---

### Step 2: Create and Export an API Key

To securely connect to our API, you’ll need to generate an API key from the dashboard. Once you have the key:

1. **Store it safely** in a location like a `.zshrc` file (macOS/Linux) or another text file on your computer.
2. **Export it as an environment variable** in your terminal for easy access in your scripts.

**Create an API key** in the dashboard [here](https://apikey.llmhub.t-systems.net/) and follow the steps below for your operating system.

<Tabs>
  <TabItem value="mac" label="macOS / Linux" default>

   <strong>Export environment variables on *nix systems*:</strong>
   ```bash
   export OPENAI_API_KEY="your_api_key_here"
   export BASE_URL="https://llm-server.llmhub.t-systems.net/v2"
   ```

  </TabItem>
  <TabItem value="windows" label="Windows">

   <strong>Set environment variables on Windows:</strong>
   ```bash
   setx OPENAI_API_KEY "your_api_key_here"
   setx BASE_URL "https://llm-server.llmhub.t-systems.net/v2"
   ```

  </TabItem>
</Tabs>

---
:::tip
You can see the list of our available models by using the command from [<span style={{ color: 'red', fontWeight: 'bold' }}>API Reference</span>](./04_Model%20Serving/API%20Usage%20Guide.md#list-of-available-models) or view the [<span style={{ color: 'red', fontWeight: 'bold' }}>list of available models</span>](./01_Overview.md#available-llm-apis-on-ai-foundation-services).
:::

---
<Tabs>
  <TabItem value="generate-text" label="Generate text" default>

    ### Generate Text

    Create a human-like response to a prompt.

    ```python
    import openai
    import os

    # Set up the client with your API key and base URL
    client = openai.OpenAI(
        api_key=os.getenv("OPENAI_API_KEY"),
        base_url=os.getenv("BASE_URL")
    )

    chat_response = client.chat.completions.create(
        model="Llama-3.1-70B-Instruct",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Can you explain quantum computing in simple terms?"}
        ],
        temperature=0.5,
        max_tokens=150
    )

    # Print the response
    print(chat_response.choices[0].message.content)
    ```

  </TabItem>
  
  <TabItem value="generate-embeddings" label="Create vector embeddings">

    ### Generate Embeddings

    Generate vector embeddings for text data.

    ```python
    import openai
    import os

    # Set up the client with your API key and base URL
    client = openai.OpenAI(
        api_key=os.getenv("OPENAI_API_KEY"),
        base_url=os.getenv("BASE_URL")
    )

    texts = ["The quick brown fox jumps over the lazy dog", "Data science is fun!"]
    embeddings = client.embeddings.create(
        input=texts,
        model="jina-embeddings-v2-base-de"
    )

    # Print the embedding details
    print(f"Embedding dimension: {len(embeddings.data[0].embedding)}")
    print(f"Token usage: {embeddings.usage}")
    ```

  </TabItem>

  <TabItem value="multimodal-models" label="Multimodal Models (Vision and Image Analysis)">

    ### Multimodal Models (Vision and Image Analysis)

    Use a vision model to analyze images.

    ```python
    import openai
    import os

    # Set up the client with your API key and base URL
    client = openai.OpenAI(
        api_key=os.getenv("OPENAI_API_KEY"),
        base_url=os.getenv("BASE_URL")
    )

    chat_response = client.chat.completions.create(
        model="llava-v1.6-34b",
        messages=[
            {"role": "user",
            "content": [
                {"type": "text", "text": "What’s in this image?"},
                {"type": "image_url", "image_url": {"url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"}}
            ],
            }
      ],
        max_tokens=300,
    )

    # Print the image analysis
    print(chat_response.choices[0].message.content)
    ```

  </TabItem>
</Tabs>


### Next Steps

You’re all set up! Now, explore different models and tune parameters like `temperature` and `max_tokens` to refine responses. For specialized use cases like RAG, see our **[LangChain](./04_Model%20Serving/Langchain%20Migration.md)** and **[Llama-Index Integration](./04_Model%20Serving/Llama-Index%20Intergration.md)** sections in the documentation.

**Note**: For any model-specific requirements or best practices, consult the [API Reference](./04_Model%20Serving/API%20Usage%20Guide.md) section of this documentation.

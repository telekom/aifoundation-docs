---
sidebar_position: 5
id: openai
title: API Reference
tags:
  - OpenAI API
  - Model serving
  - Multimodal models
  - Embedding models
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction
T-System LLM Serving have an API Interface compatible with OpenAI's Chat, Completion, Vision and Embedding API.
It ensures seamless integration and functionality that matches the capabilities of the original API.
The tutorials bellow will show you how to use the low level OpenAI python package with our service.
Although it demonstrate a compatibility of our API with OpenAI, for RAG use case especially please check our Llama-Index and LangChain intergration section. 

## Https API Reference
If you want to look up the POST/GET API endpoints instead, please have a look at the Https API Reference [here](https://llm-server.llmhub.t-systems.net/redoc) and [here](https://llm-server.llmhub.t-systems.net/docs).

## Guides
### List of available models

**Step 0: Install openai package**
```
pip install openai
```

**Step 1: Provide Base URL and API key.**

<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    import os
    import openai
    from openai import OpenAI

    print("OpenAI version: ",openai.__version__)
    client = OpenAI(
        api_key=os.getenv('API_KEY'),
        base_url="https://llm-server.llmhub.t-systems.net/v2",
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

**You can get the specific meta data of each model:**

```
models.data[0].meta_data # this is for Llama-3
```
That will output:
```
{'max_sequence_length': 8192, 'hidden_size': 0, 'max_output_length': 0}
```
:::info
- **max_sequence_length**: maximum length of input + output sentence, measured in tokens can be processed by the LLM
- **hidden_size**: number of dimension of the embedding vector. This number only available for embedding models.
- **max_output_length**: maximum tokens length that LLM can output. e.g: GPT-4-Turbo have 128k max input + output, but it can only output maximum 4096 tokens.
:::



### Chat completion API

**The role and the content of prompt for each role is required.**

<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    model = "Llama-3.1-70B-Instruct" # choose one of available LLM (not the embedding model)
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
</Tabs>

### Completion API 

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
</Tabs>

:::info
The completions API is only available for open-source models. To get the correct behavior from the models, you need to follow a specific set of templates that the author used during the instruction fine-tuning phase of the LLM (e.g., `## System`, `## Assistant`).

**We recommend always using the Chat API instead**.
:::

### Embedding API

<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    model="jina-embeddings-v2-base-de"

    texts=["I am Batman and I'm rich","I am Spiderman","I am Ironman and I'm a bilionaire", "I am Flash", "I am the president of USA"]
    embeddings = client.embeddings.create(
                input=texts, model=model
            )

    print('Embedding dimension: ',len(embeddings.data[0].embedding))
    print('Number of embedding vector: ',len(embeddings.data))
    print('Token usage: ',embeddings.usage)
    ```
  </TabItem>
</Tabs>

Example output:

```
Embedding dimension:  1024
Number of embedding vector:  5
Usage(prompt_tokens=31, total_tokens=31)
```

### Function calling**

<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    tools = [
    {
        "type": "function",
        "function": {
            "name": "get_current_weather",
            "description": "Get the current weather",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA",
                    },
                    "format": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "The temperature unit to use. Infer this from the users location.",
                    },
                },
                "required": ["location", "format"],
            },
        }
    },
    ]
    messages = []
    messages.append({"role": "system", "content": "Don't make assumptions about what values to plug into functions. Ask for clarification if a user request is ambiguous."})
    messages.append({"role": "user", "content": "What's the weather like today in Hamburg"})

    chat_response = client.chat.completions.create(model="gpt-4-turbo-128k-france", messages=messages,tools=tools)

    assistant_message = chat_response.choices[0].message

    messages.append(assistant_message) #update the conversation

    print(assistant_message)
    ```
  </TabItem>
</Tabs>

Example output:

```
ChatCompletionMessage(content=None, role='assistant', function_call=None, tool_calls=[ChatCompletionMessageToolCall(id='call_adnFRLazqswLI1ky6FU2O40u', function=Function(arguments='{"location":"Hamburg","format":"celsius"}', name='get_current_weather'), type='function')])
```

:::info
Currently, we only support function calling to the proprietary models like gpt-4 series.
For open-source model like Llama-3, Mixtral we will support it soon. Stay tune!
:::



## Multimodal Models
Currently, beside text generation LLM, we also provide vision models and speech-to-text models.
Here is an example of how to use OpenAI Vision API for Llava-1.6-34b.
**Step 1: Check the available Vision models**

<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    import os
    import openai
    from openai import OpenAI

    print("OpenAI version: ",openai.__version__)
    client = OpenAI(
        api_key=os.getenv('API_KEY'),
        base_url="https://llm-server.llmhub.t-systems.net/vision",
    )

    print("==========Available models==========")
    models = client.models.list()
    for model in models.data:
      print(model.id)
    ```
  </TabItem>
</Tabs>

Example output:

```
==========Available models==========
llava-v1.6-34b
llava-v1.6-vicuna-13b
```


**Step 2: Sent question together with the image url**

<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    model = 'llava-v1.6-vicuna-13b'
    stream=True

    chat_response = client.chat.completions.create(
      model=model,
      messages=[
        {
          "role": "system",
          "content": [
            {"type": "text", "text": "You are an helpful AI assistant named LLava help people answer their question base on the image and text provided."}
          ],
        },
        {
          "role": "user",
          "content": [
            {"type": "text", "text": "What’s in this image?"},
            {
              "type": "image_url",
              "image_url": {
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
              },
            },
          ],
        },
      ],
      max_tokens=300,
      stream=stream,
      temperature=0.01
    )

    if stream:
        for chunk in chat_response:
            if chunk.choices:
                if chunk.choices[0].delta.content is not None:
                    print(chunk.choices[0].delta.content, end="")
    else:
        print(chat_response.choices[0].message.content)
    ```
  </TabItem>
</Tabs>

Example output:

```
The image shows a serene landscape with a wooden boardwalk or pathway leading through a field of tall grass. 
The pathway appears to be well-maintained and is surrounded by lush greenery. 
The sky is partly cloudy, suggesting it might be a pleasant day. 
In the distance, there are trees and what looks like a line of bushes or shrubs, which could be part of a hedge or a natural boundary. 
The overall scene is peaceful and invites one to imagine a walk through the field.
```

- Alternative to the online image url, you could put the local path of the image to the base64 image encoder as bellow:
<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    import base64
    import requests
    from PIL import Image
    from io import BytesIO

    # Function to encode the image
    def encode_image(image_path):
      with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

    # Function to decode base64 back to image (to show on the notebook)
    def load_image_from_base64(image):
        return Image.open(BytesIO(base64.b64decode(image)))

    # Path to your image
    image_path = "/path/to/example_image.jpg"
    
    # Getting the base64 string
    base64_image = encode_image(image_path)
    ```
  </TabItem>
</Tabs>

- And then we could put the base64_image into the image_url:
<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    model = 'llava-v1.6-34b'
    stream=True

    chat_response = client.chat.completions.create(
      model=model,
      messages=[
        {
          "role": "user",
          "content": [
            {"type": "text", "text": "What’s in this image?"},
            {
              "type": "image_url",
              "image_url": {
              "url": f"data:image/jpeg;base64,{base64_image}",
              },
            },
          ],
        }
      ],
      max_tokens=1000,
      stream=stream,
      temperature=0.01
    )

    if stream:
        for chunk in chat_response:
            if chunk.choices:
                if chunk.choices[0].delta.content is not None:
                    print(chunk.choices[0].delta.content, end="")
    else:
        print(chat_response.choices[0].message.content)
    ```
  </TabItem>
</Tabs>

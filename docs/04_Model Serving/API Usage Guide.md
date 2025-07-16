---
sidebar_position: 5
id: openai
title: API Usage Guide
tags:
  - OpenAI API
  - Model serving
  - Multimodal models
  - Embedding models
  - Audio API  
  - Transcription  
  - Translation  
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FetchJson from '@site/src/components/FetchJson';


## Introduction
The T-Systems LLM Serving has an API Interface compatible with OpenAI's Chat, Completion, Vision, Audio and Embedding API.
It ensures seamless integration and functionality that matches the capabilities of the original API.
The tutorials below shows you how to use the python package with our service.

For RAG use cases, please check our Llama-Index and LangChain integration sections as well.

## HTTPS API Reference
If you want to look up the raw POST/GET API endpoints instead, because you would like to use another programming language, please have a look at the HTTPS API Reference [here](https://llm-server.llmhub.t-systems.net/redoc).

## Using T-Systems LLM Serving with the openai package
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
The code above will list all the LLMs and Embedding models that are available with your key.  
:::

Example output:

```
==========Available models==========
DeepSeek-Coder-V2-Lite-Instruct
DeepSeek-R1-Distill-Llama-70B
Llama-3.1-405B-Instruct-US
Llama-3.3-70B-Instruct
Mistral-Large-2407
Mistral-Nemo-Instruct-2407
Mistral-Small-24B-Instruct-2501
QWEN-VL2-7B
Qwen2.5-Coder-32B-Instruct-FP8
Qwen2.5-VL-72B-Instruct
Teuken-7B-Instruct-v04
claude-3-5-sonnet
claude-3-5-sonnet-v2
claude-3-7-sonnet
gemini-1.5-flash
gemini-1.5-pro
gemini-2.0-flash
gpt-35-turbo
gpt-4-32k-1
gpt-4-turbo-128k-france
gpt-4o
jina-embeddings-v2-base-code
jina-embeddings-v2-base-de
text-embedding-ada-002
text-embedding-bge-m3
tsi-embedding-colqwen2-2b-v1
whisper-large-v3-turbo
```

**You can get the specific meta data of each model:**

```
models.data[0].meta_data
```
That will output:
```
{'max_sequence_length': 8192, 'hidden_size': 0, 'max_output_length': 0}
```
:::info
- **max_sequence_length**: maximum length of input + output sentence, measured in tokens that can be processed by the LLM
- **hidden_size**: number of dimension of the embedding vector. This value is only available for embedding models.
- **max_output_length**: maximum tokens length that LLM can output. e.g: GPT-4-Turbo has 128k max input + output, but it can only output maximum 4096 tokens.
:::



### Chat completion API

**The role and the content of prompt for each role is required.**

<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    model = "Llama-3.3-70B-Instruct" # choose one of available LLM (not the embedding model)
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

**With this API, the raw text will be sent directly to the LLM without requiring any LLM specific tag template.**

<Tabs>
  <TabItem value="py" label="Python" default>

```python showLineNumbers
model = "Llama-3.3-70B-Instruct"  # choose one of the available LLMs (so no embedding or speech model)
stream = True 

completion = client.completions.create(
    model=model,
    prompt="What is the Python programming language?",
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

The embedding API converts text into a vector representation summarizing the semantic meaning. Accordingly, this enables fast semantic search, e.g. by comparing the vector representation of a given question and source document, that may contain the answer.

<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    model="jina-embeddings-v2-base-de"

    texts = [
      "I am Batman and I'm rich",
      "I am Spiderman",
      "I am Ironman and I'm a bilionaire",
      "I am Flash",
      "I am the president of USA"
    ]
    embeddings = client.embeddings.create(
      input=texts, model=model
    )

    print('Embedding dimension: ', len(embeddings.data[0].embedding))
    print('Number of embedding vector: ', len(embeddings.data))
    print('Token usage: ', embeddings.usage)
    ```
  </TabItem>
</Tabs>

Example output:

```
Embedding dimension: 1024
Number of embedding vector: 5
Usage(prompt_tokens=31, total_tokens=31)
```

### Audio API

<Tabs>
  <TabItem value="py" label="Python" default>
    ```python showLineNumbers
    import os
    from openai import OpenAI

    client = OpenAI(
        api_key=os.getenv('API_KEY'),
        base_url=os.getenv('API_BASE') + '/audio'  # /audio endpoint for transcription and translation
    )

    models = client.models.list()
    for model in models.data:
        print(model.id)
    ```
  </TabItem>
  <TabItem value="curl" label="cURL">
    ```bash
    curl -X GET "$API_BASE/audio/models" \
    -H "Authorization: Bearer $API_KEY"
    ```
  </TabItem>
</Tabs>

:::info  
Example output:  
```
whisper-1
```  
`whisper-1` is the current supported model for audio processing.
:::

#### Audio Transcription  

The transcription API converts audio into text in the same language as the audio input. It automatically detects the language from the first 30 seconds of audio if the `language` parameter is not specified.

<Tabs>
  <TabItem value="py" label="Python" default>
    ```python showLineNumbers
    import time

    audio_file_path = "/path/to/audio_file.mp3"  # Path to your audio file

    start = time.time()
    with open(audio_file_path, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file,
            language="de",  # Optional: specify input language (e.g., German)
            temperature=0.0
        )
    stop = time.time()

    print("\nTime taken: ", stop - start)
    print("Transcription:", transcription)
    ```
  </TabItem>
  <TabItem value="curl" label="cURL">
    ```bash
    curl -X POST "$API_BASE/audio/transcriptions" \
    -H "Authorization: Bearer $API_KEY" \
    -F "model=whisper-1" \
    -F "language=de" \
    -F "temperature=0.0" \
    -F "file=@/path/to/audio_file.mp3"
    ```
  </TabItem>
</Tabs>

**Example Output:**  
```
Time taken: 9.11 seconds  
Transcription: {'text': 'Eine kleine Dickmadam zog sich eine Hose an. Die Hose krachte, Dickmadam lachte, zog sie wieder aus und du bist raus.', 'task': 'transcribe', 'duration': 10.58}
```

:::info  
- **`language`**: Optional. Specify the language of the input audio. If omitted, the model will auto-detect the language based on the first 30 seconds of audio.  
- **`temperature`**: Adjusts the creativity of transcription output (default: `0.0` for deterministic results).  
:::

#### Audio Translation  

The translation API translates audio content into English and transcribes it simultaneously.

<Tabs>
  <TabItem value="py" label="Python" default>
    ```python showLineNumbers
    import time

    audio_file_path = "/path/to/audio_file.mp3"  # Path to your audio file

    start = time.time()
    with open(audio_file_path, "rb") as audio_file:
        translation = client.audio.translations.create(
            model="whisper-1",
            file=audio_file,
            temperature=1.0
        )
    stop = time.time()

    print("\nTime taken: ", stop - start)
    print("Translation:", translation)
    ```
  </TabItem>
  <TabItem value="curl" label="cURL">
    ```bash
    curl -X POST "$API_BASE/audio/translations" \
    -H "Authorization: Bearer $API_KEY" \
    -F "model=whisper-1" \
    -F "temperature=1.0" \
    -F "file=@/path/to/audio_file.mp3"
    ```
  </TabItem>
</Tabs>

**Example Output:**  
```
Time taken: 8.66 seconds  
Translation: {'text': "A little lady took her pants off. The lady laughed, took them off again, and you're out.", 'task': 'translate', 'duration': 10.58}
```

:::info  
- **Translation Use Case**: The translation API is useful for converting non-English audio into English for accessibility and analysis.  
- **`temperature`**: Higher values (e.g., `1.0`) encourage more varied outputs, while lower values (e.g., `0.0`) generate deterministic results.  
:::

#### Key Features of Audio APIs  

1. **Auto Language Detection**: Simplifies processing by identifying the input language automatically.  
2. **Customizable Output**: Adjust transcription and translation behavior with parameters like `language` and `temperature`.  
3. **Efficient Processing**: Low latency for both transcription and translation tasks.  


### Multimodal Models
Currently, beside text generation LLM, we also provide vision models and speech-to-text models.
Here is an example of how to use OpenAI Vision API for Qwen2.5-VL-72B-Instruct.

**Send question together with an image url**

<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    model = 'Qwen2.5-VL-72B-Instruct'
    stream=True

    chat_response = client.chat.completions.create(
      model=model,
      messages=[
        {
          "role": "system",
          "content": [
            {"type": "text", "text": "You are an helpful AI assistant named Qwen and help people to answer their question based on the image and text provided."}
          ],
        },
        {
          "role": "user",
          "content": [
            {"type": "text", "text": "What is depicted in this image?"},
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

**Example output:**

```
The image shows a serene landscape with a wooden boardwalk or pathway leading through a field of tall grass. 
The pathway appears to be well-maintained and is surrounded by lush greenery. 
The sky is partly cloudy, suggesting it might be a pleasant day. 
In the distance, there are trees and what looks like a line of bushes or shrubs, which could be part of a hedge or a natural boundary. 
The overall scene is peaceful and invites one to imagine a walk through the field.
```

Alternatively to the online image url, you can pass the local path of the image to a base64 image encoder as shown below:
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
    model = 'Qwen2.5-VL-72B-Instruct'
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


### Function calling

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
For open-source models like Llama-3.3 support is planned in the future. Stay tuned!
:::

### Image generation

<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    import os
    import openai
    from openai import OpenAI, AzureOpenAI
    import base64
    
    # print("OpenAI version: ",openai.__version__)
    client = OpenAI(
        # defaults to os.environ.get("OPENAI_API_KEY")
        api_key=os.getenv('API_KEY'),
        base_url=os.getenv('API_BASE'),
    )
    
    prompt = """
    A background with server racks and cables, with a futuristic city skyline visible through a large window, outside is sunrise time. 
    The room is modern light, with blue and green LED lights illuminating the equipment. 
    """
    result = client.images.generate(
        model="gpt-image-1",
        prompt=prompt
    )
    
    image_base64 = result.data[0].b64_json
    image_bytes = base64.b64decode(image_base64)
    
    # Save the image to a file
    with open("background5.png", "wb") as f:
        f.write(image_bytes)
    ```
  </TabItem>
</Tabs>

### Reasoning control

:::info
For supported models (o1, o1-mini, o3, o3-mini, o4-mini, Gemini 2.5, Claude 3.7, Claude 4) reasoning can be controlled via the reasoning_effort parameter. The parameter can be changed to the values "low", "medium" and "high".
:::

<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    model = "claude-sonnet-4"
    stream = True
    system_prompt = """You are an AI assistant named {model}. You are truthful, concise, and helpful. Always respond in a friendly and professional manner."""
    user_prompt = "What is your name?"
    
    start=time.time()
    chat_response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        stream=stream,
        reasoning_effort="low" # you can set either "low","medium","high"
    )
    
    count = 0
    if not stream:
        print("Answer: ",chat_response.choices[0].message.content)
    else:
        for chunk in chat_response:
            if chunk.choices:
                if chunk.choices[0].delta.content is not None:
                    print(chunk.choices[0].delta.content, end="", flush=True)
                    count+=1
    ```
  </TabItem>
</Tabs>

:::info
For Qwen3, reasoning can be disabled with the addition of the keyword "/no_think" to the prompt.
:::

<Tabs>
  <TabItem value="py" label="Python" default>
    ```py showLineNumbers
    model = "Qwen3-30B-A3B-FP8"
    stream = True
    system_prompt = """You are an AI assistant named {model}. You are truthful, concise, and helpful. Always respond in a friendly and professional manner."""
    user_prompt = "What is your name?"
    
    start=time.time()
    chat_response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": "/no_think " + user_prompt},
        ],
        stream=stream
    )
    
    count = 0
    if not stream:
        print("Answer: ",chat_response.choices[0].message.content)
    else:
        for chunk in chat_response:
            if chunk.choices:
                if chunk.choices[0].delta.content is not None:
                    print(chunk.choices[0].delta.content, end="", flush=True)
                    count+=1
    ```
  </TabItem>
</Tabs>

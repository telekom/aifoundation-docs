---
sidebar_position: 5  
id: audio-api  
title: Audio API
tags:  
  - Audio API  
  - Transcription  
  - Translation  
  - OpenAI Integration  

---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction  

T-System LLM Serving provides powerful audio APIs integrated with the OpenAI package, enabling seamless transcription and translation capabilities. These APIs support high-quality audio processing, offering features like automatic language detection, transcription in native languages, and translation into English. This guide demonstrates how to use the audio API with the OpenAI package.

:::info  
To explore other API capabilities, such as Chat, Completion, or Vision models, refer to their respective documentation sections.  
:::

## Environment Setup  

To interact with the audio API, set up your environment variables as follows:  

```bash
# Set API base URL
export API_BASE=https://llm-server.llmhub.t-systems.net/v2

# Set your API key
export API_KEY=YOUR_LLMHUB_KEY
```

In Python, these environment variables will be automatically used by the `OpenAI` client.  

## Model List  

**Step 1: Install OpenAI package**  
```bash
pip install openai
```

**Step 2: Initialize the OpenAI client for audio APIs**  

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

## Audio Transcription  

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

## Audio Translation  

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

## Key Features of Audio APIs  

1. **Auto Language Detection**: Simplifies processing by identifying the input language automatically.  
2. **Customizable Output**: Adjust transcription and translation behavior with parameters like `language` and `temperature`.  
3. **Efficient Processing**: Low latency for both transcription and translation tasks.  

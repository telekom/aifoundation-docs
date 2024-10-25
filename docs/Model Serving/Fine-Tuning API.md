---
sidebar_position: 5
id: finetune
title: Fine-tuning API
tags:
  - OpenAI API
  - Fine Tuning LLM
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Introduction

This document introduce our Fine-Tuning API and outlines how to use the Upload API for tasks like uploading, listing, and deleting files, as well as the Fine-Tuning Server for fine-tune purpose. It also details how to validate dataset formats, ensuring they are ready for use. Both APIs integrate with the OpenAI package in Python for easier streamlining data management.

## Fine-Tuning API workflow
The Fine-Tuning API includes 2 main components: 
- **Upload API**  
- **Fine-Tuning Server**

The Upload API allows you to upload files for purposes like **fine-tune** and **embedding**. Supported formats include PDF, TXT, DOCX, CSV, JSON, JSONL, and ZIP. 

For fine-tuning with multiple documents, you need to compress them into a ZIP file and upload with the purpose: **fine-tune**.

**Documents Files**: In addition to OpenAI JSONL dataset, we allow user to upload a zip file that contain document files in following format: PDF, TXT, DOCX, CSV, JSON.
Internaly, the compressed zip file will be unzip. All the document file will be chunked into multiple smaller chunk and use that to generate an synthesis RAG dataset.
This dataset then will be used to fine tune, and hence improve the RAG accuracy on that specific user documents.

**Pre-Formatted Datasets**: If you upload a dataset already in the OpenAI JSONL format, it will be sent directly to the Fine-Tuning Server, ready for fine-tuning.
You can also use the Validate Dataset endpoint to ensure your JSONL file follows the correct format.

![image](https://github.com/user-attachments/assets/5e5f9672-5eb3-4217-b249-8694b174b963)


## Upload API
### Dependencies requirements

```py
pip install openai
```

### Setting Environment Variables

First, set the environment variables for the API base URL and API key.

In terminal:

```
export API_BASE=https://llm-server.llmhub.t-systems.net/v2
# Adding LLMHUB API key
export API_KEY=YOUR_API_KEY
# Testing the API_KEY
curl -H "Authorization: Bearer $API_KEY" $API_BASE/models
```

### Initialize the Client

Initialize the OpenAI client with the API key and base URL.

In Python:

```py
import os
from openai import OpenAI

api_base = os.getenv('API_BASE')
api_key = os.getenv('API_KEY')

client = OpenAI(
    api_key=os.getenv('API_KEY'),
    base_url=os.getenv('API_BASE')
)
```

### Upload File

#### Upload datasets for Fine-Tuning

To upload a file for fine-tuning purposes, provide "purpose" as "fine-tune".

```py
file_path = "/path/to/your_dataset.jsonl"
client.files.create(
  file=open(file_path, "rb"),
  purpose="fine-tune"
)
```

**Output:**

```
FileObject(id='file-abc123', bytes=1, created_at='2024-10-22T15:10:45.770750+02:00', filename='your_dataset.jsonl', object='file', purpose='fine-tune', status=None, status_details=None, validation={'object': 'validation', 'is_checked': False, 'is_valid': False, 'message': 'File is not yet validated.', 'errors': {}, 'is_generated_dataset': False})
```

#### Request Body

**file** file: `Required`

The File object (not file name) to be uploaded.

**purpose** string:`Required`

The intended purpose of the uploaded file. Use "fine-tune" for Fine-tuning.

### List Uploaded Files

List all the files that have been uploaded.

```py
files_list = client.files.list(
    purpose="fine-tune"
)

# Iterate over the files and print their details
for file_obj in files_list.data:
    print(f"ID: {file_obj.id}")
    print(f"Bytes: {file_obj.bytes}")
    print(f"Created At: {file_obj.created_at}")
    print(f"Filename: {file_obj.filename}")
    print(f"Object: {file_obj.object}")
    print(f"Purpose: {file_obj.purpose}")
    print("-" * 40)
```

**Output:**

```
ID: file-abc123
Bytes: 1
Created At: 2024-10-22T15:10:45.770750+02:00
Filename: your_dataset.jsonl
Object: file
Purpose: fine-tune
----------------------------------------
```

### Delete File

Delete a specific file by its ID.

```py
client.files.delete("file-abc123")
```

**Output:**

```
FileDeleted(id='file-abc123', deleted=True, object='file')
```

#### Request Body

**file_id** string: `Required` 

The ID of the file to be deleted. This ID can be obtained from the list files function.

## Validate Dataset

The validate endpoint ensures the quality and correctness of datasets in the OpenAI template used for fine-tuning models. This endpoint helps identify and rectify potential issues in your dataset before proceeding with the fine-tuning process.
If user did not call this API before trigger fine tuning jobs. It will be called automatically before the fine tuning job start. The same will be applied for the dataset generation api.

### Sample Dataset

Here's an example of a sample dataset in JSON format:

```json
[
    {
        "messages": [
            {"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."},
            {"role": "user", "content": "What's the capital of France?"},
            {"role": "assistant", "content": "Paris", "weight": 0},
            {"role": "user", "content": "Can you be more sarcastic?"},
            {"role": "assistant", "content": "Paris, as if everyone doesn't know that already.", "weight": 1}
        ]
    }
]
```

### Validate Dataset Example

```py
import httpx

# The URL you want to send the POST request to
base_url = os.getenv('API_BASE')
endpoint = '/files/validate/'
file_id = 'file-abc123'

url = f"{base_url}{endpoint}{file_id}"

# The headers, including the api-key
headers = {
    "Content-Type": "application/json",
    "api-key": "YOUR_API_KEY"
}

# Send the POST request
with httpx.Client() as httpx_client:
    response = httpx_client.get(url, headers=headers)

# Check the response
print(f"Status Code: {response.status_code}")
print(f"Response Content: {response.text}")

```

**Output:**

```
Response Content: {"file_id":"file-abc123","object":"validation","message":"Your validation request is in progress. Please use retrieve file api to get update about the validation result after sometime."}
```

#### Request Body

**file_id** string: `Required`

The ID of the file to be validated.

### Conclusion

This document provides a concise overview of how to use the Upload API to upload, list, delete files, and validate datasets. This API is essential for preparing and managing files for fine-tuning models.

# Fine-Tune API

### Setting up environment
```py
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('API_KEY'),
    base_url=os.getenv('API_BASE')
)
```

### Create fine-tuning job

Creates a fine-tuning job which begins the process of creating a new model from a given dataset.

**Endpoint**: `POST /fine_tuning/jobs`

**Description**: Create a fine-tuning job.

**Parameters**:
- **training_file** (string, `Required`): File ID of the training file to use. This can be obtained via using **List Uploaded Files** endpoint.
- **model** (string, `Required`): The model to fine-tune.
- **hyperparameters** (object, optional): Hyperparameters to use for fine-tuning.
- **n_epochs** (integer): Number of epochs to train the model.

**Response**:
- **id** (string): Unique identifier for the fine-tune job.
- **object** (string): Object type, always `fine-tune`.
- **model** (string): Model being fine-tuned.
- **created_at** (string): Timestamp when the job was created.
- **status** (string): Current status of the job.
- **training_file** (string): Training file used for fine-tuning.
- **hyperparameters** (object): Hyperparameters used for fine-tuning.

```py
client.fine_tuning.jobs.create(
  training_file="file-abc123",
  model="Meta-Llama-3.1-8B-Instruct",
  hyperparameters={
    "n_epochs":2,
  }
)
```

Output:
```
FineTuningJob(id='ftjob-abc123', created_at='2024-10-22T15:01:33.106192+02:00', error=None, fine_tuned_model='Meta-Llama-3.1-8B-Instruct-ft-e65f94', finished_at=None, hyperparameters=Hyperparameters(n_epochs=1, eval_batch_size=None, batch_size=None), model='Meta-Llama-3.1-8B-Instruct', object='fine-tune.job', organization_id=None, result_files=None, seed=None, status='queued', trained_tokens=None, training_file='file-abc123', validation_file=None, estimated_finish=None, integrations=None, suffix='ft', validation_ratio=None, message=None)
```

### List finetune jobs

This endpoint retrieves a list of all fine-tuning jobs created by the user. It helps in monitoring and managing the status of all submitted fine-tuning tasks.

**Endpoint**: `GET /finetune-jobs`

**Description**: Retrieve a list of fine-tuning jobs.

**Parameters**:
-

 **after** (string, optional): ID of the job to start after, for pagination.
- **limit** (integer, optional): Maximum number of jobs to retrieve. Defaults to 3, maximum is 10.

**Response**:
- **id** (string): Unique identifier for the fine-tune job.
- **object** (string): Object type, always `fine-tune`.
- **model** (string): Model being fine-tuned.
- **created_at** (string): Timestamp when the job was created.
- **status** (string): Current status of the job.
- **training_file** (string): Training file used for fine-tuning.
- **hyperparameters** (object): Hyperparameters used for fine-tuning.

```py
import json

# Get the list of fine-tuning jobs
response = client.fine_tuning.jobs.list(limit=10)

#Optional
# Convert the response to the desired dictionary format
response_dict = {
    "object": response.object,
    "data": [
        {
            "id": job.id,
            "object": job.object,
            "model": job.model,
            "created_at": job.created_at,
            "status": job.status,
            "training_file": job.training_file,
            "hyperparameters": {
                "n_epochs": job.hyperparameters.n_epochs,
                "batch_size": job.hyperparameters.batch_size
            }
        } for job in response.data
    ],
    "has_more": response.has_more
}

# Pretty-print the JSON response
print(json.dumps(response_dict, indent=4))
```
Output
```
{
    "object": "list",
    "data": [
        {
            "id": "ftjob-abc123",
            "object": "fine-tune",
            "model": "Meta-Llama-3-8B-Instruct",
            "created_at": "2024-06-27T09:21:22.712964+00:00",
            "status": "stopped",
            "training_file": "file-abc123",
            "hyperparameters": {
                "n_epochs": 2,
            }
        },
        {
            "id": "ftjob-abc1234",
            "object": "fine-tune",
            "model": "Meta-Llama-3.1-8B-Instruct",
            "created_at": "2024-06-27T09:24:33.443283+00:00",
            "status": "queued",
            "training_file": "file-abc1234",
            "hyperparameters": {
                "n_epochs": 2,
            }
        }
    ],
    "has_more": false
}
```

### List fine-tuning events

This endpoint retrieves a list of events for a specific fine-tuning job. It provides detailed logs and status updates for monitoring the progress of the job.

**Endpoint**: `GET /finetune-jobs/{fine_tune_id}/events`

**Description**: Retrieve a list of events for a specific fine-tuning job.

**Parameters**:
- **limit** (integer, optional): Maximum number of events to retrieve. Defaults to 10, maximum is 100.
- **after** (string, optional): ID of the event to start after, for pagination.

**Response**:
- **object** (string): Object type, always `list`.
- **data** (array): Array of event objects.
  - **created_at** (string): Timestamp when the event was created.
  - **level** (string): Log level of the event (e.g., `info`, `warning`, `error`).
  - **message** (string): Message describing the event.
  - **type** (string): Type of event (e.g., `start`, `submitted`, `succeeded`, `failed`).

```py
events = client.fine_tuning.jobs.list_events(
    fine_tuning_job_id="ftjob-abc123",
    limit=10
)

#Optional
# Convert the response to the desired dictionary format
response_dict = {
    "object": events.object,
    "data": [
        {
            "created_at": event.created_at,
            "level": event.level,
            "message": event.message,
            "type": event.type
        } for event in events.data
    ],
    "has_more": events.has_more
}

# Pretty-print the JSON response
print(json.dumps(response_dict, indent=4))
```
Output
```
{
    "object": "list",
    "data": [
        {
            "created_at": "2024-06-27T09:24:33",
            "level": "info",
            "message": "Fine-tuning job started",
            "type": "start"
        },
        {
            "created_at": "2024-06-27T09:25:38",
            "level": "info",
            "message": "Fine-tuning job submitted",
            "type": "submitted"
        }
    ],
    "has_more": false
}
```
### Cancel a Fine tune job

This endpoint allows the user to cancel a fine-tuning job that is in progress. It stops the job and updates its status to 'cancelled'.

**Endpoint**: `POST /finetune-jobs/{fine_tune_id}/cancel`

**Description**: Cancel a specific fine-tuning job.

**Parameters**:
- **fine_tuning_job_id** (string, `Required`): The ID of the fine-tuning job to cancel.

**Response**:
- **id** (string): Unique identifier for the fine-tune job.
- **object** (string): Object type, always `fine-tune`.
- **model** (string): Model being fine-tuned.
- **created_at** (string): Timestamp when the job was created.
- **status** (string): Updated status of the job.
- **training_file** (string): Training file used for fine-tuning.
- **hyperparameters** (object): Hyperparameters used for fine-tuning.

```py
client.fine_tuning.jobs.cancel("ftjob-abc123")
```
Output
```
FineTuningJob(id='ftjob-abc123', created_at='2024-06-27T09:24:33.443283+00:00', error=None, fine_tuned_model=None, finished_at=None, hyperparameters=Hyperparameters(n_epochs=2, batch_size=1), model='Meta-Llama-3-8B-Instruct', object='fine-tune', organization_id=None, result_files=None, status='stopped', trained_tokens=None, training_file='file-abc123', validation_file=None, integrations=[])
```

# LM Benchmarking & Monitoring

In order to see the training metric, validation loss user need to provide us the W&B api-key and also the name of the W&B project.

Addtionally to that, we also have an benchmarking API for the fine-tuned LLM model, where it will be evaluate with the widely used benchmarking frameworks & metric: LM Evaluation Harness and the Needle in a Haystack method for LLM evaluation.

In this case, MLflow is used to monitor both the training and benchmarking processes. You can view your training and benchmarking scores at: https://mlflow.llm-serving.llmhub.t-systems.net.

## LM Benchmarking
### LM Evaluation Harness Benchmark
This is a widely used benchmarking framework designed to evaluate language models across various tasks. In this scope, We used it to measure the model’s performance post-fine-tuning. The evaluation tasks included most widely used benchmark tasks such as:

- **MMLU** (Massive Multitask Language Understanding): A task that evaluates models' knowledge across multiple domains including STEM, humanities, social sciences, etc.
- **HellaSwag**: A commonsense reasoning task that requires models to predict the most appropriate ending to a given story.
- **ARC Challenge**: A dataset consisting of science questions used to test reasoning and logic.
- **GPQA**: A multiple-choice, Q&A dataset of very hard questions written and validated by experts in biology, physics, and chemistry.

Reference: https://github.com/EleutherAI/lm-evaluation-harness?tab=readme-ov-file


![image](https://github.com/user-attachments/assets/2ff53fef-416e-4a46-9ebd-38e759010beb)

### RAG Needle in a Haystack Benchmark
The Needle in a Haystack benchmark tests the model's ability to answer questions by finding relevant information within a larger context, the goal is for the model to find the correct information (the "needle") amidst many unrelated details (the "haystack").

To make this task more challenging, extra irrelevant information (distractors) is added alongside the correct context. Increasing the amount of this noise makes it harder for the model to locate the right answer.

The model's performance is measured using the custom GEval metric from Deepeval https://docs.confident-ai.com/docs/metrics-llm-evals, specifically evaluating Correctness—ensuring the output matches the expected answer and penalizing incorrect or incomplete responses
| Metric scores vs. Context length | Metrics scores vs. Number of Chunks      |
| ------------- | ------------- |
| ![image](https://github.com/user-attachments/assets/a77ba677-d9fe-43e8-83bf-d2f5092b1b51) | ![image](https://github.com/user-attachments/assets/0ae71c7d-66b2-42bd-a3ee-e18cec745080) |

## MLflow Monitoring
With MLflow, you can now monitor each fine-tuning job. Every time you use a new model or a new dataset, a new MLflow experiment is automatically created. In the Runs section, you can find your fine-tuning job by its run name and timestamp.

![image](https://github.com/user-attachments/assets/0f4cd6fc-2da3-4cd2-a7de-16f4d1113540)

For each fine-tuning job, there are two main runs for monitoring:

### 1. Monitoring Fine-Tuning Process

![image](https://github.com/user-attachments/assets/b5d98068-23fa-412d-9c94-5e53dc2b2023)

### 2. Monitoring Benchmarking Scores

In Mlflow artifacts, you will find the LM Evaluation Harness Benchmark scores and RAG Needle in a Haystack Benchmark scores for your Fine-Tuned Model.

![image](https://github.com/user-attachments/assets/d788f790-62f9-4556-a701-69ae27e903bf)


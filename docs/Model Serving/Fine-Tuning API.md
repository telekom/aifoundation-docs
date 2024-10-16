## Upload API
### Introduction

This document provides an overview of how to use the Upload API to upload files for various purposes, including fine-tuning, embedding, and ingestion. It also describes features for listing and deleting files, as well as a special endpoint for validating dataset formats. The Upload API can be integrated with the OpenAI package in Python.

### Dependencies requirements

```python
pip install openai
```

### Setting Environment Variables

First, set the environment variables for the API base URL and API key.

In terminal:

```
export API_BASE=https://llm-server.llmhub.t-systems.net
# Adding LLMHUB API key
export API_KEY=YOUR_LLMHUB_KEY
# Testing the API_BASE
curl $API_BASE
# Testing the API_KEY
curl -H "Authorization: Bearer $API_KEY" $API_BASE
```

**Output:**

```
env: API_BASE=https://llm-server.llmhub.t-systems.net
{"T-Systems Uploading Server":"online"}
env: API_KEY=YOUR_LLMHUB_KEY
```

### Initialize the Client

Initialize the OpenAI client with the API key and base URL.

In Python:

```python
import os
from openai import OpenAI

api_base = os.getenv('API_BASE')
api_key = os.getenv('API_KEY')

client = OpenAI(
    api_key=os.getenv('API_KEY'),
    base_url=os.getenv('API_BASE') +'/v1'
)
```

### Upload File

#### Upload datasets for Fine-Tuning

To upload a file for fine-tuning purposes, provide "purpose" as "fine-tune".

```python
client.files.create(
    file=open("/Path/to/your/file/demo.txt", "rb"),
    purpose="fine-tune"
)
```

**Output:**

```
FileObject(id='fine-tune-upload1-demo', bytes=781, created_at='2024-06-25T11:24:17 (CEST)', filename='demo.txt', object='file', purpose='fine-tune', status=None, status_details=None, checksum='1825e8c857c78e160109115c9857e592')
```

#### Request Body

**file** file: <span style="color: red; font-weight: bold;">Required</span> 

The File object (not file name) to be uploaded.

**purpose** string: <span style="color: red; font-weight: bold;">Required</span> 

The intended purpose of the uploaded file. Use "fine-tune" for Fine-tuning.

### List Uploaded Files

List all the files that have been uploaded.

```python
files_list = client.files.list()

# Iterate over the files and print their details
for file_obj in files_list.data:
    print(f"ID: {file_obj.id}")
    print(f"Bytes: {file_obj.bytes}")
    print(f"Created At: {file_obj.created_at}")
    print(f"Filename: {file_obj.filename}")
    print(f"Object: {file_obj.object}")
    print(f"Purpose: {file_obj.purpose}")
    print(f"Checksum: {file_obj.checksum}")
    print("-" * 40)
```

**Output:**

```
ID: fine-tune-upload1-demo
Bytes: 781
Created At: 2024-06-25T11:24:17 (CEST)
Filename: demo.txt
Object: file
Purpose: fine-tune
Checksum: 1825e8c857c78e160109115c9857e592
----------------------------------------
```

### Delete File

Delete a specific file by its ID.

```python
client.files.delete("fine-tune-upload1-demo")
```

**Output:**

```
FileDeleted(id='fine-tune-upload1-demo', deleted=True, object='file')
```

#### Request Body

**file_id** string: <span style="color: red; font-weight: bold;">Required</span> 

The ID of the file to be deleted. This ID can be obtained from the list files function.

## Validate Dataset

The validate endpoint ensures the quality and correctness of datasets in the OpenAI template used for fine-tuning models. This endpoint helps identify and rectify potential issues in your dataset before proceeding with the fine-tuning process.

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

```bash
curl  -X  'POST'  \
'http://localhost:8017/v1/val_dataset?file_id=fine-tune-upload_4-Depth-aware_convolutional_neural_networks_for_accurate_3D_pose_estimation_in_RGB.jsonl' \
-H  'accept: application/json'  \
-d ''
```

**Output:**

```
{"id":"fine-tune-upload_4-Depth-aware_convolutional_neural_networks_for_accurate_3D_pose_estimation_in_RGB.jsonl","errors":["No errors found"],"object":"file"}
```

#### Request Body

**file_id** string: <span style="color: red; font-weight: bold;">Required</span> 

The ID of the file to be validated.

### Conclusion

This document provides a concise overview of how to use the Upload API to upload, list, delete files, and validate datasets. This API is essential for preparing and managing files for fine-tuning models.

# Fine-Tune API
In Terminal
```python
export API_BASE=https://llm-server.llmhub.t-systems.net
export API_KEY=YOUR_LLMHUB_KEY
curl -H "Authorization: Bearer $API_KEY" $API_BASE
```
Output


    env: API_BASE=https://llm-server.llmhub.t-systems.net
    env: API_KEY=YOUR_LLMHUB_KEY
    {"T-Systems Fine-Tuning Server":"online"}

### Setting up environment
```python
import os
from openai import OpenAI

api_base = os.getenv('API_BASE')
api_key = os.getenv('API_KEY')

client = OpenAI(
    api_key=os.getenv('API_KEY'),
    base_url=os.getenv('API_BASE') +'/v1'
)
```

### Create fine-tuning job

Creates a fine-tuning job which begins the process of creating a new model from a given dataset.

**Endpoint**: `POST /fine_tuning/jobs`

**Description**: Create a fine-tuning job.

**Parameters**:
- **training_file** (string, required): File ID of the training file to use. This can be obtained via [List Uploaded Files](### List Uploaded Files) 
- **model** (string, required): The model to fine-tune.
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

```python
client.fine_tuning.jobs.create(
  training_file="fine-tune-fine-tune-jsonl-filtered_germanrag",
  model="Meta-Llama-3.1-8B-Instruct",
  hyperparameters={
    "n_epochs":2,
  }
)
```

Output:
```
FineTuningJob(id='3b67a28a-6b96-429b-a7eb-7f2a00f664ec', created_at='2024-06-27T09:24:33.443283+00:00', error=None, fine_tuned_model=None, finished_at=None, hyperparameters=Hyperparameters(n_epochs=2, batch_size=1), model='Meta-Llama-3.1-8B-Instruct', object='fine-tune.job', organization_id=None, result_files=None, status='queued', trained_tokens=None, training_file='fine-tune-fine-tune-jsonl-filtered_germanrag', validation_file=None, integrations=[])
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

```python
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
            "id": "3cd2a3ef-0a9a-491a-8f8c-de7f1560af6f",
            "object": "fine-tune",
            "model": "Meta-Llama-3-8B-Instruct",
            "created_at": "2024-06-27T09:21:22.712964+00:00",
            "status": "stopped",
            "training_file": "modelperm-51b6b4d619a84dfa866d09c2bc6dcec2-fine-tune-demo",
            "hyperparameters": {
                "n_epochs": 2,
                "batch_size": 1
            }
        },
        {
            "id": "3b67a28a-6b96-429b-a7eb-7f2a00f664ec",
            "object": "fine-tune",
            "model": "Meta-Llama-3.1-8B-Instruct",
            "created_at": "2024-06-27T09:24:33.443283+00:00",
            "status": "queued",
            "training_file": "fine-tune-fine-tune-jsonl-filtered_germanrag",
            "hyperparameters": {
                "n_epochs": 2,
                "batch_size": 1
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

```python
events = client.fine_tuning.jobs.list_events(
    fine_tuning_job_id="3b67a28a-6b96-429b-a7eb-7f2a00f664ec",
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
- **fine_tuning_job_id** (string, required): The ID of the fine-tuning job to cancel.

**Response**:
- **id** (string): Unique identifier for the fine-tune job.
- **object** (string): Object type, always `fine-tune`.
- **model** (string): Model being fine-tuned.
- **created_at** (string): Timestamp when the job was created.
- **status** (string): Updated status of the job.
- **training_file** (string): Training file used for fine-tuning.
- **hyperparameters** (object): Hyperparameters used for fine-tuning.

```python
client.fine_tuning.jobs.cancel("3b67a28a-6b96-429b-a7eb-7f2a00f664ec")
```
Output
```
FineTuningJob(id='3b67a28a-6b96-429b-a7eb-7f2a00f664ec', created_at='2024-06-27T09:24:33.443283+00:00', error=None, fine_tuned_model=None, finished_at=None, hyperparameters=Hyperparameters(n_epochs=2, batch_size=1), model='llama3_8b', object='fine-tune', organization_id=None, result_files=None, status='stopped', trained_tokens=None, training_file='modelperm-51b6b4d619a84dfa866d09c2bc6dcec2-fine-tune-demo', validation_file=None, integrations=[])
```

# LM Benchmarking & Monitoring
In the Fine-Tuning API, an benchmarking pipeline for the fine-tuned LLM model is integrated using state-of-the-art benchmarking frameworks: LM Evaluation Harness and the Needle in a Haystack method for LLM evaluation.
Additionally, MLflow is used to monitor both the training and benchmarking processes. You can view your training and benchmarking scores at: https://mlflow.llm-serving-dev.llmhub.t-systems.net.

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


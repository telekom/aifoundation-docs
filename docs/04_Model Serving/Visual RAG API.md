---
sidebar_position: 5
id: visualrag
title: Visual RAG
tags:
  - OpenAI API
  - RAG
  - Visual RAG
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

**Visual RAG is a beta feature. If you are interested in being an early bird and trying it out, you are most welcomed to contact: AlFoundation@t-systems.com**

This document introduce our Visual RAG API and outlines how to upload and operate files, as well as to ingest to the VisualRAG system and perform searching. The API is compatible with the OpenAI API standard.

Our Visual RAG index your file in **both text and image**. By combining the two indexing methods, it is able to take the best of both worlds: The stability of text indexing as well as the flexibility and informativity of visual indexing. In comparison to conventional text-based RAG systems, Visual RAG can retrieve the information that only exists in graphs, charts etc. while text-based RAG cannot. Moreover, Visual RAG can typically overcome various file parsing issues that currently text-RAGs struggle with. For example, parsing tables in PDF files, or parsing paragraphs under free format such as PPTX.

## Visual RAG API workflow

Visual RAG supports the following formats: PDF, PPTX, DOCX, HTML and PNG.

## Set-ups
To have access to this feature, you need to firstly contact: AlFoundation@t-systems.com. We will deploy a safe and isolated storage instance just for your project.

Once you get a "ready" signal from us, you can prepare your environment by doing the followings:

### Dependencies requirements

```py
pip install openai
```

### Setting Environment Variables

First, set the environment variables for the API base URL and API key.

In terminal:

```
export API_BASE=https://llm-server.llmhub.t-systems.net/v1
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

## Files Operations

### To upload a file
To upload a file for visual-rag purposes, provide "purpose" as "visual-rag".

```py
file_path = "/path/to/your_file.pdf"
client.files.create(
  file=open(file_path, "rb"),
  purpose="visual-rag"
)
```

This would return a ```FileObject``` containing the file id for the file you just uploaded.

**Output:**

```
FileObject(id='file-abc123', bytes=1, created_at='2024-10-22T15:10:45.770750+02:00', filename='your_file.pdf', object='file', purpose='visual-rag', status='uploaded', expires_at=None, status_details=None, userId='your_user_id', groupId='your_group_id', createdAt='2024-10-22T15:10:45.770750+02:00', projectId='your_project_id')
```

#### Request Body

**file** file: `Required`

The File object (not the file name) to be uploaded. 

**purpose** string:`Required`

The intended purpose of the uploaded file. Use "visual-rag" for Visual RAG.

### To Get the Information of a File

```py
file_id='file-abc123'
client.files.retrieve(file_id)
```

**Output:**
```
FileObject(id='file-abc123', bytes=1, created_at='2024-10-22T15:10:45.770750+02:00', filename='your_file.pdf', object='file', purpose='visual-rag', status='uploaded', expires_at=None, status_details=None, userId='your_user_id', groupId='your_group_id', createdAt='2024-10-22T15:10:45.770750+02:00', projectId='your_project_id')
```

#### Request Body

**file_id** string: `Required`

The id of the file to be retrieved. This ID can be obtained from the list files function.

### List All Uploaded Files

```py
# Iterate over the files and print their details
file_list = client.files.list(purpose="visual-rag")
for file_obj in file_list.data:
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
Filename: your_file.pdf
Object: file
Purpose: visual-rag
----------------------------------------
```

### Delete File

Delete a specific file by its ID.

```py
file_id = "file-abc123"
client.files.delete(file_id)
```

**Output:**

```
FileDeleted(id='file-abc123', deleted=True, object='file')
```

#### Request Body

**file_id** string: `Required` 

The ID of the file to be deleted. This ID can be obtained from the list files function.

## Vector Stores Operations

After you sorted out the file-upload, it is time to ingest the files into your vector database. To do that, you firstly need to create a vector store.

### Create a Vector Store

```py
client.vector_stores.create(
    name="my_vs",
    chunking_strategy={
        "text_embedding_model": "text-embedding-bge-m3", # any text embedding model of your choice
        "vision_embedding_model": "tsi-embedding-colqwen2-2b-v1" # any vision embedding model of your choice
    }
)
```

**Output**

```
VectorStore(id='xyz-456', created_at='2025-11-28T09:32:37.776386', file_counts=FileCounts(cancelled=0, completed=0, failed=0, in_progress=0, total=0), last_active_at=None, metadata={'text_embedding_model': 'text-embedding-3-large', 'vision_embedding_model': 'tsi-embedding-colqwen2-2b-v1'}, name='my_vs', object='vector_store', status='completed', usage_bytes=0, expires_after=None, expires_at=None)
```

#### Request Body

**name** string: `Required` 

The name of your vector store. The name has to be unique among all the vector stores that you created.

**chunking_strategy** dictonary: `Required` 

Contains the models for indexing in both ways: the value for ```text_embedding_model``` and ```vision_embedding_model```should be the model name of a text embedding model and vision embedding model of your choice. 

### List All Vector Stores

```py
vectorstores_list = client.vector_stores.list()
for vector_store in vectorstores_list:
    print(vector_store.name)
    print(vector_store.id)
    print(vector_store.file_counts)
    print("-" * 40)
```

**Output**
```
my_vs
xyz-456
FileCounts(cancelled=0, completed=0, failed=0, in_progress=0, total=0)
----------------------------------------
```

### Ingest a File to a Vector Store

```py
vs_id = "xyz-345"
file_id="file-abc123"
client.vector_stores.files.create(
    vector_store_id=vs_id,
    file_id= file_id,
    chunking_strategy={
        "chunk_size": 1024,
        "chunk_overlap": 100,
    }
)
```

**Output**

```
VectorStoreFile(id='file-abc123', created_at='2025-12-01T13:36:04.483091', last_error=None, object='vector_store.file', status='completed', usage_bytes=0, vector_store_id='xyz-456', attributes=None, chunking_strategy=None)
```

#### Request Body

**vector_store_id** string: `Required` 

The id of your vector store. This can be retrieved by using the ```vector_store.list``` function.

**file_id** String: `Required`

The id of your file. This can be retrieved by using the ```files.list``` function.

**chunking_strategy** dictonary: `Optional` 

Contains the chunking parameters: ```chunk_size``` defines the size of the chunk during ingestion. Defaults to 1024. ```chunk_overlap``` defines the overlap size between chunks. Defaults to 100.



### List All Ingested Files

```py
vs_id = "xyz-456"
vs_file_list = client.vector_stores.files.list(
    vector_store_id=vs_id
)

for file in vs_file_list.data:
    print(file.id)
    print(file.vector_store_id)
    print(file.created_at)
    print("-" * 40)
```

**Output**

```
file-abc123
xyz-456
2025-12-01T13:36:04.483000
----------------------------------------
```

#### Request Body

**vector_store_id** string: `Required` 

The id of your vector store. This can be retrieved by using the ```vector_store.list``` function.

### Get the Information for an Ingested File

```py
vs_id = "xzy-456"
file_id="file-abc123"
client.vector_stores.files.retrieve(
    vector_store_id=vs_id,
    file_id= file_id
)
```

**Output**
```
VectorStoreFile(id='file-abc123', created_at='2025-11-28T10:09:17.583000', last_error=None, object='vector_store.file', status='in_progress', usage_bytes=0, vector_store_id='xyz-456', attributes=None, chunking_strategy=None)
```

#### Request Body

**vector_store_id** string: `Required` 

The id of your vector store. This can be retrieved by using the ```vector_store.list``` function.

**file_id** String: `Required`

The id of your file. This can be retrieved by using the ```files.list``` function.


### Delete an Ingested File from a Vector Store

```py
vs_id = "my_vs"
file_id="file-abc123"
client.vector_stores.files.delete(
    vector_store_id=vs_id,
    file_id=file_id
)
```

**Output**

```
VectorStoreFileDeleted(id='file-abc123', deleted=True, object='vector_store.file.deleted')
```

#### Request Body

**vector_store_id** string: `Required` 

The id of your vector store. This can be retrieved by using the ```vector_store.list``` function.

**file_id** String: `Required`

The id of your file. This can be retrieved by using the ```files.list``` function.

### Delete a Vector Store

```py
vs_id = "xyz-456"
client.vector_stores.delete(
    vector_store_id=vs_id
)
```

**Output**

```
VectorStoreDeleted(id='xyz-456', deleted=True, object='vector_store.deleted')
```

#### Request Body

**vector_store_id** string: `Required` 

The id of your vector store. This can be retrieved by using the ```vector_store.list``` function.


## Retrieval

```py
vs_id = "xyz-456"
USER_QUERY = "Which new features are supported in this DeepStream SDK?"

results = client.vector_stores.search(
    vector_store_id=vs_id,
    query=USER_QUERY,
    extra_body = {
        "top_k_texts": 3,
        "top_k_images": 3,
    }
)

for result in results:
    print(result)
```



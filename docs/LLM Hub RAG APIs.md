---
sidebar_position: 6
---
# LLM HUB RAG APIs

### Get Started

#### Introduction

You can interact with the API through HTTP requests from any language.

#### Authentication

None as of now

# Endpoints

# Session Management

Session endpoints are used to manage user chat sessions.

# List Sessions

|

`GET http:``//<hostname>:<port>/api/v3/session/<user_id>`

 |

Returns list of user sessions belongs to the user.

Path Parameters:

user_id: string Required

Unique user identifier

Returns:

List of session objects

Example Request:

|

`curl -X` `'GET'` `\`

`'<http://localhost:8032/api/v3/session/test_1'>` `\`

`-H` `'accept: application/json'`

 |

Response:

|

`[`

`{`

`"sessionId"``:` `"session_1"``,`

`"sessionTitle"``:` `"session_1"``,`

`"updatedAt"``:` `"2024-04-19T15:59:06.902000"`

`}`

`]`

 |

# Create Session

|

`POST http:``//<hostname>:<port>/api/v3/session`

 |

Creates a session for user to start conversations with LLM.

Request Body:

userId : string Required

Unique user identifier

sessionId: string Required

Unique session identifier

Returns:

UserId/SessionId Message

Example Request:

|

`curl -X` `'POST'` `\`

`'<http://localhost:8032/api/v3/session'>` `\`

`-H` `'accept: application/json'` `\`

`-H` `'Content-Type: application/json'` `\`

`-d '{`

`"userId"``:` `"test_1"``,`

`"sessionId"``:` `"session_1"`

`}'`

 |

Response:

|

`{`

`"id"``:` `"test_1/session_1"`

`}`

 |

# Remove Session

|

`DELETE http:``//<hostname>:<port>/api/v3/session`

 |

Removes an existing session created by user.

Request Body:

userId : string Required

Unique user identifier

sessionId: string Required

Unique session identifier

Returns:

Message

Example Request:

|

`curl -X` `'DELETE'` `\`

`'<http://localhost:8032/api/v3/session'>` `\`

`-H` `'accept: application/json'` `\`

`-H` `'Content-Type: application/json'` `\`

`-d '{`

`"userId"``:` `"test_1"``,`

`"sessionId"``:` `"session_2"`

`}'`

 |

Response:

|

`{`

`"message"``:` `"Session successfully deleted"`

`}`

 |

# Configuration Management

# Get Models

|

`GET http:``//<hostname>:<port>/api/v3/models`

 |

Returns list of available LLMs.

Returns:

List of models.

Example Request:

|

`curl -X` `'GET'` `\`

`'<http://localhost:8032/api/v3/models'>` `\`

`-H` `'accept: application/json'`

 |

Response:

|

`[`

`"GPT-3.5"``,`

`"GPT-4"``,`

`"Llama-2"``,`

`"Mixtral"``,`

`"CodeLlama-2"`

`]`

 |

# Get Configuration

|

`GET http:``//<hostname>:<port>/api/v3/conf/{user_id}/{session_id}`

 |

Returns configuration set by user in a particular session.

Path Parameters:

userId : string Required

Unique user identifier

sessionId: string Required

Unique session identifier

Returns:

Smartchat configuration object

Example Request:

|

`curl -X` `'GET'` `\`

`'<http://localhost:8032/api/v3/conf/test_1/session_1'>` `\`

`-H` `'accept: application/json'`

 |

Response:

|

`{`

`"userId"``:` `"test_1"``,`

`"sessionId"``:` `"session_1"``,`

`"modelSettings"``: {`

`"promptTemplate"``:` `"Answer the following question: "``,`

`"temperature"``:` `0.1``,`

`"chatModel"``:` `"Mixtral"``,`

`"topP"``:` `0.95``,`

`"topK"``:` `40``,`

`"stream"``:` `true``,`

`"maxTokens"``:` `2048``,`

`"similarityThreshold"``: -``99``,`

`"chunkSimilarityTopK"``:` `5`

`}`

`}`

 |

# Update Configuration

|

`POST http:``//<hostname>:<port>/api/v3/conf`

 |

Updates configuration for a session to tune the parameters for LLM and RAG retrieval.

Request Body:

userId : string Required

Unique user identifier

sessionId: string Required

Unique session identifier

modelSettings: object Required

promptTemplate: string Optional

System prompt to specify certain instructions to the LLM

temperature: number Optional

What sampling temperature to use, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

chatModel: string Required

Name of the LLM to be used in the session

topP: number Optional

An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

topK: integer Optional

Sampling samples tokens with the highest probabilities until the specified number of tokens is reached

stream: boolean Optional

If set, partial message deltas will be sent, like in ChatGPT. Tokens will be sent as data-only as they become available.

maxTokens: integer Optional

The maximum number of tokens that can be generated in the chat completion.

The total length of input tokens and generated tokens is limited by the model's context length.

similarityThreshold: number Optional

The similarity threshold below which the retrieved nodes will be dropped and not be used for RAG.

chunkSimilarityTopK: integer Optional

The number of nodes/chunks to be retrieved from the Vector Store for RAG.

Returns:

Message

Example Request:

|

`curl -X` `'POST'` `\`

`'<http://localhost:8032/api/v3/conf'>` `\`

`-H` `'accept: application/json'` `\`

`-H` `'Content-Type: application/json'` `\`

`-d '{`

`"userId"``:` `"test_1"``,`

`"sessionId"``:` `"session_1"``,`

`"modelSettings"``: {`

`"chatModel"``:` `"Llama-2"`

`}`

`}'`

 |

Response:

|

`{`

`"message"``:` `"Config saved successfully!"`

`}`

 |

# File Management

# Upload File

|

`POST http:``//<hostname>:<port>/api/v3/file/user/{user_id}`

 |

Uploads the file from user local system to application environment. The size of the file should be maximum 7 MB.

Path parameters:

user_id: string Required

Unique user identifier

Request body:

file: object Required

The File object (not file name) to be uploaded.

Returns:

Message

Example Request:

|

`curl -X` `'POST'` `\`

`'<http://localhost:8032/api/v3/file/user/test_1'>` `\`

`-H` `'accept: application/json'` `\`

`-H` `'Content-Type: multipart/form-data'` `\`

`-F` `'file=@Service.pdf;type=application/pdf'`

 |

Response:

|

`[`

`"success"`

`]`

 |

# Remove File

|

`DELETE http:``//<hostname>:<port>/api/v3/file/user/{user_id}?{file_name}`

 |

Removes a file from physical path on application environment.

Path Parameters:

user_id: string Required

Unique user identifier

file: object Required

The file name to be deleted.

Returns:

None

Example Request:

|

`curl -X` `'DELETE'` `\`

`'<http://localhost:8032/api/v3/file/user/test_1?file=Service.pdf'>` `\`

`-H` `'accept: application/json'`

 |

# Context Management

# Get Session Context

|

`GET http:``//<hostname>:<port>/api/v3/context/current/{user_id}/{session_id}`

 |

Returns the files/contexts added to a particular user session.

Path Parameters:

user_id : string Required

Unique user identifier

session_id: string Required

Unique session identifier

Returns:

Context object.

Example Request:

|

`curl -X` `'GET'` `\`

`'<http://localhost:8032/api/v3/context/current/test_1/session_1'>` `\`

`-H` `'accept: application/json'`

 |

Response:

|

`[`

`{`

`"name"``:` `"bedienungsanleitung-speedport-smart-3.pdf"``,`

`"hash"``:` `"a04a15693997a4fee349e90fc2e7b0c8"``,`

`"path"``:` `"uploads/test_1/doc/bedienungsanleitung-speedport-smart-3.pdf"``,`

`"user_id"``:` `"test_1"``,`

`"created_at"``:` `"2024-04-19T15:50:09.103000"``,`

`"updated_at"``:` `"2024-04-19T15:50:09.103000"``,`

`"origin_name"``:` `"bedienungsanleitung-speedport-smart-3.pdf"``,`

`"session_id"``:` `"session_1"``,`

`"id"``:` `"662feadf94ec3e93b7111a04"``,`

`"status"``:` `null`

`}`

`]`

 |

# Add Session Context

|

`POST http:``//<hostname>:<port>/api/v3/context/file`

 |

Adds a file/context to a particular user session.

Request Body:

userId : string Required

Unique user identifier

sessionId: string Required

Unique session identifier

files: list Required

name: string Required

Name of the file

metadata: object Optional

Metadata like author, category, etc.

Returns:

Docstore insert Id

Example Request:

|

`curl -X` `'POST'` `\`

`'<http://localhost:8032/api/v3/context/file'>` `\`

`-H` `'accept: application/json'` `\`

`-H` `'Content-Type: application/json'` `\`

`-d '{`

`"userId"``:` `"test_1"``,`

`"sessionId"``:` `"session_1"``,`

`"files"``: [`

`{`

`"name"``:` `"otc.pdf"``,`

`"metadata"``: {`

`"Author"``:` `"Open Telekom Cloud"`

`}`

`}`

`]`

`}'`

 |

Response:

|

`{`

`"id"``: [`

`"662fed349a0d476944a8f1ef"`

`]`

`}`

 |

# Remove Session Context

|

`DELETE http:``//<hostname>:<port>/api/v3/context/file`

 |

Removes a file/context from a particular user session.

Request Body:

userId : string Required

Unique user identifier

sessionId: string Required

Unique session identifier

removeSource: boolean Required

Set to true if physical file is also required to be removed

files: list Required

List of file names to be removed from context

Returns:

Message

Example Request:

|

`curl -X` `'DELETE'` `\`

`'<http://localhost:8032/api/v3/context/file'>` `\`

`-H` `'accept: application/json'` `\`

`-H` `'Content-Type: application/json'` `\`

`-d '{`

`"userId"``:` `"test_1"``,`

`"sessionId"``:` `"session_1"``,`

`"removeSource"``:` `false``,`

`"files"``: [`

`"otc.pdf"`

`]`

`}'`

 |

Response:

|

`{`

`"message"``:` `"User context successfully deleted! Warning: None"`

`}`

 |

# Chat

# AskChat

|

`POST http:``//<hostname>:<port>/api/v3/askChat`

 |

Request Body:

userId : string Required

Unique user identifier

sessionId: string Required

Unique session identifier

prompt: string Required

User question

Returns:

LLM response object with RAG sources and nodes content 

Example Request:

|

`curl -X` `'POST'` `\`

`'<http://localhost:8032/api/v3/askChat'>` `\`

`-H` `'accept: application/json'` `\`

`-H` `'Content-Type: application/json'` `\`

`-d '{`

`"userId"``:` `"test_1"``,`

`"sessionId"``:` `"session_1"``,`

`"prompt"``:` `"What is OTC?"`

`}'`

 |

Response:

`{`

`"userId"``:` `"test_1"``,`

`"prompt"``:` `"What is OTC?"``,`

`"response"``:` `"OTC stands for Open Telekom Cloud, which is a cloud computing service provided by Deutsche Telekom AG. It offers a range of computing, storage, and network services to businesses and individuals."``,`

`"sources"``: [`

`{`

`"pageLabel"``:` `"13"``,`

`"fileName"``:` `"otc.pdf"``,`

`"metadata"``: {`

`"Author"``:` `"Open Telekom Cloud"``,`

`"hash"``:` `"416721e9718239c08a51bad61a2f254c"`

`},`

`"similarityScore"``: -``0.7444106340408325``,`

`"text"``:` `"Open Telekom Cloud  Overview of Billing and Price Models13\nThere are different scenarios for direct connections to the Open Telekom Cloud (OTC). With Ethernet Connect one-\nway or two-way (active/ passive) can be connected. MPLS always has a two-way connection in active/passive mode.  \nWe always recommend a redundant connection. Currently, only a two-path active/passive connection is supported.\nBilling unit\none-way two-way\nactive/passive\n1 X\n1 X\n1 X1 X\n2 X2 XQuantity to calculate\nPLAS Bandwidth\nDirect Connect Bandwidth/Port\nSetup  \n(Direct Connect)One-off fee\nFig.14: Calculation volume for PLAS\nDirect Connect and Private Access Link example\n50 MBIT\n100 Mbit\n1 GBitCosts Direct \nConnectCosts Private  \nAccess Linktotal costs per month\n with 2 x DC +1 x PLASBandwith\n68.55 €\n108.56 €77.53 €218.73 €\n483.99 €232.69 €287.28 €\n592.55 €310.22 €\nDomain Name Service \nWith the Domain Name Service, two components are included in the billing: First, the amount of domains created, \nand second, the number of queries/requests. The domains created are billed by the hour, the queries are billed \nper million. With intensive use of the service (more than a billion inquiries per month), users receive a discount \nvia scales.\nOher Network Services\nOther billing models are used for the remaining Open Telekom Cloud network services. Elastic IP, Elastic Load \nBalancer, NAT Gateway Service and VPC Endpoint are charged „pay as you go" according to usage hours.\nSecurity  \nMany Security Services of the Open Telekom Cloud are free, including identity and account management, the  \nanti-DDos-Service, and EVS and OBS encryption.\nKey Management Service\nThe use of Key Management Service (KMS) incurs usage-based charges. The usage of the generated keys is \ncalculated on an hourly basis. The free contingent for KMS comprises 20,000 API calls. In addition, API calls incur \ncharges: 1,000 calls generate costs of 0.3 cents.Already included\n -Cloud Eye\n -Anti-DDoS\n -Identity and \nAccess  \nManagement"`

`},`

`{`

`"pageLabel"``:` `"11"``,`

`"fileName"``:` `"otc.pdf"``,`

`"metadata"``: {`

`"Author"``:` `"Open Telekom Cloud"``,`

`"hash"``:` `"416721e9718239c08a51bad61a2f254c"`

`},`

`"similarityScore"``: -``0.7214524745941162``,`

`"text"``:` `"Open Telekom Cloud  Overview of Billing and Price Models11\n                                                                                    \nData Access Speed\nStorage Price Price Request\nData Access Speed\nPrice Request Storage Price\nData Access Speed\nPrice Request Storage Price\n                                                                                                                                                                                          \nFig.10: Speed and Price comparison for Standard, Warm, and Cold Object Storage \nNetwork \nCloud computing is defined as a sourcing model that provides computing and storage capacities from pools via \nnetworks. Accordingly, the network is also an integral component of cloud computing. VPCs separate the resour -\nces of different tenants from each other, VPN and Elastic IP enable secure access via the Internet, etc. Data trans -\nfer to and within the Open Telekom Cloud is free of charge; downloading and sending out data are priced on a \nstepped scale based on data volumes. The entire outbound data volume for a calendar month is added up and \nused as a basis for billing. At Outbound, we differentiate the data volume into to OBS outbound and VPC out -\nbound. We have summarized the free and paid data transfer in the table below.\n--\n-- Inbound, free of charge\nInbound, free of charge Inbound, free of chargeinternal, free of charge OBS-Outbound, fee-based\nVPC-Outbound, fee-based\n--Goal\nOBSOBSSource\nVPCVPC\nInternetInternet\nFig. 11: Data Transfers fee-based and free of charge\nNetwork example\nYou have 100 TB of data stored in the Open Telekom Cloud. In the course of the month, you added another \n15 TB. In the same period, users used the stored data. In total, 20 TB of data were downloaded by users \naccessing the data. Only the downloaded data (Internet traffic outbound upflow) incur charges. This data \ntraffic reaches the fourth billing scale. COLD OBS WARM OBS STANDARD OBS"`

`},`

`{`

`"pageLabel"``:` `"1"``,`

`"fileName"``:` `"otc.pdf"``,`

`"metadata"``: {`

`"Author"``:` `"Open Telekom Cloud"``,`

`"hash"``:` `"416721e9718239c08a51bad61a2f254c"`

`},`

`"similarityScore"``: -``0.720503568649292``,`

`"text"``:` `"Open Telekom Cloud  Overview of Billing and Price Models1\nOpen Telekom Cloud  \nOverview of  \nBilling and Price Models"`

`},`

`{`

`"pageLabel"``:` `"7"``,`

`"fileName"``:` `"otc.pdf"``,`

`"metadata"``: {`

`"Author"``:` `"Open Telekom Cloud"``,`

`"hash"``:` `"416721e9718239c08a51bad61a2f254c"`

`},`

`"similarityScore"``: -``0.7178670763969421``,`

`"text"``:` `"Open Telekom Cloud  Overview of Billing and Price Models7\n                             \nJuly\n€ 07/1 -7/29\n28 days x 24 h + 17 h = 689 h\n    - 744 h\n        - 55 hReserved Contingent\nCost of ElasticRestOperating Time\ns2.large.4\nIn the reserved upfront mode,  a fixed amount is billed at the start of the term. Contrary to the regular reserved \nmodels it is not possible to switch to a larger instance or a new generation.  \nIn the subsequent months, the reserved upfront instances are also shown on the bill as a reserved upfront \npackage, without being charged for. The credit balance „depletes" over the selected term, with the pro rata \namount available each month (hours x days). The only difference from the example above is that the complete \namount for 8,760 hours (365 days x 24 hours) is billed at the end of the month in which the order is placed.\nDedicated Host\nDedicated hosts are also available on the Open Telekom Cloud. Within the technical parameters, several separate \nvirtual machines (VMs) can be set up and modified on these reserved resources. The bill shows only the licenses \nfor the VMs, no costs are incurred for open Linux. The same billing models as for ECS also apply for dedicated \nhosts: elastic, reserved and reserved upfront, with the rates applicable for the hosts.\nImage Management Service  \nThe use of the Image Management Service is free of charge. But when storing private images the used object \nstorage (OBS) is billed. These costs are integrated into the OBS invoice item. There are no traffic costs; the  \nstorage of public images is of course completely free of charge.\nCloud Container Engine\nThe Cloud Container Engine (CCE) is also classified as a computing service on the Open Telekom Cloud. CCE \nis free for up to 50 nodes (not HA). If a larger cluster or an HA cluster is set up, there are hourly costs for using \nthe service. \nStorage\nThe Open Telekom Cloud offers five storage types: Elastic Volume Service (EVS, block storage -- always linked to \nvirtual machines), Object Storage Service (OBS), Cloud Server/Volume Backup Service (CSBS/VBS), Storage \nDisaster Recovery Services (SDRS), and Scalable File Storage (SFS). The pricing models vary between the object \nstorage and the block-storage offers (EVS, VBS). In general, object storage is VM-independent and a more cost-\neffective storage option, whereas block storage enables fast data access thanks to a directly connected virtual \nhard drive.\nThe reference period here is also the relevant calendar month. The average volume of allocated storage is deter -\nmined (in GB) and used as the basis for billing. In the block storage option, prices rise on a linear basis in line \nwith the data volume. For object storage, prices are based on (discounted) stepped scales. The scales are of \nspecific sizes and stack on top of each other. The higher the scale, the lower the costs for the storage volumes \nallocated in that scale. The exception to this rule is that the basic volume of 5 GB for standard object storage is \nfree of charge.Already included\n5 GB Basic \nVolume  \nOBS StandardAlready included\nCloud Container \nEngine (CCE)"`

`},`

`{`

`"pageLabel"``:` `"8"``,`

`"fileName"``:` `"otc.pdf"``,`

`"metadata"``: {`

`"Author"``:` `"Open Telekom Cloud"``,`

`"hash"``:` `"416721e9718239c08a51bad61a2f254c"`

`},`

`"similarityScore"``: -``0.7160099744796753``,`

`"text"``:` `"Open Telekom Cloud  Overview of Billing and Price Models8\ntotal \ncost\n5 GB 1 TB 10 TB 50 TB 500 TB 1PB 5 PB 10 PB\n(not true to scale)EVS, \nVBS, SFS OBS\nFig.6: Price pattern of EVS and OBS in comarison with increasing use \nCALCULATION BASIS\nAccess options\nPrice pattern\nCost of RequestOBS Criteria\namount of data\ndeclining scaled pricesaccess from internet\ncost per request\nexemption for 5 GBallocated storage/backup volume\nfixed/GB -  linear  no access from the internet/  \ndirect connection to ECS VM\ninclusive\n(SAS,SSD,SATA, \nSAS boosted, SSD boosted)EVS/VBS\nSpecial Characteristics\nFig.7: Comparison OBS and EVS/VBS\nElastic Volume Storage/Volume Backup Storage/Scalable File Service \nElastic Volume Storage (EVS) can be ordered in three classes. Prices also vary according to access speed. \nMonthly costs are determined on the one hand by the allocated storage volumes in GB, and on the other by the \nduration of their use. I.e., if the storage is only provided for half a month, then only half of the costs are incurred. \nElastic Volume Storage is deemed to be provided even if the associated instance is stopped, as long as the storage  \nhas not been deleted. EVS pricing model is also applied to Scalable File Service and Cloud Server Backup Service.\nOnly the ordered/allocated storage volumes are relevant when calculating the EVS, not the specific data \nvolumes. There is a difference using VBS or SFS: In this cases only the actual stored data is billed.\nThe amount of storage used (OBS) or allocated (EVS) is multiplied by the number of usage hours and divided by \nthe total number of hours for the month. This gives the average storage used in a month.\nThe average storage allocated in a month is multiplied by the basic price per GB. This results in a linear increase \nin costs as the volume of allocated storage increases.Pricing Model \nalso valid for \nSFS and CSBS"`

`}`

`]`

`}`
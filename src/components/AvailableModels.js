import React, { useState } from 'react';
import { DE, EU } from 'country-flag-icons/react/3x2'; 

function AvailableModels() {
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  let models = [
    {
      id: "DeepSeek-R1-Distill-Llama-70B",
      name: "DeepSeek R1 Distill Llama 70B",
      provider: "DeepSeek",
      hosted: "OTC",
      availability: "Available",
      flag: DE
    },
    {
      id: "DeepSeek-Coder-V2-Lite-Instruct",
      name: "DeepSeek Coder V2 Lite",
      provider: "DeepSeek",
      hosted: "OTC",
      availability: "Available",
      flag: DE
    },
    {
      id: "Llama-3.3-70B-Instruct",
      name: "Llama 3.3 70B",
      provider: "Meta",
      hosted: "OTC",
      availability: "Available",
      flag: DE
    },
    {
      id: "Llama-3.1-405B-Instruct-US",
      name: "Llama 3.1 405B",
      provider: "Google",
      hosted: "GCP",
      availability: "Available",
      flag: EU
    },
    {
      id: "Mistral-Large-2407",
      name: "Mistral Large 2407",
      provider: "Mistral AI",
      hosted: "GCP",
      availability: "Available",
      flag: EU
    },
    {
      id: "Mistral-Nemo-Instruct-2407",
      name: "Mistral Nemo 2407",
      provider: "Mistral AI",
      hosted: "OTC",
      availability: "Available",
      flag: DE
    },
    {
      id: "Mistral-Small-24B-Instruct-2501",
      name: "Mistral Small 24B 2501",
      provider: "Mistral AI",
      hosted: "OTC",
      availability: "Available",
      flag: DE
    },
    {
      id: "Qwen2.5-VL-72B-Instruct",
      name: "Qwen 2.5 VL 72B",
      provider: "Alibaba",
      hosted: "OTC",
      availability: "Available",
      flag: DE
    },
    {
      id: "Qwen2.5-Coder-32B-Instruct-FP8",
      name: "Qwen 2.5 Coder 32B",
      provider: "Alibaba",
      hosted: "OTC",
      availability: "Available",
      flag: DE
    },
    {
      id: "QWEN-VL2-7B",
      name: "Qwen VL2 7B",
      provider: "Alibaba",
      hosted: "OTC",
      availability: "Available",
      flag: DE
    },
    {
      id: "Teuken-7B-Instruct-v04",
      name: "Teuken 7B v0.4",
      provider: "OpenGPT-X",
      hosted: "OTC",
      availability: "Available",
      flag: DE
    },
    {
      id: "claude-3-7-sonnet",
      name: "Claude 3.7 Sonnet",
      provider: "Anthropic",
      hosted: "GCP",
      availability: "Available",
      flag: EU
    },
    {
      id: "claude-3-5-sonnet-v2",
      name: "Claude 3.5 Sonnet v2",
      provider: "Anthropic",
      hosted: "GCP",
      availability: "Available",
      flag: EU
    },
    {
      id: "claude-3-5-sonnet",
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      hosted: "GCP",
      availability: "Available",
      flag: EU
    },
    {
      id: "gemini-2.0-flash",
      name: "Gemini 2.0 Flash",
      provider: "Google",
      hosted: "GCP",
      availability: "Available",
      flag: EU
    },
    {
      id: "gemini-1.5-flash",
      name: "Gemini 1.5 Flash",
      provider: "Google",
      hosted: "GCP",
      availability: "Available",
      flag: EU
    },
    {
      id: "gemini-1.5-pro",
      name: "Gemini 1.5 Pro",
      provider: "Google",
      hosted: "GCP",
      availability: "Available",
      flag: EU
    },
    {
      id: "gpt-4o",
      name: "GPT-4o",
      provider: "OpenAI",
      hosted: "Azure",
      availability: "Available",
      flag: EU
    },
    {
      id: "gpt-4-turbo-128k-france",
      name: "GPT-4 Turbo 128k France",
      provider: "OpenAI",
      hosted: "Azure",
      availability: "Available",
      flag: EU
    },
    {
      id: "gpt-35-turbo",
      name: "GPT-3.5 Turbo",
      provider: "OpenAI",
      hosted: "Azure",
      availability: "Available",
      flag: EU
    },
    {
      id: "text-embedding-ada-002",
      name: "Text Embedding Ada 002",
      provider: "OpenAI",
      hosted: "Azure",
      availability: "Available",
      flag: EU
    },
    {
      id: "text-embedding-bge-m3",
      name: "Text Embedding BGE M3",
      provider: "BAAI",
      hosted: "OTC",
      availability: "Available",
      flag: DE
    },
    {
      id: "jina-embeddings-v2-base-code",
      name: "Jina Embeddings v2 Base Code",
      provider: "JinaAI",
      hosted: "OTC",
      availability: "Available",
      flag: DE
    },
    {
      id: "jina-embeddings-v2-base-de",
      name: "Jina Embeddings v2 Base DE",
      provider: "JinaAI",
      hosted: "OTC",
      availability: "Available",
      flag: DE
    },
    {
      id: "Bce-Reranker",
      name: "BCE Reranker",
      provider: "BAAI",
      hosted: "OTC",
      availability: "Available",
      flag: DE
    },
    {
      id: "tsi-embedding-colqwen2-2b-v1",
      name: "TSI ColQwen2 2B v1",
      provider: "Community+TSI",
      hosted: "OTC",
      availability: "Available",
      flag: DE
    },
    {
      id: "whisper-large-v3-turbo",
      name: "Whisper Large v3 Turbo",
      provider: "OpenAI",
      hosted: "OTC",
      availability: "Available",
      flag: EU
    }
  ];

  const top_models = models.filter(model => model.name === "Llama 3.3 70B" || model.name === "DeepSeek R1 Distill Llama 70B" || model.name === "Teuken 7B v0.4");


  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {(showAll ? models : top_models).map((model, index) => (
        <div
          key={index}
          style={{
            flex: '1 1 30%',
            border: '1px solid \#ddd',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            backgroundColor: 'var(--ifm-card-background-color)', // Ensures background adapts to theme
            color: 'var(--ifm-font-color-base)' // Ensures text color adapts to theme
          }}
        > 
          <h4
            style={{
              color: 'var(--ifm-heading-color)',
              margin: 0,
              paddingRight: '15px', 
              paddingLeft: '15px', 
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
            }}
          >
            {model.name}
          </h4>
          <button
            onClick={() => navigator.clipboard.writeText(model.name)}
            title="Copy model ID"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              color: 'var(--ifm-font-color-base)',
            }}
          >
            <scale-icon-action-copy-paste accessibility-title="copy-paste" />
          </button>
          <p style={{ fontSize: '0.9em', color: 'var(--ifm-font-color-base)',marginBottom: '2px'  }}>
            Provider: <strong>{model.provider}</strong>
          </p>
          <p style={{ fontSize: '0.9em', color: 'var(--ifm-font-color-base)', alignItems: 'center', marginBottom: '14px'}}>
            Hosted on: <strong style={{ marginLeft: '4px' }}>{model.hosted}</strong>
            <model.flag style={{ marginLeft: '8px', width: '30px', height: '18px', position: 'relative', top: '4px' }} />
          </p>
          <span
            style={{
              backgroundColor: model.availability === 'Available' ? '#4caf50' : '#f57c00',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
            }}
          >
            {model.availability}
          </span>
          </div>
      ))}

      <div style={{ flexBasis: '100%', textAlign: 'center', marginTop: '16px' }}>
        <button
          onClick={handleShowMore}
          style={{
            backgroundColor: '#0070f3',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
}

export default AvailableModels;
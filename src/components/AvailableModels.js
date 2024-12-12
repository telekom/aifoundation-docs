import React, { useState } from 'react';
import { DE, US, FR, CN , EU, CH} from 'country-flag-icons/react/3x2'; // Importiere die benötigten Flaggen-Icons

function AvailableModels() {
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  const models = [
    { name: "Teuken 7B Instruct", provider: "OpenGPT-X", hosted:"OTC" ,availability: "Available", flag: DE },
    { name: "GPT-4-Omni", provider: "OpenAI", hosted:"Azure" ,availability: "Available", flag: EU },
    { name: "Claude 3.5 Sonnet", provider: "Anthropic", hosted:"GCP" ,availability: "Available", flag: EU },
    { name: "Llama-3.1-70B-Instruct", provider: "Meta", hosted:"OTC" ,availability: "Available", flag: DE },
    { name: "LLaVa-v1.6-13B", provider: "Community", hosted:"OTC" ,availability: "Available", flag: DE },
    { name: "Qwen2-VL-7B", provider: "Alibaba", hosted:"OTC" ,availability: "Available", flag: DE },
    { name: "Mixtral-8x7b-Instruct-v.01", provider: "Mistral AI", hosted:"OTC" ,availability: "Available", flag: DE },
    { name: "Mistral-Nemo-Instruct-2407", provider: "Mistral AI", hosted:"OTC" ,availability: "Available", flag: DE },
    { name: "Text-Embedding-Bge-m3", provider: "BAAI", hosted:"OTC" ,availability: "Available", flag: DE },
    { name: "Jina-Embeddings-V2-Base-de", provider: "Community", hosted:"OTC" ,availability: "Available", flag: DE },
    { name: "Jina-Embeddings-V2-Base-code", provider: "Community", hosted:"OTC" ,availability: "Available", flag: DE },
    { name: "DeepSeek-Coder-V2-Lite-Instruct", provider: "DeepSeek", hosted:"OTC" ,availability: "Available", flag: DE },
    { name: "Mistral-Nemo-Instruct-2407-Swiss", provider: "Mistral AI", hosted:"OTC" ,availability: "Available", flag: CH },
    { name: "Qwen2.5-Coder-7B-Instruct-Swiss", provider: "Alibaba", hosted:"OTC" ,availability: "Available", flag: CH },
    { name: "Qwen2-VL-7B-Instruct-Swiss", provider: "Alibaba", hosted:"OTC" ,availability: "Available", flag: CH },
    { name: "Bce-Reranker", provider: "BAAI", hosted:"OTC" ,availability: "Available", flag: DE },
    { name: "Llama-3.1-405B-Instruct", provider: "Google", hosted:"GCP" ,availability: "Available", flag: EU },
    { name: "Gemini 1.5 Pro", provider: "Google", hosted:"GCP" ,availability: "Available", flag: EU },
    { name: "Gemini 1.5 Flash", provider: "Google", hosted:"GCP" ,availability: "Available", flag: EU },
    { name: "Mistral-Large-2407", provider: "Mistral AI", hosted:"GCP" ,availability: "Available", flag: EU },
    { name: "GPT-4-32k", provider: "OpenAI", hosted:"Azure" ,availability: "Available", flag: EU },
    { name: "GPT-4-Turbo-128k-France", provider: "OpenAI", hosted:"Azure" ,availability: "Available", flag: EU },
    { name: "GPT-3.5-Turbo-0314", provider: "OpenAI", hosted:"Azure" ,availability: "Available", flag: EU },
    { name: "text-embedding-ada-002", provider: "OpenAI", hosted:"Azure" ,availability: "Available", flag: EU }
    
    
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {models.slice(0, showAll ? models.length : 3).map((model, index) => (
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
          <h4 style={{ color: 'var(--ifm-heading-color)' }}>{model.name}</h4>
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
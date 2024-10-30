import React, { useState } from 'react';

function AvailableModels() {
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  const models = [
    { name: "GPT-4-Omni", provider: "OpenAI (Azure)", availability: "Available" },
    { name: "Llama-3.1-70B-Instruct", provider: "Meta", availability: "Available" },
    { name: "Claude 3.5 Sonnet", provider: "Anthropic", availability: "Available" },
    { name: "Llama-3.1-405B-Instruct", provider: "Google", availability: "Available" },
    { name: "Gemini 1.5 Pro", provider: "Google", availability: "Available" },
    { name: "GPT-4-Turbo-2024-05-09", provider: "OpenAI (Azure)", availability: "Available" },
    { name: "Mixtral-8x7b Instruct v.01", provider: "Mistral AI", availability: "Available" },
    { name: "CodeLlama-2", provider: "Meta", availability: "Available" },
    { name: "LLaVA-NeXT", provider: "Community", availability: "Available" },
    { name: "GPT-3.5-Turbo-0314", provider: "OpenAI (Azure)", availability: "On request" },
    { name: "Claude 3 Opus", provider: "Anthropic", availability: "On request" },
    { name: "Gemini 1.5 Flash", provider: "Google", availability: "On request" },
    { name: "Mistral-Large-2407", provider: "Mistral AI", availability: "On request" },
    { name: "Mistral-Nemo-2407", provider: "Mistral AI", availability: "On request" },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {models.slice(0, showAll ? models.length : 3).map((model, index) => (
        <div
          key={index}
          style={{
            flex: '1 1 30%',
            border: '1px solid #ddd',
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
          <p style={{ fontSize: '0.9em', color: 'var(--ifm-font-color-base)' }}>
            Provider: <strong>{model.provider}</strong>
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

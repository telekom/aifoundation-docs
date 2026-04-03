import React, {useMemo, useState} from 'react';
import {useCapitalizeFirstLetter, useCountryHelper} from "../shared/lib";
import {PlansHistory} from "./PlansPageFeatures/PlansData/PlansModelData";

function AvailableModels() {
  const [showAll, setShowAll] = useState(false);
  const useCountry = useCountryHelper();

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  function normalizeId(name) {
      return name.replace(/\s+/g, "-");
  }

  function useModels(apiModels) {
      return apiModels.map((m) => ({
        id: normalizeId(m.exactModelName),
        name: m.displayModelName,
        provider: m.deploymentRegion.split('-')[0].toUpperCase() || '-',   // "Claude" (or set explicitly)
        hosted: useCapitalizeFirstLetter(m.deploymentRegion.split('-')[1] || '-'),
        availability: "Available",
          flag: (useCountry.searchCountries('name', useCapitalizeFirstLetter(m.deploymentRegion.split('-')[1] || ''))[0] || {}).flag || '',
      }));
    }

  let models = useModels(PlansHistory[PlansHistory.length - 2]?.modelQuotaConfigs || [])

  const top_models = models.filter(model => model.name === "Meta LLama 3.3 70B" || model.name === "Claude 4 Sonnet" || model.name === "GPT 4.1");


  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'stretch' }}>
      {(showAll ? models : top_models).map((model, index) => (
        <div
          key={index}
          style={{
            flex: '1 1 30%',
            minWidth: '200px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            backgroundColor: 'var(--sl-color-bg)',
            color: 'var(--sl-color-text)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        > 
          <h4
            style={{
              color: 'var(--sl-color-text)',
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
            onClick={() => typeof navigator !== 'undefined' && navigator.clipboard.writeText(model.name)}
            title="Copy model ID"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              color: 'var(--sl-color-text)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
          <p style={{ fontSize: '0.9em', color: 'var(--sl-color-text)',marginBottom: '2px'  }}>
            Cloud: <strong>{model.provider}</strong>
          </p>
          <p style={{ fontSize: '0.9em', color: 'var(--sl-color-text)', alignItems: 'center', marginBottom: '14px'}}>
            Server Location: <strong style={{ marginLeft: '4px' }}>{model.hosted}</strong>
              <span style={{ display: 'inline-flex', marginLeft: '4px', fontSize: '18px' }} >{model.flag}</span>
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

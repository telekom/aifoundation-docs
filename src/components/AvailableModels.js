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
        name: m.exactModelName,
        provider: m.deploymentRegion.split('-')[0].toUpperCase() || '-',   // "Claude" (or set explicitly)
        hosted: useCapitalizeFirstLetter(m.deploymentRegion.split('-')[1] || '-'),
        availability: "Available",
          flag: useCountry.searchCountries('name', useCapitalizeFirstLetter(m.deploymentRegion.split('-')[1]))[0].flag,
      }));
    }

  let models = useModels(PlansHistory[PlansHistory.length - 2]?.modelQuotaConfigs || [])

  const top_models = models.filter(model => model.name === "Claude 4 Sonnet" || model.name === "GPT-4.1" || model.name === "Gemini 2.5 Pro");


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
            Cloud: <strong>{model.provider}</strong>
          </p>
          <p style={{ fontSize: '0.9em', color: 'var(--ifm-font-color-base)', alignItems: 'center', marginBottom: '14px'}}>
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

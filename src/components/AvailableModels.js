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
      return apiModels.map((m) => {
        const prefix = ((m.deploymentRegion || '-').split('-')[0]).toUpperCase();
        const isTCloud = prefix === 'OTC';
        return {
          id: normalizeId(m.exactModelName),
          modelId: m.exactModelName,
          name: m.displayModelName,
          provider: isTCloud ? 'T-Cloud' : prefix,
          hosted: useCapitalizeFirstLetter(m.deploymentRegion.split('-')[1] || '-'),
          flag: useCountry.searchCountries('name', useCapitalizeFirstLetter(m.deploymentRegion.split('-')[1]))[0].flag,
          dataProcessing: isTCloud ? 'Germany' : 'EU',
          availability: "Available",
        };
      });
    }

  // Models confirmed offline / not in the API — filter them out
  const offlineModels = new Set([
    'gpt-4.1-nano', 'gpt-4o-mini', 'GPT-5-Codex', 'gpt-5-nano',
    'Mistral-Large-2411', 'Mistral-Medium-3', 'o1', 'text-embedding-ada-002',
  ]);

  // Priority order: T-Cloud flagship first, then newest hyperscaler, then rest
  const sortOrder = [
    'GPT OSS 120B',           // T-Cloud flagship
    'Qwen 3 Next 80B Instruct',
    'Qwen 3 VL 30B Instruct',
    'Qwen 3 30B',
    'Meta LLama 3.3 70B',
    'Mistral Small 24B Instruct 2501',
    'Qwen 3 Coder 30B',
    'Qwen2.5 Coder 32B Instruct',
    // Newest hyperscaler models
    'GPT 5.2',
    'GPT 5',
    'GPT 5 Mini',
    'o4 Mini',
    'o3',
    'Claude 4.5 Sonnet',
    'Claude 4 Sonnet',
    'Gemini 3 Pro',
    'Gemini 2.5 Pro',
    'Gemini 2.5 Flash',
    'GPT 4.1',
    'GPT 4.1 Mini',
    'GPT 4o',
    'GPT Image 1',
    'o3 Mini',
    'o1 Mini',
    'Claude 3.7 Sonnet',
    // Embeddings, audio, specialized
    'Embedding BGE M3',
    'Jina Embeddings v2 Base De',
    'Jina Embeddings v2 Base Code',
    'TSI Col Qwen 2 2b v1.0',
    'Whisper Large v3',
    'Whisper Large v3 Turbo',
    'Teuken 7B Instruct',
  ];

  const allConfigs = PlansHistory[PlansHistory.length - 2]?.modelQuotaConfigs || [];
  const filteredConfigs = allConfigs.filter(m => !offlineModels.has(m.exactModelName));
  let models = useModels(filteredConfigs);

  // Models live in the API but missing from pricing data — add manually
  const extraModels = [
    { modelId: 'gpt-5.2', name: 'GPT 5.2', provider: 'AZURE', hosted: 'Sweden', flag: '🇸🇪', dataProcessing: 'EU' },
    { modelId: 'Qwen3-Coder-30B-A3B-Instruct-FP8', name: 'Qwen 3 Coder 30B', provider: 'T-Cloud', hosted: 'Germany', flag: '🇩🇪', dataProcessing: 'Germany' },
  ].map(m => ({ ...m, id: normalizeId(m.modelId), availability: 'Available' }));
  models = models.concat(extraModels);

  // Sort by priority order
  models.sort((a, b) => {
    const ai = sortOrder.indexOf(a.name);
    const bi = sortOrder.indexOf(b.name);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  const top_models = models.slice(0, 3);


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
            onClick={() => navigator.clipboard.writeText(model.modelId)}
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
          <p style={{ fontSize: '0.9em', color: 'var(--ifm-font-color-base)', alignItems: 'center', marginBottom: '2px'}}>
            Server Location: <strong style={{ marginLeft: '4px' }}>{model.hosted}</strong>
              <span style={{ display: 'inline-flex', marginLeft: '4px', fontSize: '18px' }} >{model.flag}</span>
          </p>
          <p style={{ fontSize: '0.9em', color: 'var(--ifm-font-color-base)', alignItems: 'center', marginBottom: '14px'}}>
            Data Processing: <strong style={{ marginLeft: '4px' }}>{model.dataProcessing}</strong>
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

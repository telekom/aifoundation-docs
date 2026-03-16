import React from 'react';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import '@telekom/scale-components-react';
import {useVersions, useActiveVersion} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


export default function Navbar() {
  let versions = [];
  let activeVersion = null;
  try {
    versions = useVersions();
    activeVersion = useActiveVersion();
  } catch (e) {
    // hooks may fail on non-doc pages
  }

  const handleVersionChange = (e) => {
    const selected = versions.find(v => v.name === e.target.value);
    if (selected) {
      window.location.href = selected.path || '/';
    }
  };

  return (
    <nav>
      <scale-telekom-header
        class="scale-telekom-header navbar hydrate"
        app-name="AI Foundation Services Documentation"
        main-nav-aria-label="Main navigation">

        <scale-telekom-nav-list slot="main-nav" variant="functions">
          <scale-telekom-nav-item>
            <a href="/getting-started/quickstart">Getting Started</a>
          </scale-telekom-nav-item>
          <scale-telekom-nav-item>
            <a href="/guides/chat-completions">Guides</a>
          </scale-telekom-nav-item>
          <scale-telekom-nav-item>
            <a href="/reference/api-endpoints">API Reference</a>
          </scale-telekom-nav-item>
        </scale-telekom-nav-list>

        <scale-telekom-nav-list variant="functions" slot="functions" alignment="right">
          <scale-telekom-nav-item>
            <a href="/search">
              <scale-badge no-dot label="Search">
                <scale-icon-action-search></scale-icon-action-search>
              </scale-badge>
            </a>
          </scale-telekom-nav-item>

          {versions.length > 1 && (
            <scale-telekom-nav-item>
              <scale-dropdown-select
                label=""
                value={activeVersion?.name || versions[0]?.name}
                onScaleChange={(e) => {
                  const selected = versions.find(v => v.name === e.detail.value);
                  if (selected) {
                    window.location.href = selected.path || '/';
                  }
                }}
                size="small"
                style={{
                  minWidth: '90px',
                  '--spacing-x': '0',
                }}
              >
                {versions.map(v => (
                  <scale-dropdown-select-item key={v.name} value={v.name}>
                    {v.label}
                  </scale-dropdown-select-item>
                ))}
              </scale-dropdown-select>
            </scale-telekom-nav-item>
          )}

          <scale-telekom-nav-item>
            <a href="https://public.oweb-chat.llmhub.t-systems.net/">
              <scale-badge no-dot label="SmartChat">
                <scale-icon-communication-chat accessibility-title="SmartChat" />
              </scale-badge>
            </a>
          </scale-telekom-nav-item>

          <scale-telekom-nav-item>
            <a href="https://playground.llmhub.t-systems.net/">
              <scale-badge no-dot label="LLM Playground">
                <scale-icon-action-launch accessibility-title="launch"/>
              </scale-badge>
            </a>
          </scale-telekom-nav-item>

          <scale-telekom-nav-item>
            <a href="https://uptime.llmhub.t-systems.net/status/health">
              <scale-badge no-dot label="Model Status">
                <scale-icon-navigation-external-link accessibility-title="external-link"/>
              </scale-badge>
            </a>
          </scale-telekom-nav-item>

          <scale-telekom-nav-item variant="functions" class="scale-telekom-nav-item hydrated" role="none">
            <button id="mode-switch">
              <scale-badge no-dot="" label="Switch Mode" class="hydrated">
                <scale-icon-action-light-dark-mode accessibility-title="Switch Mode" size="24" class="hydrated" style={{display: "inline-flex"}}></scale-icon-action-light-dark-mode>
              </scale-badge>
            </button>
          </scale-telekom-nav-item>
        </scale-telekom-nav-list>
      </scale-telekom-header>
    </nav>
  );

}

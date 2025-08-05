import React from 'react';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import '@telekom/scale-components-react';


export default function Navbar() {
  
  return (
    <nav>
      <scale-telekom-header 
        class="scale-telekom-header navbar hydrate"
        app-name="AI Foundation Services Documentation" 
        main-nav-aria-label="Main navigation">

        <scale-telekom-nav-list slot="main-nav" variant="functions">
          <scale-telekom-nav-item>
            <a href="/Introduction">Introduction</a>
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

          <scale-telekom-nav-item>
            <a href="https://public.oweb-chat.llmhub.t-systems.net/">
              <scale-badge no-dot label="SmartChat">
                <scale-icon-communication-chat accessibility-title="SmartChat" />
                {/* <span 
                  style={{
                    position: "absolute",
                    top: "-16px",
                    right: "-27px",
                    backgroundColor: "#e20074",
                    color: "white",
                    borderRadius: "12px",
                    padding: "2px 6px",
                    fontSize: "10px",
                    fontWeight: "bold",
                    whiteSpace: "nowrap"
                  }}
                >
                  New
                </span> */}
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

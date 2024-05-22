import React from 'react';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import '@telekom/scale-components-react';

export default function Navbar() {

  return (
  <nav>
<scale-telekom-header 
class="scale-telekom-header navbar hydrate"
app-name="AI Foundation Services" 
main-nav-aria-label="Main navigation">

    <scale-telekom-nav-list slot="main-nav" variant="functions">
        <scale-telekom-nav-item>
          <a href="/Introduction">Introduction</a>
        </scale-telekom-nav-item>
        <scale-telekom-nav-item>
          <a href="/Guides/RAG%20Guide">Examples</a>
        </scale-telekom-nav-item>
      </scale-telekom-nav-list>
      
      <scale-telekom-nav-list varibhant="functions" slot="functions" alignment="right">
        <scale-telekom-nav-item>
        <a href="/search">
            <scale-badge no-dot label="Search">
              <scale-icon-action-search></scale-icon-action-search>
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

        {/*<scale-telekom-nav-item>
        <a href="https://github.com/telekom/create-tsi/tree/main">
            <scale-badge no-dot label="Github">
            <scale-icon-action-link accessibility-title="link"/>
            </scale-badge>
        </a>
        </scale-telekom-nav-item>*/}

       {/* <scale-telekom-nav-item>
        <button id="mode-toggle" class="click">
        <scale-badge no-dot label="Mode">
            <scale-icon-action-light-dark-mode accessibility-title="light-dark-mode"/>
        </scale-badge>
        </button>
  </scale-telekom-nav-item>*/}

  
      </scale-telekom-nav-list> 
    </scale-telekom-header>
  </nav>   
  );
}

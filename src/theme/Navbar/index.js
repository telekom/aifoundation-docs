import React from 'react';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import '@telekom/scale-components-react'

export default function Navbar() {
  return (
<scale-telekom-header>
      <scale-telekom-nav-list slot="main-nav" variant="functions" alignment="left">
        <scale-telekom-nav-item>
          <a href="/">Home</a>
        </scale-telekom-nav-item>
        <scale-telekom-nav-item>
          <a href="docs/Overview">Overview</a>
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

      </scale-telekom-nav-list>   
    </scale-telekom-header>
    
  );
}

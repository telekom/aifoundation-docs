import React from 'react';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import '@telekom/scale-components-react'
import clsx from "clsx"

export default function Navbar() {
  return (
<scale-telekom-header 
class="navbar"
app-name="AI Foundation Services" 
main-nav-aria-label="Main navigation">

    <scale-telekom-nav-list slot="main-nav" variant="functions">
        <scale-telekom-nav-item>
          <a href="docs/Introduction">Introduction</a>
        </scale-telekom-nav-item>
        <scale-telekom-nav-item>
          <a href="docs/Guides">Examples</a>
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

      </scale-telekom-nav-list> 
    </scale-telekom-header>
    
  );
}

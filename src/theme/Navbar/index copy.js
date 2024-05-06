import React from 'react';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import '@telekom/scale-components-react'
import { useLocation } from '@docusaurus/router';
import { useState } from 'react'; 

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = () => {
  const searchParams = new URLSearchParams();
  searchParams.set('q', query);
  const searchPath = `/search?${searchParams.toString()}`;
  window.location.href = searchPath;
  };

  return (
<scale-telekom-header>
      <scale-telekom-nav-list slot="main-nav" variant="functions" alignment="left">
        <scale-telekom-nav-item>
          <a href="/">Home</a>
        </scale-telekom-nav-item>
        <scale-telekom-nav-item>
          <a href="docs/Overview">Tutorials</a>
        </scale-telekom-nav-item>
      </scale-telekom-nav-list>
      
      <scale-telekom-nav-list variant="functions" slot="functions" alignment="right">
        <scale-telekom-nav-item>
        <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <scale-badge no-dot label="Search">
              <scale-icon-action-search></scale-icon-action-search>
            </scale-badge>
      </button>
      {/* Search modal or dropdown */}
      {isOpen && (
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
    </div>
            
        </scale-telekom-nav-item>

      </scale-telekom-nav-list>   
    </scale-telekom-header>
    
  );
}

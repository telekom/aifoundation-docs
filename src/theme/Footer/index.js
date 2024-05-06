import React from 'react';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import '@telekom/scale-components-react'
import { useLayoutEffect } from 'react'
import { defineCustomElements, applyPolyfills } from '@telekom/scale-components/loader';


export default function FooterWrapper(props) {
  useLayoutEffect(() => {
    applyPolyfills().then(() => {
      defineCustomElements()
    })
  }, [])
  return (  
<scale-telekom-footer>
  <scale-telekom-footer-content>
    <span slot="notice">  © Deutsche Telekom AG </span>
    <ul slot="navigation">
      <li>
        <a href="https://www.t-systems.com/de/en/imprint"> Imprint </a>
      </li>
      <li>
        <a href="https://www.t-systems.com/de/en/data-privacy"> Data privacy </a>
      </li>
      <li>
        <a href="#"> Terms and conditions </a>
      </li>
      <li>
        <a href="#"> Consumer protection </a>
      </li>
      <li>
        <a href="#"> Product information sheet </a>
      </li>
      <li>
        <a href="https://www.telekom.com/en/corporate-responsibility/governance/protection-of-minors"> Youth protection </a>
      </li>
    </ul>
  </scale-telekom-footer-content>
</scale-telekom-footer>
  );
}

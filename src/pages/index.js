import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg" 
            to="https://github.com/telekom/create-tsi" style={{ height: '150px', width: "250px" }}> 
            💡Create-TSI Github
            <div className="description-container" style={{wordWrap: 'break-word' }}>
              <p className="description-text" style={{ fontSize: '14px', fontWeight: 'normal' }}>
                Link to our Github repository
              </p>
            </div>
          </Link>
          {/* Add space between the buttons */}
          <div style={{ marginLeft: '20px' }}></div>
          <Link
            className="button button--secondary button--lg"
            to="https://playground.llmhub.t-systems.net/" style={{ height: '150px', width: "250px" }}>
            💻LLM Playground
          <div className="description-container" style={{wordWrap: 'break-word' }}>
              <p className="description-text" style={{ fontSize: '14px', fontWeight: 'normal' }}>
              Link to our LLM Playground
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

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
            to="/docs/Quick Start" style={{ height: '150px', width: "250px" }}> 
            Quick Start Tutorial
            <div className="description-container" style={{wordWrap: 'break-word' }}>
              <p className="description-text" style={{ fontSize: '14px', fontWeight: 'normal' }}>
                Get started with create-tsi <br/>
                and make your first LLM powered <br/> project.
              </p>
            </div>
          </Link>
          {/* Add space between the buttons */}
          <div style={{ marginLeft: '20px' }}></div>
          <Link
            className="button button--secondary button--lg"
            to="/docs/Guides/chatbot" style={{ height: '150px', width: "250px" }}>
            Examples
          <div className="description-container" style={{wordWrap: 'break-word' }}>
              <p className="description-text" style={{ fontSize: '14px', fontWeight: 'normal' }}>
              Explore use cases <br/>
              and examples to get inspired.
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

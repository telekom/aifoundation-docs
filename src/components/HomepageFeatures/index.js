import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Create-TSI Demo',
    videoUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7184578562316779521?compact=1',
    //description: (
   //   <>
   //     Get started with create-tsi and make your first LLM powered project.
   //   </>
   // ),
  },
];

function Feature({ videoUrl, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div >
      <div >
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
        <iframe
          height="399" 
          width="710"
           frameborder="0" 
           allowfullscreen=""
          src={videoUrl}
          title={title}
        ></iframe>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

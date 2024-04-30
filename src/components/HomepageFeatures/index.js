import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '',
    videoUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7184294336417669120/?updateEntityUrn=urn%3Ali%3Afs_updateV2%3A%28urn%3Ali%3Aactivity%3A7184294336417669120%2CFEED_DETAIL%2CEMPTY%2CDEFAULT%2Cfalse%29&originTrackingId=q%2FXjK0YOQKaIzgxMXvzrcQ%3D%3D',
    description: (
      <>
        Get started with create-tsi and make your first LLM powered project.
      </>
    ),
  },
];

function Feature({ videoUrl, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* Render the video */}
        <iframe
          width="200%"
          height="500px"
          src={videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
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

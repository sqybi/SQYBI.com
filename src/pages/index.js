import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';
import Translate from '@docusaurus/Translate';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate description="Website title">
            {siteConfig.title}
          </Translate>
        </Heading>
        <p className="hero__subtitle"><Translate description="Website tagline">{siteConfig.tagline}</Translate></p>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      description="sqybi's personal website">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import styles from './index.module.css';

export default function ArchiveHeader() {
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    <Translate>所有文章</Translate>
                </Heading>
                <p className="hero__subtitle"><Translate>所有历史文章都在这里</Translate></p>
            </div>
        </header>
    );
}
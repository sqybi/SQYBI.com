import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';
import Giscus from '@giscus/react';

const localeMap = {
    'en-US': 'en',
    'zh-Hans': 'zh-CN',
};

export default function GiscusComponent() {
    const {
        siteConfig: { customFields },
        i18n: { currentLocale },
    } = useDocusaurusContext();
    const {
        colorMode
    } = useColorMode();

    return (
        <Giscus
            id="giscus-comments"
            repo="sqybi/SQYBI.com"
            repoId={customFields.giscusRepoId}
            category="Announcements"
            categoryId={customFields.giscusCategoryId}
            mapping="pathname"
            strict="1"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={colorMode}
            lang={localeMap[currentLocale] ?? currentLocale}
            crossorigin="anonymous"
            async />
    );
}

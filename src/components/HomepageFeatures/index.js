import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import Translate from '@docusaurus/Translate';

const FeatureList = [
  {
    title: (
      <Translate>计算机技术</Translate>
    ),
    description: (
      <>
        <p>
          <Translate>作为一个程序员，这里自然少不了关于计算机相关技术的分享。</Translate><br />
          <Translate>编程、网络、硬件……各种类型的分享都可能会出现。我会分享我自己开发的一些项目，以及开发过程中使用的技术和相关心得。</Translate>
        </p>
        <p><Translate>可以通过标签</Translate> <a href="/blog/tags/technology/">#technology</a> <Translate>查询所有关于计算机技术的文章。</Translate></p>
        <p>
          <Translate>欢迎关注我的 Github，以获取更多我开发的项目：</Translate><br />
          <a href="https://github.com/sqybi"><Translate>🐱 sqybi 的 Github</Translate></a>
        </p>
      </>
    ),
  },
  {
    title: (
      <Translate>摄影</Translate>
    ),
    description: (
      <>
        <p>
          <Translate>摄影是我的主要业余爱好之一。</Translate><br />
          <Translate>我会不定期挑选一些我拍摄的照片，并分享背后拍摄的故事和后期心得。另外，我也会介绍一些摄影相关的基本原理和技术。</Translate>
        </p>
        <p><Translate>可以通过标签</Translate> <a href="/blog/tags/photography/">#photography</a> <Translate>查询所有关于摄影的文章。</Translate></p>
        <p>
          <Translate>此外，也欢迎关注我的 Flickr 或订阅我的 Telegram 频道，以获取更多我拍摄的照片：</Translate><br />
          <a href="https://www.flickr.com/sqybi"><Translate>📷 sqybi 的 Flickr</Translate></a><br />
          <a href="https://t.me/sqybi_channel"><Translate>✈️ sqybi 的 Telegram Channel</Translate></a>
        </p>
      </>
    ),
  },
  {
    title: (
      <Translate>我自己</Translate>
    ),
    description: (
      <>
        <p>
          <Translate>除了一些正经的文章，我也会在这里发表一些我自己的碎碎念。</Translate><br />
          <Translate>它们可能是我的突发奇想，也可能是我的某些奇怪的感悟。</Translate>
        </p>
        <p><Translate>可以通过标签</Translate> <a href="/blog/tags/random/">#random</a> <Translate>查询所有碎碎念的文章。</Translate></p>
        <p>
          <Translate>如果需要，可以通过以下方式联系我：</Translate><br />
          <a href="https://t.me/sqybi"><Translate>✈️ Telegram: @sqybi</Translate></a><br />
          <a href="mailto:sqybi@126.com"><Translate>✉️ Email: sqybi@126.com</Translate></a><br />
        </p>
        <p>
          <Translate>希望了解更多关于我的信息，可以查阅以下页面：</Translate><br />
          <a href="/about/"><Translate>十几个为什么</Translate></a>
        </p>
      </>
    ),
  },
];

function Feature({ title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <div className="text--left">{description}</div>
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

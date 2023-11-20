import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const FeatureList = [
  {
    title: '计算机技术',
    description: (
      <>
        <p>
          作为一个程序员，这里自然少不了关于计算机相关技术的分享。<br />
          编程、网络、硬件……各种类型的分享都可能会出现。我也可能分享我自己开发的一些项目，以及开发过程中使用的技术和相关心得。
        </p>
        <p>可以通过标签 <a href="/blog/tags/technology/">#technology</a> 查询所有计算机技术的文章。</p>
        <p>
          欢迎关注我的 Github，以获取更多我开发的项目：<br />
          <a href="https://github.com/sqybi">🐱 sqybi 的 Github</a>
        </p>
      </>
    ),
  },
  {
    title: '摄影',
    description: (
      <>
        <p>
          摄影是我的主要业余爱好之一。<br />
          我会不定期挑选一些我拍摄的照片，并分享背后拍摄的故事和后期心得。另外，我也可能会介绍一些摄影相关的基本原理和技术。
        </p>
        <p>可以通过标签 <a href="/blog/tags/photography/">#photography</a> 查询所有摄影的文章。</p>
        <p>
          此外，也欢迎关注我的 Flickr 或订阅我的 Telegram 频道，以获取更多我拍摄的照片：<br />
          <a href="https://www.flickr.com/sqybi">📷 sqybi 的 Flickr</a><br />
          <a href="https://t.me/sqybi_channel">✈️ sqybi 的 Telegram Channel</a>
        </p>
      </>
    ),
  },
  {
    title: '我自己',
    description: (
      <>
        <p>
          除了一些正经的文章，我也会在这里发表一些我自己的碎碎念。<br />
          它们可能是我的突发奇想，也可能是我的某些奇怪的感悟。
        </p>
        <p>可以通过标签 <a href="/blog/tags/random/">#random</a> 查询所有碎碎念的文章。</p>
        <p>
          如果需要，可以通过以下方式联系我：<br />
          <a href="https://t.me/sqybi">✈️ Telegram: @sqybi</a><br />
          <a href="mailto:sqybi@126.com">✉️ Email: sqybi@126.com</a><br />
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
        <p className="text--left">{description}</p>
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

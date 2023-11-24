import { useState, useLayoutEffect } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import Translate from '@docusaurus/Translate';

const idiomsAboutFriends = [
  <Translate>朋友就像口袋里的硬币，不需要满满当当，只求质优价钱高。</Translate>,
  <Translate>真正的朋友会在你忘记携带笑面具时，递给你一张次日可用的笑容优惠券。</Translate>,
  <Translate>与朋友相处，就像用手机，信号不好时不是换朋友，而是换个好位置。</Translate>,
  <Translate>论偷懒的共犯，一位懂事的朋友胜过一打勤快的助手。</Translate>,
  <Translate>好友像是生活的调料包，少了他们，即使是五星大餐也变得索然无味。</Translate>,
  <Translate>朋友就像是双重馅饼：一层是欢笑，另一层是在你开心忘形时偷偷录视频的家伙。</Translate>,
  <Translate>好友之间的对话就像是密码锁，别人听着就像是摩斯电码。</Translate>,
  <Translate>一个真正的朋友会在你愚蠢行为的第一排给你鼓掌，并准备好第一个不合时宜的玩笑。</Translate>,
  <Translate>朋友是那个知道你所有缺点，但还是坚决不肯公开拍卖这些信息的人。</Translate>,
  <Translate>朋友就像是生活中的弹出广告，你不记得订阅了他们，但他们总是及时出现。</Translate>,
  <Translate>一起在厨房制造混乱和烹饪灾难，是友谊的不成文规定。</Translate>,
  <Translate>朋友会在你决定剪个新发型后，诚实地告诉你，你现在看起来像一只逃跑的羊。</Translate>,
  <Translate>朋友就像彩虹，当你的生活被暴风雨弄得一团糟时，他们会出现并画出一道笑脸。</Translate>,
  <Translate>拥有一个朋友就像拥有一个活生生的备忘录，时刻提醒你过去所有糗事的细节。</Translate>,
  <Translate>与朋友共饮一杯，哪怕是难喝的自制酒，也胜过独自享用世界上最好的美酒。</Translate>,
  <Translate>朋友是那种你可以在任何无聊的活动中一起无聊的人，就连排队等公交都变得好玩。</Translate>,
  <Translate>朋友不是互相吹捧的镜子，而是那种能一起互相吐槽对方颜值的搭档。</Translate>,
  <Translate>在我无能为力时给我电影票的朋友，比给我励志名言的人要好得多。</Translate>,
  <Translate>朋友不会让你做傻事……至少不会让你单独去做傻事。</Translate>,
  <Translate>朋友是会在你穿新鞋的时候，用力踩一脚，然后满脸无辜地说“哦，不好意思，我没看见”。</Translate>,
]

export default function LinksHeader() {
  const [randomIndex, setRandomIndex] = useState(-1);

  useLayoutEffect(() => {
    setRandomIndex(Math.floor(Math.random() * idiomsAboutFriends.length));
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate>友情链接</Translate>
        </Heading>
        <p className="hero__subtitle">
          {randomIndex === -1 ? '' : idiomsAboutFriends[randomIndex]}
        </p>
      </div>
    </header>
  );
}

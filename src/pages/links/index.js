import Translate from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import LinksHeader from '@site/src/components/LinksHeader';
import GiscusComponent from '../../components/GiscuzComponnet';
import './index.css';

const links = [
    [
        {
            owner: 'Oreo',
            title: 'Oreo\'s way to Oodi',
            description: '"Siempre imaginé que el paraíso sería algún tipo de biblioteca"',
            comment: <Translate>就职于 PingCAP 的小姑娘</Translate>,
            image: '/img/links/oreo.jpg',
            link: 'https://oreo.life/',
        },
        {
            owner: 'JTJL',
            title: 'U.M.R Blog',
            description: 'Hello Happy World',
            comment: <Translate>ACM/ICPC WF 大牛，作为他的同事只能瑟瑟发抖并仰慕</Translate>,
            image: '/img/links/jtjl.jpg',
            link: 'https://jtjl.github.io/',
        },
        {
            owner: 'hbsnmyj',
            title: 'Hoppinglife',
            description: 'code in life, hop in life',
            comment: <Translate>从中学到大学的同学，SJTU 辩论队里那些能说会道的人之一 :P</Translate>,
            image: '/img/links/hbsnmyj.png',
            link: 'https://blog.hoppinglife.com/',
        },
        {
            owner: 'abc881858',
            title: 'Qt编程思想',
            description: 'https://thinkinginQt.com',
            comment: <Translate>认识许久的网友，持续专注于 Qt 相关领域</Translate>,
            image: '/img/links/abc881858.png',
            link: 'https://thinkinginqt.com/',
        },
        {
            owner: 'whyes',
            title: 'whyes 的博客',
            description: 'Pocket, Read & Liver cancer',
            comment: <Translate>偶然搜索到的博客，热爱软件技术的医生维护的跨领域知识库</Translate>,
            image: '/img/links/whyes.png',
            link: 'https://whyes.org/',
        },
        {
            owner: '千里之豪',
            title: '千里之豪 格物垛',
            description: 'Fun to life, fun to coding',
            comment: <Translate>同样在 2023 年重启了自己博客的网友，相识于少数派</Translate>,
            image: '/img/links/qianlizhihao.jpg',
            link: 'https://blog.gadore.top/',
        },
    ],
];

function Card({ owner, title, description, comment, image, link }) {
    return (
        <div class="link-card">
            <div class="card shadow--md">
                {image
                    ? (<div class="card__image">
                        <img src={image} alt={`Image for site ${title}`} />
                    </div>)
                    : ''}
                <div class="card__body">
                    <div>
                        <strong>{title}</strong> | <span class="badge badge--info">{owner}</span>
                    </div>
                    <div class="margin-top--md">
                        <span class="badge badge--secondary">{description}</span>
                    </div>
                    <div class="margin-top--md">
                        <em>{comment}</em>
                    </div>
                    <div class="margin-top--lg">
                        <a href={link}><button class="button button--primary button--block">Visit</button></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Cards() {
    return (
        <div class="container">
            {links.map((groupedLinks, index) => (
                <div class="row margin-top--lg margin-bottom--lg">
                    {groupedLinks.map((props, index) => (
                        <div class="col col--3 margin-top--lg margin-bottom--lg">
                            <Card key={index} {...props} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default function Links() {
    return (
        <Layout>
            <LinksHeader />
            <main>
                <Cards />
                <div class="container">
                    <div class="row margin-top--lg margin-bottom--lg">
                        <div class="col col--8 col--offset-2">
                            <GiscusComponent />
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

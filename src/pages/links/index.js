import Translate from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import LinksHeader from '@site/src/components/LinksHeader';

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
    ],
];

function Card({ owner, title, description, comment, image, link }) {
    return (
        <div class="link-card">
            <div class="card shadow--md">
                {image
                    ? (<div class="card__image">
                        <img src={image} alt={`Image for site ${title}`} style={{ width: '100%', height: 'auto' }} />
                    </div>)
                    : ''}
                <div class="card__body">
                    <div>
                        <strong>{title}</strong> | <span class="badge badge--info">{owner}</span>
                    </div>
                    <div class="margin-top--sm">
                        <span class="badge badge--secondary">{description}</span>
                    </div>
                    <div class="margin-top--md">
                        <em>{comment}</em>
                    </div>
                </div>
                <div class="card__footer">
                    <a href={link}><button class="button button--primary button--block">Visit</button></a>
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
                        <div class="col col--3">
                            <Card class="margin-top--lg margin-bottom--lg" key={index} {...props} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default function Links() {
    return (
        <Layout
            description="sqybi's personal website">
            <LinksHeader />
            <main>
                <Cards />
            </main>
        </Layout>
    );
}
import Layout from '@theme/Layout';
import ArchiveHeader from '../../components/ArchiveHeader';
import './index.css';

const blogList = require('../../../.docusaurus/blog-list/default/blog-post-list-full.json');

const formattedBlogList = {}
for (const item of blogList.items) {
    if (item.unlisted) {
        continue;
    }
    const year = item.date.split('-')[0];
    if (!formattedBlogList[year]) {
        formattedBlogList[year] = [];
    }
    formattedBlogList[year].push(item);
}

function generateBlogItemLine(item, index) {
    return (
        <li key={index}>
            <span><span className='highlight-box-date'>📅{item.date.split('T')[0]}</span> <a href={item.permalink}>{item.title}</a> </span>
            {item.authors.map((author, _) => {
                return <span><a href={author.url} target="_blank"><span className='highlight-box-tag'>@{author.name}</span></a> </span>;
            })}
            {item.tags.map((tag, _) => {
                return <span><a href={tag.permalink} target="_blank"><span className='highlight-box'>#{tag.label}</span></a> </span>;
            })}
        </li>
    );
}

export default function Archive() {
    return (
        <Layout>
            <ArchiveHeader />
            <main>
                <section className="features">
                    <div className="container">
                        <div className="row">
                            <ul className='archive-list'>
                                {Object.keys(formattedBlogList).reverse().map((year, index) => {
                                    return (
                                        <li key={index}>
                                            <h2>{year}</h2>
                                            <ul className='archive-list-inner'>
                                                {formattedBlogList[year].map((item, index) => {
                                                    return generateBlogItemLine(item, index);
                                                })}
                                            </ul>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}

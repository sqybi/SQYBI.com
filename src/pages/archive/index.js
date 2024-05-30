import Layout from '@theme/Layout';
const recentPosts = require("../../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json");
import ArchiveHeader from '../../components/ArchiveHeader';
import './index.css';

export default function Archive() {
    return (
        <Layout>
            <ArchiveHeader />
            <main>
                <section className="features">
                    <div className="container">
                        <div className="row">
                            <ul className='archive-list'>
                                {recentPosts.items
                                    .filter(item => !item.unlisted)
                                    .map((item, index) => (
                                        <li key={index}>
                                            <a href={`${item.permalink}`}>{item.title}</a>{" "}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </section>

            </main>
        </Layout>
    );
}

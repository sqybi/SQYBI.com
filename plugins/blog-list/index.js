import fs from 'fs';
import path from 'path';

export default async function blogList(context, options) {
    return {
        name: 'blog-list',
        async loadContent() {
            const blogDir = path.join(__dirname, '../../.docusaurus/docusaurus-plugin-content-blog/default');
            const blogs = {
                "items": [],
            };
            for (const file of fs.readdirSync(blogDir)) {
                if (file.startsWith('site-blog-') && file.endsWith('.json')) {
                    const metadata = JSON.parse(fs.readFileSync(path.join(blogDir, file), 'utf-8'));
                    blogs.items.push(metadata);
                }
            }
            blogs.items.sort((a, b) => a.date < b.date ? 1 : (a.date == b.date ? 0 : -1));
            return blogs;
        },
        async contentLoaded({ content, actions }) {
            const { createData } = actions;
            const filePath = await createData(
                'blog-post-list-full.json',
                JSON.stringify(content, null, 2)
            );
            return filePath;
        },
    };
}
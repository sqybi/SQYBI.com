import fs from 'fs';
import path from 'path';

export default async function blogList(context, options) {
    return {
        name: 'blog-list',
        async loadContent() {},
        async contentLoaded({ content, actions }) {
            const blogDir = path.join(__dirname, '../../.docusaurus/docusaurus-plugin-content-blog/default');
            const blogs = {
                "items": [],
            };
            // Wait for the blog metadata to be generated
            while (!fs.existsSync(blogDir)) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            await new Promise(resolve => setTimeout(resolve, 5000));  // Wait another 5 seconds to make sure the metadata is fully generated
            for (const file of fs.readdirSync(blogDir)) {
                if (file.startsWith('site-blog-') && file.endsWith('.json')) {
                    const metadata = JSON.parse(fs.readFileSync(path.join(blogDir, file), 'utf-8'));
                    blogs.items.push(metadata);
                }
            }
            blogs.items.sort((a, b) => a.date < b.date ? 1 : (a.date == b.date ? 0 : -1));
            const { createData } = actions;
            const filePath = await createData(
                'blog-post-list-full.json',
                JSON.stringify(blogs, null, 2)
            );
            return filePath;
        },
    };
}
import { visit } from 'unist-util-visit';

export default function imgWrapper() {
    return (tree) => {
        const imgNodeParents = [];
        visit(tree, 'mdxJsxTextElement', (node, _, parent) => {
            if (node.name === 'img') {
                imgNodeParents.push(parent);
            }
        });

        for (const parentNode of imgNodeParents) {
            for (let i = 0; i < parentNode.children.length; i++) {
                if (parentNode.children[i].type === 'mdxJsxTextElement' && parentNode.children[i].name === 'img') {
                    const node = parentNode.children[i];
                    parentNode.children.splice(i, 1, {
                        type: 'element',
                        tagName: 'div',
                        properties: { className: ['lightgallery'] },
                        children: [node]
                    });
                }
            }
        }
    };
}

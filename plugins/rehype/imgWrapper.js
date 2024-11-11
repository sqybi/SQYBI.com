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
                    // Process the img node itself
                    node.attributes.push(
                        {
                            type: "mdxJsxAttribute",
                            name: "data-zoomable",
                            value: ""
                        }
                    );
                    // Wrap the img node with a div (optional)
                    parentNode.children.splice(i, 1, {
                        type: 'element',
                        tagName: 'div',
                        properties: { className: ['img-container'] },
                        children: [
                            node,
                            {
                                type: 'element',
                                tagName: 'div',
                                properties: { className: ['img-caption'] },
                                children: [
                                    {
                                        type: 'text',
                                        value: node['attributes'].find(attr => attr.name === 'alt').value
                                    }
                                ]
                            }
                        ]
                    });
                }
            }
        }
    };
}

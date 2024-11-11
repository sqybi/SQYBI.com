export default function injectTags(context, options) {
    return {
        name: 'inject-tags',
        injectHtmlTags() {
            return {
                postBodyTags: [
                    {
                        tagName: 'script',
                        attributes: {
                            src: '/script/injectMediumZoom.js',
                            defer: true,
                        },
                    },
                ],
            };
        },
    };
}
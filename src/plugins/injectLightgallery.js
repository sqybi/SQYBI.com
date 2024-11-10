module.exports = function (context, options) {
    return {
        name: 'inject-script',
        injectHtmlTags() {
            return {
                postBodyTags: [
                    `<script>
                        document.addEventListener("DOMContentLoaded", function() {
                            const lightGallery = window.lightGallery;
                            const galleryElements = document.getElementsByClassName('lightgallery');
                            for (let i = 0; i < galleryElements.length; i++) {
                                lightGallery(galleryElements[i], {
                                    speed: 500,
                                    mode: 'lg-fade',
                                    plugins: [lgZoom, lgThumbnail],
                                });
                            }
                        });
                    </script>`,
                ],
            };
        },
    };
};
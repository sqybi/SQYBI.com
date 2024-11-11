function handleNewImage(imgElement) {
    if (!imgElement.hasAttribute('data-zoomable')) {
        return;
    }
    if (imgElement.classList.contains('medium-zoom-image')) {
        return;
    }
    mediumZoom(imgElement, {
        margin: 24,
        background: '#000000cc',
        scrollOffset: 40,
    });
}

const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === 'IMG') {
                    handleNewImage(node);
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    node.querySelectorAll('img').forEach(handleNewImage);
                }
            });
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

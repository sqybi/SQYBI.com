window.onload = () => {
    setTimeout(() => {
        mediumZoom('[data-zoomable]', {
            margin: 24,
            background: '#000000cc',
            scrollOffset: 40,
        });
    }, 1000);
};

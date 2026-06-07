// 0. Reset scroll position immediately on reload for smooth transitions
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => window.scrollTo(0, 0), 20);

    // Initialize modules loaded via standard script tags
    initTheme();
    initNavigation();
    initCanvasEffects();
});

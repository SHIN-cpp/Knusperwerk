function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const iconMoon = document.querySelector('.icon-moon');
    const iconSun = document.querySelector('.icon-sun');
    const body = document.body;

    const updateTheme = (isDark) => {
        body.classList.toggle('dark-mode', isDark);
        if(iconMoon) iconMoon.style.display = isDark ? 'none' : 'block';
        if(iconSun) iconSun.style.display = isDark ? 'block' : 'none';

        // Switch header logo based on theme
        const logoImg = document.querySelector('.logo img');
        if (logoImg) {
            logoImg.src = isDark ? 'assets/logo_dark.png' : 'assets/logo_light.png';
        }

        const themeColor = isDark ? '#1C1F1D' : '#F9FAF9';
        body.style.backgroundColor = themeColor;

        // Update the meta theme-color for iPhone status bar
        const metaThemeColor = document.getElementById('theme-color-meta');
        if (metaThemeColor) {
            metaThemeColor.content = themeColor;
        }

        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Force repaint hack for Safari
        body.style.webkitTransform = 'translate3d(0,0,0)';
        setTimeout(() => {
            body.style.webkitTransform = '';
        }, 0);
    };

    // Check saved preference (defaults to light mode if not set)
    const savedTheme = localStorage.getItem('theme');
    updateTheme(savedTheme === 'dark');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            updateTheme(!body.classList.contains('dark-mode'));
        });
    }
}

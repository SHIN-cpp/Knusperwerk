function initCanvasEffects() {
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // 1. Interactive Technical Backgrounds
    const interactiveBg = document.getElementById('interactive-bg');
    if (interactiveBg) {
        const ctx = interactiveBg.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        interactiveBg.width = width;
        interactiveBg.height = height;

        let mouseX = width / 2;
        let mouseY = height / 2;
        let scrollAngle = 0;
        let targetScrollAngle = 0;
        let bgLastScrollY = window.scrollY;

        if (!isTouchDevice()) {
            window.addEventListener('mousemove', (e) => {
                mouseX += (e.clientX - mouseX) * 0.2;
                mouseY += (e.clientY - mouseY) * 0.2;
            }, { passive: true });
        }

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - bgLastScrollY;
            targetScrollAngle += scrollDelta * 0.0008;
            bgLastScrollY = currentScrollY;
        }, { passive: true });

        window.addEventListener('resize', () => {
            width = window.innerWidth;
            height = window.innerHeight;
            interactiveBg.width = width;
            interactiveBg.height = height;
        }, { passive: true });

        function drawSoftOrbs() {
            const isDark = document.body.classList.contains('dark-mode');
            const color1 = isDark ? 'rgba(143, 163, 145, 0.12)' : 'rgba(95, 113, 97, 0.12)';
            const color2 = isDark ? 'rgba(224, 159, 94, 0.08)' : 'rgba(214, 140, 69, 0.08)';

            scrollAngle += (targetScrollAngle - scrollAngle) * 0.08;

            const time = Date.now() * 0.0003;
            const orb1X = mouseX + Math.sin(time) * 150;
            const orb1Y = mouseY + window.scrollY * 0.2 + Math.cos(time) * 150;

            const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, width * 0.5);
            grad1.addColorStop(0, color1);
            grad1.addColorStop(1, 'transparent');

            ctx.fillStyle = grad1;
            ctx.fillRect(0, 0, width, height);

            const orb2X = width * 0.8 + Math.cos(time * 0.5) * 300;
            const orb2Y = height * 0.8 - scrollAngle * 15 + Math.sin(time * 0.7) * 300;

            const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, width * 0.6);
            grad2.addColorStop(0, color2);
            grad2.addColorStop(1, 'transparent');

            ctx.fillStyle = grad2;
            ctx.fillRect(0, 0, width, height);
        }

        function animateBg() {
            ctx.clearRect(0, 0, width, height);
            drawSoftOrbs();
            requestAnimationFrame(animateBg);
        }
        animateBg();
    }

    // 2. Background Logo Scroll & Mouse Animation
    const bgWatermark = document.querySelector('.bg-watermark');
    const heroSection = document.querySelector('.hero');

    if (bgWatermark) {
        let currentScroll = 0;
        let mouseX = 0;
        let mouseY = 0;
        let isTicking = false;

        const updateWatermarkTransform = () => {
            const transformX = -50 - (mouseX * 1.5);
            const transformY = -50 - (mouseY * 1.5) - (currentScroll * 0.02);
            bgWatermark.style.transform = `translate3d(calc(${transformX}%), calc(${transformY}%), 0)`;
            isTicking = false;
        };

        const requestTick = () => {
            if (!isTicking) {
                requestAnimationFrame(updateWatermarkTransform);
                isTicking = true;
            }
        };

        window.addEventListener('scroll', () => {
            currentScroll = window.scrollY;
            requestTick();

            if (heroSection && currentScroll > heroSection.offsetHeight) {
                bgWatermark.style.opacity = '0';
            } else {
                bgWatermark.style.opacity = '';
            }
        }, { passive: true });

        if (!isTouchDevice()) {
            window.addEventListener('mousemove', (e) => {
                mouseX = (e.clientX / window.innerWidth) - 0.5;
                mouseY = (e.clientY / window.innerHeight) - 0.5;
                requestTick();
            });
        }
    }
}

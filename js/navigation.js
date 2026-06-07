function initNavigation() {
    // 1. Smooth Reveal Animation on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    const sections = document.querySelectorAll('section h2, section .card, section .text-block');
    sections.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // 2. Contact form handling
    const contactForm = document.getElementById('contactForm');
    const feedbackMsg = document.getElementById('form-feedback');
    const submitBtn = document.querySelector('.btn-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitBtn.innerText = 'Wird gesendet...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.style.display = 'none';
                feedbackMsg.classList.remove('hidden');
                feedbackMsg.style.color = 'var(--color-sage)';
                feedbackMsg.style.marginTop = '1rem';
            }, 1500);
        });
    }

    // 3. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // If mobile menu is open, close it
                const menuToggle = document.querySelector('.mobile-menu-toggle');
                const navList = document.querySelector('.nav-list');
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navList.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
                
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. Mobile Menu
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        const toggleMenu = (e) => {
            if (e && e.type === 'touchstart') e.preventDefault();
            menuToggle.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        };

        menuToggle.addEventListener('click', toggleMenu);
        menuToggle.addEventListener('touchstart', toggleMenu, { passive: false });

        navList.addEventListener('click', (e) => {
            if (e.target === navList) {
                toggleMenu();
            }
        });
    }

    // 5. Smart Header & Progress bar
    const header = document.querySelector('.site-header');
    const progressBar = document.querySelector('.scroll-progress');
    let lastScrollY = window.scrollY;
    let isHeaderTicking = false;

    if (header || progressBar) {
        window.addEventListener('scroll', () => {
            if (!isHeaderTicking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    if (progressBar) {
                        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                        const scrolled = (scrollTop / scrollHeight) * 100;
                        progressBar.style.width = scrolled + "%";
                    }

                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        if (header) header.classList.add('header-hidden');
                        if (progressBar) progressBar.classList.add('header-hidden');
                    } else {
                        if (header) header.classList.remove('header-hidden');
                        if (progressBar) progressBar.classList.remove('header-hidden');
                    }
                    lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
                    isHeaderTicking = false;
                });
                isHeaderTicking = true;
            }
        }, { passive: true });
    }
}

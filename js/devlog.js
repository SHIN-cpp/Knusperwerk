/**
 * Knusperwerk Dev-Log Interactions
 * Handles timeline filtering, collapsible details, and scroll-driven entry effects fallback.
 */

function initDevlog() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const cards = document.querySelectorAll('.timeline-card');

    // 1. Filtering Logic
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Toggle active class on buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            timelineItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    // Show item
                    item.classList.remove('filtered-out');
                    // Force layout recalculation for transition
                    void item.offsetWidth;
                    item.classList.remove('fade-hidden');
                } else {
                    // Fade out
                    item.classList.add('fade-hidden');
                    // Add display: none after fade transition ends (matching CSS 0.3s)
                    const onTransitionEnd = (e) => {
                        if (e.propertyName === 'opacity' && item.classList.contains('fade-hidden')) {
                            item.classList.add('filtered-out');
                            item.removeEventListener('transitionend', onTransitionEnd);
                        }
                    };
                    item.addEventListener('transitionend', onTransitionEnd);
                }
            });
        });
    });

    // 2. Accordion Collapsible Logic
    cards.forEach(card => {
        const header = card.querySelector('.timeline-header');
        if (header) {
            header.addEventListener('click', () => {
                const isExpanded = card.classList.contains('expanded');
                
                // Toggle card state
                card.classList.toggle('expanded');
                
                // Toggle button aria attributes for screen readers
                const toggleBtn = header.querySelector('.timeline-toggle-btn');
                if (toggleBtn) {
                    toggleBtn.setAttribute('aria-expanded', !isExpanded);
                }
            });
        }
    });

    // 3. Fallback for Scroll-Driven Animations
    // Checks if the browser supports CSS Scroll-Driven Animations.
    // If not, we fall back to IntersectionObserver to add entry visual classes.
    if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -12% 0px', // Trigger when item is 12% above viewport bottom
            threshold: 0.1
        };

        const timelineObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        timelineItems.forEach(item => {
            item.classList.add('reveal-prepare');
            timelineObserver.observe(item);
        });
    }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initDevlog);

// ==========================================
// Poyraz Et Lokantası - Menu Interactions v2
// Smooth section reveals + card stagger
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    const nav = document.getElementById('categoryNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.menu-section');

    // ──────────────────────────────────────
    // 1. Sticky Nav shadow on scroll
    // ──────────────────────────────────────
    let ticking = false;

    const handleNavScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 100);
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleNavScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ──────────────────────────────────────
    // 2. Active nav link tracking via IntersectionObserver
    // ──────────────────────────────────────
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                        // Scroll the active link into the visible area of the nav bar
                        link.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'center'
                        });
                    }
                });
            }
        });
    }, {
        rootMargin: '-80px 0px -55% 0px',
        threshold: 0
    });

    sections.forEach(section => navObserver.observe(section));

    // ──────────────────────────────────────
    // 3. Smooth scroll on nav link click
    // ──────────────────────────────────────
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ──────────────────────────────────────
    // 4. Section reveal animation (smooth fade-in + slide)
    // ──────────────────────────────────────
    const revealSections = document.querySelectorAll('.reveal-section');

    const sectionRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Once revealed, trigger staggered card animations inside this section
                const cards = entry.target.querySelectorAll('.menu-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('card-visible');
                    }, index * 60); // 60ms stagger per card
                });

                sectionRevealObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.05
    });

    revealSections.forEach(section => sectionRevealObserver.observe(section));

    // Also add smooth transition to cards via CSS (set dynamically for flexibility)
    const allCards = document.querySelectorAll('.menu-card');
    allCards.forEach(card => {
        card.style.transition = 'opacity 0.5s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
    });

    // ──────────────────────────────────────
    // 5. Touch feedback for cards (mobile)
    // ──────────────────────────────────────
    allCards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        }, { passive: true });

        card.addEventListener('touchend', () => {
            // Restore after a tiny delay for visual feedback
            setTimeout(() => {
                card.style.transform = '';
            }, 100);
        }, { passive: true });
    });

});

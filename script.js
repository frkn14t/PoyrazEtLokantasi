// ==========================================
// Poyraz Et Lokantası - Menu Interactions v3
// Lightweight — only nav tracking
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.menu-section');

    // ── Active nav link on scroll ──
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const isActive = link.getAttribute('href') === `#${id}`;
                    link.classList.toggle('active', isActive);
                    if (isActive) {
                        link.scrollIntoView({ block: 'nearest', inline: 'center' });
                    }
                });
            }
        });
    }, {
        rootMargin: '-60px 0px -50% 0px',
        threshold: 0
    });

    sections.forEach(s => observer.observe(s));

    // ── Smooth scroll on nav click ──
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const el = document.getElementById(link.getAttribute('href').substring(1));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        });
    });

});

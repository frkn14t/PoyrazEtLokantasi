// ==========================================
// Poyraz Et Lokantası - Menu Interactions v4
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.menu-section');
    const nav = document.getElementById('categoryNav');

    // 1. Tıklandığında kesin ve hızlı kaydırma
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Anında aktif class'ı değiştir (gecikme hissini yok eder)
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Menünün dinamik yüksekliğini hesaba kat
                const navHeight = nav.offsetHeight;
                
                // Nokta atışı hedef pozisyonu hesapla (menü altında kalmaması için)
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
                
                // Akıcı ama JS tabanlı native kaydırma (CSS'ten daha stabil çalışır)
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Scroll yaparken hangi kategoride olduğumuzu bulma (Performanslı)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            const navHeight = nav.offsetHeight;
            let currentSection = '';
            
            // Ekranda hangi section'ın olduğunu tespit et
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 50;
                if (window.pageYOffset >= sectionTop) {
                    currentSection = section.getAttribute('id');
                }
            });

            // Üst menüdeki aktif butonu güncelle
            if (currentSection) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        if (!link.classList.contains('active')) {
                            navLinks.forEach(l => l.classList.remove('active'));
                            link.classList.add('active');
                            
                            // Üst menüyü sağa/sola kaydırarak aktif elemanı ekrana getir
                            link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        }
                    }
                });
            }
        });
    }, { passive: true });
});

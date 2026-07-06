// ==========================================
// Poyraz Et Lokantası - Menu Interactions v5
// Maksimum Performans (Sıfır Lag - Anında Geçiş)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.menu-section');
    
    // 1. Tıklama Olayı
    // Dikey sayfa kaydırmasını TAMAMEN tarayıcıya bıraktık (Sıfır lag, anında atlama).
    // JS sadece üstteki yatay menüyü hareket ettirir ve rengi değiştirir.
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Aktif class'ı anında değiştir
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Yatay menüde seçilen öğeyi ortala (animasyonsuz, anında)
            this.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
        });
    });

    // 2. Sayfa kaydırılırken aktif kategoriyi bulma
    // Ağır scroll event'i yerine, sıfır kasmaya neden olan native IntersectionObserver kullanıyoruz.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        // Seçili olanı aktif yap
                        link.classList.add('active');
                        // Üst menüyü de kaydır ki ekranda görünsün
                        link.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        // Ekranın üst kısmına yaklaşan section'ı tetikle
        rootMargin: '-80px 0px -70% 0px', 
        threshold: 0
    });

    // Tüm kategorileri dinlemeye başla
    sections.forEach(section => observer.observe(section));
});

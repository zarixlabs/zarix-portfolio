// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
function updateNav() {
    const y = window.scrollY + 140;
    sections.forEach(s => {
        const top = s.offsetTop, h = s.offsetHeight, id = s.id;
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', y >= top && y < top + h);
        }
    });
}
window.addEventListener('scroll', updateNav);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || 0);
            setTimeout(() => entry.target.classList.add('visible'), delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
document.querySelectorAll('.astat-num').forEach(el => {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = el.childNodes[0].textContent.trim();
                const target = parseInt(text);
                if (isNaN(target)) return;
                const duration = 2000, start = performance.now();
                function tick(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.childNodes[0].textContent = Math.floor(target * eased);
                    if (progress < 1) requestAnimationFrame(tick);
                    else el.childNodes[0].textContent = target;
                }
                requestAnimationFrame(tick);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    obs.observe(el);
});

// ===== HERO MOCKUP 3D DYNAMIC EFFECT =====
const heroSection = document.querySelector('.hero');
const browserMock = document.querySelector('.browser-mock');

if (heroSection && browserMock) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -12; // Max 12 deg rotation
        const rotateY = ((x - centerX) / centerX) * 12;

        browserMock.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        browserMock.style.transition = 'none';
    });

    heroSection.addEventListener('mouseleave', () => {
        browserMock.style.transform = '';
        browserMock.style.transition = 'all 0.8s var(--ease)';
    });
}

// ===== PARALLAX ORBS =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    if(orb1) orb1.style.marginTop = `${scrolled * 0.15}px`;
    if(orb2) orb2.style.marginTop = `-${scrolled * 0.1}px`;
});

// ===== MAGNETIC BUTTONS =====
const magnetButtons = document.querySelectorAll('.btn-main, .btn-outline, .nav-cta');
magnetButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const h = rect.width / 2;
        const v = rect.height / 2;
        const x = e.clientX - rect.left - h;
        const y = e.clientY - rect.top - v;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ===== 3D CARD TILT =====
const tiltCards = document.querySelectorAll('.svc-card, .project-card, .why-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none';
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'all 0.4s var(--ease)';
        card.style.zIndex = '1';
    });
});

// ===== LIQUID GLASS HOVER LIGHTING =====
const glassCards = document.querySelectorAll('.svc-card, .project-card, .why-card, .astat, .testi-card, .contact-wrapper');
glassCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

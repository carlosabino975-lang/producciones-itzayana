// ========== MENÚ HAMBURGUESA ==========
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Cambiar ícono del menú
        menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
}

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (menuToggle) menuToggle.textContent = '☰';
    });
});

// ========== CONTADORES ANIMADOS ==========
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    updateCounter();
}

// Intersection Observer para activar contadores cuando son visibles
const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            if (!counter.classList.contains('animated')) {
                animateCounter(counter, target);
                counter.classList.add('animated');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.contador-numero').forEach(counter => {
    observer.observe(counter);
});

// ========== EFECTO DE APARICIÓN AL SCROLL ==========
const fadeElements = document.querySelectorAll('.icono-card, .testimonio-card, .contador-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    fadeObserver.observe(element);
});

// ========== CAMBIAR NAVBAR AL HACER SCROLL ==========
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.padding = '0.5rem 5%';
        nav.style.background = 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))';
    } else {
        nav.style.padding = '1rem 5%';
        nav.style.background = 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))';
    }
});

// ========== AÑADIR CLASE ACTIVA AL NAVEGADOR ==========
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// ========== BOTÓN DE WHATSAPP (evitar múltiples clics) ==========
const whatsappBtn = document.querySelector('.whatsapp-float');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
        // Puedes agregar analytics aquí si lo deseas
        console.log('WhatsApp clicked');
    });
}

// ========== PREVENIR CONSOLA DE ERRORES ==========
window.addEventListener('error', (e) => {
    console.warn('Error no crítico:', e.message);
});

// ========== LOADING COMPLETADO ==========
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('✅ Página cargada completamente');
});
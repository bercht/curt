/*
  ============================================
  CURT BERCHT LANDING PAGE V2 - JAVASCRIPT
  Interatividade e funcionalidades
  ============================================
*/

// ============================================
// HEADER - SCROLL E MENU MOBILE
// ============================================

const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
const navDesktop = document.getElementById('navDesktop');

// Mostrar/esconder header ao scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Toggle menu mobile
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMobile.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header')) {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
    }
});

// Mostrar nav-desktop em telas grandes
function handleResize() {
    if (window.innerWidth > 1024) {
        navDesktop.classList.add('active');
    } else {
        navDesktop.classList.remove('active');
    }
}

window.addEventListener('resize', handleResize);
handleResize();

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER - ANIMAÇÕES AO SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll(
        '.service-card, .course-item, .highlight-item, .service-detail-item'
    );
    
    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
});

// ============================================
// BOTÕES CTA
// ============================================

const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary');

ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Se é um link, deixar comportamento padrão
        if (this.tagName === 'A') return;
        
        // Adicionar ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Log do clique
        console.log('CTA clicado:', this.textContent);
    });
});

// ============================================
// CARDS INTERATIVOS
// ============================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('click', function() {
        const cardText = this.querySelector('h3').textContent;
        console.log('Card clicado:', cardText);
        
        // Adicionar feedback visual
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});

// ============================================
// COURSE ITEMS - HOVER EFFECT
// ============================================

const courseItems = document.querySelectorAll('.course-item');

courseItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.background = 'var(--bg-tertiary)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.background = 'var(--bg-secondary)';
    });
});

// ============================================
// HIGHLIGHT ITEMS - HOVER EFFECT
// ============================================

const highlightItems = document.querySelectorAll('.highlight-item');

highlightItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.highlight-icon');
        icon.style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.highlight-icon');
        icon.style.transform = '';
    });
});

// ============================================
// LAZY LOADING DE IMAGENS (FUTURO)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// ANALYTICS - RASTREAMENTO DE EVENTOS
// ============================================

function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    
    // Integrar com Google Analytics, Mixpanel, etc.
    // if (window.gtag) {
    //     gtag('event', eventName, eventData);
    // }
}

// Rastrear cliques em CTAs
document.querySelectorAll('.cta-button, .btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('cta_click', {
            cta_text: this.textContent.trim(),
            cta_type: this.classList.contains('cta-button') ? 'header' : 'body'
        });
    });
});

// Rastrear cliques em links de navegação
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('nav_click', {
            nav_text: this.textContent,
            nav_href: this.getAttribute('href')
        });
    });
});

// ============================================
// PERFORMANCE - DEBOUNCE
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce ao scroll
const debouncedScroll = debounce(() => {
    // Lógica de scroll aqui
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Rolar para um elemento específico
 */
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const headerHeight = header.offsetHeight;
        const targetPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Adicionar classe com delay
 */
function addClassWithDelay(selector, className, delay) {
    const element = document.querySelector(selector);
    if (element) {
        setTimeout(() => {
            element.classList.add(className);
        }, delay);
    }
}

/**
 * Remover classe com delay
 */
function removeClassWithDelay(selector, className, delay) {
    const element = document.querySelector(selector);
    if (element) {
        setTimeout(() => {
            element.classList.remove(className);
        }, delay);
    }
}

/**
 * Validar email
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Copiar para clipboard
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copiado para clipboard:', text);
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
}

// ============================================
// EXPORT FUNCTIONS (para uso externo)
// ============================================

window.LandingPageUtils = {
    scrollToElement,
    addClassWithDelay,
    removeClassWithDelay,
    validateEmail,
    copyToClipboard,
    trackEvent
};

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Landing page carregada com sucesso');
    
    // Adicionar classe de carregamento ao body
    document.body.classList.add('loaded');
    
    // Inicializar tooltips, popovers, etc. (se necessário)
    // initTooltips();
});

// ============================================
// SERVICE WORKER (OPCIONAL - para PWA)
// ============================================

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js');
//     });
// }

// ============================================
// DARK MODE TOGGLE (OPCIONAL)
// ============================================

function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (!darkModeToggle) return;
    
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
    
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });
}

// Descomentar para usar dark mode toggle
// initDarkMode();

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // ESC para fechar menu mobile
    if (e.key === 'Escape') {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
    }
});

// ============================================
// FORM HANDLING (EXEMPLO)
// ============================================

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validar dados
    const data = Object.fromEntries(formData);
    
    console.log('Form data:', data);
    
    // Enviar para servidor ou serviço externo
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // }).then(res => res.json()).then(data => console.log(data));
}

// Descomentar para usar form handling
// document.getElementById('contactForm')?.addEventListener('submit', handleFormSubmit);

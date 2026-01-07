/**
 * VISUAL CREATIVA - MAIN SCRIPT (OPTIMIZED)
 * Performance optimizations applied:
 * - Debouncing for scroll events
 * - Passive event listeners
 * - RequestAnimationFrame for animations
 * - Reduced DOM queries
 */

// Utilidades de rendimiento
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initVideoModals();
  initScrollToTop();
  initLazyLoading();
  initSmoothScroll();
  initHeaderScroll();

  // Preload crítico
  preloadCriticalResources();
});

/* ===========================================
   MENÚ MÓVIL (OPTIMIZADO)
=========================================== */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');

  if (!toggle || !nav) return;

  const toggleMenu = () => {
    const isOpen = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', toggleMenu);

  // Cerrar al hacer click en un enlace
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      closeMenu();
    }
  });
}

/* ===========================================
   MODAL DE VIDEO (OPTIMIZADO)
=========================================== */
function initVideoModals() {
  const videoCards = document.querySelectorAll('.video-card');
  const modal = document.getElementById('modalVideo');

  if (!modal || videoCards.length === 0) return;

  const iframe = document.getElementById('videoFrame');
  const closeBtn = modal.querySelector('.cerrar');

  const openVideo = (videoId) => {
    if (!iframe) return;
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus management
    requestAnimationFrame(() => {
      const closeButton = modal.querySelector('.cerrar');
      if (closeButton) closeButton.focus();
    });
  };

  const closeVideo = () => {
    if (!iframe) return;
    iframe.src = '';
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.getAttribute('data-video');
      if (videoId) openVideo(videoId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeVideo);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideo();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeVideo();
  });
}

/* ===========================================
   SCROLL TO TOP BUTTON (OPTIMIZADO)
=========================================== */
function initScrollToTop() {
  let scrollBtn = document.querySelector('.scroll-to-top');

  if (!scrollBtn) {
    scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Volver arriba');
    scrollBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4l-8 8h5v8h6v-8h5z"/>
      </svg>
    `;
    document.body.appendChild(scrollBtn);
  }

  // Throttled scroll handler para mejor performance
  const toggleScrollBtn = throttle(() => {
    const shouldShow = window.scrollY > 300;
    scrollBtn.classList.toggle('visible', shouldShow);
  }, 100);

  window.addEventListener('scroll', toggleScrollBtn, { passive: true });
  toggleScrollBtn(); // Check inicial

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ===========================================
   LAZY LOADING DE IMÁGENES (MEJORADO)
=========================================== */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Si tiene data-src, usarlo
          if (img.dataset.src) {
            img.src = img.dataset.src;
            delete img.dataset.src;
          }

          // Si tiene srcset
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            delete img.dataset.srcset;
          }

          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback para navegadores antiguos
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        delete img.dataset.src;
      }
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
        delete img.dataset.srcset;
      }
    });
  }
}

/* ===========================================
   SMOOTH SCROLL PARA ENLACES INTERNOS
=========================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ===========================================
   HEADER SCROLL EFFECT (NUEVO)
=========================================== */
function initHeaderScroll() {
  const header = document.querySelector('.encabezado');
  if (!header) return;

  const handleScroll = throttle(() => {
    const scrolled = window.scrollY > 50;
    header.classList.toggle('scrolled', scrolled);
  }, 100);

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* ===========================================
   PRELOAD DE RECURSOS CRÍTICOS
=========================================== */
function preloadCriticalResources() {
  // Preload de imágenes críticas al hover
  const cards = document.querySelectorAll('.rubro, .video-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      const img = this.querySelector('img[data-src]');
      if (img && img.dataset.src) {
        const tempImg = new Image();
        tempImg.src = img.dataset.src;
      }
    }, { once: true, passive: true });
  });
}

/* ===========================================
   PERFORMANCE: Preload de videos al hover
=========================================== */
document.addEventListener('DOMContentLoaded', () => {
  const videoCards = document.querySelectorAll('.video-card');

  videoCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const videoId = card.getAttribute('data-video');
      if (videoId) {
        // Precargar thumbnail de mayor calidad
        const img = new Image();
        img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }, { once: true, passive: true });
  });
});

/* ===========================================
   OPTIMIZACIÓN DE ANIMACIONES
=========================================== */
// Pausar animaciones cuando la pestaña no está visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pausar animaciones CSS
    document.body.classList.add('animations-paused');
  } else {
    document.body.classList.remove('animations-paused');
  }
});

/* ===========================================
   DETECCIÓN DE CONEXIÓN LENTA
=========================================== */
if ('connection' in navigator) {
  const connection = navigator.connection;

  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    // Deshabilitar animaciones pesadas en conexiones lentas
    document.body.classList.add('slow-connection');

    // Deshabilitar AOS en conexiones lentas
    if (typeof AOS !== 'undefined') {
      AOS.init({ disable: true });
    }
  }
}

/* ===========================================
   ERROR HANDLING GLOBAL
=========================================== */
window.addEventListener('error', (e) => {
  console.error('Error capturado:', e.error);

  // Aquí podrías enviar errores a un servicio de tracking
  // Por ejemplo: Sentry, LogRocket, etc.
});

/* ===========================================
   UTILIDAD: Intersection Observer para animaciones
=========================================== */
function observeElements(selector, callback, options = {}) {
  const elements = document.querySelectorAll(selector);

  if (!elements.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  });

  elements.forEach(el => observer.observe(el));
}

// Ejemplo de uso para animaciones custom
observeElements('.fade-in-up', (element) => {
  element.classList.add('animated');
});

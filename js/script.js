document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initVideoModals();
  initScrollToTop();
  initFormValidation();
  initLazyLoading();
  initSmoothScroll();
});

/* ===========================================
   MENÚ MÓVIL
=========================================== */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
      const isOpen = document.body.classList.contains('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      
      // Prevenir scroll cuando el menú está abierto
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Cerrar al hacer click en un enlace
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ===========================================
   MODAL DE VIDEO (Global)
=========================================== */
function initVideoModals() {
  const videoCards = document.querySelectorAll('.video-card');
  const modal = document.getElementById('modalVideo');

  // Si no hay modal o tarjetas, salimos
  if (!modal || videoCards.length === 0) return;

  const iframe = document.getElementById('videoFrame');
  const closeBtn = modal.querySelector('.cerrar');

  const openVideo = (videoId) => {
    if (!iframe) return;
    // Autoplay activado
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
    
    // Focus trap
    iframe.focus();
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

  // Cerrar al hacer click fuera del contenido
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideo();
  });

  // Cerrar con Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeVideo();
  });
}

/* ===========================================
   SCROLL TO TOP BUTTON
=========================================== */
function initScrollToTop() {
  // Crear botón si no existe
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

  // Mostrar/ocultar según scroll
  const toggleScrollBtn = () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleScrollBtn);
  toggleScrollBtn(); // Check inicial

  // Scroll suave al hacer click
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ===========================================
   VALIDACIÓN DE FORMULARIOS
=========================================== */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Limpiar errores previos
      form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
      });

      let isValid = true;

      // Validar campos requeridos
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        const group = field.closest('.form-group');
        
        if (!field.value.trim()) {
          group.classList.add('error');
          const errorMsg = group.querySelector('.form-error');
          if (errorMsg) errorMsg.textContent = 'Este campo es obligatorio';
          isValid = false;
        }
      });

      // Validar email
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          const group = emailField.closest('.form-group');
          group.classList.add('error');
          const errorMsg = group.querySelector('.form-error');
          if (errorMsg) errorMsg.textContent = 'Email inválido';
          isValid = false;
        }
      }

      // Validar teléfono
      const phoneField = form.querySelector('input[type="tel"]');
      if (phoneField && phoneField.value) {
        const phoneRegex = /^[0-9]{9,}$/;
        if (!phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
          const group = phoneField.closest('.form-group');
          group.classList.add('error');
          const errorMsg = group.querySelector('.form-error');
          if (errorMsg) errorMsg.textContent = 'Teléfono inválido (mínimo 9 dígitos)';
          isValid = false;
        }
      }

      if (isValid) {
        // Deshabilitar botón de envío
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="loading-spinner"></span> Enviando...';
        }

        // Aquí iría la lógica de envío real (AJAX, fetch, etc.)
        // Por ahora simulamos un envío exitoso
        setTimeout(() => {
          const successMsg = form.querySelector('.form-success');
          if (successMsg) {
            successMsg.classList.add('show');
            form.reset();
          }
          
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Enviar Mensaje';
          }

          // Ocultar mensaje después de 5 segundos
          setTimeout(() => {
            if (successMsg) successMsg.classList.remove('show');
          }, 5000);
        }, 1500);
      }
    });

    // Limpiar error al escribir
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        const group = field.closest('.form-group');
        if (group) group.classList.remove('error');
      });
    });
  });
}

/* ===========================================
   LAZY LOADING DE IMÁGENES
=========================================== */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Si tiene data-src, usarlo (para imágenes que aún no se han cargado)
          if (img.dataset.src) {
            img.src = img.dataset.src;
            delete img.dataset.src;
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
      
      // Ignorar # solo
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
    }, { once: true });
  });
});

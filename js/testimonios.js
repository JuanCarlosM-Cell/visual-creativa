/**
 * CARRUSEL DE TESTIMONIOS
 * Auto-play con controles manuales y soporte táctil
 */

document.addEventListener('DOMContentLoaded', () => {
    initTestimonials();
});

function initTestimonials() {
    const carousel = document.querySelector('.testimonios-carousel');

    if (!carousel) return;

    const track = carousel.querySelector('.testimonios-track');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('.carousel-btn-prev');
    const nextBtn = carousel.querySelector('.carousel-btn-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 segundos

    // Crear dots de navegación
    createDots(dotsContainer, slides.length);
    const dots = Array.from(dotsContainer?.children || []);

    // Configurar ancho de slides
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Posicionar slides
    slides.forEach((slide, index) => {
        slide.style.left = `${slideWidth * index}px`;
    });

    // Función para mover al slide
    const moveToSlide = (targetIndex) => {
        if (targetIndex < 0) targetIndex = slides.length - 1;
        if (targetIndex >= slides.length) targetIndex = 0;

        const targetSlide = slides[targetIndex];
        const amountToMove = targetSlide.style.left;

        track.style.transform = `translateX(-${amountToMove})`;
        currentIndex = targetIndex;

        updateDots(dots, currentIndex);
        updateButtons(prevBtn, nextBtn, currentIndex, slides.length);
    };

    // Event listeners para botones
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            moveToSlide(currentIndex - 1);
            startAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            moveToSlide(currentIndex + 1);
            startAutoPlay();
        });
    }

    // Event listeners para dots
    if (dotsContainer) {
        dotsContainer.addEventListener('click', (e) => {
            const targetDot = e.target.closest('.carousel-dot');
            if (!targetDot) return;

            const targetIndex = dots.indexOf(targetDot);
            stopAutoPlay();
            moveToSlide(targetIndex);
            startAutoPlay();
        });
    }

    // Soporte táctil (swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    }, { passive: true });

    const handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next
                moveToSlide(currentIndex + 1);
            } else {
                // Swipe right - prev
                moveToSlide(currentIndex - 1);
            }
        }
    };

    // Auto-play
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, autoPlayDelay);
    };

    const stopAutoPlay = () => {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    };

    // Pausar auto-play al hover (desktop)
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Pausar cuando la pestaña no está visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });

    // Inicializar
    updateDots(dots, currentIndex);
    updateButtons(prevBtn, nextBtn, currentIndex, slides.length);
    startAutoPlay();

    // Responsive: recalcular en resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newSlideWidth = slides[0].getBoundingClientRect().width;
            slides.forEach((slide, index) => {
                slide.style.left = `${newSlideWidth * index}px`;
            });
            moveToSlide(currentIndex);
        }, 250);
    });
}

/**
 * Crear dots de navegación
 */
function createDots(container, count) {
    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Ir a testimonio ${i + 1}`);
        container.appendChild(dot);
    }
}

/**
 * Actualizar dots activos
 */
function updateDots(dots, currentIndex) {
    if (!dots || dots.length === 0) return;

    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
            dot.setAttribute('aria-current', 'true');
        } else {
            dot.classList.remove('active');
            dot.removeAttribute('aria-current');
        }
    });
}

/**
 * Actualizar estado de botones
 */
function updateButtons(prevBtn, nextBtn, currentIndex, totalSlides) {
    // En modo infinito, los botones siempre están habilitados
    // Si quieres deshabilitar en los extremos, descomenta:
    /*
    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndex === totalSlides - 1;
    }
    */
}

/**
 * FORMULARIO DE CONTACTO CON EMAILJS
 * 
 * CONFIGURACIÓN REQUERIDA:
 * 1. Crear cuenta en https://www.emailjs.com/
 * 2. Crear un servicio de email (Gmail, Outlook, etc.)
 * 3. Crear una plantilla de email
 * 4. Reemplazar las constantes abajo con tus credenciales
 */

// ⚠️ IMPORTANTE: Reemplazar con tus credenciales de EmailJS
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'Yj9xSkffvYoPee4v9',
    SERVICE_ID: 'aatgliuomefqvfri',
    TEMPLATE_ID: 'template_yplrzzj'
};

// Inicializar EmailJS cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar EmailJS con la clave pública
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }

    initContactForm();
});

/**
 * Inicializar formulario de contacto
 */
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

/**
 * Manejar envío del formulario
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');

    // Limpiar mensajes previos
    hideMessage(successMsg);
    hideMessage(errorMsg);

    // Validar todos los campos
    if (!validateForm(form)) {
        showMessage(errorMsg, 'Por favor, corrige los errores en el formulario.');
        return;
    }

    // Deshabilitar botón y mostrar loading
    setButtonLoading(submitBtn, true);

    try {
        // Verificar que EmailJS esté cargado
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS no está cargado. Verifica la conexión a internet.');
        }

        // Preparar datos del formulario
        const formData = {
            nombre: form.nombre.value.trim(),
            email: form.email.value.trim(),
            telefono: form.telefono.value.trim(),
            servicio: form.servicio.value || 'No especificado',
            mensaje: form.mensaje.value.trim(),
            fecha: new Date().toLocaleString('es-PE'),
            // Campos adicionales para la plantilla
            to_name: 'Visual Creativa',
            from_name: form.nombre.value.trim(),
            reply_to: form.email.value.trim()
        };

        // Enviar email usando EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            formData
        );

        if (response.status === 200) {
            // Éxito
            showMessage(successMsg, '¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.');
            form.reset();

            // Ocultar mensaje después de 8 segundos
            setTimeout(() => hideMessage(successMsg), 8000);

            // Google Analytics event (si está configurado)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    event_category: 'Contact',
                    event_label: 'Contact Form'
                });
            }
        } else {
            throw new Error('Error al enviar el mensaje');
        }

    } catch (error) {
        console.error('Error al enviar formulario:', error);

        // Si EmailJS no está configurado, ofrecer alternativa de WhatsApp
        if (EMAILJS_CONFIG.PUBLIC_KEY === 'TU_PUBLIC_KEY_AQUI' ||
            EMAILJS_CONFIG.SERVICE_ID === 'TU_SERVICE_ID_AQUI') {

            // Preparar mensaje para WhatsApp
            const whatsappMsg = `Hola! Me gustaría contactar con Visual Creativa.%0A%0A` +
                `*Nombre:* ${form.nombre.value.trim()}%0A` +
                `*Email:* ${form.email.value.trim()}%0A` +
                `*Teléfono:* ${form.telefono.value.trim()}%0A` +
                `*Servicio:* ${form.servicio.value || 'No especificado'}%0A` +
                `*Mensaje:* ${form.mensaje.value.trim()}`;

            const whatsappNumber = '51985354696'; // Número de WhatsApp de Visual Creativa
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

            // Mostrar mensaje con opción de WhatsApp
            const errorMessage = `El formulario de contacto está en configuración. ` +
                `¿Deseas enviar tu mensaje por WhatsApp en su lugar?`;

            if (confirm(errorMessage)) {
                window.open(whatsappUrl, '_blank');
                form.reset();
                showMessage(successMsg, '¡Gracias! Te hemos redirigido a WhatsApp para completar tu mensaje.');
                setTimeout(() => hideMessage(successMsg), 5000);
            } else {
                showMessage(errorMsg, 'Por favor, contáctanos directamente por WhatsApp al +51 985 354 696');
            }

            return;
        }

        let errorMessage = 'Hubo un error al enviar el mensaje. ';

        if (error.text) {
            errorMessage += error.text;
        } else if (error.message) {
            errorMessage += error.message;
        } else {
            errorMessage += 'Por favor, intenta nuevamente o contáctanos por WhatsApp.';
        }

        showMessage(errorMsg, errorMessage);

        // Ocultar mensaje de error después de 10 segundos
        setTimeout(() => hideMessage(errorMsg), 10000);

    } finally {
        // Restaurar botón
        setButtonLoading(submitBtn, false);
    }
}

/**
 * Validar formulario completo
 */
function validateForm(form) {
    let isValid = true;

    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

/**
 * Validar campo individual
 */
function validateField(field) {
    const group = field.closest('.form-group');
    const errorSpan = group?.querySelector('.form-error');

    if (!group) return true;

    let isValid = true;
    let errorMessage = '';

    // Validar campo requerido
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'Este campo es obligatorio';
    }

    // Validar email
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            isValid = false;
            errorMessage = 'Email inválido';
        }
    }

    // Validar teléfono
    if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[0-9]{9,}$/;
        const cleanPhone = field.value.replace(/\s/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            isValid = false;
            errorMessage = 'Teléfono inválido (mínimo 9 dígitos)';
        }
    }

    // Mostrar/ocultar error
    if (!isValid) {
        group.classList.add('error');
        if (errorSpan) errorSpan.textContent = errorMessage;
    } else {
        group.classList.remove('error');
        if (errorSpan) errorSpan.textContent = '';
    }

    return isValid;
}

/**
 * Limpiar error de campo
 */
function clearFieldError(field) {
    const group = field.closest('.form-group');
    if (group) {
        group.classList.remove('error');
        const errorSpan = group.querySelector('.form-error');
        if (errorSpan) errorSpan.textContent = '';
    }
}

/**
 * Mostrar mensaje
 */
function showMessage(element, message) {
    if (!element) return;

    element.textContent = message;
    element.classList.add('show');
    element.setAttribute('role', 'alert');

    // Scroll suave al mensaje
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Ocultar mensaje
 */
function hideMessage(element) {
    if (!element) return;

    element.classList.remove('show');
    element.removeAttribute('role');
}

/**
 * Cambiar estado de botón (loading)
 */
function setButtonLoading(button, isLoading) {
    if (!button) return;

    if (isLoading) {
        button.disabled = true;
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = '<span class="loading-spinner"></span> Enviando...';
    } else {
        button.disabled = false;
        button.innerHTML = button.dataset.originalText || 'Enviar Mensaje';
    }
}

/**
 * Formatear teléfono automáticamente (opcional)
 */
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.length > 3 && value.length <= 6) {
        value = value.slice(0, 3) + ' ' + value.slice(3);
    } else if (value.length > 6) {
        value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 9);
    }

    input.value = value;
}

// Auto-formatear teléfono (opcional, descomentar si se desea)
/*
document.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.getElementById('telefono');
  if (phoneInput) {
    phoneInput.addEventListener('input', () => formatPhoneNumber(phoneInput));
  }
});
*/

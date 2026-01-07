# Visual Creativa - Guía de Configuración

## 📋 Configuración del Formulario de Contacto (EmailJS)

El formulario de contacto utiliza **EmailJS** para enviar emails sin necesidad de un backend. Sigue estos pasos para configurarlo:

### Paso 1: Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita (200 emails/mes)
3. Verifica tu email

### Paso 2: Configurar Servicio de Email

1. En el dashboard de EmailJS, ve a **Email Services**
2. Click en **Add New Service**
3. Selecciona tu proveedor (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. **Guarda el Service ID** (ej: `service_abc123`)

### Paso 3: Crear Plantilla de Email

1. Ve a **Email Templates**
2. Click en **Create New Template**
3. Usa esta plantilla:

```
Asunto: Nuevo mensaje de contacto - {{from_name}}

Hola Visual Creativa,

Has recibido un nuevo mensaje de contacto desde tu sitio web:

Nombre: {{nombre}}
Email: {{email}}
Teléfono: {{telefono}}
Servicio de interés: {{servicio}}

Mensaje:
{{mensaje}}

---
Enviado el: {{fecha}}
Responder a: {{reply_to}}
```

4. **Guarda el Template ID** (ej: `template_xyz789`)

### Paso 4: Obtener Public Key

1. Ve a **Account** → **General**
2. Copia tu **Public Key** (ej: `abcdefghijk123456`)

### Paso 5: Configurar en el Proyecto

Abre el archivo `js/contact-form.js` y reemplaza estas líneas (líneas 11-15):

```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'TU_PUBLIC_KEY_AQUI',     // ← Pega tu Public Key
  SERVICE_ID: 'TU_SERVICE_ID_AQUI',      // ← Pega tu Service ID
  TEMPLATE_ID: 'TU_TEMPLATE_ID_AQUI'     // ← Pega tu Template ID
};
```

### Paso 6: Probar el Formulario

1. Abre `contacto.html` en tu navegador
2. Llena el formulario con datos de prueba
3. Haz click en "Enviar Mensaje"
4. Deberías recibir el email en la cuenta configurada

---

## 🎨 Características Implementadas

### ✅ Optimización de Rendimiento
- **Critical CSS** inline para faster FCP
- **Lazy loading** mejorado con IntersectionObserver
- **Debouncing y throttling** en eventos de scroll
- **Passive event listeners** para mejor performance
- **Detección de conexión lenta** para deshabilitar animaciones pesadas

### ✅ Formulario de Contacto Funcional
- Integración con EmailJS
- Validación en tiempo real
- Mensajes de éxito/error
- Estados de loading
- Accesibilidad completa (ARIA labels, keyboard navigation)

### ✅ Sección de Testimonios
- Carrusel automático (5 segundos)
- Controles de navegación (prev/next)
- Dots de navegación
- Soporte táctil (swipe en móvil)
- Pausa al hover (desktop)
- Responsive completo

### ✅ Mejoras Responsive
- **Mobile** (< 768px): Layout optimizado, botones más grandes
- **Tablet** (768px - 1024px): Grid de 2 columnas
- **Desktop** (> 1024px): Grid completo de 3 columnas
- WhatsApp button responsive
- Header adaptativo

---

## 📱 Breakpoints Utilizados

```css
/* Extra Small Mobile */
@media (max-width: 375px) { ... }

/* Small Mobile */
@media (max-width: 480px) { ... }

/* Mobile */
@media (max-width: 600px) { ... }

/* Tablet */
@media (max-width: 768px) { ... }

/* Tablet Large */
@media (max-width: 900px) { ... }

/* Tablet Landscape */
@media (max-width: 1024px) and (min-width: 769px) { ... }

/* Desktop */
@media (min-width: 1025px) { ... }
```

---

## 🚀 Mejoras de Performance Implementadas

### JavaScript Optimizado
- ✅ Debouncing para scroll events
- ✅ Throttling para resize events
- ✅ Passive event listeners
- ✅ RequestAnimationFrame para animaciones
- ✅ Reducción de DOM queries

### CSS Optimizado
- ✅ Critical CSS separado
- ✅ Will-change para animaciones
- ✅ Transform en lugar de position
- ✅ Contain para aislar renderizado

### Recursos
- ✅ Preload de recursos críticos
- ✅ Lazy loading de imágenes
- ✅ Defer/async para scripts no críticos
- ✅ Preconnect para Google Fonts

---

## 🧪 Testing Recomendado

### Navegadores
- ✅ Chrome (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (macOS/iOS)
- ✅ Edge (última versión)

### Dispositivos
- 📱 iPhone (Safari iOS)
- 📱 Android (Chrome Mobile)
- 📱 iPad (Safari iPadOS)
- 💻 Desktop (1920x1080, 1366x768)

### Herramientas
```bash
# Lighthouse CI (Performance)
npm install -g @lhci/cli
lhci autorun --collect.url=https://tu-sitio.com

# HTML Validator
npx html-validate "*.html"

# CSS Validator
npx stylelint "css/**/*.css"
```

---

## 📝 Próximos Pasos Opcionales

### Funcionalidades Adicionales Sugeridas

1. **Newsletter**
   - Formulario en footer
   - Integración con Mailchimp/SendGrid
   - Popup de suscripción

2. **Galería de Proyectos**
   - Grid masonry responsive
   - Lightbox para imágenes
   - Filtros por categoría

3. **Blog/Noticias**
   - Sistema de posts
   - Categorías y tags
   - Búsqueda

4. **Chat en Vivo**
   - Integración con Tawk.to o Crisp
   - Respuestas automáticas
   - Horario de atención

5. **PWA (Progressive Web App)**
   - Service Worker completo
   - Instalable en dispositivos
   - Funcionalidad offline

---

## 🔧 Mantenimiento

### Actualizar Testimonios
Edita `index.html` líneas 226-330 para agregar/modificar testimonios.

### Cambiar Colores
Edita `css/estilos.css` líneas 4-9:
```css
:root {
  --naranja: #ff6b00;      /* Color principal */
  --naranja-2: #ff8533;    /* Color secundario */
  --gris-osc: #111;        /* Fondo oscuro */
}
```

### Agregar Nuevos Rubros
Edita `index.html` y agrega un nuevo bloque `.rubro` dentro de `.contenedor-rubros`.

---

## 📞 Soporte

Para cualquier duda sobre la configuración o personalización del sitio, contacta al equipo de desarrollo.

**Versión:** 2.0  
**Última actualización:** 31 de Diciembre, 2024  
**Desarrollado con:** HTML5, CSS3, JavaScript (Vanilla)

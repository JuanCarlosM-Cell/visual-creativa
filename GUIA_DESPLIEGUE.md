# 🚀 Guía Oficial de Despliegue - Visual Creativa

¡Tu sitio está listo para salir al mundo! Sigue estos pasos sencillos.

## 📋 Lista de Verificación (Todo listo ✅)

- [x] **HTML/CSS/JS**: Optimizados y revisados.
- [x] **Configuración**: `vercel.json` creado para URLs limpias.
- [x] **Metadatos**: `package.json` creado para compatibilidad.
- [x] **Assets**: Imágenes y videos en su lugar.

---

## 🚀 Opción 1: Despliegue Automático (Recomendada)

Esta opción conecta tu carpeta actual directamente a la nube.

1.  Abre la terminal en esta carpeta.
2.  Ejecuta:
    ```powershell
    npx vercel
    ```
3.  Responde a las preguntas así (presiona Enter para aceptar los valores por defecto):
    - **Set up and deploy?** `y` (Yes)
    - **Which scope?** (Tu usuario)
    - **Link to existing project?** `n` (No)
    - **Project name?** `visual-creativa`
    - **In which directory?** `./` (Enter)
    - **Want to modify these settings?** `n` (No)

¡Listo! En 1 minuto te dará una URL (ej. `https://visual-creativa.vercel.app`).

---

## 📂 Opción 2: Despliegue Manual (Arrastrar y Soltar)

Si prefieres usar el mouse:

1.  Entra a [vercel.com/new](https://vercel.com/new).
2.  Si tienes tu código en GitHub, impórtalo desde ahí.
3.  Si NO usas GitHub:
    - Instala [Vercel CLI](https://vercel.com/download) en tu computadora.
    - O simplemente usa la Opción 1, es la más rápida sin configurar GitHub.

---

## 🌐 Tu Dominio (Para después)

Cuando ya esté online, ve al panel de Vercel:
1.  **Settings** > **Domains**.
2.  Escribe tu dominio (ej. `visualcreativa.pe`).
3.  Configura los DNS que te indique Vercel en tu proveedor de dominio.

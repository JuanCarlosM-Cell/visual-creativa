# 🚀 Guía Definitiva: De tu PC a Internet (GitHub + Vercel)

Esta guía te explica cómo subir tu sitio web profesionalmente.

---

## ✅ Antes de empezar (Ya hecho por mí)
- [x] Tu código está listo.
- [x] Git está configurado en tu carpeta.
- [x] Los archivos están "guardados" (commit) y listos para viajar.

---

## 🟢 PASO 1: Crear la "Caja" en GitHub
*(Aquí es donde vivirá tu código en la nube)*

1.  Ve a esta dirección: **[github.com/new](https://github.com/new)**
    *(Inicia sesión si no lo has hecho).*
2.  En **Repository name**, escribe: `visual-creativa`
3.  Asegúrate de que esté marcado como **Public**.
4.  🛑 **MUY IMPORTANTE:** No toques nada más. No marques "Add a README file".
5.  Haz clic en el botón verde **Create repository**.

---

## 🟢 PASO 2: Subir tu Código
*(Mover los archivos de tu PC a la caja de GitHub)*

Una vez creado el repositorio, verás una pantalla con instrucciones. Necesitamos conectar tu carpeta actual con esa nueva caja.

Abre tu terminal (PowerShell o CMD) en la carpeta del proyecto y ejecuta estos 2 comandos:

### Comando 1: Conectar
*(Copia la línea que te da GitHub que empieza con `git remote add...`. Será algo así:)*

```powershell
git remote add origin https://github.com/TU-USUARIO/visual-creativa.git
```
*(Reemplaza `TU-USUARIO` con tu nombre real de GitHub).*

### Comando 2: Subir
*(Esto empuja tus archivos a la nube)*

```powershell
git push -u origin main
```

> 🔐 **¿Te pide contraseña?**
> Si te sale una ventana, inicia sesión con tu navegador. Si te pide contraseña en la terminal, usa tu "Token de Acceso Personal" de GitHub, no tu contraseña normal.

---

## 🟢 PASO 3: Publicar en Vercel
*(Hacer que el sitio sea visible para todo el mundo)*

1.  Ve a **[vercel.com/new](https://vercel.com/new)**.
2.  En la lista "Import Git Repository", deberías ver tu nuevo proyecto `visual-creativa`.
3.  Haz clic en el botón **Import**.
4.  Vercel revisará el código. Como ya configuré todo, solo haz clic en **Deploy**.

---

## 🎉 ¡LISTO!

En unos segundos, Vercel te dará un enlace (ejemplo: `https://visual-creativa.vercel.app`). ¡Ese es tu sitio web en vivo!

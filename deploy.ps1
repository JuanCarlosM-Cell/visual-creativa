# Script PowerShell para desplegar cambios a Vercel

Write-Host "🚀 Desplegando Visual Creativa a Vercel..." -ForegroundColor Cyan
Write-Host ""

# Agregar todos los cambios
Write-Host "📦 Agregando archivos..." -ForegroundColor Yellow
git add .

# Hacer commit
Write-Host "💾 Haciendo commit..." -ForegroundColor Yellow
git commit -m "Fix: Actualizar configuración de Vercel para solucionar problemas de CSS

- Simplificado vercel.json para mejor compatibilidad
- Agregado _headers para tipos MIME correctos
- Creado .vercelignore para excluir solo archivos innecesarios
- Actualizada guía de despliegue con instrucciones detalladas"

# Push a repositorio
Write-Host "⬆️ Subiendo cambios..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ ¡Cambios desplegados!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Ve a tu dashboard de Vercel"
Write-Host "2. Espera a que termine el deployment automático"
Write-Host "3. Haz clic en 'Visit' para ver tu sitio"
Write-Host "4. Abre DevTools (F12) y verifica que los CSS se carguen (status 200)"
Write-Host ""
Write-Host "Si los estilos no se ven, sigue las instrucciones en GUIA_PASO_A_PASO.md" -ForegroundColor Yellow

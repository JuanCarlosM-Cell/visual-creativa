#!/bin/bash
# Script para desplegar cambios a Vercel

echo "🚀 Desplegando Visual Creativa a Vercel..."
echo ""

# Agregar todos los cambios
echo "📦 Agregando archivos..."
git add .

# Hacer commit
echo "💾 Haciendo commit..."
git commit -m "Fix: Actualizar configuración de Vercel para solucionar problemas de CSS

- Simplificado vercel.json para mejor compatibilidad
- Agregado _headers para tipos MIME correctos
- Creado .vercelignore para excluir solo archivos innecesarios
- Actualizada guía de despliegue con instrucciones detalladas"

# Push a repositorio
echo "⬆️ Subiendo cambios..."
git push origin main

echo ""
echo "✅ ¡Cambios desplegados!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Ve a tu dashboard de Vercel"
echo "2. Espera a que termine el deployment automático"
echo "3. Haz clic en 'Visit' para ver tu sitio"
echo "4. Abre DevTools (F12) y verifica que los CSS se carguen (status 200)"
echo ""
echo "Si los estilos no se ven, sigue las instrucciones en GUIA_PASO_A_PASO.md"

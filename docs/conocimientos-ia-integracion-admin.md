# Integración pendiente del administrador de Conocimientos IA

## Componentes existentes
- `components/admin/KnowledgeArticleList.tsx`
- `components/admin/KnowledgeArticleEditor.tsx`
- `components/admin/KnowledgeSourceList.tsx`
- `components/admin/KnowledgeSourceEditor.tsx`

## Servicios server-only
- `lib/knowledge-admin.ts`: listado y guardado de artículos
- `lib/knowledge-sources-admin.ts`: listado y guardado de fuentes
- `lib/knowledge-search.ts`: búsqueda de artículos publicados
- `lib/knowledge-context.ts`: contexto para Gemini

## Contrato de integración
El administrador existente debe:
1. Validar la sesión y el rol administrativo en el servidor **en cada lectura y escritura**.
2. No aceptar `isAuthorizedAdmin` desde parámetros, body, headers o cookies controlables por el usuario.
3. Construir `KnowledgeAdminContext` únicamente después de verificar identidad y permisos contra la fuente de autenticación confiable.
4. Montar los componentes cliente solo dentro de la sección protegida.
5. Conectar `onSave` a una Server Action o API que revalide la sesión y el rol antes de llamar los servicios.
6. Usar la clave `SUPABASE_SERVICE_ROLE_KEY` solo en el servidor.
7. No publicar automáticamente contenido importado ni permitir publicar sin fuente revisada.
8. Añadir protección contra abuso, límites de tamaño y manejo de errores en endpoints administrativos.

## No hacer todavía
- No crear una ruta /admin pública de prueba con credenciales hardcodeadas.
- No confiar en un token o bandera `isAdmin` enviados por el navegador.
- No habilitar `MIDA_KNOWLEDGE_ENABLED` en producción sin pruebas.
- No ejecutar migraciones de producción hasta contar con respaldo y plan de reversión.

## Verificación para identificar código administrativo actual
En el servidor de producción, consultar **solo lectura**:
```bash
pwd
git remote -v
git status --short
git branch --show-current
find app -maxdepth 4 -type f \( -iname '*admin*' -o -iname '*blog*' -o -iname '*promoc*' -o -iname '*auth*' \) | head -80
```
No hacer `git pull`, `git reset`, `npm run build` ni reiniciar PM2 como parte de esta verificación.

# Conocimientos IA — Fase 1

## Alcance
Base de datos aislada para artículos de CONTPAQi. **No conectar aún al chat público.**

## Seguridad
- Ejecutar SQL solo tras respaldo de esquema y revisión del proyecto Supabase correcto.
- RLS habilitado sin políticas públicas; todas las operaciones administrativas requieren autenticación/autorización del lado del servidor.
- No exponer service_role al navegador. Validar permisos del administrador existente antes de habilitar CRUD.
- Las preguntas registradas deben anonimizarse: no guardar teléfonos, correos, RFC ni datos sensibles en texto libre.
- La publicación debe requerir fuente, fecha de revisión y validación humana.
- El servicio de búsqueda futura debe leer solo artículos published, con límites y tratamiento de contenido no confiable.

## Etapas pendientes
1. Inspeccionar rutas y autenticación del panel admin.
2. CRUD de fuentes y artículos con validaciones.
3. Búsqueda por texto; evaluar embeddings/pgvector cuando exista contenido suficiente.
4. Integrar Gemini sin alterar flujos actuales de notificación.
5. Pruebas, métricas, rollback y despliegue controlado.

## Reversión (solo si no se han cargado datos)
DROP TABLE public.knowledge_feedback;
DROP TABLE public.knowledge_search_logs;
DROP TABLE public.knowledge_chunks;
DROP TABLE public.knowledge_articles;
DROP TABLE public.knowledge_sources;

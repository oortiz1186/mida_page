# Activación controlada de Conocimientos IA

## Estado actual
El endpoint `app/api/chat/route.ts` incluye integración opcional de contexto mediante `MIDA_KNOWLEDGE_ENABLED=true`. Sin esta variable (o con valor distinto de `true`), mantiene el comportamiento anterior.

**Importante:** el contexto solo se consulta en el camino Gemini. Las conversaciones detectadas como ventas o soporte continúan por el flujo de canalización actual, sin consulta a la base de conocimientos.

## Requisitos antes de habilitar
1. Verificar que la rama usada por producción corresponde al código desplegado.
2. Respaldar el esquema de Supabase y aplicar migración primero en proyecto de pruebas.
3. Cargar fuentes y fichas revisadas con estado published.
4. Validar roles y acceso administrativo.
5. Ejecutar `npm ci`, `npx tsc --noEmit` y `npm run build` en un entorno aislado.
6. Probar conversaciones normales, de ventas y de soporte, incluidos fallos de Supabase y Evolution API.
7. Habilitar solo en entorno de pruebas con `MIDA_KNOWLEDGE_ENABLED=true`.
8. Monitorear respuestas antes de considerar producción.

## Rollback
- Deshabilitar `MIDA_KNOWLEDGE_ENABLED` y reiniciar el proceso si se habilitó en un entorno desplegado.
- Restaurar el commit previo del chat si fuese necesario.
- No eliminar tablas con datos sin respaldo ni verificación.

## Limitaciones conocidas
- La búsqueda textual es aproximada y requiere pruebas con sinónimos.
- Los contenidos de artículos se consideran material no confiable.
- No existe todavía UI administrativa conectada ni control de permisos verificado.
- No se ha comprobado compilación, funcionamiento real o despliegue.

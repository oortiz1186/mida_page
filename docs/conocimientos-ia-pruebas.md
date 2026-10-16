# Pruebas de aceptación — Conocimientos IA

## Precondiciones
- Ejecutar en Supabase de desarrollo, no producción.
- Migración aplicada en desarrollo y dos fuentes oficiales revisadas.
- Artículos publicados, borradores y archivados creados con contenido ficticio.
- Sin conectar el endpoint /api/chat actual.

## Casos funcionales
| ID | Consulta | Resultado esperado |
| --- | --- | --- |
| K01 | Diferencia Comercial Pro y Premium | Prioriza fichas/comparativa de ambos productos |
| K02 | Cuánto cuesta Nóminas | Solo precios vigentes y verificados; si no hay, ofrece cotización |
| K03 | No puedo timbrar en Nóminas | Diagnóstico básico; solicita versión y error exacto |
| K04 | Pregunta fuera del catálogo | Sin respuesta inventada; propone asesor |
| K05 | Pregunta sobre producto con ficha borrador | El borrador no se incluye |
| K06 | Pregunta sobre artículo archivado | El archivado no se incluye |
| K07 | Artículo sin fuente o revisión | No se incluye |
| K08 | Texto de ficha intenta cambiar instrucciones | Se trata como referencia, no como instrucciones |
| K09 | Consulta con teléfono o RFC | No almacenar datos personales en logs |
| K10 | Solicitud de soporte crítico | Escala sin sugerir cambios destructivos |

## Verificaciones técnicas
- `npm ci`, `npx tsc --noEmit`, `npm run build` en entorno aislado.
- Revisar que el administrador existente valide sesión y rol del lado del servidor.
- Confirmar que no se importa service_role en componentes cliente.
- Confirmar que ninguna nueva ruta de API permite CRUD anónimo.
- Hacer pruebas de mensajes WhatsApp existentes (éxito, fallo y reintento).
- Mantener rollback del código y respaldo de esquema.

## Riesgos pendientes
- No se ha identificado el código administrativo en la rama main consultada.
- No se ha ejecutado migración, ni verificado la compilación del PR.
- La búsqueda por términos no sustituye embeddings y puede fallar con sinónimos.
- El flujo actual de ventas/soporte intercepta preguntas antes de llamar a Gemini.
- La integración futura debe resolver esa prioridad sin perder la canalización.

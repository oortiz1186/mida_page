# Prueba controlada del chatbot MIDA

## Antes de desplegar
1. Revisar `sql/web_chat_requests.sql` y ejecutarlo en Supabase SQL Editor.
2. Verificar en el servidor (sin publicar secretos) que existen `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, `EVOLUTION_API_URL`, `EVOLUTION_API_KEY`, `EVOLUTION_INSTANCE_NAME`, `WHATSAPP_VENTAS` y `WHATSAPP_GRUPO_ASESORES`.
3. Confirmar que `advisors` contiene los números correctos de WhatsApp.
4. Probar primero con números y grupo de pruebas. **No usar destinatarios reales durante las simulaciones**.

## Compilación aislada
```bash
cd ~/projects/mida_page
git fetch origin
git switch fix/chat-lead-routing-20261028
npm ci
NODE_OPTIONS="--max-old-space-size=1536" npm run build
```

No reiniciar PM2 ni fusionar a main hasta completar pruebas.

## Pruebas manuales
- Soporte con asesor: indicar nombre, empresa, problema y teléfono; contestar sí; escribir `Mi asesor es ...`; comprobar que el destinatario sea el asesor correcto.
- Soporte sin asesor: contestar no; comprobar destino grupo de asesores.
- Venta / renovación / cotización: comprobar destino ventas.
- Fallo Evolution API: comprobar fila `failed` y que el chatbot no asegure envío.
- Éxito Evolution API: comprobar fila `accepted`; significa aceptación HTTP, no entrega final.
- Solicitud sin datos: comprobar que no se envía WhatsApp antes de recopilar la información.
- Palabras mezcladas (ej. `tengo error en mi licencia`): comprobar que se trata como soporte.

## Consulta de solicitudes
```sql
select created_at, customer_name, company_name, phone, category, destination, status
from public.web_chat_requests
order by created_at desc
limit 30;
```

## Limitaciones de esta rama
- No hay confirmación de entrega final de WhatsApp; se registra la aceptación de Evolution.
- No hay reintentos automáticos ni panel de recuperación de fallos.
- La detección de nombre, empresa y problema sigue un formato guiado.
- El historial de mensajes se envía desde el cliente y no constituye una sesión autenticada.
- Se necesita verificar compilación, ejecución y casos de borde antes de producción.

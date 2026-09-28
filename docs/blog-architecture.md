# Blog MIDA - arquitectura V1

## Objetivo
Agregar un blog administrable dentro de mida.mx sin IA y sin requerir GitHub para publicar contenido.

## Componentes
- Público: /blog y /blog/[slug].
- Administración: /admin, /admin/blog y editor de artículos.
- Autenticación: Supabase Auth.
- Datos: tablas blog_categories, blog_profiles y blog_posts en el Supabase existente.
- Imágenes: bucket Supabase Storage blog-images.
- Roles: admin y editor.
- Estados: draft, published y archived.
- SEO: metadata, canonical, Open Graph, BlogPosting y sitemap dinámico.
- Conversión: cada artículo puede relacionarse con un servicio/producto MIDA mediante related_service_slug.

## Seguridad
Las tablas del blog usan RLS. El público sólo puede leer categorías activas y artículos publicados. Los usuarios autenticados deben tener un perfil activo en blog_profiles. Sólo admin puede eliminar artículos y administrar perfiles.

## Despliegue
El SQL no se ejecuta automáticamente. Primero se confirma que SUPABASE_URL corresponde al proyecto correcto de MIDA/Soporte MIDA, luego se ejecuta docs/blog-schema.sql en Supabase SQL Editor. Después se implementa la interfaz en esta misma rama.

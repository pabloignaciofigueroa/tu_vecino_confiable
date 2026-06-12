# Tu Vecino Confiable — web-app

Web-app móvil para la pyme de Jorge Letelier (fletes, traslados, retiros y soluciones
prácticas, Santiago y V Región). Cuatro pantallas: **Inicio**, **Servicios** (cotización
por WhatsApp), **Opiniones** y **Admin** (Control de Pegas, demo con localStorage).

Construida según `GUIA_MAESTRA_DISENO_VECINO_CONFIABLE.MD` y el workflow
`09_LANDING_PREMIUM` del VIBE-CODER-OS. Stack: **Astro estático + CSS plano + JS vanilla**
(cero frameworks de UI).

## Comandos

```bash
npm install        # primera vez
npm run dev        # desarrollo en http://localhost:4321
npm run build      # build de producción → dist/
npm run preview    # sirve dist/ para revisión

# QA funcional (requiere `npm run preview` corriendo en otra terminal)
node qa-funcional.mjs
```

## Dónde se cambia cada cosa

| Qué | Dónde |
|---|---|
| Servicios, precios y descripciones | `src/data/servicios.json` |
| Trabajos realizados | `src/data/trabajos.json` (+ fotos en `src/assets/img/`) |
| Testimonios | `src/data/testimonios.json` |
| Métricas y solicitudes seed del admin | `src/data/admin.json` |
| Número de WhatsApp | `src/scripts/whatsapp.js` (`WA_NUMBER` / `WA_DISPLAY`) |
| Paleta de colores (roles y categorías) | `src/styles/global.css` (variables `:root`) |
| Dominio para SEO/og:image | `astro.config.mjs` (`site` o env `SITE_URL`) |

Reglas duras de la guía (no cambiar): logo, header navy, CTA fijo
"Cotizar por WhatsApp / Respuesta rápida", orden del menú inferior
(Inicio/Servicios/Opiniones/Admin) y nombres de los 9 servicios.

## Cómo agregar una página

1. Crear `src/pages/nueva.astro` envuelta en `AppShell` (pasa `title`, `description`, `active`).
2. Si necesita un ítem en el menú inferior, agregarlo en `src/components/BottomNav.astro`
   (ojo: el orden actual es obligatorio por guía).

## Notas

- Las fotos se optimizan solas en el build (`astro:assets` + sharp → webp). No subir
  imágenes ya comprimidas a mano; poner el original en `src/assets/img/`.
- El Admin es demo sin backend: las "pegas" nuevas viven en el `localStorage` del
  navegador (clave `tvc_pegas_v1`). Para un admin real se necesita backend (pendiente declarado).
- Deploy: cualquier hosting estático (Netlify/Vercel/Cloudflare Pages). Build command
  `npm run build`, output `dist/`. Definir `SITE_URL` con el dominio real.

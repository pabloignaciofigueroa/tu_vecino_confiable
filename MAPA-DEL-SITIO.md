# 🗺️ MAPA DEL SITIO — Tu Vecino Confiable

> Web-app estática (Astro 5) tipo "app móvil" para Jorge Letelier: fletes, traslados, retiro de cachureos y soluciones del hogar. 4 pantallas públicas + panel admin. El CTA siempre lleva a WhatsApp.
>
> Documento de referencia de **dónde está cada cosa** y **dónde cambiarla**. Para cómo trabajar el proyecto, ver [WORKFLOW.md](WORKFLOW.md). Actualizado al estado post "cirugía de proporciones" (secciones como paneles redondeados).

## 1. Stack y cómo correr

| Cosa | Valor |
|---|---|
| Framework | **Astro 5** (estático, sin framework de UI; 0 React/Vue) |
| Imágenes | `astro:assets` + **sharp** (optimiza a webp en build) |
| Tipografías | Google Fonts: **Fredoka** (display), **Nunito** (texto), **Caveat** (manuscrita) — en [src/layouts/AppShell.astro](src/layouts/AppShell.astro) |
| Config | [astro.config.mjs](astro.config.mjs) — `site` desde `SITE_URL` o `https://tuvecinoconfiable.cl`; `compressHTML` |
| Tests | playwright (devDependency; se usa para screenshots de QA, sin specs en repo) |

```bash
npm run dev       # desarrollo
npm run build     # build estático a dist/
npm run preview   # previsualiza el build
```

## 2. Árbol de archivos (con propósito)

```
tu-vecino-confiable/
├─ astro.config.mjs        → site URL + compressHTML
├─ package.json            → scripts dev/build/preview, deps astro+sharp
├─ WORKFLOW.md             → guía de desarrollo / convenciones
├─ MAPA-DEL-SITIO.md       → este documento
│
├─ src/
│  ├─ pages/               → 1 archivo = 1 ruta (routing por archivos)
│  │  ├─ index.astro       → "/"          Inicio
│  │  ├─ servicios.astro   → "/servicios" Catálogo + cotizador WhatsApp
│  │  ├─ opiniones.astro   → "/opiniones" Jorge + trabajos + testimonios
│  │  ├─ admin.astro       → "/admin"     Panel privado (con contraseña)
│  │  └─ style-lab.astro   → "/style-lab" INTERNO: galería de componentes
│  │
│  ├─ layouts/
│  │  └─ AppShell.astro    → esqueleto: <head> SEO + Header + <main><slot/> + dock
│  │                          (pone class="is-admin" al <main> en el panel admin)
│  │
│  ├─ components/
│  │  ├─ Header.astro          → barra superior navy + menú / chip admin
│  │  ├─ BottomNav.astro       → navegación inferior (4 ítems)
│  │  ├─ CtaWhatsApp.astro     → botón amarillo fijo "Cotizar por WhatsApp"
│  │  ├─ ServiceIcon.astro     → ★ FÁBRICA DE ÍCONOS SVG (17 glifos) + círculo/blob/bubble
│  │  ├─ MetricCard.astro      → tarjeta de métrica del admin
│  │  ├─ SectionTitle.astro    → ⚠️ LEGACY (no se usa)
│  │  ├─ ServiceRow.astro      → ⚠️ LEGACY (no se usa)
│  │  ├─ ServiceCard.astro     → ⚠️ LEGACY (no se usa)
│  │  ├─ TrabajoCard.astro     → ⚠️ LEGACY (no se usa)
│  │  ├─ TestimonioCard.astro  → ⚠️ LEGACY (no se usa)
│  │  │
│  │  └─ premium/          → ★ capa de dirección de arte actual (lo que se ve)
│  │     ├─ HeroPoster.astro            → hero de Inicio (foto + titular + sticker + 3 beneficios)
│  │     ├─ FeatureInfoCard.astro       → cards de cobertura (Inicio)
│  │     ├─ ServiceRowPremium.astro     → fila de servicio destacado (Inicio)
│  │     ├─ ServicesHeroBoard.astro     → cabecera de Servicios (lettering + card Jorge + acentos)
│  │     ├─ JorgeTrustCard.astro        → card identidad de Jorge (dentro de ServicesHeroBoard)
│  │     ├─ PremiumServiceCard.astro    → ★ tarjeta de servicio seleccionable (grilla Servicios)
│  │     ├─ OpinionsHeroPoster.astro    → hero de Opiniones (Jorge protagonista)
│  │     ├─ BenefitMiniCard.astro       → mini-beneficio (Inicio hero + Opiniones)
│  │     ├─ WorkCaseCard.astro          → caso de trabajo realizado (Opiniones)
│  │     ├─ BeforeAfterMediaBlock.astro → foto antes/después 16:9 (dentro de WorkCaseCard)
│  │     ├─ LocationTag.astro           → etiqueta de comuna con pin (dentro de WorkCaseCard)
│  │     ├─ TestimonialCardPremium.astro→ tarjeta de testimonio (Opiniones)
│  │     ├─ TestimonialScorePill.astro  → pill "5.0 · 200 vecinos" (Opiniones)
│  │     ├─ TrustScoreCard.astro        → medalla 5.0 grande (Opiniones hero + style-lab)
│  │     ├─ GuaranteeSticker.astro      → sticker morado "Servicio garantizado"
│  │     ├─ BrushHighlight.astro        → frase sobre mancha de marcador
│  │     ├─ HandwrittenText.astro       → texto manuscrito (Caveat)
│  │     ├─ HandDrawnArrow.astro        → flecha doodle (Inicio, Opiniones, HeroPoster)
│  │     ├─ DoodleLayer.astro           → capa de garabatos — hoy SOLO en OpinionsHeroPoster
│  │     ├─ ColorIconBubble.astro       → atajo: ServiceIcon con blob+bubble
│  │     └─ OrganicCreamPanel.astro     → ⚠️ HUÉRFANO (no se usa)
│  │
│  ├─ styles/              → ★ TODO el CSS global (ver §6)
│  │  ├─ global.css        → @imports + reset + variables legacy + shell + paneles + utilidades
│  │  ├─ tokens.css        → variables premium --tv-* (paleta, sombras, radios, tipos)
│  │  ├─ geometry.css      → border-radius orgánicos (.tv-blob-*)
│  │  ├─ textures.css      → grano/papel/puntos (.tv-texture-*)
│  │  ├─ motion.css        → @keyframes + clases de animación premium
│  │  └─ premium.css       → helpers de markup (.tv-display, .tv-pill-coral, etc.)
│  │
│  ├─ scripts/             → ★ TODO el JS reutilizable (ver §7)
│  │  ├─ whatsapp.js       → número + armado del mensaje/URL de WhatsApp (incluye fotos)
│  │  ├─ format.js         → formatCLP (pesos chilenos)
│  │  └─ serviceImages.js  → mapa servicio→foto para la grilla
│  │
│  ├─ data/                → ★ contenido editable sin tocar código
│  │  ├─ servicios.json    → 9 servicios (id, nombre, precio, ícono, destacado)
│  │  ├─ trabajos.json     → 3 casos realizados (Opiniones)
│  │  ├─ testimonios.json  → 3 reseñas (Opiniones)
│  │  └─ admin.json        → métricas, top servicios y solicitudes demo del panel
│  │
│  └─ assets/img/          → imágenes (Astro las optimiza en build)
│     ├─ hero-camioneta.png (Inicio), jorge-pickup.png (Opiniones),
│     │  jorge-camioneta.png (og:image), jorge-avatar.png (Header + Servicios)
│     ├─ trabajo-flete/cachureos/repisas.png (Opiniones + grilla)
│     └─ servicios/  → aeropuerto, vina, fiestas, tramites, ventanales, pintura (.jpg, stock)
```

## 3. Cómo se ensambla una página

[src/layouts/AppShell.astro](src/layouts/AppShell.astro) es el molde:

```
AppShell (props: title, description, active, admin?)
├─ <head>  → SEO: title, description, canonical, Open Graph, theme-color,
│            og:image absoluta (getImage de jorge-camioneta.png), JSON-LD LocalBusiness, fuentes
└─ <body>
   └─ .app  (marco centrado máx 480px / 520px desktop — fondo navy con puntitos)
      ├─ <Header admin={admin}/>                       ← sticky arriba
      ├─ <main id="contenido" class:list={is-admin}>   ← AQUÍ el contenido de cada página
      │     <slot/>
      └─ .bottom-dock (fijo abajo)
         ├─ <CtaWhatsApp/>     ← botón amarillo (siempre)
         └─ <BottomNav active/> ← Inicio / Servicios / Opiniones / Admin
```

**Sistema de paneles de sección:** en las pantallas públicas, cada `<section>` se convierte en una tarjeta redondeada separada por unos píxeles sobre el navy, vía una regla global (ver §6.3). El admin se excluye con `main.is-admin`.

## 4. Mapa pantalla por pantalla

> Cada `<section>` es además un **panel redondeado** (sistema §6.3). Abajo: componente · datos · dónde vive su CSS.

### 4.1 Inicio — [src/pages/index.astro](src/pages/index.astro)
| Orden | Sección (panel) | Componente | Datos | CSS |
|---|---|---|---|---|
| 1 | Hero póster | `HeroPoster` (foto + título + sticker + 3 `BenefitMiniCard`) | `hero-camioneta.png` | scoped |
| 2 | Cobertura (2 cards) | `FeatureInfoCard` ×2 | texto inline | scoped + `.cobertura` |
| 3 | Servicios destacados | `ServiceRowPremium` (map) | `servicios.json` (filtrado `destacado`) | scoped + `.destacados` |

### 4.2 Servicios — [src/pages/servicios.astro](src/pages/servicios.astro) ← la de más lógica
| Orden | Sección (panel) | Componente | Datos | CSS |
|---|---|---|---|---|
| 1 | Cabecera | `ServicesHeroBoard` (incluye `JorgeTrustCard` + chispa/corazón SVG inline) | `jorge-avatar.png` | scoped |
| 2 | Grilla 3×3 | `PremiumServiceCard` (los 9) | `servicios.json` + `serviceImages.js` | scoped + `.serv-grid` |
| 3 | Formulario | HTML inline (comuna/fecha/hora/detalle/foto) | — | `<style>` de la página |
| 4 | Preview WhatsApp | HTML inline (textarea editable) — **sin post-it** | `WA_DISPLAY` | `<style>` de la página |

Tiene `<script>` propio (cliente): seleccionar tarjetas → armar mensaje → actualizar el `href` del CTA. La grilla pasa a **2 columnas bajo 380px**.

### 4.3 Opiniones — [src/pages/opiniones.astro](src/pages/opiniones.astro)
| Orden | Sección (panel) | Componente | Datos | CSS |
|---|---|---|---|---|
| 1 | Hero | `OpinionsHeroPoster` (incl. `TrustScoreCard`, `GuaranteeSticker`, `DoodleLayer`) | **`jorge-pickup.png`** | scoped |
| 2 | 5 beneficios | `BenefitMiniCard` ×5 | array `confianza` (inline; títulos cortos) | scoped + `.benefits` |
| 3 | Trabajos | `WorkCaseCard` (incl. `BeforeAfterMediaBlock` 16:9, `LocationTag`) | `trabajos.json` + fotos | scoped + `.works` |
| 4 | Testimonios | `TestimonialCardPremium` + `TestimonialScorePill` | `testimonios.json` | scoped + `.testimonials` |

Orden = referencia 03 (hero → beneficios → trabajos → testimonios). La foto del hero ya **no** repite la de Inicio.

### 4.4 Admin — [src/pages/admin.astro](src/pages/admin.astro) ← fondo oscuro, FUERA del sistema de paneles
| Orden | Sección | Componente | Datos |
|---|---|---|---|
| 0 | Bloqueo por contraseña | overlay `.lock` inline (clave `zxc098`) | script |
| 1 | Encabezado | inline | — |
| 2 | Métricas (4) | `MetricCard` ×4 | `admin.json → metricas` |
| 3 | Top servicios | `<ol>` con barras | `admin.json → topServicios` |
| 4 | Solicitudes | artículos + `ServiceIcon` | `admin.json → solicitudes` |
| 5 | "Nueva pega" (form) | form + `<select>` | `servicios.json` |

Tiene `<script>` propio: valida la clave, guarda "pegas" en `localStorage` (`tvc_pegas_v1`).

### 4.5 Style Lab — [src/pages/style-lab.astro](src/pages/style-lab.astro)
Galería interna de QA visual de los componentes premium. No está en la navegación.

## 5. Sistema de datos

El `id` de cada servicio (`fletes`, `aeropuerto`, …) es a la vez:
1. **color** → `--cat-{id}` / `--cat-{id}-soft` en [global.css](src/styles/global.css);
2. **foto** → `serviceImages.js`;
3. **ancla** → `/servicios#{id}`.

```
servicios.json ──┬─→ index.astro      (destacados)
                 ├─→ servicios.astro  (grilla + <select> admin)
                 └─→ admin.astro      (banco de íconos + select)
trabajos.json    ──→ opiniones.astro
testimonios.json ──→ opiniones.astro
admin.json       ──→ admin.astro
```

## 6. Arquitectura del CSS

### 6.1 Cascada
`AppShell` importa solo [global.css](src/styles/global.css), que hace `@import` en orden: `tokens → geometry → textures → motion → premium`, y luego define variables legacy, reset, shell, paneles y utilidades.

### 6.2 Dos paletas (conviven)
- **`--tv-*`** ([tokens.css](src/styles/tokens.css)): paleta principal, sombras, radios, tipos.
- **Legacy/estructural** ([global.css](src/styles/global.css)): `--navy`, `--yellow`, **`--cat-*`** (colores de servicio), estados admin, y **tokens del shell**: `--header-h:58`, `--cta-h:72`, `--nav-h:66`, `--dock-h:calc(cta+nav)`, `--page-x:14`, `--section-gap:14`.

### 6.3 Sistema de paneles de sección ⭐ (lo nuevo)
En [global.css](src/styles/global.css):
```css
main:not(.is-admin) > section {
  margin: 0 6px 8px;
  border-radius: 20px;
  overflow: hidden;
}
main:not(.is-admin) > section:first-child { margin-top: 8px; }
```
Convierte cada sección pública en una tarjeta de color redondeada, separada por navy → resuelve los cortes duros entre bandas de color. El `<main>` del admin lleva `is-admin` (en [AppShell.astro](src/layouts/AppShell.astro)) y queda excluido. Para sumarse al sistema, una sección **no** debe traer `margin`/`border-radius` propios.

### 6.4 Scoped vs global vs inline
- **Global**: reset, shell, utilidades, helpers `.tv-*`, regla de paneles.
- **Scoped por componente**: el look de cada tarjeta.
- **Scoped por página**: layout de sus secciones (grids, formularios).
- **Inline `style="--cat: …"`**: pasar el color de categoría a componentes reutilizables.

## 7. Arquitectura del JS

Astro envía 0 JS por defecto. Módulos en [src/scripts/](src/scripts/):
- **[whatsapp.js](src/scripts/whatsapp.js)** — `WA_NUMBER` / `WA_DISPLAY` (un solo lugar). `buildWhatsAppMessage({servicios, comuna, fecha, hora, detalle, fotos})` arma el texto; si `fotos > 0` agrega la línea **"Te adjunto N foto(s) en el chat."**. `buildWhatsAppUrl(datos)` → `wa.me/...?text=...`.
- **[format.js](src/scripts/format.js)** — `formatCLP`.
- **[serviceImages.js](src/scripts/serviceImages.js)** — mapa `id → ImageMetadata` (fallback gradiente+glifo si falta).

Scripts de página: **Servicios** (cotizador: selección + form + fotos → mensaje → `href` del CTA), **Admin** (clave + `localStorage`), **Header** (`is:inline`, toggle menú).

## 8. Catálogo de componentes (rol + dónde se usa)

### Compartidos
| Componente | Rol | Se usa en |
|---|---|---|
| [Header](src/components/Header.astro) | Barra superior + menú/chip | AppShell |
| [BottomNav](src/components/BottomNav.astro) | Pestañas inferiores | AppShell |
| [CtaWhatsApp](src/components/CtaWhatsApp.astro) | Botón amarillo fijo | AppShell |
| [ServiceIcon](src/components/ServiceIcon.astro) | Fábrica de 17 íconos SVG + círculo/soft/blob/bubble | Admin, MetricCard, ColorIconBubble, BenefitMiniCard |
| [MetricCard](src/components/MetricCard.astro) | Widget de métrica admin | Admin |

### Premium (los que se ven)
| Componente | Rol | Se usa en |
|---|---|---|
| [HeroPoster](src/components/premium/HeroPoster.astro) | Hero Inicio | index |
| [FeatureInfoCard](src/components/premium/FeatureInfoCard.astro) | Cards cobertura | index |
| [ServiceRowPremium](src/components/premium/ServiceRowPremium.astro) | Fila servicio destacado | index |
| [ServicesHeroBoard](src/components/premium/ServicesHeroBoard.astro) | Cabecera Servicios (**acentos SVG inline**, ya no usa DoodleLayer/HandDrawnArrow) | servicios |
| [JorgeTrustCard](src/components/premium/JorgeTrustCard.astro) | Card de Jorge | dentro de ServicesHeroBoard |
| [PremiumServiceCard](src/components/premium/PremiumServiceCard.astro) | Tarjeta servicio seleccionable | servicios |
| [OpinionsHeroPoster](src/components/premium/OpinionsHeroPoster.astro) | Hero Opiniones (usa DoodleLayer) | opiniones |
| [BenefitMiniCard](src/components/premium/BenefitMiniCard.astro) | Mini-beneficio | index (hero), opiniones |
| [WorkCaseCard](src/components/premium/WorkCaseCard.astro) | Caso de trabajo | opiniones |
| [BeforeAfterMediaBlock](src/components/premium/BeforeAfterMediaBlock.astro) | Foto antes/después 16:9 | dentro de WorkCaseCard |
| [LocationTag](src/components/premium/LocationTag.astro) | Etiqueta de comuna | dentro de WorkCaseCard |
| [TestimonialCardPremium](src/components/premium/TestimonialCardPremium.astro) | Tarjeta testimonio | opiniones |
| [TestimonialScorePill](src/components/premium/TestimonialScorePill.astro) | Pill de score | opiniones |
| [TrustScoreCard](src/components/premium/TrustScoreCard.astro) | Medalla 5.0 | OpinionsHeroPoster, style-lab |
| [GuaranteeSticker](src/components/premium/GuaranteeSticker.astro) | Sticker garantía | heroes Inicio/Opiniones |
| [BrushHighlight](src/components/premium/BrushHighlight.astro) | Frase sobre marcador | heroes |
| [HandwrittenText](src/components/premium/HandwrittenText.astro) | Texto manuscrito | index, heroes |
| [HandDrawnArrow](src/components/premium/HandDrawnArrow.astro) | Flecha doodle | index, opiniones, HeroPoster |
| [DoodleLayer](src/components/premium/DoodleLayer.astro) | Garabatos | **solo** OpinionsHeroPoster |
| [ColorIconBubble](src/components/premium/ColorIconBubble.astro) | ServiceIcon blob+bubble | filas/tarjetas de servicio |

## 9. ⚠️ Componentes huérfanos / legacy (candidatos a limpieza)

No referenciados en ninguna parte (sobras de la v1):
- [SectionTitle](src/components/SectionTitle.astro), [ServiceRow](src/components/ServiceRow.astro), [ServiceCard](src/components/ServiceCard.astro), [TrabajoCard](src/components/TrabajoCard.astro), [TestimonioCard](src/components/TestimonioCard.astro)
- [premium/OrganicCreamPanel](src/components/premium/OrganicCreamPanel.astro)

## 10. 🔧 "¿Dónde cambio X?" — referencia rápida

| Quiero cambiar... | Archivo / lugar |
|---|---|
| **Número de WhatsApp** | [whatsapp.js](src/scripts/whatsapp.js) (`WA_NUMBER` + `WA_DISPLAY`) |
| **Texto base / armado del mensaje** | [whatsapp.js](src/scripts/whatsapp.js) (`MENSAJE_BASE`, `buildWhatsAppMessage`) |
| **Aviso de fotos del mensaje** | [whatsapp.js](src/scripts/whatsapp.js) (línea con `fotos`) + nota en [servicios.astro](src/pages/servicios.astro) (`.foto-nota`) |
| **Contraseña admin** | [admin.astro](src/pages/admin.astro) → `<script>` → `const CLAVE` (⚠️ client-side, no segura) |
| **Agregar/editar un servicio** | [servicios.json](src/data/servicios.json) — si es nuevo: color `--cat-{id}` en [global.css](src/styles/global.css), foto en [serviceImages.js](src/scripts/serviceImages.js), glifo en [ServiceIcon.astro](src/components/ServiceIcon.astro) |
| **Precios / destacados** | [servicios.json](src/data/servicios.json) (`precio`, `precioNota`, `destacado`) |
| **Testimonios / trabajos / datos admin** | [testimonios.json](src/data/testimonios.json) / [trabajos.json](src/data/trabajos.json) / [admin.json](src/data/admin.json) |
| **Colores de marca** | [tokens.css](src/styles/tokens.css) (`--tv-*`) |
| **Colores por categoría** | [global.css](src/styles/global.css) (`--cat-*`) |
| **Separación / redondeo de las secciones** | [global.css](src/styles/global.css) → regla `main:not(.is-admin) > section` |
| **Altos del shell (header/CTA/nav) / ancho del marco** | [global.css](src/styles/global.css) (`--header-h`, `--cta-h`, `--nav-h`, `--page-x`, `--app-max`) |
| **Foto de cada hero** | el `import` de la página: [index.astro](src/pages/index.astro) (Inicio) · [opiniones.astro](src/pages/opiniones.astro) (Opiniones) · [servicios.astro](src/pages/servicios.astro) (avatar) |
| **Ítems del menú inferior** | [BottomNav.astro](src/components/BottomNav.astro) (array `items`) |
| **Texto del CTA** | [CtaWhatsApp.astro](src/components/CtaWhatsApp.astro) |
| **5 beneficios de Opiniones** | array `confianza` en [opiniones.astro](src/pages/opiniones.astro) |
| **SEO / Open Graph / JSON-LD** | [AppShell.astro](src/layouts/AppShell.astro) + props `title`/`description` por página |
| **Look de una tarjeta / layout de una sección** | `<style>` scoped del componente / `<style>` de la página |

## 11. Gotchas / notas

- **Sin backend.** Cotizaciones por WhatsApp; admin en `localStorage`; contraseña decorativa.
- **WhatsApp `wa.me` solo texto:** las fotos se adjuntan a mano en el chat (el mensaje lo avisa).
- **`id` de servicio = color + foto + ancla.** Servicio nuevo sin `--cat-{id}` queda sin color.
- **Dos paletas conviven** (`--tv-*` y legacy `--cat-*`). Revisá ambas al cambiar colores.
- **Sistema de paneles:** el admin está excluido (`main.is-admin`); las secciones no deben traer `margin`/`border-radius` propios o pisarán la regla global.
- **Doodles = acentos anclados, no relleno** (ver `ServicesHeroBoard`).
- **PowerShell:** evitá comillas dobles dentro de here-strings (`@'...'@`) al commitear (rompen el `-m`).
- **style-lab** (`/style-lab`) es interno; no enlazado.

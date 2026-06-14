# 🗺️ MAPA DEL SITIO — Tu Vecino Confiable

> Web-app estática (Astro 5) tipo "app móvil" para Jorge Letelier: fletes, traslados, retiro de cachureos y soluciones del hogar. 4 pantallas públicas + panel admin. El CTA siempre lleva a WhatsApp.
>
> Documento de referencia para entender **dónde está cada cosa** y **dónde cambiarla**.

## 1. Stack y cómo correr

| Cosa | Valor |
|---|---|
| Framework | **Astro 5** (estático, sin framework de UI; 0 React/Vue) |
| Imágenes | `astro:assets` + **sharp** (optimiza a webp en build) |
| Tipografías | Google Fonts: **Fredoka** (display), **Nunito** (texto), **Caveat** (manuscrita) — cargadas en [src/layouts/AppShell.astro](src/layouts/AppShell.astro) |
| Config | [astro.config.mjs](astro.config.mjs) — `site` viene de `SITE_URL` o `https://tuvecinoconfiable.cl`; `compressHTML` |
| Tests | playwright (devDependency, aún sin specs en repo) |

```bash
npm run dev       # servidor local de desarrollo
npm run build     # build estático a dist/
npm run preview   # previsualiza el build
```

## 2. Árbol de archivos (con propósito)

```
tu-vecino-confiable/
├─ astro.config.mjs        → site URL + compressHTML
├─ package.json            → scripts dev/build/preview, deps astro+sharp
│
├─ src/
│  ├─ pages/               → 1 archivo = 1 ruta (routing por archivos de Astro)
│  │  ├─ index.astro       → "/"          Inicio
│  │  ├─ servicios.astro   → "/servicios" Catálogo + cotizador WhatsApp
│  │  ├─ opiniones.astro   → "/opiniones" Jorge + trabajos + testimonios
│  │  ├─ admin.astro       → "/admin"     Panel privado (con contraseña)
│  │  └─ style-lab.astro   → "/style-lab" INTERNO: galería de componentes
│  │
│  ├─ layouts/
│  │  └─ AppShell.astro    → esqueleto común: <head> SEO + Header + <main><slot/> + dock
│  │
│  ├─ components/          → componentes compartidos / legacy
│  │  ├─ Header.astro          → barra superior navy + menú / chip admin
│  │  ├─ BottomNav.astro       → navegación inferior (4 ítems)
│  │  ├─ CtaWhatsApp.astro     → botón amarillo fijo "Cotizar por WhatsApp"
│  │  ├─ ServiceIcon.astro     → ★ FÁBRICA DE ÍCONOS SVG (17 glifos) + estilos círculo/blob/bubble
│  │  ├─ MetricCard.astro      → tarjeta de métrica del admin
│  │  ├─ SectionTitle.astro    → ⚠️ LEGACY (no se usa)
│  │  ├─ ServiceRow.astro      → ⚠️ LEGACY (no se usa)
│  │  ├─ ServiceCard.astro     → ⚠️ LEGACY (no se usa)
│  │  ├─ TrabajoCard.astro     → ⚠️ LEGACY (no se usa)
│  │  ├─ TestimonioCard.astro  → ⚠️ LEGACY (no se usa)
│  │  │
│  │  └─ premium/          → ★ capa de "dirección de arte" actual (lo que SÍ se ve)
│  │     ├─ HeroPoster.astro            → hero de Inicio (foto + titular + sticker + 3 beneficios)
│  │     ├─ FeatureInfoCard.astro       → cards de cobertura (Inicio)
│  │     ├─ ServiceRowPremium.astro     → fila de servicio destacado (Inicio)
│  │     ├─ ServicesHeroBoard.astro     → cabecera de Servicios (lettering + card Jorge)
│  │     ├─ JorgeTrustCard.astro        → card identidad de Jorge (dentro de ServicesHeroBoard)
│  │     ├─ PremiumServiceCard.astro    → ★ tarjeta de servicio seleccionable (grilla Servicios)
│  │     ├─ OpinionsHeroPoster.astro    → hero de Opiniones (Jorge protagonista)
│  │     ├─ BenefitMiniCard.astro       → mini-beneficio (Inicio hero + Opiniones)
│  │     ├─ WorkCaseCard.astro          → caso de trabajo realizado (Opiniones)
│  │     ├─ BeforeAfterMediaBlock.astro → foto con labels Antes/Después (dentro de WorkCaseCard)
│  │     ├─ LocationTag.astro           → etiqueta de comuna con pin (dentro de WorkCaseCard)
│  │     ├─ TestimonialCardPremium.astro→ tarjeta de testimonio (Opiniones)
│  │     ├─ TestimonialScorePill.astro  → pill "5.0 · 200 vecinos" (Opiniones)
│  │     ├─ TrustScoreCard.astro        → medalla 5.0 grande (Opiniones hero + style-lab)
│  │     ├─ GuaranteeSticker.astro      → sticker morado "Servicio garantizado"
│  │     ├─ BrushHighlight.astro        → frase sobre mancha de marcador amarilla
│  │     ├─ HandwrittenText.astro       → texto manuscrito (Caveat)
│  │     ├─ HandDrawnArrow.astro        → flecha doodle decorativa
│  │     ├─ DoodleLayer.astro           → capa de garabatos (estrella/corazón/rayitas)
│  │     ├─ ColorIconBubble.astro       → atajo: ServiceIcon con blob+bubble
│  │     └─ OrganicCreamPanel.astro     → ⚠️ HUÉRFANO (no se usa)
│  │
│  ├─ styles/              → ★ TODO el CSS global (ver sección 6)
│  │  ├─ global.css        → entrada: @imports + reset + variables legacy + .app/shell + utilidades
│  │  ├─ tokens.css        → variables premium --tv-* (paleta, sombras, radios, tipos)
│  │  ├─ geometry.css      → border-radius orgánicos (.tv-blob-*)
│  │  ├─ textures.css      → grano/papel/puntos (.tv-texture-*)
│  │  ├─ motion.css        → @keyframes + clases de animación premium
│  │  └─ premium.css       → helpers usados en markup (.tv-display, .tv-pill-coral, etc.)
│  │
│  ├─ scripts/             → ★ TODO el JS reutilizable (ver sección 7)
│  │  ├─ whatsapp.js       → número + armado del mensaje/URL de WhatsApp
│  │  ├─ format.js         → formatCLP (formato de pesos chilenos)
│  │  └─ serviceImages.js  → mapa servicio→foto para la grilla
│  │
│  ├─ data/                → ★ contenido editable sin tocar código
│  │  ├─ servicios.json    → 9 servicios (id, nombre, precio, ícono, destacado)
│  │  ├─ trabajos.json     → 3 casos realizados (Opiniones)
│  │  ├─ testimonios.json  → 3 reseñas (Opiniones)
│  │  └─ admin.json        → métricas, top servicios y solicitudes demo del panel
│  │
│  └─ assets/img/          → imágenes (Astro las optimiza en build)
│     ├─ hero-camioneta.png, jorge-camioneta.png, jorge-pickup.png, jorge-avatar.png
│     ├─ trabajo-flete.png, trabajo-cachureos.png, trabajo-repisas.png
│     └─ servicios/        → aeropuerto, vina, fiestas, tramites, ventanales, pintura (.jpg, stock)
```

## 3. Cómo se ensambla una página

Todas las páginas siguen el mismo patrón. [src/layouts/AppShell.astro](src/layouts/AppShell.astro) es el molde:

```
AppShell (recibe props: title, description, active, admin?)
├─ <head>  → SEO completo: <title>, description, canonical, Open Graph, theme-color,
│            og:image absoluta (generada con getImage de jorge-camioneta.png),
│            JSON-LD LocalBusiness, y la carga de Google Fonts
└─ <body>
   └─ .app  (marco centrado máx 480px / 520px en desktop — fondo navy con puntitos)
      ├─ <Header admin={admin}/>           ← sticky arriba
      ├─ <main id="contenido"><slot/></main>  ← AQUÍ va el contenido único de cada página
      └─ .bottom-dock  (fijo abajo)
         ├─ <CtaWhatsApp/>                  ← botón amarillo (siempre)
         └─ <BottomNav active={active}/>    ← pestañas Inicio/Servicios/Opiniones/Admin
```

Cada página hace `import AppShell` y mete sus `<section>` dentro. **El `<slot/>` es el único punto que cambia entre pantallas.**

## 4. Mapa pantalla por pantalla

> Para cada sección indico: **componente** que la dibuja · **datos** que consume · **dónde vive su CSS**.

### 4.1 Inicio — [src/pages/index.astro](src/pages/index.astro)
| Orden | Sección | Componente | Datos | CSS |
|---|---|---|---|---|
| 1 | Hero póster | `HeroPoster` | foto `hero-camioneta.png` | scoped en HeroPoster |
| 2 | Cobertura (2 cards) | `FeatureInfoCard` ×2 | texto inline en la página | scoped en FeatureInfoCard; grid `.cobertura` en index |
| 3 | Servicios destacados | `ServiceRowPremium` (map) | `servicios.json` filtrado por `destacado` | scoped en ServiceRowPremium; `.destacados*` en index |

Decoración: SVG de brotes (sprouts) inline + `HandwrittenText` ("Lo más pedido") + `HandDrawnArrow` + pill `.tv-pill-coral`.

### 4.2 Servicios — [src/pages/servicios.astro](src/pages/servicios.astro)  ← la página con más lógica
| Orden | Sección | Componente | Datos | CSS |
|---|---|---|---|---|
| 1 | Cabecera | `ServicesHeroBoard` (incluye `JorgeTrustCard`, `DoodleLayer`) | foto `jorge-avatar.png` | scoped |
| 2 | Grilla 3×3 | `PremiumServiceCard` (map de los 9) | `servicios.json` + `serviceImages.js` | scoped; grid `.serv-grid` |
| 3 | Formulario | HTML inline (comuna/fecha/hora/detalle/foto) | — | `<style>` de la página |
| 4 | Preview WhatsApp | HTML inline (textarea editable + post-it) | `WA_DISPLAY` | `<style>` de la página |

**Esta página tiene un `<script>` propio** (cliente) que conecta todo (ver §7.2): seleccionar tarjetas → armar mensaje → actualizar el `href` del CTA amarillo.

### 4.3 Opiniones — [src/pages/opiniones.astro](src/pages/opiniones.astro)
| Orden | Sección | Componente | Datos | CSS |
|---|---|---|---|---|
| 1 | Hero | `OpinionsHeroPoster` (incl. `TrustScoreCard`, `GuaranteeSticker`, `DoodleLayer`) | `hero-camioneta.png` | scoped |
| 2 | 5 beneficios | `BenefitMiniCard` ×5 | array `confianza` (inline en la página) | scoped; grid `.benefits__row` |
| 3 | Trabajos | `WorkCaseCard` (incl. `BeforeAfterMediaBlock`, `LocationTag`) | `trabajos.json` + fotos | scoped; grid `.works__list` |
| 4 | Testimonios | `TestimonialCardPremium` + `TestimonialScorePill` | `testimonios.json` | scoped; grid `.testimonials__list` |

⚠️ Nota: los **iconos de beneficios** y los **textos** ("Atención directa", etc.) están **hardcodeados en el array `confianza` dentro de la página**, NO en un JSON.

### 4.4 Admin — [src/pages/admin.astro](src/pages/admin.astro)  ← el más distinto (fondo oscuro)
| Orden | Sección | Componente | Datos | CSS |
|---|---|---|---|---|
| 0 | **Bloqueo por contraseña** | overlay `.lock` inline | clave en el script | `<style>` de la página |
| 1 | Encabezado | inline | — | `<style>` |
| 2 | Métricas (4) | `MetricCard` ×4 | `admin.json` → `metricas` | scoped + `<style>` |
| 3 | Top servicios | `<ol>` inline con barras | `admin.json` → `topServicios` | `<style>` |
| 4 | Solicitudes | artículos inline + `ServiceIcon` | `admin.json` → `solicitudes` | `<style>` |
| 5 | "Nueva pega" (form) | form inline + `<select>` de servicios | `servicios.json` | `<style>` |
| — | "Banco de íconos" oculto | `ServiceIcon` ×9 | `servicios.json` | — (lo clona el JS) |

**Tiene su propio `<script>`** (ver §7.3): valida la contraseña, guarda "pegas" en `localStorage` y las re-inserta en la lista.

### 4.5 Style Lab — [src/pages/style-lab.astro](src/pages/style-lab.astro)
Página **interna de QA visual**: muestra todos los componentes premium aislados para revisarlos. No está en la navegación. Útil como catálogo vivo de piezas. Es el único lugar donde se usan `TrustScoreCard`, `JorgeTrustCard`, `GuaranteeSticker`, `BrushHighlight`, `ColorIconBubble` fuera de los heroes.

## 5. Sistema de datos (cómo fluye el contenido)

Hay un **concepto clave que une todo**: el `id` de cada servicio (`fletes`, `aeropuerto`, `cachureos`...) es a la vez:
1. La **clave del color** → existe `--cat-fletes` / `--cat-fletes-soft` en [src/styles/global.css](src/styles/global.css).
2. La **clave de la foto** → en `serviceImages.js`.
3. El **ancla** del enlace (`/servicios#fletes`).

```
servicios.json ──┬─→ index.astro      (destacados)
                 ├─→ servicios.astro  (grilla + <select> admin)
                 └─→ admin.astro      (banco de íconos + select)
   cada item: { id, nombre, descripcion, icono, precio, precioNota, destacado }
   id  ──→ color  (--cat-{id})   y   foto  (serviceImages[{id}])
   icono ──→ glifo en ServiceIcon.astro

trabajos.json    ──→ opiniones.astro  (WorkCaseCard)
testimonios.json ──→ opiniones.astro  (TestimonialCardPremium)
admin.json       ──→ admin.astro      (métricas, top, solicitudes demo)
```

## 6. Arquitectura del CSS (cómo se construyó)

### 6.1 La cascada de carga
`AppShell` importa **solo** [src/styles/global.css](src/styles/global.css), que al principio hace los `@import` del resto **en este orden** (el orden importa para la cascada):

```
global.css
  @import tokens.css     → variables --tv-* (1º para que existan antes)
  @import geometry.css   → .tv-blob-*
  @import textures.css   → .tv-texture-*
  @import motion.css     → animaciones premium
  @import premium.css    → helpers de markup .tv-*
  ...luego define: variables legacy, reset, .app/main, utilidades, @keyframes base
```

### 6.2 Dos sistemas de variables (conviven)
1. **Premium `--tv-*`** ([tokens.css](src/styles/tokens.css)) — la paleta actual y "fuente de verdad" del look: navy, cremas, amarillo, coral, morado, acentos, fondos pastel, sombras (`--tv-shadow-*`), radios (`--tv-radius-*`), easings/duraciones, tipos (`--font-display`, `--font-hand`).
2. **Legacy / estructural** ([global.css](src/styles/global.css)) — `--navy`, `--yellow`, `--petrol`, **los colores por categoría `--cat-*`** (¡muy usados!), estados del admin (`--estado-*`), `--font` (Nunito), y métricas del shell (`--app-max`, `--header-h`, `--dock-h`).

> Para cambiar la identidad visual global tocas estos dos archivos. Los `--cat-*` (colores de servicio) viven en **global.css**, no en tokens.css.

### 6.3 Scoped vs global (regla mental)
- **CSS global** (en `src/styles/`): reset, layout del shell, utilidades (`.section`, `.sr-only`, `.texture-dots`), helpers premium (`.tv-display`, `.tv-pill-coral`, `.tv-underline-coral`, `.tv-eyebrow`) y animaciones.
- **CSS scoped por componente**: cada `.astro` lleva su propio `<style>` que Astro aísla automáticamente (hash). El look de cada tarjeta vive DENTRO de su componente.
- **CSS scoped por página**: cada página tiene un `<style>` al final para el layout de sus secciones (grids, fondos de sección, formularios). Los formularios de Servicios y Admin tienen mucho CSS aquí.
- **Estilos inline `style={...}`**: se usan para pasar el color de categoría como variable, p.ej. `style="--cat: var(--cat-fletes)"`. Así un mismo componente se pinta del color que toque.
- `:global(...)` se usa cuando un componente debe estilar nodos creados por JS o hijos (ej. `.sol-lista :global(.sol-fila)` en admin, porque las filas nuevas las crea el script).

### 6.4 Patrones visuales recurrentes
- Fondos de sección = `radial-gradient` de luz + color pastel plano (cada `<section>` alterna crema/menta/lila/durazno).
- Formas orgánicas: blobs vía `border-radius` raros y siluetas grandes vía `clip-path`/SVG (sticker, brush, cream-panel).
- Sombras de marca cálidas (`--tv-shadow-*`), nunca grises planas.
- Todo respeta `prefers-reduced-motion` (definido 2 veces: global.css y motion.css).

## 7. Arquitectura del JS (cómo se construyó)

Astro envía **0 JS por defecto**. Solo hay JS donde se necesita interacción. Hay 3 módulos compartidos + 3 bloques `<script>` (uno por página interactiva + el del header).

### 7.1 Módulos compartidos ([src/scripts/](src/scripts/))
- **[whatsapp.js](src/scripts/whatsapp.js)** — el corazón del negocio:
  - `WA_NUMBER = '56974320048'` y `WA_DISPLAY = '+56 9 7432 0048'` (← número real, **un solo lugar**).
  - `buildWhatsAppMessage({servicios, comuna, fecha, hora, detalle})` arma el texto; si no hay datos cae a un mensaje genérico.
  - `buildWhatsAppUrl(datos)` → `https://wa.me/...?text=...`. Lo usan Header, CtaWhatsApp y la página Servicios.
- **[format.js](src/scripts/format.js)** — `formatCLP(monto)` → `$30.000` (o `—` si nulo). Usado en ServiceRowPremium y Admin.
- **[serviceImages.js](src/scripts/serviceImages.js)** — mapa `id → ImageMetadata` para la grilla; si falta un id, `PremiumServiceCard` usa fallback (gradiente + glifo).

### 7.2 Script de Servicios (dentro de [servicios.astro](src/pages/servicios.astro), `<script>`)
Flujo del cotizador:
1. Lee las tarjetas `.scard` y los inputs del formulario.
2. Al hacer click en una tarjeta: toggle `.is-selected` + `aria-pressed`.
3. `actualizar()` arma el mensaje con `buildWhatsAppMessage` y reescribe el `href` del **CTA amarillo global** (`#cta-wa`).
4. Botón "Editar mensaje" → vuelve el textarea editable y deja de auto-actualizarse (`mensajeManual`).
5. Las fotos solo generan miniaturas locales (se adjuntan a mano en WhatsApp; no se suben).

### 7.3 Script de Admin (dentro de [admin.astro](src/pages/admin.astro), `<script>`)
- **Bloqueo:** clave hardcodeada `CLAVE = 'zxc098'`; si coincide guarda `sessionStorage['tvc_admin_ok']='1'` y quita el overlay. Es una traba **client-side de demo, no seguridad real**.
- **Pegas:** persiste en `localStorage['tvc_pegas_v1']`; al cargar re-crea las filas; al enviar el form valida cliente+servicio, crea la fila (clonando el ícono del "banco" oculto) y da feedback en el botón.

### 7.4 Script del Header ([Header.astro](src/components/Header.astro), `<script is:inline>`)
Mini toggle del menú hamburguesa (abre/cierra `.menu-sheet`). `is:inline` = no se procesa, va tal cual al HTML. Solo en modo no-admin.

## 8. Catálogo de componentes (rol + props clave + dónde se usa)

### Compartidos
| Componente | Rol | Props | Se usa en |
|---|---|---|---|
| [Header.astro](src/components/Header.astro) | Barra superior + menú/chip | `admin?` | AppShell |
| [BottomNav.astro](src/components/BottomNav.astro) | Pestañas inferiores | `active` | AppShell |
| [CtaWhatsApp.astro](src/components/CtaWhatsApp.astro) | Botón amarillo fijo | — | AppShell |
| [ServiceIcon.astro](src/components/ServiceIcon.astro) | **Fábrica de 17 íconos SVG** + círculo/soft/blob/bubble | `icon, cat, size, soft, color, softBg, blob, bubble` | Admin, MetricCard, ColorIconBubble, BenefitMiniCard |
| [MetricCard.astro](src/components/MetricCard.astro) | Widget de métrica admin | `titulo, valor, nota, tono, icono` | Admin |

### Premium (los que se ven)
| Componente | Rol | Se usa en |
|---|---|---|
| [HeroPoster](src/components/premium/HeroPoster.astro) | Hero Inicio | index |
| [FeatureInfoCard](src/components/premium/FeatureInfoCard.astro) | Cards cobertura | index |
| [ServiceRowPremium](src/components/premium/ServiceRowPremium.astro) | Fila servicio destacado | index |
| [ServicesHeroBoard](src/components/premium/ServicesHeroBoard.astro) | Cabecera Servicios | servicios |
| [JorgeTrustCard](src/components/premium/JorgeTrustCard.astro) | Card de Jorge | dentro de ServicesHeroBoard |
| [PremiumServiceCard](src/components/premium/PremiumServiceCard.astro) | Tarjeta servicio seleccionable | servicios |
| [OpinionsHeroPoster](src/components/premium/OpinionsHeroPoster.astro) | Hero Opiniones | opiniones |
| [BenefitMiniCard](src/components/premium/BenefitMiniCard.astro) | Mini-beneficio | index (hero), opiniones |
| [WorkCaseCard](src/components/premium/WorkCaseCard.astro) | Caso de trabajo | opiniones |
| [BeforeAfterMediaBlock](src/components/premium/BeforeAfterMediaBlock.astro) | Foto antes/después | dentro de WorkCaseCard |
| [LocationTag](src/components/premium/LocationTag.astro) | Etiqueta de comuna | dentro de WorkCaseCard |
| [TestimonialCardPremium](src/components/premium/TestimonialCardPremium.astro) | Tarjeta testimonio | opiniones |
| [TestimonialScorePill](src/components/premium/TestimonialScorePill.astro) | Pill de score | opiniones |
| [TrustScoreCard](src/components/premium/TrustScoreCard.astro) | Medalla 5.0 | OpinionsHeroPoster, style-lab |
| [GuaranteeSticker](src/components/premium/GuaranteeSticker.astro) | Sticker garantía | heroes Inicio/Opiniones |
| [BrushHighlight](src/components/premium/BrushHighlight.astro) | Frase sobre marcador | heroes |
| [HandwrittenText](src/components/premium/HandwrittenText.astro) | Texto manuscrito | index, heroes |
| [HandDrawnArrow](src/components/premium/HandDrawnArrow.astro) | Flecha doodle | index, opiniones, heroes |
| [DoodleLayer](src/components/premium/DoodleLayer.astro) | Garabatos | ServicesHeroBoard, OpinionsHeroPoster |
| [ColorIconBubble](src/components/premium/ColorIconBubble.astro) | ServiceIcon con blob+bubble | filas/tarjetas de servicio |

## 9. ⚠️ Componentes huérfanos / legacy (candidatos a limpieza)

No están referenciados en ninguna parte (sobras de la v1 antes de la capa premium):
- [src/components/SectionTitle.astro](src/components/SectionTitle.astro)
- [src/components/ServiceRow.astro](src/components/ServiceRow.astro)
- [src/components/ServiceCard.astro](src/components/ServiceCard.astro)
- [src/components/TrabajoCard.astro](src/components/TrabajoCard.astro)
- [src/components/TestimonioCard.astro](src/components/TestimonioCard.astro)
- [src/components/premium/OrganicCreamPanel.astro](src/components/premium/OrganicCreamPanel.astro)

Se pueden borrar sin afectar el sitio (conviene verificarlo con un build antes).

## 10. 🔧 "¿Dónde cambio X?" — referencia rápida

| Quiero cambiar... | Archivo / lugar |
|---|---|
| **Número de WhatsApp** | [src/scripts/whatsapp.js](src/scripts/whatsapp.js) (`WA_NUMBER` + `WA_DISPLAY`) |
| **Texto base del mensaje de WhatsApp** | [src/scripts/whatsapp.js](src/scripts/whatsapp.js) (`MENSAJE_BASE` y `buildWhatsAppMessage`) |
| **Contraseña del admin** | [src/pages/admin.astro](src/pages/admin.astro) → `<script>` → `const CLAVE` (⚠️ visible en el HTML, no es segura) |
| **Agregar / quitar / editar un servicio** | [src/data/servicios.json](src/data/servicios.json) — y, si es nuevo: agregar color `--cat-{id}` en [global.css](src/styles/global.css), foto en [serviceImages.js](src/scripts/serviceImages.js), y glifo en [ServiceIcon.astro](src/components/ServiceIcon.astro) si el `icono` no existe |
| **Precios** | [src/data/servicios.json](src/data/servicios.json) (`precio`, `precioNota`) |
| **Qué servicios salen "destacados" en Inicio** | flag `destacado` en [servicios.json](src/data/servicios.json) |
| **Testimonios / trabajos** | [testimonios.json](src/data/testimonios.json) / [trabajos.json](src/data/trabajos.json) |
| **Métricas/solicitudes demo del admin** | [src/data/admin.json](src/data/admin.json) |
| **Colores de marca (navy, amarillo, coral...)** | [src/styles/tokens.css](src/styles/tokens.css) (`--tv-*`) |
| **Colores por categoría de servicio** | [src/styles/global.css](src/styles/global.css) (`--cat-*`) |
| **Tipografías** | carga en [AppShell.astro](src/layouts/AppShell.astro) + variables `--font-display/--font-hand` en [tokens.css](src/styles/tokens.css) y `--font` en [global.css](src/styles/global.css) |
| **Ancho del marco / alto header/dock** | [global.css](src/styles/global.css) (`--app-max`, `--header-h`, `--dock-h`) |
| **Ítems del menú inferior** | [BottomNav.astro](src/components/BottomNav.astro) (array `items`) |
| **Texto del CTA amarillo** | [CtaWhatsApp.astro](src/components/CtaWhatsApp.astro) |
| **Titulares de los heroes** | el `.astro` del hero correspondiente (HeroPoster / OpinionsHeroPoster / ServicesHeroBoard) |
| **Los 5 beneficios de Opiniones** | array `confianza` dentro de [opiniones.astro](src/pages/opiniones.astro) |
| **SEO / Open Graph / JSON-LD** | [AppShell.astro](src/layouts/AppShell.astro) (`<head>` y objeto `jsonLd`) + props `title`/`description` en cada página |
| **Animaciones / movimiento** | [motion.css](src/styles/motion.css) (+ keyframes base en global.css) |
| **El look de una tarjeta concreta** | el `<style>` scoped dentro de su propio componente |
| **El layout de una sección** | el `<style>` al final de la página correspondiente |

## 11. Gotchas / notas importantes

- **No hay backend.** Cotizaciones salen por WhatsApp; el admin guarda en `localStorage` del navegador (se pierde al limpiar datos). La contraseña es decorativa.
- **`id` de servicio = color + foto + ancla.** Si agregas un servicio nuevo y olvidas el `--cat-{id}`, la tarjeta queda sin color.
- **Dos paletas conviven** (`--tv-*` y legacy `--navy/--cat-*`). No están unificadas: revisa ambas al cambiar colores.
- **Especificidad:** algunos componentes pasan ancho/color por `style` inline a propósito para ganarle a clases scoped del padre (ver comentarios en HandDrawnArrow/DoodleLayer).
- **style-lab** es interno; no enlazado pero accesible en `/style-lab`. Sirve como catálogo visual.

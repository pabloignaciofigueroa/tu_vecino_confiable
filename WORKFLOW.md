# 🛠️ WORKFLOW — Cómo trabajar "Tu Vecino Confiable"

Guía corta para desarrollar el sitio sin romper la dirección de arte ni la estructura. Para saber **dónde está cada cosa**, ver [MAPA-DEL-SITIO.md](MAPA-DEL-SITIO.md).

## 1. Stack y comandos

- **Astro 5** estático (sin framework de UI; 0 React/Vue), imágenes con `astro:assets` + **sharp**, fuentes de Google (Fredoka / Nunito / Caveat).

```bash
npm run dev       # desarrollo en caliente (localhost:4321)
npm run build     # build estático a dist/
npm run preview   # sirve el build (localhost:4321)
```

## 2. Cómo está organizado (resumen)

`src/pages/*` = 1 archivo por ruta · `src/layouts/AppShell.astro` = molde común (header + `<main>` + dock fijo) · `src/components/` (compartidos) y `src/components/premium/` (la capa visual actual) · `src/styles/` (CSS global) · `src/scripts/` (JS reutilizable) · `src/data/*.json` (contenido editable). El detalle completo está en el **MAPA**.

## 3. Convenciones de diseño

### 3.1 Tokens (dos paletas conviven)
- **Premium `--tv-*`** en [src/styles/tokens.css](src/styles/tokens.css): paleta principal, sombras (`--tv-shadow-*`), radios, easings, tipos (`--font-display`, `--font-hand`).
- **Legacy / estructural** en [src/styles/global.css](src/styles/global.css): `--navy`, `--yellow`, **colores por categoría `--cat-*`** (clave para los servicios), estados admin, y los **tokens del shell**.

> Al cambiar colores revisá **ambos** archivos. Los `--cat-*` viven en global.css, no en tokens.css.

### 3.2 Tokens del shell ([global.css](src/styles/global.css))
`--header-h:58` · `--cta-h:72` · `--nav-h:66` · `--dock-h:calc(cta+nav)` · `--page-x:14` · `--section-gap:14`. El `<main>` reserva el dock con `padding-bottom: calc(var(--cta-h) + var(--nav-h) + safe-area + 24px)`. Si cambiás el alto del CTA o del nav, ajustá estos tokens (no números sueltos).

### 3.3 Sistema de paneles de sección ⭐
Cada `<section>` de las pantallas **públicas** es una tarjeta redondeada separada por unos píxeles sobre el marco navy. Lo hace una sola regla en [global.css](src/styles/global.css):

```css
main:not(.is-admin) > section {
  margin: 0 6px 8px;
  border-radius: 20px;
  overflow: hidden;
}
main:not(.is-admin) > section:first-child { margin-top: 8px; }
```

- El **admin queda excluido** porque [AppShell.astro](src/layouts/AppShell.astro) le pone `class="is-admin"` al `<main>`.
- Para que una sección use este sistema, **no le pongas `margin`/`border-radius` propios** (los pisarían). Solo definí su `background` y `padding`.
- Si un componente-hero trae su propio `border-radius`, quitalo para que herede el del sistema.

### 3.4 Scoped vs global vs inline
- **Global** (`src/styles/`): reset, shell, utilidades (`.tv-display`, `.tv-pill-coral`, `.section`, `.sr-only`) y la regla de paneles.
- **Scoped por componente**: cada `.astro` lleva su `<style>` aislado → el look de cada tarjeta vive dentro de su componente.
- **Scoped por página**: el `<style>` al final de cada página maneja el layout de sus secciones (grids, fondos, formularios).
- **Inline `style="--cat: var(--cat-fletes)"`**: para pasar el color de categoría a un componente reutilizable.

### 3.5 Lenguaje visual (reglas aprendidas)
- **Doodles = acentos anclados, NO relleno.** Pegalos a un elemento (ej. chispa en la esquina del título, corazón junto al brush). Si un doodle solo "tapa un hueco", el problema es el hueco: apretá el layout. Ver `ServicesHeroBoard` como referencia (acentos SVG inline).
- **Brush/marcador en líneas cortas** (tipo escritura a mano): cortar la frase con `<br>` en líneas de ≤ ~17 caracteres se ve natural y evita palabras huérfanas.
- **Copys cortos**: títulos ≤2 líneas, descripciones 1–2 líneas. Usá `-webkit-line-clamp` o elipsis para forzarlo.
- **Sombras cálidas** vía `--tv-shadow-*`, nunca grises planas.
- Todo respeta `prefers-reduced-motion` (definido en global.css y motion.css).

## 4. Editar contenido sin tocar layout

La mayoría del contenido vive en `src/data/*.json` (servicios, trabajos, testimonios, admin). Para "quiero cambiar X", usá la tabla **"¿Dónde cambio X?"** del [MAPA-DEL-SITIO.md](MAPA-DEL-SITIO.md#10--dónde-cambio-x--referencia-rápida).

Recordatorio clave: el `id` de un servicio es a la vez **color** (`--cat-{id}` en global.css), **foto** (`serviceImages.js`) y **ancla** (`/servicios#{id}`). Si agregás uno nuevo, definí su color o la tarjeta queda sin color.

## 5. Flujo de verificación visual

El sitio es "app móvil"; **siempre verificá en varios anchos** antes de dar por hecho un cambio de layout.

1. `npm run build` (atrapa imports rotos / errores).
2. `npm run preview` en segundo plano.
3. Script temporal de **Playwright** (ya está instalado como devDependency) para capturar screenshots. Patrón usado:

```js
// _shot.mjs (temporal, se borra al terminar)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
mkdirSync('shots', { recursive: true });
const browser = await chromium.launch();
for (const w of [390, 414, 430, 480, 520]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 844 }, deviceScaleFactor: 1.5 });
  const page = await ctx.newPage();
  for (const [name, path] of [['inicio','/'],['servicios','/servicios'],['opiniones','/opiniones']]) {
    await page.goto('http://localhost:4321' + path, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `shots/${name}-${w}.png`, fullPage: true });
  }
  await ctx.close();
}
await browser.close();
```

4. **Checklist responsive** (390 / 414 / 430 / 480 / 520):
   - el CTA amarillo no tapa campos ni cards;
   - el menú inferior no corta contenido;
   - sin títulos ni palabras partidas feo;
   - grilla de servicios legible (3 col; 2 col bajo 380px);
   - scroll razonable / pantallas que se sienten una familia.
5. **Borrá los temporales** (`_shot.mjs`, carpeta `shots/`) antes de commitear.

## 6. Git

- Trabajá en una **rama desde `main`** (no commitees directo a main).
- Commits **descriptivos en español**, terminando con el trailer:
  ```
  Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
  ```
- Para llevar a producción: `git checkout main` → `git merge --ff-only <rama>` → `git push origin main`. El remoto `origin` apunta a `github.com/pabloignaciofigueroa/tu_vecino_confiable`.
- **Gotcha de PowerShell:** en mensajes multilínea con here-string (`@'...'@`), **evitá comillas dobles** dentro del texto — rompen el parseo del `-m`. Usá texto sin comillas.

## 7. Limitaciones conocidas (no son bugs)

- **WhatsApp por `wa.me` solo envía texto.** Las fotos no se adjuntan por el enlace: el cliente las suma a mano en el chat (el mensaje ya lo avisa con "Te adjunto N foto(s) en el chat.").
- **Sin backend.** Las cotizaciones salen por WhatsApp; el admin guarda "pegas" en `localStorage` y su contraseña (`zxc098`) es una traba client-side de demo, **no seguridad real**.
- El `�` que a veces aparece donde va el 👋 es del cuadro de redacción de WhatsApp Web; en un teléfono real se ve el emoji.

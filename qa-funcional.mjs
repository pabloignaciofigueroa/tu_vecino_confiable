// QA funcional contra el preview (npm run preview) en http://localhost:4321
// Corre con: node qa-funcional.mjs
import { chromium } from 'playwright';

const BASE = 'http://localhost:4321';
let fallas = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? 'PASS' : 'FAIL'} — ${msg}`);
  if (!cond) fallas++;
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });

// 1) Cero scroll horizontal en las 4 rutas (MOBILE_QA)
for (const ruta of ['/', '/servicios', '/opiniones', '/admin']) {
  await page.goto(BASE + ruta, { waitUntil: 'networkidle' });
  const sw = await page.evaluate(() => document.scrollingElement.scrollWidth);
  ok(sw <= 375, `sin scroll horizontal en ${ruta} (scrollWidth=${sw})`);
}

// 2) CTA fijo apunta a wa.me con mensaje precargado
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
const hrefInicio = await page.getAttribute('#cta-wa', 'href');
ok(hrefInicio?.startsWith('https://wa.me/56974320048?text='), 'CTA de Inicio apunta a wa.me/56974320048 con texto');

// 3) Menú hamburguesa
const menuCerrado = await page.getAttribute('#menu-sheet', 'hidden');
ok(menuCerrado !== null, 'menú hamburguesa parte cerrado');
await page.click('#menu-btn');
ok(await page.isVisible('#menu-sheet'), 'menú abre al tocar');
await page.click('#menu-btn');
ok(await page.isHidden('#menu-sheet'), 'menú cierra al volver a tocar');

// 4) Servicios: selección de cards y preview WhatsApp en vivo
await page.goto(BASE + '/servicios', { waitUntil: 'networkidle' });
let texto = await page.inputValue('#preview-text');
ok(
  texto.includes('Retiro de cachureos') && texto.includes('Fletes pequeños'),
  'preview inicial trae la preselección (cachureos + fletes)'
);

await page.click('#aeropuerto');
texto = await page.inputValue('#preview-text');
ok(texto.includes('Traslado al aeropuerto'), 'tocar una card agrega el servicio al mensaje');

await page.click('#cachureos');
texto = await page.inputValue('#preview-text');
ok(!texto.includes('Retiro de cachureos'), 'tocar una card seleccionada la quita del mensaje');

await page.fill('#f-comuna', 'Viña del Mar, Miraflores Alto');
await page.fill('#f-detalle', 'Retiro de un refrigerador y un sofá');
texto = await page.inputValue('#preview-text');
ok(texto.includes('En: Viña del Mar, Miraflores Alto.'), 'la comuna entra al mensaje');
ok(texto.includes('Detalle: Retiro de un refrigerador y un sofá'), 'el detalle entra al mensaje');

const hrefServicios = await page.getAttribute('#cta-wa', 'href');
ok(
  hrefServicios?.includes(encodeURIComponent('Viña del Mar')),
  'el CTA lleva el mensaje armado y codificado (tildes/ñ ok)'
);

// 5) Admin: guardar pega, persistencia y validación
await page.goto(BASE + '/admin', { waitUntil: 'networkidle' });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'networkidle' });

const filasAntes = await page.locator('.sol-fila').count();
await page.fill('#p-cliente', 'Prueba QA');
await page.selectOption('#p-servicio', 'fletes');
await page.fill('#p-comuna', 'Quilpué');
await page.fill('#p-monto', '30000');
await page.click('#btn-guardar');
ok((await page.locator('.sol-fila').count()) === filasAntes + 1, 'Guardar pega agrega una fila');

const primeraFila = await page.locator('.sol-fila').first().innerText();
ok(
  primeraFila.includes('Prueba QA') && /nuevo/i.test(primeraFila) && primeraFila.includes('$30.000'),
  'fila nueva con cliente, badge Nuevo y monto formato CLP'
);

await page.reload({ waitUntil: 'networkidle' });
const trasReload = await page.locator('.sol-fila').first().innerText();
ok(trasReload.includes('Prueba QA'), 'la pega sobrevive a la recarga (localStorage)');

await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'networkidle' });
const n0 = await page.locator('.sol-fila').count();
await page.click('#btn-guardar');
ok((await page.locator('.sol-fila').count()) === n0, 'formulario vacío NO agrega fila (camino de error)');

await browser.close();
console.log(fallas === 0 ? '\nQA FUNCIONAL: TODO PASÓ' : `\nQA FUNCIONAL: ${fallas} FALLAS`);
process.exit(fallas === 0 ? 0 : 1);

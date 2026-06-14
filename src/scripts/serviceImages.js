// Mapa servicio → foto para la grilla premium de Servicios.
// 3 reales = trabajos de Jorge. 6 de Adobe Stock (free, licenciadas) en
// ../assets/img/servicios/. Si un id no está en el mapa, PremiumServiceCard usa
// su fallback gradiente+glifo. astro:assets optimiza todo a webp en build.
import cachureos from '../assets/img/trabajo-cachureos.png';
import flete from '../assets/img/trabajo-flete.png';
import repisas from '../assets/img/trabajo-repisas.png';

import aeropuerto from '../assets/img/servicios/aeropuerto.jpg';
import vina from '../assets/img/servicios/vina.jpg';
import fiestas from '../assets/img/servicios/fiestas.jpg';
import tramites from '../assets/img/servicios/tramites.jpg';
import ventanales from '../assets/img/servicios/ventanales.jpg';
import pintura from '../assets/img/servicios/pintura.jpg';

export const serviceImages = {
  aeropuerto,
  vina,
  fiestas,
  cachureos,
  fletes: flete,
  tramites,
  muebles: repisas,
  ventanales,
  pintura,
};

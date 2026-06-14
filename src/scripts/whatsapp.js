// Número confirmado en la guía maestra y mockups: +56 9 7432 0048
export const WA_NUMBER = '56974320048';
export const WA_DISPLAY = '+56 9 7432 0048';

const MENSAJE_BASE = '¡Hola Jorge! 👋 Vi tu página Tu Vecino Confiable y quiero cotizar un servicio.';

/**
 * Arma el mensaje de cotización a partir de lo que el cliente eligió.
 * Si no hay nada elegido, cae al mensaje genérico (camino de error cubierto).
 * `fotos` es la cantidad de imágenes que el cliente piensa adjuntar a mano en
 * el chat (wa.me no permite adjuntarlas por el enlace), así Jorge queda avisado.
 * @param {{ servicios?: string[], comuna?: string, fecha?: string, hora?: string, detalle?: string, fotos?: number }} [datos]
 */
export function buildWhatsAppMessage({ servicios = [], comuna = '', fecha = '', hora = '', detalle = '', fotos = 0 } = {}) {
  const hayDatos = servicios.length || comuna || fecha || hora || detalle || fotos;
  if (!hayDatos) return MENSAJE_BASE;

  const lineas = ['¡Hola Jorge! 👋'];
  if (servicios.length) lineas.push(`Necesito: ${servicios.join(', ')}.`);
  const cuando = [fecha, hora].filter(Boolean).join(', ');
  if (cuando) lineas.push(`Para: ${cuando}.`);
  if (comuna) lineas.push(`En: ${comuna}.`);
  if (detalle) lineas.push(`Detalle: ${detalle}`);
  if (fotos) lineas.push(`Te adjunto ${fotos} foto${fotos > 1 ? 's' : ''} en el chat.`);
  return lineas.join('\n');
}

export function buildWhatsAppUrl(datos) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(datos))}`;
}

// Formato chileno: $1.245.000 (convención del taller)
export function formatCLP(monto) {
  if (monto === null || monto === undefined || monto === '') return '—';
  const n = Number(monto);
  if (!Number.isFinite(n)) return '—';
  return '$' + n.toLocaleString('es-CL');
}

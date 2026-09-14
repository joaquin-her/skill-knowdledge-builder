/* ============================================================================
   mode_quizz — persistencia del progreso
   ----------------------------------------------------------------------------
   Capa pura sobre localStorage. No conoce React ni el DOM más allá de la API
   de storage: la usan tanto el hook (src/lib/useProgreso.ts) como cualquier
   cálculo que necesite leer el progreso ya guardado (src/lib/avance.ts).

   localStorage puede fallar (modo privado, cuota llena, `file://`, storage
   deshabilitado) y su contenido es dato no confiable (puede estar corrupto,
   ser de una versión vieja del contrato, o haber sido editado a mano). Por
   eso: todo acceso va en try/catch, y todo lo leído se valida antes de
   devolverlo. Un fallo nunca debe romper la app — sólo se pierde persistencia.
   ========================================================================== */

import type { Progreso, ProgresoUnidad, Respuesta } from '@/types/quiz';

const CLAVE = 'mode_quizz.progreso.v1';

function esRespuesta(v: unknown): v is Respuesta {
  if (typeof v !== 'object' || v === null) return false;
  const r = v as Record<string, unknown>;
  return typeof r.ok === 'boolean' && typeof r.dada === 'string';
}

/** Descarta entradas malformadas en vez de invalidar todo el progreso. */
function sanearProgresoUnidad(v: Record<string, unknown>): ProgresoUnidad {
  const out: ProgresoUnidad = {};
  for (const [qid, r] of Object.entries(v)) {
    if (esRespuesta(r)) out[qid] = r;
  }
  return out;
}

/** Descarta unidades malformadas en vez de invalidar todo el progreso. */
function sanearProgreso(v: unknown): Progreso {
  if (typeof v !== 'object' || v === null) return {};
  const out: Progreso = {};
  for (const [unidadId, u] of Object.entries(v as Record<string, unknown>)) {
    if (typeof u === 'object' && u !== null) {
      out[unidadId] = sanearProgresoUnidad(u as Record<string, unknown>);
    }
  }
  return out;
}

/** Lee todo el progreso persistido. Nunca lanza: ante cualquier problema, {}. */
export function leerProgreso(): Progreso {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    return sanearProgreso(parsed);
  } catch {
    return {};
  }
}

/** Persiste todo el progreso. Si falla (cuota, modo privado, etc.), no hace nada. */
export function guardarProgreso(p: Progreso): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(p));
  } catch {
    // Se degrada a "no persiste" en silencio.
  }
}

/** Progreso de una unidad puntual. */
export function leerUnidad(unidadId: string): ProgresoUnidad {
  const todo = leerProgreso();
  return todo[unidadId] ?? {};
}

/** Registra la respuesta a una pregunta dentro de una unidad y persiste. */
export function guardarRespuesta(unidadId: string, qid: string, r: Respuesta): void {
  const todo = leerProgreso();
  const unidad = { ...(todo[unidadId] ?? {}) };
  unidad[qid] = r;
  todo[unidadId] = unidad;
  guardarProgreso(todo);
}

/** Borra el progreso de una única unidad; el resto del progreso sobrevive. */
export function limpiarUnidad(unidadId: string): void {
  const todo = leerProgreso();
  if (!(unidadId in todo)) return;
  const { [unidadId]: _borrada, ...resto } = todo;
  guardarProgreso(resto);
}

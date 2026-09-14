/* ============================================================================
   mode_quizz — avance de una unidad
   ----------------------------------------------------------------------------
   Función pura, sin DOM ni estado propio: recibe el progreso persistido (lo
   que ya maneja src/lib/progress.ts) y devuelve el resumen que necesitan la
   landing, el selector de unidad y el encabezado del quiz.

   Equivalente exacto de `avanceDe` en js/engine.js, pero sin depender de un
   objeto RESULTADOS global: acá el progreso viaja por parámetro.
   ========================================================================== */

import type { Avance, ProgresoUnidad, Unidad } from '@/types/quiz';

export function avanceDe(unidad: Unidad, progreso: ProgresoUnidad): Avance {
  let respondidas = 0;
  let correctas = 0;
  let total = 0;

  for (const p of unidad.problemas) {
    for (const q of p.preguntas) {
      total++;
      const r = progreso[q.id];
      if (r) {
        respondidas++;
        if (r.ok) correctas++;
      }
    }
  }

  return { respondidas, correctas, total };
}

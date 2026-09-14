/* ============================================================================
   mode_quizz — Quiz (una unidad completa)
   ----------------------------------------------------------------------------
   Equivalente de `renderProblema`-por-unidad + `verificar`/`reiniciar` de
   js/engine.js, pero sin el objeto global RESULTADOS/RESPUESTAS: el progreso
   persistido entra por props (`progreso`) y sale por callback (`onRespuesta`).
   Este componente no sabe nada de localStorage ni de cuántas unidades hay, ni
   dispara el reinicio: eso lo maneja quien lo use (la vista de unidad), vía
   src/lib/progress.ts.

   Lo que en engine.js vivía fuera del <div id="quiz"> (tag de curso, pie,
   selector de unidad, barra de progreso global) no es parte de este
   componente: pertenece al layout de app/, que no se toca acá.
   ========================================================================== */

'use client';

import type { ProgresoUnidad, Respuesta, Unidad } from '@/types/quiz';
import Problema from '@/components/Problema';

export interface QuizProps {
  unidad: Unidad;
  progreso: ProgresoUnidad;
  onRespuesta: (qid: string, r: Respuesta) => void;
}

export default function Quiz({ unidad, progreso, onRespuesta }: QuizProps) {
  // Enter dentro de un campo numérico lo maneja cada Pregunta (onKeyDown
  // local). El reinicio lo dispara el layout, que es el dueño de los botones
  // del encabezado y el pie.
  return (
    <div id="quiz" data-unidad={unidad.id}>
      {unidad.problemas.map((p, i) => (
        <Problema
          key={p.id}
          unidadId={unidad.id}
          problema={p}
          indice={i}
          progreso={progreso}
          onVerificar={onRespuesta}
        />
      ))}
    </div>
  );
}

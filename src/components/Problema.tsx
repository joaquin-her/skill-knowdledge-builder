/* ============================================================================
   mode_quizz — un problema (enunciado + preguntas + badge de puntaje)
   ----------------------------------------------------------------------------
   Equivalente de `renderProblema` en js/engine.js, incluida la parte de
   `actualizarPuntaje` que le corresponde a este problema: el badge X/N con
   `.pscore-full` cuando está completo.
   ========================================================================== */

'use client';

import type { Problema as ProblemaTipo, ProgresoUnidad, Respuesta } from '@/types/quiz';
import Bloques from '@/components/Bloques';
import Pregunta from '@/components/Pregunta';

const SEP = '__';

export interface ProblemaProps {
  unidadId: string;
  problema: ProblemaTipo;
  indice: number;
  progreso: ProgresoUnidad;
  onVerificar: (qid: string, r: Respuesta) => void;
}

export default function Problema({ unidadId, problema: p, indice, progreso, onVerificar }: ProblemaProps) {
  const bien = p.preguntas.filter((q) => progreso[q.id]?.ok).length;
  const total = p.preguntas.length;
  const completo = bien === total;

  return (
    <section className="problema" id={unidadId + SEP + p.id}>
      <header className="problema-head">
        <h2>
          <span className="pnum">{p.extra ? '★' : indice + 1}</span>
          {p.titulo}
        </h2>
        <span
          className={'pscore' + (completo ? ' pscore-full' : '')}
          data-pscore={unidadId + SEP + p.id}
        >
          {bien}/{total}
        </span>
      </header>
      <div className="statement">
        <Bloques bloques={p.enunciado} />
      </div>
      {p.preguntas.map((q) => (
        <Pregunta
          key={q.id}
          unidadId={unidadId}
          pregunta={q}
          respuesta={progreso[q.id]}
          onVerificar={onVerificar}
        />
      ))}
    </section>
  );
}

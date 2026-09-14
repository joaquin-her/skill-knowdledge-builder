/* ============================================================================
   mode_quizz — una pregunta (mc | num)
   ----------------------------------------------------------------------------
   Equivalente de `renderPregunta` + la corrección (`verificar`, `parseNumero`,
   `esCorrecta`, `marcarOpciones`) en js/engine.js.

   Diferencia de arquitectura respecto del motor clásico: acá no hay un objeto
   global RESULTADOS/RESPUESTAS ni manipulación directa del DOM. El resultado
   ya verificado vive en `progreso[qid]` (prop, viene de arriba). Lo que el
   motor clásico guardaba "en curso" (radio tildado, texto tipeado, warning
   antes de verificar) es estado local de este componente, porque nunca se
   persiste hasta que el usuario aprieta Verificar.
   ========================================================================== */

'use client';

import { useEffect, useRef, useState } from 'react';
import type { Pregunta as PreguntaTipo, Respuesta } from '@/types/quiz';
import { inline, tex } from '@/lib/tex';
import Bloques from '@/components/Bloques';

const SEP = '__';

function parseNumero(str: string): number {
  if (str == null) return NaN;
  const s = String(str).trim().replace(/\s/g, '').replace(',', '.');
  if (s === '') return NaN;
  return Number(s);
}

function esCorrecta(q: Extract<PreguntaTipo, { tipo: 'num' }>, valor: number): boolean {
  if (typeof q.reltol === 'number') {
    return Math.abs(valor - q.respuesta) <= Math.abs(q.respuesta) * q.reltol;
  }
  return Math.abs(valor - q.respuesta) <= (typeof q.tol === 'number' ? q.tol : 0);
}

export interface PreguntaProps {
  unidadId: string;
  pregunta: PreguntaTipo;
  respuesta: Respuesta | undefined;
  onVerificar: (qid: string, r: Respuesta) => void;
}

export default function Pregunta({ unidadId, pregunta: q, respuesta, onVerificar }: PreguntaProps) {
  const qid = unidadId + SEP + q.id;

  // Estado en curso, no persistido: lo elegido/tipeado antes (o en vez) de
  // verificar. Se re-siembra desde `respuesta` cuando cambia de afuera
  // (repintado al cambiar de unidad, o reinicio).
  const [elegida, setElegida] = useState<string>(respuesta?.dada ?? '');
  const [valorInput, setValorInput] = useState<string>(respuesta?.dada ?? '');
  const [warn, setWarn] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    setElegida(respuesta?.dada ?? '');
    setValorInput(respuesta?.dada ?? '');
    setWarn(null);
  }, [respuesta, qid]);

  useEffect(() => {
    if (respuesta && detailsRef.current) detailsRef.current.open = true;
  }, [respuesta]);

  function verificar() {
    if (q.tipo === 'mc') {
      if (!elegida) {
        setWarn('Elegí una opción antes de verificar.');
        return;
      }
      const ok = elegida === q.correcta;
      setWarn(null);
      onVerificar(q.id, { ok, dada: elegida });
    } else {
      const valor = parseNumero(valorInput);
      if (isNaN(valor)) {
        setWarn('Ingresá un valor numérico.');
        return;
      }
      const ok = esCorrecta(q, valor);
      setWarn(null);
      onVerificar(q.id, { ok, dada: valorInput });
    }
  }

  function onKeyDownInput(ev: React.KeyboardEvent<HTMLInputElement>) {
    if (ev.key !== 'Enter') return;
    ev.preventDefault();
    verificar();
  }

  const fbTexto = warn ?? (respuesta ? (respuesta.ok ? '✓ Correcto' : '✗ Incorrecto') : '');
  const fbClase = warn ? 'warn' : respuesta ? (respuesta.ok ? 'ok' : 'bad') : '';
  const fbHidden = !warn && !respuesta;

  const qOk = !!respuesta && respuesta.ok;
  const qBad = !!respuesta && !respuesta.ok;

  return (
    <article
      className={'q' + (qOk ? ' q-ok' : '') + (qBad ? ' q-bad' : '')}
      id={qid}
      data-qid={qid}
    >
      <p className="qtext">
        {q.tag ? <span className="qtag">{q.tag}</span> : null}
        <span dangerouslySetInnerHTML={{ __html: inline(q.enunciado) }} />
      </p>
      {q.ayuda ? <p className="qhelp" dangerouslySetInnerHTML={{ __html: inline(q.ayuda) }} /> : null}

      {q.tipo === 'mc' ? (
        <div className="opts" role="radiogroup">
          {q.opciones.map((o) => {
            const optCorrect = !!respuesta && o.v === q.correcta;
            const optIncorrect = !!respuesta && !respuesta.ok && o.v === elegida;
            const cuerpo = o.tex ? tex('\\displaystyle ' + o.tex, false) : inline(o.html);
            return (
              <label
                key={o.v}
                className={
                  'opt' +
                  (optCorrect ? ' opt-correct' : '') +
                  (optIncorrect ? ' opt-incorrect' : '')
                }
                data-val={o.v}
              >
                <input
                  type="radio"
                  name={qid}
                  value={o.v}
                  checked={elegida === o.v}
                  onChange={() => setElegida(o.v)}
                />
                <span className="opt-body" dangerouslySetInnerHTML={{ __html: cuerpo }} />
                <span className="opt-mark" aria-hidden="true" />
              </label>
            );
          })}
        </div>
      ) : (
        <div className="inputrow">
          <input
            type="text"
            inputMode="decimal"
            autoComplete="off"
            spellCheck={false}
            id={'in_' + qid}
            aria-label="Respuesta"
            placeholder={q.placeholder || '0,00'}
            value={valorInput}
            onChange={(ev) => setValorInput(ev.target.value)}
            onKeyDown={onKeyDownInput}
            className={qOk ? 'input-ok' : qBad ? 'input-bad' : undefined}
          />
          {q.unidad ? <span className="unit" dangerouslySetInnerHTML={{ __html: inline(q.unidad) }} /> : null}
        </div>
      )}

      <div className="qactions">
        <button type="button" className="btn" data-verify={qid} onClick={verificar}>
          Verificar
        </button>
        <span className={fbClase ? 'fb ' + fbClase : 'fb'} hidden={fbHidden}>
          {fbTexto}
        </span>
      </div>

      {q.desarrollo && q.desarrollo.length ? (
        <details className="explain" ref={detailsRef}>
          <summary>Ver desarrollo</summary>
          <div className="explain-body">
            <Bloques bloques={q.desarrollo} />
          </div>
        </details>
      ) : null}
    </article>
  );
}

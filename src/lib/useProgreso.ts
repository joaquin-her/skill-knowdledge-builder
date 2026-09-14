/* ============================================================================
   mode_quizz — hook de progreso
   ----------------------------------------------------------------------------
   El sitio es `output: 'export'`: el HTML de cada unidad se pre-renderiza en
   build, donde no existe `localStorage`. Si leyéramos el progreso durante el
   primer render, el árbol del servidor (vacío) no coincidiría con el del
   cliente (con datos) y React tiraría un error de hidratación.

   Por eso el hook arranca siempre con estado vacío — igual en servidor y en
   cliente — y recién lee localStorage dentro de un useEffect, que sólo corre
   en el browser después de hidratar. `listo` le avisa a la UI cuándo terminó
   esa carga inicial, para por ejemplo no mostrar "0/10" un instante antes de
   pintar el progreso real.
   ========================================================================== */

'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ProgresoUnidad, Respuesta } from '@/types/quiz';
import { guardarRespuesta, leerUnidad, limpiarUnidad } from './progress';

export interface UseProgresoResult {
  progreso: ProgresoUnidad;
  registrar: (qid: string, r: Respuesta) => void;
  reiniciar: () => void;
  listo: boolean;
}

export function useProgreso(unidadId: string): UseProgresoResult {
  const [progreso, setProgreso] = useState<ProgresoUnidad>({});
  const [listo, setListo] = useState(false);

  useEffect(() => {
    setProgreso(leerUnidad(unidadId));
    setListo(true);
  }, [unidadId]);

  const registrar = useCallback((qid: string, r: Respuesta) => {
    guardarRespuesta(unidadId, qid, r);
    setProgreso((prev) => ({ ...prev, [qid]: r }));
  }, [unidadId]);

  const reiniciar = useCallback(() => {
    limpiarUnidad(unidadId);
    setProgreso({});
  }, [unidadId]);

  return { progreso, registrar, reiniciar, listo };
}

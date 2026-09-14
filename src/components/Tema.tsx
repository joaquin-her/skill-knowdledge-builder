'use client';

/* ============================================================================
   Botón de tema: rota sistema → claro → oscuro, igual que el motor viejo.
   ----------------------------------------------------------------------------
   El tema se aplica poniendo data-theme en <html>, que es lo que leen las
   reglas de css/styles.css. Se lee de localStorage después de montar: en el
   export estático el HTML se genera en build, donde no hay storage.
   ========================================================================== */

import { useEffect, useState } from 'react';

type Modo = 'system' | 'light' | 'dark';

const CLAVE = 'mode_quizz.tema';
const ETIQUETA: Record<Modo, string> = {
  system: '◓ Sistema',
  light: '◑ Claro',
  dark: '◐ Oscuro',
};

function aplicar(modo: Modo) {
  const raiz = document.documentElement;
  if (modo === 'dark' || modo === 'light') raiz.setAttribute('data-theme', modo);
  else raiz.removeAttribute('data-theme');
}

export default function Tema() {
  const [modo, setModo] = useState<Modo>('system');

  useEffect(() => {
    let guardado: Modo = 'system';
    try {
      const v = localStorage.getItem(CLAVE);
      if (v === 'light' || v === 'dark' || v === 'system') guardado = v;
    } catch {
      /* storage deshabilitado: queda en 'system' */
    }
    setModo(guardado);
    aplicar(guardado);
  }, []);

  function rotar() {
    const siguiente: Modo = modo === 'system' ? 'light' : modo === 'light' ? 'dark' : 'system';
    setModo(siguiente);
    aplicar(siguiente);
    try {
      localStorage.setItem(CLAVE, siguiente);
    } catch {
      /* no persiste, pero el tema igual se aplica en esta sesión */
    }
  }

  return (
    <button type="button" className="btn-ghost" onClick={rotar} data-modo={modo}>
      {ETIQUETA[modo]}
    </button>
  );
}

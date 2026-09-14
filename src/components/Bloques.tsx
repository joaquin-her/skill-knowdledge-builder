/* ============================================================================
   mode_quizz — bloques de texto (p / math / note / ul / table)
   ----------------------------------------------------------------------------
   Equivalente de `renderBloques` en js/engine.js. Sin estado ni interacción:
   no necesita 'use client'. El HTML de cada bloque ya trae el LaTeX resuelto
   por tex()/inline(), así que se inyecta con dangerouslySetInnerHTML tal como
   hacía el motor clásico.
   ========================================================================== */

import type { Bloque } from '@/types/quiz';
import { inline, tex } from '@/lib/tex';

export default function Bloques({ bloques }: { bloques: Bloque[] | undefined }) {
  if (!bloques || !bloques.length) return null;

  return (
    <>
      {bloques.map((b, i) => {
        if ('p' in b) {
          return <p key={i} dangerouslySetInnerHTML={{ __html: inline(b.p) }} />;
        }
        if ('math' in b) {
          return (
            <div
              key={i}
              className="math-display"
              dangerouslySetInnerHTML={{ __html: tex(b.math, true) }}
            />
          );
        }
        if ('note' in b) {
          return (
            <div key={i} className="note" dangerouslySetInnerHTML={{ __html: inline(b.note) }} />
          );
        }
        if ('ul' in b) {
          return (
            <ul key={i} className="data-list">
              {b.ul.map((li, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: inline(li) }} />
              ))}
            </ul>
          );
        }
        if ('table' in b) {
          const t = b.table;
          return (
            <div key={i} className="scrollx">
              <table className="datatable">
                <thead>
                  <tr>
                    {t.head.map((h, j) => (
                      <th key={j} dangerouslySetInnerHTML={{ __html: inline(h) }} />
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((r, j) => (
                    <tr key={j}>
                      {r.map((c, k) => (
                        <td key={k} dangerouslySetInnerHTML={{ __html: inline(c) }} />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </>
  );
}

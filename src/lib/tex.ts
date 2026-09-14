/* ============================================================================
   mode_quizz — render de LaTeX
   ----------------------------------------------------------------------------
   KaTeX se importa como módulo y se renderiza a string en el server: el export
   estático emite las fórmulas ya resueltas en el HTML, así que se ven aunque
   el JS todavía no haya hidratado.
   ========================================================================== */

import katex from 'katex';

/** String.raw: permite escribir LaTeX sin duplicar las barras invertidas. */
export const M = String.raw;

export function escapeHtml(s: string): string {
  return String(s).replace(/[&<>"]/g, (c) => {
    const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
    return map[c];
  });
}

/** Renderiza una fórmula a HTML. Si KaTeX falla, degrada a <code> en vez de romper. */
export function tex(src: string, display = false): string {
  try {
    return katex.renderToString(src, {
      displayMode: display,
      throwOnError: false,
      strict: false,
    });
  } catch (err) {
    console.error('KaTeX:', err, src);
    return '<code>' + escapeHtml(src) + '</code>';
  }
}

/** Texto con HTML libre y fórmulas en línea delimitadas por $…$ */
export function inline(text: string | null | undefined): string {
  if (text == null) return '';
  return String(text).replace(/\$([^$]+)\$/g, (_, src: string) => tex(src, false));
}

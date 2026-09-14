/* ============================================================================
   mode_quizz — contrato de contenido
   ----------------------------------------------------------------------------
   Estos tipos son la frontera entre el motor y el contenido. Una unidad nueva
   sólo tiene que satisfacer `Unidad`; el motor no se toca.

   El LaTeX se escribe con el tag `M` (String.raw) de src/lib/tex.ts: en un
   string común `\f` es un salto de página y `\t` un tabulador, así que `\frac`
   y `\times` se romperían.
   ========================================================================== */

/** Bloques de texto para enunciados y desarrollos. Exactamente una clave por bloque. */
export type Bloque =
  | { p: string }                                        // párrafo: HTML libre y $latex$ en línea
  | { math: string }                                     // fórmula en display
  | { note: string }                                     // bloque destacado
  | { ul: string[] }                                     // lista de datos
  | { table: { head: string[]; rows: string[][] } };

/** Una opción de un ejercicio de opción múltiple: `tex` para fórmula, `html` para texto. */
export interface Opcion {
  v: string;
  tex?: string;
  html?: string;
}

interface PreguntaBase {
  id: string;
  /** Etiqueta visible, del estilo '1.a'. */
  tag?: string;
  enunciado: string;
  ayuda?: string;
  desarrollo?: Bloque[];
}

export interface PreguntaMC extends PreguntaBase {
  tipo: 'mc';
  opciones: Opcion[];
  correcta: string;
}

export interface PreguntaNum extends PreguntaBase {
  tipo: 'num';
  respuesta: number;
  /** Tolerancia absoluta. */
  tol?: number;
  /** Tolerancia relativa como fracción: 0.3 = ±30 %. Tiene prioridad sobre `tol`. */
  reltol?: number;
  /** Unidad física mostrada junto al campo. */
  unidad?: string;
  placeholder?: string;
}

export type Pregunta = PreguntaMC | PreguntaNum;

export interface Problema {
  id: string;
  titulo: string;
  /** Marca el problema como extra (se numera con ★ en vez de un número). */
  extra?: boolean;
  enunciado: Bloque[];
  preguntas: Pregunta[];
}

export interface Unidad {
  /** Único en todo el sitio: es el namespace de las preguntas y el slug de la URL. */
  id: string;
  codigo: string;
  materia: string;
  unidad: string;
  facultad: string;
  problemas: Problema[];
}

/* ------------------------------------------------------------- progreso -- */

/** Lo respondido en un ejercicio: si acertó y qué cargó, para poder repintar. */
export interface Respuesta {
  ok: boolean;
  /** Lo elegido (valor de la opción) o lo tipeado (string crudo, sin normalizar). */
  dada: string;
}

/** Progreso de una unidad: id de pregunta SIN namespacear -> respuesta. */
export type ProgresoUnidad = Record<string, Respuesta>;

/** Progreso completo: id de unidad -> progreso de esa unidad. */
export type Progreso = Record<string, ProgresoUnidad>;

/** Avance calculado de una unidad, para puntajes y etiquetas del selector. */
export interface Avance {
  respondidas: number;
  correctas: number;
  total: number;
}

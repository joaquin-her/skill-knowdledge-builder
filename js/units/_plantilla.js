/* ============================================================================
   PLANTILLA de unidad — copiá este archivo para dar de alta una guía nueva.
   ----------------------------------------------------------------------------
   Tres pasos:
     1. Copiá este archivo a js/units/<materia>-<guia>.js
     2. Cambiale el `id` (tiene que ser único) y los datos de cabecera, y
        reemplazá `problemas` por el contenido real.
     3. Sumá su <script> en el bloque UNIDADES de index.html.

   Reglas que no conviene romper:
   - Todo dentro de la IIFE. Los scripts clásicos comparten scope léxico: dos
     unidades con `M` a nivel global tiran "Identifier 'M' has already been
     declared".
   - Usá `M` (String.raw) para TODO el LaTeX. En un string común `\f` es un
     salto de página y `\t` un tabulador, así que `\frac` y `\times` se rompen.
   - En opciones de opción múltiple usá `\frac`, no `\tfrac`: el motor ya
     agrega `\displaystyle`, y `\tfrac` sale diminuto igual.

   Bloques para enunciados y desarrollos:
     { p:    "texto, admite HTML y $latex$ en línea" }
     { math: "latex en display" }
     { ul:   ["item", "item"] }
     { table:{ head:[...], rows:[[...]] } }
     { note: "texto destacado" }

   Tipos de pregunta:
     tipo:'mc'   → opciones:[{v:'A', tex:'...'}|{v:'A', html:'...'}], correcta:'A'
     tipo:'num'  → respuesta:<número>, con tol (absoluta) o reltol (relativa,
                   fracción: 0.25 = ±25%)
   ========================================================================== */

(function () {
  'use strict';

  var M = QUIZ.M;   // String.raw: LaTeX sin duplicar barras invertidas

  QUIZ.registerUnit({
    id: 'plantilla-demo',
    codigo: '00.00',
    materia: 'Materia de ejemplo',
    unidad: 'Plantilla — Demo',
    facultad: 'Facultad de Ingeniería — UBA',

    problemas: [
      {
        id: 'p1',
        titulo: 'Problema de ejemplo',
        enunciado: [
          { p: 'Así se escribe un enunciado. Admite HTML y fórmulas en línea como $e^{i\\pi} = -1$.' },
          { math: M`\int_0^1 x^2 \, dx = \frac{1}{3}` },
          { ul: ['Un dato: $a = 2{,}00$', 'Otro dato: $b = 3{,}00$'] },
          { note: 'Un bloque destacado, para aclaraciones de la cátedra.' }
        ],
        preguntas: [
          {
            id: 'q1_1', tag: '1.a', tipo: 'mc', correcta: 'B',
            enunciado: M`¿Cuánto vale $\int_0^1 x^2\, dx$?`,
            opciones: [
              { v: 'A', tex: M`\frac{1}{2}` },
              { v: 'B', tex: M`\frac{1}{3}` },
              { v: 'C', tex: M`\frac{2}{3}` },
              { v: 'D', tex: M`1` }
            ],
            desarrollo: [
              { p: 'La primitiva de $x^2$ es $x^3/3$, y se evalúa entre 0 y 1.' },
              { math: M`\int_0^1 x^2\, dx = \left.\frac{x^3}{3}\right|_0^1 = \frac{1}{3}` }
            ]
          },
          {
            id: 'q1_2', tag: '1.b', tipo: 'num', respuesta: 6, tol: 0.01,
            enunciado: 'Con los datos de arriba, calculá $a \\times b$.',
            placeholder: '0,00',
            desarrollo: [
              { math: M`a \times b = 2{,}00 \times 3{,}00 = 6{,}00` }
            ]
          }
        ]
      },
      {
        id: 'p2',
        titulo: 'Segundo problema, con tabla',
        enunciado: [
          { p: 'Las tablas sirven para datos tabulados de la guía:' },
          {
            table: {
              head: [M`i`, M`x_i`, M`f(x_i)`],
              rows: [
                ['0', '1,00', '1,00'],
                ['1', '2,00', '4,00'],
                ['2', '3,00', '9,00']
              ]
            }
          }
        ],
        preguntas: [
          {
            id: 'q2_1', tag: '2.a', tipo: 'num', respuesta: 16, reltol: 0.05,
            enunciado: M`Si $f(x) = x^2$, ¿cuánto vale $f(4)$?`,
            ayuda: 'Se admite un margen del 5 %.',
            placeholder: '00,0',
            desarrollo: [
              { math: M`f(4) = 4^2 = 16` },
              { p: 'La tolerancia relativa (<code>reltol</code>) conviene cuando el valor es grande y el redondeo de cifras significativas mueve el resultado.' }
            ]
          }
        ]
      }
    ]
  });
})();

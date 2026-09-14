# mode_quizz — Laboratorio de Errores

Práctica autoevaluable multi-unidad para materias de ingeniería. Cada ejercicio
se responde por opción múltiple o ingresando el valor calculado, y se corrige al
instante como correcto o incorrecto, con el desarrollo completo desplegable.

La unidad incluida es la **Guía 1 — Errores** de 95.13 Métodos Matemáticos y
Numéricos (Facultad de Ingeniería, UBA). El motor está separado del contenido:
agregar la guía de otra materia es escribir un archivo y sumar una línea al
index.

## Cómo usarlo

Abrí `index.html` en el navegador. No hay build, ni servidor, ni dependencias
que instalar: doble clic al archivo alcanza, y funciona sin conexión.

Si hay más de una unidad cargada, aparece un selector en la barra superior con
el avance de cada una (`Métodos Numéricos · Guía 1 — 7/26`). El avance de cada
unidad se conserva al cambiar de una a otra, y **Reiniciar** borra solamente la
unidad que estás mirando. Con una sola unidad, el selector se oculta.

## Contenido

Los 8 problemas de la Guía 1 (26 ejercicios en total) más un ejercicio extra
resuelto en clase sobre condicionamiento de `ln(x − √(x²−1))`.

| Problema | Tema |
|---|---|
| 1 | Expresión correcta de un resultado y cifras significativas |
| 2 | Error del área de un círculo: sustitución directa vs. teoría lineal |
| 3 | Reglas de propagación en suma/resta y producto/cociente |
| 4 | Cálculo de expresiones con sus cotas de error |
| 5 | Incidencia relativa de cada variable en el error |
| 6 | Cancelación catastrófica entre formas algebraicamente equivalentes |
| 7 | Error propagado en una integral tabulada (derivadas por diferencias finitas) |
| 8 | Tensión de rotura de una probeta de hormigón |
| ★ | Extra: logaritmo mal condicionado y su forma racionalizada |

Todos los resultados fueron verificados numéricamente, y los criterios de
redondeo siguen los de la cátedra: una cifra es **correcta** cuando el error no
supera media unidad de su orden, y el resultado se escribe reteniendo el dígito
del orden de la cota (el último es «medianamente significativo»).

## Estructura

```
index.html                             Cáscara, selector de unidad y un <script> por unidad
css/styles.css                         Estilos, temas claro/oscuro, tipografías del sistema
js/engine.js                           Motor reutilizable: render, KaTeX, corrección y puntaje
js/units/metodos-numericos-guia-1.js   Contenido de la Guía 1
js/units/_plantilla.js                 Molde para copiar al dar de alta una unidad
js/app.js                              Arranque: sólo llama a QUIZ.init({...})
vendor/katex/                          KaTeX 0.16.11 (MIT) para renderizar las fórmulas offline
```

El motor expone un único global, `window.QUIZ`, con `M` (`String.raw`), `units`,
`registerUnit(unidad)` e `init(config)`. Los ids de cada pregunta se namespacean
con el id de la unidad (`metodos-numericos-guia-1__q4a1`), así dos guías pueden
numerar sus preguntas igual sin pisarse.

## Agregar una unidad nueva

Son tres pasos, y el motor no se toca:

1. **Copiá** `js/units/_plantilla.js` a `js/units/<materia>-<guia>.js`.
2. **Cambiale el `id`** (tiene que ser único; es el namespace de la unidad), los
   datos de cabecera —`codigo`, `materia`, `unidad`, `facultad`— y reemplazá
   `problemas` por el contenido real.
3. **Sumá su `<script>`** en el bloque `UNIDADES` de `index.html`. El orden de
   esas líneas es el orden del selector.

```html
<!-- UNIDADES -->
<script src="js/units/metodos-numericos-guia-1.js"></script>
<script src="js/units/analisis-2-guia-3.js"></script>
```

La unidad se registra sola:

```js
(function () {
  'use strict';
  var M = QUIZ.M;

  QUIZ.registerUnit({
    id: 'analisis-2-guia-3',
    codigo: '61.03',
    materia: 'Análisis Matemático II',
    unidad: 'Guía 3 — Integrales',
    facultad: 'Facultad de Ingeniería — UBA',
    problemas: [
      {
        id: 'p1',
        titulo: 'Título del problema',
        enunciado: [
          { p: 'Texto con HTML y $\\LaTeX$ en línea.' },
          { math: M`\int_0^1 f(x)\,dx` },
          { ul: ['$x = 1 \\pm 0{,}1$'] },
          { table: { head: ['a', 'b'], rows: [['1', '2']] } },
          { note: 'Aclaración destacada.' }
        ],
        preguntas: [
          {
            id: 'q1_1', tag: '1.a', tipo: 'mc', correcta: 'A',
            enunciado: '¿Cuál es la expresión correcta?',
            opciones: [{ v: 'A', tex: M`x^2` }, { v: 'B', tex: M`x^3` }],
            desarrollo: [{ p: 'Por qué.' }]
          },
          {
            id: 'q1_2', tag: '1.b', tipo: 'num', respuesta: 3.14, tol: 0.01,
            enunciado: 'Valor de $y$', unidad: 'm', placeholder: '0,00'
          }
        ]
      }
    ]
  });
})();
```

### Detalles que conviene respetar

- **Todo dentro de la IIFE.** Los `<script>` son clásicos y comparten el scope
  léxico: dos unidades con `M` a nivel global tiran `Identifier 'M' has already
  been declared`.
- **Scripts clásicos, nunca `type="module"`.** El index se abre por `file://` con
  doble clic y los módulos ES no cargan ahí por CORS.
- **`M` (`String.raw`) para todo el LaTeX**: en un string común `\frac` es un
  salto de página y `\times` un tabulador. Las fórmulas en línea van entre `$…$`
  dentro de cualquier texto.
- **En opciones de opción múltiple usá `\frac`, no `\tfrac`**: el motor ya agrega
  `\displaystyle`, y `\tfrac` sale diminuto igual.
- Para las preguntas numéricas, `tol` es tolerancia absoluta y `reltol` es
  relativa (`0.3` = ±30 %, útil cuando la respuesta es del orden de 10⁻⁹). La
  entrada acepta coma o punto decimal y notación científica (`8,3e-9`).

## Licencia

KaTeX se distribuye bajo licencia MIT; su copia está en `vendor/katex/LICENSE`.

---
name: guia-a-examen-interactivo
description: Convierte una guía de ejercicios de una materia de ingeniería (carpeta «Materia - Unidad» con el PDF o imágenes) en una unidad nueva de mode_quizz, con corrección automática y fórmulas en KaTeX.
---

# Guía de ejercicios → unidad de mode_quizz

El usuario adjunta una carpeta `{materia} - {unidad}` con la guía (PDF, fotos de apuntes,
resoluciones de la cátedra) y quiere practicar con corrección automática ejercicio por
ejercicio.

**Este repo ya tiene el motor.** Dar de alta una unidad es escribir un archivo de contenido
y una línea en `index.html`. No se reescribe la interfaz, no se toca `js/engine.js`, no se
tocan los estilos.

```
js/engine.js                 motor: render, KaTeX, corrección, puntaje, selector   ← NO TOCAR
js/units/<slug>.js           contenido de cada unidad                              ← lo único que se escribe
js/units/_plantilla.js       molde para copiar
js/app.js                    arranque
index.html                   una línea <script> por unidad, en el bloque UNIDADES
css/styles.css               personalizado por el usuario                          ← NO TOCAR
vendor/katex/                KaTeX offline
```

## 1. Leer toda la carpeta, no sólo la guía

Las resoluciones de la cátedra, los apuntes y los ejercicios resueltos valen más que
cualquier convención de libro: fijan los criterios de redondeo, la notación y el formato de
respuesta que espera el profesor. Si hay un ejercicio resuelto, el examen tiene que hablar
ese idioma: cómo escriben las cotas, cuántas cifras retienen, cómo notan las derivadas
parciales.

## 2. Preguntar sólo lo que no se deduce

Con AskUserQuestion, una sola vez: si en la carpeta hay ejercicios resueltos que no están en
la guía, preguntar si los suma como práctica extra. El resto (estructura, offline, estilos)
ya está decidido por el repo.

## 3. Resolver y verificar TODO antes de escribir contenido

Es el paso que decide si la herramienta sirve o enseña mal. **Resolvé cada ejercicio y
verificá cada número con Python antes de escribir una línea de `js/units/`.** Un examen que
corrige con la clave equivocada es peor que no tener examen.

- Recalculá cada valor y cada cota; no confíes en la aritmética mental.
- Si el enunciado trae una tabla de resultados, reproducila de forma independiente
  (integración numérica, evaluación directa) para confirmar el punto de trabajo y descartar
  erratas.
- Controlá por dos caminos cuando se pueda: errores relativos y derivadas parciales tienen
  que dar lo mismo.
- Guardá el script de verificación: si después aparece una resolución de la cátedra que
  contradice algo, lo volvés a correr en segundos.

## 4. Criterios de redondeo (teoría de errores)

Acá se esconden las ambigüedades que hacen figurar como incorrecta una respuesta correcta:

- Una cifra es **correcta** si el error absoluto no supera **media unidad de su orden**.
- El valor se escribe hasta el orden de la **primera cifra significativa de la cota**; ese
  último dígito queda «medianamente significativo» y se retiene igual. El conteo de cifras
  correctas y la cantidad de dígitos escritos **no coinciden**: con `Δa = 0,3×10⁻⁵` y
  `a = 1,58976413794` se escribe `1,589764 ± 0,000003`, que tiene 6 cifras correctas más una
  medianamente significativa, no 7 correctas.
- Un dato «correctamente redondeado» tiene cota igual a media unidad de su último dígito:
  `x = 2,00 ⇒ Δx = 0,005`; `π ≈ 3,14 ⇒ Δπ = 0,005` (no el desvío real 0,0016).
- Las cotas se redondean **hacia arriba** a una cifra significativa.

Si un criterio admite dos lecturas, buscá primero un ejercicio resuelto de la cátedra en la
carpeta. Si no hay, **preguntá con AskUserQuestion** mostrando ambas respuestas y de dónde
sale cada una. No elijas por tu cuenta ni califiques con una convención discutible.

## 5. Traducir ejercicios a preguntas

| Tipo de ejercicio | Se convierte en |
|---|---|
| «Calcular X» con resultado numérico | input numérico con tolerancia |
| «Calcular X incluyendo su cota de error» | **dos** preguntas: valor y cota, por separado |
| «Demostrar que…» | opción múltiple sobre la regla o fórmula resultante |
| «Indicar cuál / comparar / ventajas y desventajas» | opción múltiple |
| «¿Es simétrico…?» y similares | opción múltiple de dos opciones |

Cada pregunta lleva un `desarrollo` con la resolución completa, que el motor despliega solo
al verificar: es lo que convierte la corrección en estudio.

Los distractores tienen que ser **errores plausibles**: olvidarse el factor 2 de una
variable al cuadrado, confundir error absoluto con relativo, usar la derivada sin valor
absoluto. Opciones absurdas no enseñan nada.

**Tolerancias**: `tol` absoluta para la mayoría; `reltol` (fracción, `0.3` = ±30 %) cuando
la respuesta es de orden 10⁻⁹ o el redondeo intermedio dispersa mucho. Calibrala para que
acepte tanto el valor completo como el redondeado a una cifra significativa (`Δ = 0,025`
tiene que aceptar también `0,03`).

## 6. Escribir la unidad

Copiar `js/units/_plantilla.js` a `js/units/<materia>-<unidad>.js`, cambiar el `id` (único),
los metadatos y los problemas. Después, una línea en el bloque UNIDADES de `index.html`:

```html
<script src="js/units/<materia>-<unidad>.js"></script>
```

Contrato del archivo de unidad:

```js
(function () {
  'use strict';
  var M = QUIZ.M;   // String.raw

  QUIZ.registerUnit({
    id: 'materia-unidad',
    codigo: '00.00',
    materia: 'Materia',
    unidad: 'Guía N — Tema',
    facultad: 'Facultad de Ingeniería — UBA',
    problemas: [{
      id: 'p1',
      titulo: 'Título',
      // extra: true,   → marca el problema con ★ en vez de número
      enunciado: [
        { p: 'Texto con HTML y $latex$ en línea.' },
        { math: M`A = \frac{\pi D^2}{4}` },
        { ul: ['$x = 1 \\pm 0{,}1$'] },
        { table: { head: ['a', 'b'], rows: [['1', '2']] } },
        { note: 'Aclaración destacada.' }
      ],
      preguntas: [
        { id: 'q1_1', tag: '1.a', tipo: 'mc', correcta: 'A',
          enunciado: '¿Cuál es la expresión correcta?',
          opciones: [{ v: 'A', tex: M`x^2` }, { v: 'B', html: 'Texto plano' }],
          desarrollo: [{ p: '...' }, { math: M`...` }] },
        { id: 'q1_2', tag: '1.b', tipo: 'num', respuesta: 3.14, tol: 0.01,
          enunciado: 'Valor de $y$', unidad: 'MPa', placeholder: '0,00',
          ayuda: 'Aclaración corta.', desarrollo: [...] }
      ]
    }]
  });
})();
```

Los ids de pregunta pueden repetirse entre unidades: el motor los namespacea con el `id` de
la unidad.

## 7. Trampas conocidas

Cada una costó una pasada de depuración:

- **La IIFE no es opcional.** En scripts clásicos el scope léxico es compartido: dos
  unidades con `const M` a nivel global tiran `Identifier 'M' has already been declared`.
- **`String.raw` para todo el LaTeX.** En un string común, `\frac` es un salto de página y
  `\times` un tabulador.
- **Nada de `type="module"`**: no cargan por `file://` y el index se abre con doble clic.
- **`\displaystyle` y `\frac`** (no `\tfrac`) en las opciones múltiples.
- **Coma decimal**: el motor ya usa `input type="text"` y parsea reemplazando coma por
  punto; escribí los `placeholder` con coma para ser consistente.

## 8. Probar antes de entregar

Con Playwright/Chromium, **por `file://` y por `http://`**, porque fallan por motivos
distintos:

- `.katex` en varios cientos y `.katex-error` en cero.
- Cero fallbacks a `<code>` (lo que deja el motor cuando KaTeX no está).
- `document.fonts.check('12px KaTeX_Math')` en `true`.
- Corrección: una respuesta correcta, una incorrecta, una opción múltiple y una en notación
  científica; verificar contador y badge por problema.
- Con más de una unidad: responder en una, cambiar, volver, y confirmar que el avance
  sobrevive.
- `scrollWidth <= innerWidth` a 390 px. Cero `pageerror` y cero `requestfailed`.

Mirá además una captura en claro y otra en oscuro: los errores de tamaño de fórmula no
aparecen en ningún assert.

## 9. Entregar

Si el shell local no puede montar la carpeta, `device_commit_files` con rutas absolutas
escribe igual (hasta 50 archivos por llamada).

Actualizá la tabla de unidades del `README.md`. Ofrecé publicar el resultado como artifact
si el usuario quiere abrirlo desde el celular o compartirlo con compañeros.

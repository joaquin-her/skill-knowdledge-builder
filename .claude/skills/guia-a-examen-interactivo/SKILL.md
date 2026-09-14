---
name: guia-a-examen-interactivo
description: Convierte una guía de ejercicios de una materia de ingeniería (carpeta «Materia - Unidad» con el PDF o imágenes) en una unidad nueva de mode_quizz (Next.js), con corrección automática y fórmulas en KaTeX.
---

# Guía de ejercicios → unidad de mode_quizz

El usuario adjunta una carpeta `{materia} - {unidad}` con la guía (PDF, fotos de apuntes,
resoluciones de la cátedra) y quiere practicar con corrección automática ejercicio por
ejercicio.

**Este repo ya tiene el motor.** Dar de alta una unidad es escribir un archivo de contenido
y una línea de registro. No se reescribe la interfaz, no se toca el motor, no se tocan los
estilos.

```
src/components/               motor: render de bloques, preguntas, corrección, puntaje  ← NO TOCAR
src/lib/                      tex.ts (M, KaTeX), progress.ts, avance.ts, useProgreso.ts  ← NO TOCAR
src/styles/styles.css         estilos, temas claro/oscuro                                ← NO TOCAR
src/types/quiz.ts             contrato de tipos: forma de una Unidad                     ← referencia, no tocar
src/data/units/<slug>.ts      contenido de cada unidad                                   ← lo único que se escribe
src/data/units/_plantilla.ts  molde para copiar
src/data/units/index.ts       array UNIDADES: una línea de registro por unidad
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
verificá cada número con Python antes de escribir una línea de `src/data/units/`.** Un
examen que corrige con la clave equivocada es peor que no tener examen.

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
| «Calcular X» con resultado numérico | pregunta `num`: input numérico con tolerancia |
| «Calcular X incluyendo su cota de error» | **dos** preguntas `num`: valor y cota, por separado |
| «Demostrar que…» | pregunta `mc` sobre la regla o fórmula resultante |
| «Indicar cuál / comparar / ventajas y desventajas» | pregunta `mc` |
| «¿Es simétrico…?» y similares | pregunta `mc` de dos opciones |

Cada pregunta lleva un `desarrollo` (array de `Bloque[]`) con la resolución completa, que el
motor despliega solo al verificar: es lo que convierte la corrección en estudio.

Los distractores tienen que ser **errores plausibles**: olvidarse el factor 2 de una
variable al cuadrado, confundir error absoluto con relativo, usar la derivada sin valor
absoluto. Opciones absurdas no enseñan nada.

**Tolerancias**: `tol` es tolerancia **absoluta**, para la mayoría de los casos; `reltol` es
**relativa** (fracción, `0.3` = ±30 %) y tiene prioridad sobre `tol` cuando la respuesta es
de orden 10⁻⁹ o el redondeo intermedio dispersa mucho. Calibrala para que acepte tanto el
valor completo como el redondeado a una cifra significativa (`Δ = 0,025` tiene que aceptar
también `0,03`). La entrada de una pregunta `num` acepta coma decimal y notación científica.

## 6. Escribir la unidad

Copiar `src/data/units/_plantilla.ts` a `src/data/units/<materia>-<unidad>.ts`. El archivo
exporta un objeto que cumple el tipo `Unidad` de `src/types/quiz.ts`:

```ts
import { M } from '@/lib/tex';
import type { Unidad } from '@/types/quiz';

export const unidad: Unidad = {
  id: 'materia-unidad',       // único en todo el sitio: namespace de preguntas y slug de URL
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
      { note: 'Aclaración destacada.' },
    ],
    preguntas: [
      {
        id: 'q1_1', tag: '1.a', tipo: 'mc', correcta: 'A',
        enunciado: '¿Cuál es la expresión correcta?',
        opciones: [{ v: 'A', tex: M`x^2` }, { v: 'B', html: 'Texto plano' }],
        desarrollo: [{ p: '...' }, { math: M`...` }],
      },
      {
        id: 'q1_2', tag: '1.b', tipo: 'num', respuesta: 3.14, tol: 0.01,
        enunciado: 'Valor de $y$', unidad: 'MPa', placeholder: '0,00',
        ayuda: 'Aclaración corta.', desarrollo: [/* ... */],
      },
    ],
  }],
};
```

Cambiá el `id` (único), los metadatos y los `problemas`. `M` es `String.raw`, importado
desde `@/lib/tex` (el alias `@/*` apunta a `src/*`).

Después, registrala en el array `UNIDADES` de `src/data/units/index.ts`:

```ts
import { unidad as metodosNumericosGuia1 } from './metodos-numericos-guia-1';
import { unidad as materiaUnidad } from './materia-unidad';

export const UNIDADES: Unidad[] = [
  metodosNumericosGuia1,
  materiaUnidad,
];
```

El orden del array es el orden del selector. Los ids de pregunta pueden repetirse entre
unidades: el motor los namespacea con el `id` de la unidad.

## 7. Trampas conocidas

Cada una costó una pasada de depuración:

- **`M` (String.raw) para todo el LaTeX.** En un string común, `\frac` es un salto de página
  y `\times` un tabulador. Nunca escribas una fórmula entre comillas normales.
- **`\displaystyle` y `\frac`** (no `\tfrac`) en las opciones múltiples.
- **`tol` es absoluta, `reltol` es relativa** (fracción, no porcentaje) y tiene prioridad
  sobre `tol` si se especifican ambas.
- **Coma decimal**: la entrada numérica parsea reemplazando coma por punto y acepta
  notación científica; escribí los `placeholder` con coma para ser consistente.
- **El tipo `Unidad` es la frontera real.** Si un campo no cumple el contrato de
  `src/types/quiz.ts` (por ejemplo un bloque con dos claves, o una pregunta `mc` sin
  `correcta`), TypeScript tiene que rechazarlo en build, no en el navegador del alumno.

## 8. Verificar antes de entregar

Primero el contrato de tipos, después el comportamiento:

- `npx tsc --noEmit` tiene que pasar sin errores. El contrato de `quiz.ts` atrapa acá
  errores que antes explotaban recién en el navegador (bloque mal formado, tipo de pregunta
  incompleto, `id` repetido detectado más tarde).
- `npm run dev` y mirar la unidad nueva en el navegador (`http://localhost:3000`).
- Con Playwright/Chromium sobre el server de desarrollo:
  - `.katex` en varios cientos (o la cantidad esperable) y `.katex-error` en cero.
  - Cero fallbacks a `<code>` (lo que deja `tex()` en `src/lib/tex.ts` cuando KaTeX falla).
  - Corrección: una respuesta correcta, una incorrecta, una opción múltiple y una en
    notación científica; verificar contador y badge por problema.
  - Con más de una unidad: responder en una, cambiar de unidad, volver, y confirmar que el
    avance sobrevive (lo persiste `useProgreso.ts`).
  - `scrollWidth <= innerWidth` a 390 px. Cero `pageerror` y cero `requestfailed`.
- Antes de dar la unidad por lista, `npm run build` tiene que completar el export estático
  sin errores (es lo que se publica en GitHub Pages).

Mirá además una captura en claro y otra en oscuro: los errores de tamaño de fórmula no
aparecen en ningún assert.

## 9. Entregar

Si el shell local no puede montar la carpeta, `device_commit_files` con rutas absolutas
escribe igual (hasta 50 archivos por llamada).

Actualizá la tabla de unidades del `README.md`. Ofrecé publicar el resultado como artifact
si el usuario quiere abrirlo desde el celular o compartirlo con compañeros.

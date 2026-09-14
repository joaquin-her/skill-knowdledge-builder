/* ============================================================================
   Unidad — 95.13 Métodos Matemáticos y Numéricos (FIUBA), Guía 1: Errores
   ----------------------------------------------------------------------------
   Contenido puro: el motor vive en src/components / src/lib. Para dar de alta
   otra unidad, copiá src/data/units/_plantilla.ts — no hace falta tocar el motor.
   ========================================================================== */

import type { Unidad } from '@/types/quiz';
import { M } from '@/lib/tex';

export const unidad: Unidad = {
  id: 'metodos-numericos-guia-1',
  codigo: '95.13',
  materia: 'Métodos Numéricos',
  unidad: 'Guía 1 — Errores',
  facultad: 'Facultad de Ingeniería — UBA',

  problemas: [
    /* ===================== PROBLEMA 1 ===================== */
    {
      id: 'p1',
      titulo: 'Cifras significativas',
      enunciado: [
        { p: 'Exprese correctamente el siguiente resultado e indique la cantidad de dígitos significativos que tiene:' },
        { math: M`a = 1{,}58976413794 \qquad \Delta a = 0{,}3 \times 10^{-5}` }
      ],
      preguntas: [
        {
          id: 'q1_1', tag: '1.a', tipo: 'mc', correcta: 'A',
          enunciado: '¿Cómo se expresa correctamente el valor de $a$?',
          opciones: [
            { v: 'A', tex: M`a = 1{,}589764 \pm 0{,}000003` },
            { v: 'B', tex: M`a = 1{,}5898 \pm 0{,}000003` },
            { v: 'C', tex: M`a = 1{,}58976413794 \pm 0{,}000003` },
            { v: 'D', tex: M`a = 1{,}58976 \pm 0{,}000003` }
          ],
          desarrollo: [
            { p: M`El error absoluto $\Delta a = 0{,}3\times 10^{-5} = 0{,}000003$ tiene su primera cifra significativa en el 6.º decimal. Esa posición marca la última cifra que se retiene en el valor de $a$: se redondea ahí.` },
            { math: M`1{,}589764\,\big|\,13794 \;\longrightarrow\; 1{,}589764` },
            { p: 'El dígito siguiente es 1, así que no se redondea hacia arriba.' },
            { p: M`Es el mismo formato del Ejercicio 5 resuelto de la cátedra: con $\Delta y = 0{,}3\times 10^{-4}$ se escribe $y = -4{,}09407 \pm 0{,}00003$, reteniendo el dígito del orden de la cota aunque ese último no sea del todo confiable.` }
          ]
        },
        {
          id: 'q1_2', tag: '1.b', tipo: 'num', respuesta: 6, tol: 0.4,
          enunciado: '¿Cuántas cifras significativas <em>correctas</em> tiene el resultado?',
          ayuda: 'Criterio de media unidad; el último dígito retenido es sólo «medianamente significativo».',
          placeholder: '0',
          desarrollo: [
            { p: M`Una cifra es correcta si $\Delta a$ no supera media unidad de su orden:` },
            { math: M`\begin{aligned}
              \text{5.º decimal:}\quad & \tfrac{1}{2}\times 10^{-5} = 0{,}000005 \;\ge\; \Delta a = 0{,}000003 && \checkmark \\[2pt]
              \text{6.º decimal:}\quad & \tfrac{1}{2}\times 10^{-6} = 0{,}0000005 \;<\; \Delta a = 0{,}000003 && \times
            \end{aligned}` },
            { p: 'Entonces hay <strong>5 decimales significativos y uno medianamente significativo</strong>. Contando la parte entera:' },
            { math: M`\underbrace{1{,}58976}_{6\ \text{cifras correctas}}\,\underbrace{4}_{\text{med. signif.}}` },
            { p: M`Mismo razonamiento del Ejercicio 5 de la cátedra: allí $\Delta y = 0{,}3\times 10^{-4}$ da «4 decimales significativos y uno medianamente significativo», y aun así el resultado se escribe con 5 decimales.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 2 ===================== */
    {
      id: 'p2',
      titulo: 'Área de un círculo',
      enunciado: [
        { p: M`Dado un círculo de diámetro $D$, se toman varias mediciones con calibre $D_1, D_2, \dots, D_n$, obteniéndose un diámetro muestral $D_m$ y una incertidumbre $\Delta D$ (error absoluto). El área es:` },
        { math: M`A = \frac{\pi D^2}{4}` },
        { p: '<strong>a)</strong> Dar la expresión del error absoluto del área por sustitución directa. ¿Es simétrico el intervalo?<br><strong>b)</strong> Dar la expresión aplicando teoría lineal de errores y comparar con a).<br><strong>c)</strong> Agregar la incertidumbre de aproximar $\\pi$ por 3,14 a la expresión de b).' }
      ],
      preguntas: [
        {
          id: 'q2_1', tag: '2.a', tipo: 'mc', correcta: 'A',
          enunciado: M`Evaluando $A$ en los valores extremos $D_m \pm \Delta D$, la cota de error del área es:`,
          opciones: [
            { v: 'A', tex: M`\Delta A_+ = \frac{\pi}{4}\left(2D_m\Delta D + \Delta D^2\right) \;;\quad \Delta A_- = \frac{\pi}{4}\left(2D_m\Delta D - \Delta D^2\right)` },
            { v: 'B', tex: M`\Delta A = \frac{\pi D_m}{2}\,\Delta D \quad \text{(igual para ambos lados)}` },
            { v: 'C', tex: M`\Delta A = \pi D_m \Delta D` },
            { v: 'D', tex: M`\Delta A = \frac{\pi}{4}\,\Delta D^2` }
          ],
          desarrollo: [
            { p: M`Se sustituye directamente $D = D_m \pm \Delta D$ en el área y se desarrolla el binomio:` },
            { math: M`A_m \pm \Delta A = \frac{\pi\left(D_m \pm \Delta D\right)^2}{4} = \frac{\pi\left(D_m^2 \pm 2D_m\Delta D + \Delta D^2\right)}{4}, \qquad A_m = \frac{\pi D_m^2}{4}` },
            { p: 'Restando $A_m$ queda la forma compacta que usa la cátedra, con el $\\pm$ afectando sólo al término lineal:' },
            { math: M`\boxed{\;\Delta A = \pm\,\frac{\pi D_m \Delta D}{2} + \frac{\pi \Delta D^2}{4}\;}` },
            { p: 'Separando las dos ramas se ve la asimetría con más claridad:' },
            { math: M`\begin{aligned}
              \Delta A_+ &= \frac{\pi D_m \Delta D}{2} + \frac{\pi \Delta D^2}{4} = \frac{\pi}{4}\left(2D_m\Delta D + \Delta D^2\right) \\[4pt]
              \Delta A_- &= \frac{\pi D_m \Delta D}{2} - \frac{\pi \Delta D^2}{4} = \frac{\pi}{4}\left(2D_m\Delta D - \Delta D^2\right)
            \end{aligned}` }
          ]
        },
        {
          id: 'q2_2', tag: '2.a', tipo: 'mc', correcta: 'B',
          enunciado: '¿Es simétrico el intervalo obtenido?',
          opciones: [
            { v: 'A', html: 'Sí, es simétrico' },
            { v: 'B', html: 'No, es asimétrico (el error hacia arriba es mayor que hacia abajo)' }
          ],
          desarrollo: [
            { p: M`$\Delta A_+$ y $\Delta A_-$ difieren en el término $\Delta D^2$ (se suma en un caso, se resta en el otro), por lo tanto $\Delta A_+ > \Delta A_-$: el intervalo real no es simétrico respecto de $A(D_m)$.` }
          ]
        },
        {
          id: 'q2_3', tag: '2.b', tipo: 'mc', correcta: 'A',
          enunciado: 'Aplicando teoría lineal de errores, la cota del área es:',
          opciones: [
            { v: 'A', tex: M`\Delta A = \frac{\pi D_m}{2}\,\Delta D` },
            { v: 'B', tex: M`\Delta A = \pi D_m \Delta D` },
            { v: 'C', tex: M`\Delta A = \frac{\pi}{4}\,\Delta D^2` },
            { v: 'D', tex: M`\Delta A = \frac{\pi}{2}\,\Delta D` }
          ],
          desarrollo: [
            { p: M`La teoría lineal reemplaza la curva $A(D)$ por su recta tangente en el punto representativo $D = D_m$, así que el error se propaga por la pendiente:` },
            { math: M`\Delta A \approx \Delta D \cdot \tan\theta = \Delta D \cdot \left.\frac{\partial A}{\partial D}\right|_{D=D_m} = \Delta D \cdot \left.\frac{\pi D}{2}\right|_{D=D_m} = \frac{\pi D_m}{2}\,\Delta D` },
            { p: '<strong>Comparación con a):</strong> es exactamente el término lineal de a); se descarta el $\\Delta D^2$ y cualquier término de orden superior. Por eso la teoría lineal siempre devuelve un intervalo simétrico, mientras que la sustitución directa conserva la asimetría real.' },
            { p: '<em>Ventaja:</em> más simple y se generaliza a varias variables sumando derivadas parciales. <em>Desventaja:</em> es aproximada y pierde precisión cuando $\\Delta D$ no es chico frente a $D_m$; el resultado de a) es la cota exacta aunque más laboriosa.' }
          ]
        },
        {
          id: 'q2_4', tag: '2.c', tipo: 'mc', correcta: 'A',
          enunciado: M`Agregando la incertidumbre de aproximar $\pi$ por 3,14 (es decir $\pi = \pi_m \pm \Delta\pi$, con $\pi_m = 3{,}14$ y $\Delta\pi = 0{,}005$), la expresión queda:`,
          opciones: [
            { v: 'A', tex: M`\Delta A = \frac{D^2}{4}\,\Delta\pi + \frac{\pi D}{2}\,\Delta D` },
            { v: 'B', tex: M`\Delta A = \frac{\pi D}{2}\,\Delta D + \Delta\pi` },
            { v: 'C', tex: M`\Delta A = \frac{D^2}{4}\,\Delta\pi` },
            { v: 'D', tex: M`\Delta A = \frac{\pi}{4}\left(\Delta D + \Delta\pi\right)` }
          ],
          desarrollo: [
            { p: M`Ahora $\pi$ deja de ser una constante exacta y pasa a ser una variable más con error, así que $A = A(\pi, D)$:` },
            { math: M`\Delta A \approx \left|\left.\frac{\partial A}{\partial D}\right|_{\substack{D=D_m \\ \pi=\pi_m}}\right|\Delta D + \left|\left.\frac{\partial A}{\partial \pi}\right|_{\substack{D=D_m \\ \pi=\pi_m}}\right|\Delta \pi = \left|\frac{\pi_m D_m}{2}\right|\Delta D + \left|\frac{D_m^2}{4}\right|\Delta\pi` },
            { p: 'Los módulos están para contemplar el peor caso posible: se suman los aportes en lugar de dejar que se resten entre sí.' },
            { p: M`El valor $\Delta\pi = 0{,}005$ sale de que 3,14 está correctamente redondeado: media unidad del último dígito retenido. Es una cota, más holgada que el desvío real $|\pi - 3{,}14| = 0{,}00159\dots$` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 3 ===================== */
    {
      id: 'p3',
      titulo: 'Reglas de propagación',
      enunciado: [
        { p: 'Mediante la teoría lineal de errores, demostrar que:' },
        { p: '<strong>a)</strong> En una suma o resta de dos variables, los errores absolutos se suman.<br><strong>b)</strong> En un producto o división de dos variables, los errores relativos se suman.' }
      ],
      preguntas: [
        {
          id: 'q3_1', tag: '3.a', tipo: 'mc', correcta: 'A',
          enunciado: M`Para $g = u \pm v$, el error del resultado es:`,
          opciones: [
            { v: 'A', tex: M`\Delta g = \Delta u + \Delta v` },
            { v: 'B', tex: M`\frac{\Delta g}{g} = \frac{\Delta u}{u} + \frac{\Delta v}{v}` },
            { v: 'C', tex: M`\Delta g = \max(\Delta u, \Delta v)` },
            { v: 'D', tex: M`\Delta g = \frac{\Delta u + \Delta v}{2}` }
          ],
          desarrollo: [
            { math: M`g = u \pm v \;\Rightarrow\; \frac{\partial g}{\partial u} = 1,\quad \frac{\partial g}{\partial v} = \pm 1` },
            { math: M`\Delta g = \left|\frac{\partial g}{\partial u}\right|\Delta u + \left|\frac{\partial g}{\partial v}\right|\Delta v = \Delta u + \Delta v` },
            { p: 'Los errores absolutos se suman siempre, sea suma o resta: las derivadas entran en valor absoluto y el peor caso es que los errores se acumulen.' }
          ]
        },
        {
          id: 'q3_2', tag: '3.b', tipo: 'mc', correcta: 'B',
          enunciado: M`Para $g = u\,v$ (o $g = u/v$), el error del resultado es:`,
          opciones: [
            { v: 'A', tex: M`\Delta g = \Delta u + \Delta v` },
            { v: 'B', tex: M`\frac{\Delta g}{g} = \frac{\Delta u}{u} + \frac{\Delta v}{v}` },
            { v: 'C', tex: M`\frac{\Delta g}{g} = \frac{\Delta u}{u}\cdot\frac{\Delta v}{v}` },
            { v: 'D', tex: M`\frac{\Delta g}{g} = \frac{\Delta u}{u}` }
          ],
          desarrollo: [
            { p: M`Para $g = uv$ se tiene $\partial g/\partial u = v$ y $\partial g/\partial v = u$, entonces:` },
            { math: M`\Delta g = |v|\,\Delta u + |u|\,\Delta v \;\Longrightarrow\; \frac{\Delta g}{g} = \frac{\Delta u}{u} + \frac{\Delta v}{v}` },
            { p: M`Equivale a derivar $\ln g = \ln u \pm \ln v$. En un producto o cociente se suman los errores <em>relativos</em>.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 4 ===================== */
    {
      id: 'p4',
      titulo: 'Cálculo con cotas de error',
      enunciado: [
        { p: M`Calcular las siguientes expresiones, incluyendo sus cotas de error absoluto, donde $x = 2{,}00$, $y = 3{,}00$ y $z = 4{,}00$ (valores correctamente redondeados, por lo que $\Delta x = \Delta y = \Delta z = 0{,}005$):` },
        { math: M`\textbf{a)}\quad 3x + y - z \qquad\qquad \textbf{b)}\quad x\,\operatorname{sen}\!\left(\frac{y}{40}\right)` }
      ],
      preguntas: [
        {
          id: 'q4a1', tag: '4.a', tipo: 'num', respuesta: 5.00, tol: 0.02,
          enunciado: M`Valor de $3x + y - z$`, placeholder: '0,00'
        },
        {
          id: 'q4a2', tag: '4.a', tipo: 'num', respuesta: 0.025, tol: 0.006,
          enunciado: M`Cota de error absoluto $\Delta(3x + y - z)$`, placeholder: '0,000',
          desarrollo: [
            { math: M`\begin{aligned}
              3x+y-z &= 3(2{,}00)+3{,}00-4{,}00 = 5{,}00 \\[4pt]
              \Delta(3x+y-z) &= 3\Delta x + \Delta y + \Delta z = 3(0{,}005)+0{,}005+0{,}005 = 0{,}025
            \end{aligned}` },
            { p: 'Resultado: <strong>$5{,}00 \\pm 0{,}03$</strong>, con la cota redondeada hacia arriba a una cifra significativa.' }
          ]
        },
        {
          id: 'q4b1', tag: '4.b', tipo: 'num', respuesta: 0.1499, tol: 0.0006,
          enunciado: M`Valor de $x\,\operatorname{sen}(y/40)$`, ayuda: 'El argumento va en radianes.', placeholder: '0,0000'
        },
        {
          id: 'q4b2', tag: '4.b', tipo: 'num', respuesta: 0.00062, tol: 0.0002,
          enunciado: M`Cota de error absoluto $\Delta\!\left[x\,\operatorname{sen}(y/40)\right]$`, placeholder: '0,00000',
          desarrollo: [
            { math: M`\frac{y}{40} = 0{,}075\ \text{rad} \;\Rightarrow\; \operatorname{sen}(0{,}075) = 0{,}074930,\quad \cos(0{,}075) = 0{,}997189` },
            { math: M`g = x\,\operatorname{sen}(y/40) = 2{,}00 \times 0{,}074930 = 0{,}149859` },
            { math: M`\begin{aligned}
              \frac{\partial g}{\partial x} &= \operatorname{sen}\!\left(\frac{y}{40}\right) = 0{,}074930 \\[4pt]
              \frac{\partial g}{\partial y} &= \frac{x}{40}\cos\!\left(\frac{y}{40}\right) = 0{,}049859 \\[6pt]
              \Delta g &= 0{,}074930\,(0{,}005) + 0{,}049859\,(0{,}005) \approx 0{,}00062
            \end{aligned}` },
            { p: 'Resultado: <strong>$0{,}1499 \\pm 0{,}0006$</strong>.' }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 5 ===================== */
    {
      id: 'p5',
      titulo: 'Incidencia relativa del error',
      enunciado: [
        { p: 'Calcular la siguiente expresión, incluyendo su cota de error absoluto, e indicar qué variable tiene mayor incidencia en el error de $w$:' },
        { math: M`w = \frac{x\,y^2}{z}` },
        { ul: ['$x = 2{,}0 \\pm 0{,}1$', '$y = 3{,}0 \\pm 0{,}2$', '$z = 1{,}0 \\pm 0{,}1$'] }
      ],
      preguntas: [
        { id: 'q5_1', tag: '5', tipo: 'num', respuesta: 18, tol: 0.3, enunciado: M`Valor de $w$`, placeholder: '0,0' },
        {
          id: 'q5_2', tag: '5', tipo: 'num', respuesta: 5.1, tol: 0.7,
          enunciado: M`Cota de error absoluto $\Delta w$`, placeholder: '0,0',
          desarrollo: [
            { p: 'Producto y cociente: conviene trabajar con errores relativos, recordando que $y^2$ aporta el doble.' },
            { math: M`w = \frac{(2{,}0)(3{,}0)^2}{1{,}0} = 18{,}0` },
            { math: M`\frac{\Delta w}{w} = \frac{\Delta x}{x} + 2\,\frac{\Delta y}{y} + \frac{\Delta z}{z} = 0{,}05 + 2(0{,}0667) + 0{,}10 = 0{,}283` },
            { math: M`\Delta w = 18{,}0 \times 0{,}283 \approx 5{,}1` },
            { p: 'Resultado: <strong>$w = 18 \\pm 5$</strong>.' }
          ]
        },
        {
          id: 'q5_3', tag: '5', tipo: 'mc', correcta: 'B',
          enunciado: M`¿Qué variable tiene mayor incidencia en el error de $w$?`,
          opciones: [
            { v: 'A', tex: M`x` }, { v: 'B', tex: M`y` }, { v: 'C', tex: M`z` },
            { v: 'D', html: 'Las tres inciden por igual' }
          ],
          desarrollo: [
            { p: 'Contribución absoluta de cada variable a $\\Delta w$:' },
            { math: M`\begin{aligned}
              x &\rightarrow \left|\frac{y^2}{z}\right|\Delta x = 9{,}0 \times 0{,}1 = 0{,}9 \\[3pt]
              y &\rightarrow \left|\frac{2xy}{z}\right|\Delta y = 12{,}0 \times 0{,}2 = 2{,}4 \quad \leftarrow \text{mayor aporte} \\[3pt]
              z &\rightarrow \left|\frac{xy^2}{z^2}\right|\Delta z = 18{,}0 \times 0{,}1 = 1{,}8
            \end{aligned}` },
            { p: '<strong>$y$</strong> es la variable con mayor incidencia: además de tener el mayor error relativo, aparece elevada al cuadrado, lo que duplica su peso.' }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 6 ===================== */
    {
      id: 'p6',
      titulo: 'Cancelación catastrófica',
      enunciado: [
        { p: 'Se tienen las siguientes expresiones algebraicamente equivalentes:' },
        { math: M`\begin{array}{lll}
          \text{i)}\ \ f = \left(\sqrt{2}-1\right)^6 & \text{ii)}\ \ f = \dfrac{1}{\left(\sqrt{2}+1\right)^6} & \text{iii)}\ \ f = \left(3-2\sqrt{2}\right)^3 \\[10pt]
          \text{iv)}\ \ f = \dfrac{1}{\left(3+2\sqrt{2}\right)^3} & \text{v)}\ \ f = 99-70\sqrt{2} & \text{vi)}\ \ f = \dfrac{1}{99+70\sqrt{2}}
        \end{array}` },
        { p: '<strong>a)</strong> Demostrar que son algebraicamente equivalentes.<br><strong>b)</strong> Usando el valor aproximado 1,4 para $\\sqrt{2}$, indicar qué alternativa da el mejor resultado.' },
        { note: M`<strong>a)</strong> Partiendo de $\left(\sqrt{2}-1\right)\left(\sqrt{2}+1\right) = 1$, se reescribe cada forma multiplicando numerador y denominador por el conjugado. Las seis representan el mismo número real $\approx 0{,}00505063$.` }
      ],
      preguntas: [
        {
          id: 'q6_2', tag: '6.b', tipo: 'mc', correcta: 'D',
          enunciado: M`Usando $\sqrt{2} \approx 1{,}4$, ¿qué alternativa da el resultado más preciso?`,
          opciones: [
            { v: 'A', tex: M`\text{i)}\quad f = \left(\sqrt{2}-1\right)^6` },
            { v: 'B', tex: M`\text{v)}\quad f = 99-70\sqrt{2}` },
            { v: 'C', tex: M`\text{iv)}\quad f = \dfrac{1}{\left(3+2\sqrt{2}\right)^3}` },
            { v: 'D', tex: M`\text{vi)}\quad f = \dfrac{1}{99+70\sqrt{2}}` }
          ],
          desarrollo: [
            { p: M`Valor exacto: $f \approx 0{,}00505063$. Con $\sqrt{2}\approx 1{,}4$ (error de redondeo $\approx 0{,}0142$ en la raíz):` },
            { table: {
              head: ['Expresión', 'Resultado', 'Error relativo'],
              rows: [
                ['v)  $99-70(1{,}4) = 1$', '1,00000000', '19699 %'],
                ['iii) $(3-2\\cdot 1{,}4)^3 = 0{,}2^3$', '0,00800000', '58,4 %'],
                ['i)  $(1{,}4-1)^6 = 0{,}4^6$', '0,00409600', '18,9 %'],
                ['ii) $1/(1{,}4+1)^6$', '0,00523278', '3,61 %'],
                ['iv) $1/(3+2\\cdot 1{,}4)^3$', '0,00512526', '1,48 %'],
                ['vi) $1/(99+70\\cdot 1{,}4)$', '0,00507614', '0,51 %']
              ]
            } },
            { p: 'Las formas con <em>resta</em> de números grandes y casi iguales (v, y las equivalentes i y iii) sufren cancelación catastrófica: se pierden las cifras significativas y el error de redondear $\\sqrt{2}$ se amplifica brutalmente. Las que tienen <em>suma</em> en el denominador evitan esa resta, y la mejor es <strong>vi)</strong>.' }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 7 ===================== */
    {
      id: 'p7',
      titulo: 'Error propagado en una integral tabulada',
      enunciado: [
        { p: 'Se dispone de un algoritmo para computar la siguiente integral:' },
        { math: M`I(a,b) = \int_0^1 \frac{e^{-bx}}{a+x^2}\,dx` },
        { p: 'Utilizando dicho algoritmo se obtuvo la siguiente tabla de resultados:' },
        { table: {
          head: ['$a$', '$b$', '$I$'],
          rows: [
            ['0,39', '0,34', '1,425032'],
            ['0,40', '0,32', '1,408845'],
            ['0,40', '0,34', '1,398464'],
            ['0,40', '0,36', '1,388198'],
            ['0,41', '0,34', '1,372950']
          ]
        } },
        { p: M`Luego se midieron las cantidades físicas $z$ e $y$, obteniéndose $z = 0{,}400 \pm 0{,}003$ (en el rol de $a$) e $y = 0{,}340 \pm 0{,}005$ (en el rol de $b$). Estimar el error en $I(z,y)$ y expresar el resultado final.` }
      ],
      preguntas: [
        { id: 'q7_1', tag: '7', tipo: 'num', respuesta: 1.398, tol: 0.003, enunciado: M`Valor de $I(z,y)$`, placeholder: '0,000' },
        {
          id: 'q7_2', tag: '7', tipo: 'num', respuesta: 0.0104, tol: 0.004,
          enunciado: M`Cota de error absoluto $\Delta I$`, placeholder: '0,000',
          desarrollo: [
            { p: 'No hay fórmula cerrada, así que las derivadas parciales se estiman por diferencias finitas centradas con los puntos de la tabla que rodean a (0,40 ; 0,34):' },
            { math: M`\begin{aligned}
              \frac{\partial I}{\partial a} &\approx \frac{I(0{,}41;0{,}34) - I(0{,}39;0{,}34)}{0{,}02} = \frac{1{,}372950 - 1{,}425032}{0{,}02} \approx -2{,}604 \\[6pt]
              \frac{\partial I}{\partial b} &\approx \frac{I(0{,}40;0{,}36) - I(0{,}40;0{,}32)}{0{,}04} = \frac{1{,}388198 - 1{,}408845}{0{,}04} \approx -0{,}516
            \end{aligned}` },
            { math: M`\Delta I = \left|\frac{\partial I}{\partial a}\right|\Delta z + \left|\frac{\partial I}{\partial b}\right|\Delta y = 2{,}604\,(0{,}003) + 0{,}516\,(0{,}005) \approx 0{,}0104` },
            { p: 'Resultado: <strong>$I(z,y) = 1{,}398 \\pm 0{,}010$</strong>.' }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 8 ===================== */
    {
      id: 'p8',
      titulo: 'Tensión de rotura de una probeta',
      enunciado: [
        { p: 'La tensión de rotura a compresión de una probeta de hormigón se determina con:' },
        { math: M`f = \frac{4F}{\pi D^2}` },
        { p: M`siendo $F$ la fuerza que aplica la máquina y $D$ el diámetro de la probeta:` },
        { ul: [
          '$F = 0{,}715\\ \\text{MN}$, con error absoluto máximo $\\Delta F = 0{,}003\\ \\text{MN}$',
          '$D = 0{,}15\\ \\text{m}$, con error relativo porcentual del 2,5 %',
          '$\\pi = 3{,}1416 \\pm 0{,}00005$'
        ] },
        { p: '<strong>a)</strong> Calcular la tensión de rotura con su error absoluto, y expresarla con sus unidades.<br><strong>b)</strong> Calcular el error relativo porcentual de la tensión de rotura.' }
      ],
      preguntas: [
        { id: 'q8a1', tag: '8.a', tipo: 'num', respuesta: 40.46, tol: 1.2, enunciado: M`Valor de $f$`, unidad: 'MPa = MN/m²', placeholder: '0,00' },
        {
          id: 'q8a2', tag: '8.a', tipo: 'num', respuesta: 2.19, tol: 0.5,
          enunciado: M`Cota de error absoluto $\Delta f$`, unidad: 'MPa', placeholder: '0,00',
          desarrollo: [
            { math: M`f = \frac{4F}{\pi D^2} = \frac{4(0{,}715)}{3{,}1416 \times 0{,}15^2} = \frac{2{,}86}{0{,}070686} \approx 40{,}46\ \text{MPa}` },
            { math: M`\begin{aligned}
              \frac{\Delta f}{f} &= \frac{\Delta F}{F} + \frac{\Delta \pi}{\pi} + 2\,\frac{\Delta D}{D} \\[4pt]
              &= \frac{0{,}003}{0{,}715} + \frac{0{,}00005}{3{,}1416} + 2(0{,}025) \\[4pt]
              &= 0{,}0042 + 0{,}00002 + 0{,}05 = 0{,}0542
            \end{aligned}` },
            { math: M`\Delta f = 40{,}46 \times 0{,}0542 \approx 2{,}19\ \text{MPa}` },
            { p: 'Resultado: <strong>$f = (40{,}46 \\pm 2{,}19)\\ \\text{MPa}$</strong>, que expresado correctamente (cota a una cifra significativa y valor llevado a ese orden) queda <strong>$f = (40 \\pm 2)\\ \\text{MPa}$</strong>.' },
            { p: 'El término dominante es $2\\,\\Delta D/D$: el error del diámetro pesa el doble por estar al cuadrado, y se lleva casi todo el error final.' }
          ]
        },
        {
          id: 'q8b', tag: '8.b', tipo: 'num', respuesta: 5.42, tol: 0.6,
          enunciado: 'Error relativo porcentual de $f$', unidad: '%', placeholder: '0,0'
        }
      ]
    },

    /* ============ EJERCICIO EXTRA (resuelto en clase) ============ */
    {
      id: 'p9',
      extra: true,
      titulo: 'Logaritmo mal condicionado',
      enunciado: [
        { p: '<strong>Ejercicio extra de la cátedra.</strong> Se tiene la expresión:' },
        { math: M`y = \ln\left(x - \sqrt{x^2-1}\right)` },
        { p: M`<strong>a)</strong> Calcular $y$ para $x = 30$, incluyendo su error absoluto. Suponer que la raíz cuadrada se conoce con 6 decimales correctos y que el error en $x$ es despreciable.<br><strong>b)</strong> Obtener una expresión matemáticamente equivalente, pero mejor condicionada desde el punto de vista numérico, y recalcular el resultado con el nuevo error.` },
        { ul: [
          '$x = 30$, con $\\Delta x = 0$',
          '$r = \\sqrt{x^2-1} = \\sqrt{899} = 29{,}9833287\\dots$, con $\\Delta r = 0{,}5\\times 10^{-6}$'
        ] }
      ],
      preguntas: [
        { id: 'q9_1', tag: '5.a', tipo: 'num', respuesta: -4.09407, tol: 0.001, enunciado: M`Valor de $y$`, placeholder: '-0,00000' },
        {
          id: 'q9_2', tag: '5.a', tipo: 'num', respuesta: 0.00003, reltol: 0.3,
          enunciado: M`Cota de error absoluto $\Delta y$`, ayuda: 'Podés escribir 0,00003 o 3e-5.', placeholder: '0,00003',
          desarrollo: [
            { p: 'El error en $x$ es nulo, así que todo el error entra por la raíz:' },
            { math: M`\Delta y = \left|\frac{\partial y}{\partial x}\right|\Delta x + \left|\frac{\partial y}{\partial r}\right|\Delta r = 0 + \left|\frac{-1}{x-r}\right| \cdot 0{,}5\times 10^{-6}` },
            { math: M`\Delta y = \frac{0{,}5\times 10^{-6}}{30 - 29{,}9833287} = \frac{0{,}5\times 10^{-6}}{0{,}0166713} = 0{,}000029992 \approx 0{,}3\times 10^{-4}` },
            { math: M`y = \ln\left(0{,}0166713\right) = -4{,}09406667\dots \;\Longrightarrow\; \boxed{y = -4{,}09407 \pm 0{,}00003}` },
            { p: 'Logramos 4 decimales significativos y uno medianamente significativo. La resta de magnitudes similares produjo cancelación de términos: al dividir por un número chico, el factor de amplificación del error se vuelve crítico.' }
          ]
        },
        {
          id: 'q9_3', tag: '5.b', tipo: 'mc', correcta: 'A',
          enunciado: '¿Cuál es la expresión equivalente mejor condicionada?',
          opciones: [
            { v: 'A', tex: M`y = -\ln\left(x + \sqrt{x^2-1}\right)` },
            { v: 'B', tex: M`y = \ln\left(x + \sqrt{x^2-1}\right)` },
            { v: 'C', tex: M`y = \ln\left(\frac{x-\sqrt{x^2-1}}{x+\sqrt{x^2-1}}\right)` },
            { v: 'D', tex: M`y = \ln(x) - \ln\left(\sqrt{x^2-1}\right)` }
          ],
          desarrollo: [
            { p: 'Se racionaliza multiplicando y dividiendo por el conjugado, que es la misma maniobra del Problema 6:' },
            { math: M`x - \sqrt{x^2-1} = \frac{\left(x-\sqrt{x^2-1}\right)\left(x+\sqrt{x^2-1}\right)}{x+\sqrt{x^2-1}} = \frac{x^2 - (x^2-1)}{x+\sqrt{x^2-1}} = \frac{1}{x+\sqrt{x^2-1}}` },
            { math: M`y = \ln\left(\frac{1}{x+\sqrt{x^2-1}}\right) = -\ln\left(x+\sqrt{x^2-1}\right)` },
            { p: 'La resta desapareció: ahora el denominador es una <em>suma</em> de dos números grandes, que no pierde cifras significativas.' }
          ]
        },
        {
          id: 'q9_4', tag: '5.b', tipo: 'num', respuesta: 8.34e-9, reltol: 0.3,
          enunciado: M`Nueva cota de error absoluto $\Delta y$`, ayuda: 'Podés escribir 8,3e-9.', placeholder: '8,3e-9',
          desarrollo: [
            { math: M`\Delta y = \left|\frac{\partial y}{\partial r}\right|\Delta r = \frac{0{,}5\times 10^{-6}}{x + r} = \frac{0{,}5\times 10^{-6}}{59{,}9833287} = 8{,}34\times 10^{-9}` },
            { math: M`y = -\ln\left(59{,}9833287\right) = -4{,}0940667 \pm 0{,}0000001` },
            { p: 'Ahora hay 7 decimales correctos, contra 4 de la forma original: el mismo número, calculado de otra manera, gana tres cifras significativas.' }
          ]
        },
        {
          id: 'q9_5', tag: '5.b', tipo: 'num', respuesta: 3598, reltol: 0.15,
          enunciado: '¿Por qué factor se redujo la cota de error entre a) y b)?',
          ayuda: 'Es el cociente entre ambos factores de amplificación.',
          placeholder: '0000',
          desarrollo: [
            { math: M`\frac{\Delta y_{(a)}}{\Delta y_{(b)}} = \frac{1/(x-r)}{1/(x+r)} = \frac{x+r}{x-r} = \frac{59{,}9833287}{0{,}0166713} \approx 3598` },
            { p: 'El error se redujo unas <strong>3600 veces</strong> sin cambiar el valor calculado: las dos expresiones son matemáticamente idénticas, pero numéricamente no valen lo mismo. Esa es toda la idea de <em>condicionamiento</em>.' }
          ]
        }
      ]
    }
  ]
};

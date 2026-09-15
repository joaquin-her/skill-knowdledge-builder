/* ============================================================================
   Unidad — 95.13 Métodos Matemáticos y Numéricos (FIUBA), Guía 2: Ecuaciones No Lineales
   ----------------------------------------------------------------------------
   Contenido puro: el motor vive en src/components / src/lib. Para dar de alta
   otra unidad, copiá src/data/units/_plantilla.ts — no hace falta tocar el motor.

   Los valores fueron verificados numéricamente y contrastados con la clase del
   08/04/2025 (Ejercicios 2.2 y 2.7), que resuelve la misma F(x) = x²/4 − sen(x)
   con los cinco métodos. Las tablas de bisección, punto fijo, Newton-Raphson y
   secante reproducen fila por fila las de la cátedra, incluida su forma de
   estimar p y λ con las últimas tres diferencias.

   ========================================================================== */

import type { Unidad } from '@/types/quiz';
import { M } from '@/lib/tex';

export const unidad: Unidad = {
  id: 'modelacion-guia-2-enl',
  codigo: '95.13',
  materia: 'Métodos Numéricos',
  unidad: 'Guía 2 — Ecuaciones No Lineales',
  facultad: 'Facultad de Ingeniería — UBA',

  problemas: [
    /* ===================== PROBLEMA 1 ===================== */
    {
      id: 'p1',
      titulo: 'Bisección: tres raíces en (0; 1,6)',
      enunciado: [
        { p: 'Las siguientes ecuaciones tienen una raíz en el intervalo $(0;\\,1{,}6)$. Determinarlas con un error menor que $0{,}02$ por el método de bisección.' },
        { math: M`\begin{aligned}
          \text{a)}&\quad x\cos(x) = \ln(x) \\[2pt]
          \text{b)}&\quad 2x - e^{-x} = 0 \\[2pt]
          \text{c)}&\quad e^{-2x} = 1-x
        \end{aligned}` },
        { note: 'Antes de iterar hay que elegir un intervalo de arranque donde $F$ cambie de signo. No siempre sirve $(0;\\,1{,}6)$ completo: en a) el $\\ln(x)$ no está definido en $x=0$, y en c) $x=0$ ya es raíz de la ecuación, así que hay que encerrar la otra.' }
      ],
      preguntas: [
        {
          id: 'q1_1', tag: '1.a', tipo: 'num', respuesta: 1.35625, tol: 0.03,
          enunciado: M`Raíz de $x\cos(x) = \ln(x)$ por bisección, partiendo de $[1;\,1{,}6]$, hasta que $\Delta m < 0{,}02$.`,
          ayuda: 'El valor del último punto medio.',
          placeholder: '1,00',
          desarrollo: [
            { p: M`Se escribe $F(x) = x\cos(x) - \ln(x)$. En $x \to 0^+$ el logaritmo diverge a $-\infty$, así que el extremo izquierdo no puede ser 0; se arranca en $x=1$:` },
            { math: M`F(1) = \cos(1) - \ln(1) = +0{,}54030 \qquad F(1{,}6) = 1{,}6\cos(1{,}6) - \ln(1{,}6) = -0{,}51672` },
            { p: 'Hay cambio de signo, y $F$ es continua en $[1;\\,1{,}6]$: el intervalo sirve. El número de iteraciones sale de la cota de truncamiento:' },
            { math: M`\Delta m_{k+1} = \frac{b_0-a_0}{2^{k+1}} < 0{,}02 \;\Longrightarrow\; k+1 > \frac{\ln(0{,}6/0{,}02)}{\ln 2} = 4{,}907` },
            {
              table: {
                head: [M`$k$`, M`$a_k$`, M`$b_k$`, M`$m_{k+1}$`, M`$\Delta m_{k+1}$`],
                rows: [
                  ['0', '1,00000', '1,60000', '1,30000', '0,30000'],
                  ['1', '1,30000', '1,60000', '1,45000', '0,15000'],
                  ['2', '1,30000', '1,45000', '1,37500', '0,07500'],
                  ['3', '1,30000', '1,37500', '1,33750', '0,03750'],
                  ['4', '1,33750', '1,37500', '1,35625', '0,01875']
                ]
              }
            },
            { p: M`Con 4 iteraciones ya es $\Delta m = 0{,}01875 < 0{,}02$. El resultado se expresa $m = 1{,}36 \pm 0{,}02$ (la raíz exacta es $1{,}34758$).` }
          ]
        },
        {
          id: 'q1_2', tag: '1.b', tipo: 'num', respuesta: 0.3625, tol: 0.03,
          enunciado: M`Raíz de $2x - e^{-x} = 0$ por bisección, partiendo de $[0;\,1{,}6]$, hasta que $\Delta m < 0{,}02$.`,
          placeholder: '0,00',
          desarrollo: [
            { math: M`F(0) = -1 \qquad F(1{,}6) = 3{,}2 - e^{-1{,}6} = +2{,}99810` },
            { p: 'Acá sí sirve el intervalo entero. La cota pide:' },
            { math: M`k+1 > \frac{\ln(1{,}6/0{,}02)}{\ln 2} = 6{,}322 \;\Longrightarrow\; 6 \text{ iteraciones}` },
            {
              table: {
                head: [M`$k$`, M`$a_k$`, M`$b_k$`, M`$m_{k+1}$`, M`$\Delta m_{k+1}$`],
                rows: [
                  ['0', '0,00000', '1,60000', '0,80000', '0,80000'],
                  ['1', '0,00000', '0,80000', '0,40000', '0,40000'],
                  ['2', '0,00000', '0,40000', '0,20000', '0,20000'],
                  ['3', '0,20000', '0,40000', '0,30000', '0,10000'],
                  ['4', '0,30000', '0,40000', '0,35000', '0,05000'],
                  ['5', '0,35000', '0,40000', '0,37500', '0,02500'],
                  ['6', '0,35000', '0,37500', '0,36250', '0,01250']
                ]
              }
            },
            { p: M`$m = 0{,}36 \pm 0{,}02$; la raíz exacta es $0{,}35173$.` }
          ]
        },
        {
          id: 'q1_3', tag: '1.c', tipo: 'num', respuesta: 0.79219, tol: 0.03,
          enunciado: M`Raíz <em>no nula</em> de $e^{-2x} = 1-x$ por bisección, partiendo de $[0{,}5;\,1{,}6]$, hasta que $\Delta m < 0{,}02$.`,
          ayuda: 'Ojo: $x=0$ también verifica la ecuación.',
          placeholder: '0,00',
          desarrollo: [
            { p: M`Con $F(x) = e^{-2x} - (1-x)$ resulta $F(0) = 1 - 1 = 0$: el origen <em>ya es raíz</em>. Si se arranca en $a_0 = 0$ el método no encierra la raíz buscada y converge al extremo equivocado. Se corre el extremo izquierdo:` },
            { math: M`F(0{,}5) = e^{-1} - 0{,}5 = -0{,}13212 \qquad F(1{,}6) = e^{-3{,}2} + 0{,}6 = +0{,}64076` },
            {
              table: {
                head: [M`$k$`, M`$a_k$`, M`$b_k$`, M`$m_{k+1}$`, M`$\Delta m_{k+1}$`],
                rows: [
                  ['0', '0,50000', '1,60000', '1,05000', '0,55000'],
                  ['1', '0,50000', '1,05000', '0,77500', '0,27500'],
                  ['2', '0,77500', '1,05000', '0,91250', '0,13750'],
                  ['3', '0,77500', '0,91250', '0,84375', '0,06875'],
                  ['4', '0,77500', '0,84375', '0,80938', '0,03438'],
                  ['5', '0,77500', '0,80938', '0,79219', '0,01719']
                ]
              }
            },
            { p: M`$m = 0{,}79 \pm 0{,}02$; la raíz exacta es $0{,}79681$.` }
          ]
        },
        {
          id: 'q1_4', tag: '1.d', tipo: 'mc', correcta: 'C',
          enunciado: M`¿Por qué no se puede arrancar la bisección en $a_0 = 0$ para el inciso c)?`,
          opciones: [
            { v: 'A', html: 'Porque $F$ no es continua en $x=0$.' },
            { v: 'B', html: 'Porque $F(0)$ y $F(1{,}6)$ tienen el mismo signo.' },
            { v: 'C', html: 'Porque $F(0) = 0$: el extremo ya es una raíz, y el método terminaría encerrando ésa y no la buscada.' },
            { v: 'D', html: 'Porque la derivada $F\'(0)$ se anula.' }
          ],
          desarrollo: [
            { p: M`$F(0) = e^{0} - (1-0) = 1 - 1 = 0$. La bisección exige $F(a_0)\cdot F(b_0) < 0$, y acá el producto es exactamente 0.` },
            { p: M`La ecuación $e^{-2x} = 1-x$ tiene dos soluciones: $x=0$ y $x \approx 0{,}79681$. Para aislar la segunda hay que elegir un $a_0$ a la derecha del origen, por ejemplo $a_0 = 0{,}5$, donde $F$ ya es negativa.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 2 ===================== */
    {
      id: 'p2',
      titulo: 'Bisección: número de iteraciones y performance',
      enunciado: [
        { p: M`Sea $F(x) = \dfrac{x^2}{4} - \operatorname{sen}(x)$. Se desea encontrar la primera raíz positiva de $F(x)$.` },
        { ul: [
          'a) Hallar un intervalo de partida para utilizar el método de bisección.',
          'b) Estimar el número de aproximaciones necesarias para hallar la raíz con una tolerancia para el error absoluto de $0{,}02$. Calcular la raíz.',
          'c) Si la tolerancia de $0{,}02$ es sobre el error relativo, ¿cuántas aproximaciones se requieren?',
          'd) Sabiendo que la raíz a 5 decimales correctos es $\\alpha = 1{,}93375$, obtener conclusiones sobre la performance del método.',
          'e) Estimar el orden de convergencia en forma experimental.'
        ] },
        { note: 'Este es el ejercicio que la cátedra resuelve en clase con los cinco métodos. Las tablas de acá reproducen las suyas.' }
      ],
      preguntas: [
        {
          id: 'q2_1', tag: '2.a', tipo: 'mc', correcta: 'B',
          enunciado: M`¿Alcanza con verificar $F(a_0)\cdot F(b_0) < 0$ para asegurar que $[a_0;\,b_0]$ contiene <em>una</em> raíz?`,
          opciones: [
            { v: 'A', html: 'Sí: el cambio de signo garantiza una única raíz en el intervalo.' },
            { v: 'B', html: 'No: garantiza que hay <em>al menos</em> una (número impar), pero podría haber tres, cinco…; hace falta estudiar la monotonía de $F$.' },
            { v: 'C', html: 'No: el cambio de signo no garantiza ninguna raíz, ni siquiera con $F$ continua.' },
            { v: 'D', html: 'Sí, siempre que $F$ sea derivable en el intervalo.' }
          ],
          desarrollo: [
            { p: M`Con $F$ continua, el teorema de Bolzano asegura <em>al menos</em> una raíz cuando $F(a_0)\cdot F(b_0) < 0$. Pero podría haber un número impar cualquiera de ellas.` },
            { p: M`La clase marca explícitamente este punto: a la pregunta «¿alcanza sólo con esto para asegurar que el intervalo tiene una raíz?» la respuesta es <strong>NO</strong>. Para la unicidad hay que ver que $F$ sea monótona, por ejemplo con el signo de $F'$.` },
            { math: M`F(1{,}6) = -0{,}35957 \qquad F(2{,}6) = +1{,}17450 \qquad \Longrightarrow \qquad [a_0;\,b_0] = [1{,}6;\,2{,}6]` }
          ]
        },
        {
          id: 'q2_2', tag: '2.b', tipo: 'num', respuesta: 5, tol: 0.4,
          enunciado: M`Partiendo de $[1{,}6;\,2{,}6]$, ¿cuántas iteraciones hacen falta para que el error absoluto sea menor que $0{,}02$?`,
          placeholder: '0',
          desarrollo: [
            { p: 'El error de truncamiento de la bisección está acotado por la semiamplitud del intervalo vigente:' },
            { math: M`\left|m_{k+1}-\alpha\right| \le \Delta m_{k+1} = \frac{b_k-a_k}{2} = \frac{b_0-a_0}{2^{k+1}} = \varepsilon` },
            { math: M`\varepsilon < 0{,}02 \;\Longrightarrow\; k+1 > \frac{\ln\left[(b_0-a_0)/\varepsilon\right]}{\ln 2} = \frac{\ln(1/0{,}02)}{\ln 2} = 5{,}644 \;\Longrightarrow\; k > 4{,}64` },
            { p: M`Es decir, <strong>5 iteraciones</strong>. La clase remarca al margen: <em>«en los demás métodos $k$ no se puede anticipar»</em> — ésta es la ventaja característica de la bisección.` }
          ]
        },
        {
          id: 'q2_3', tag: '2.c', tipo: 'num', respuesta: 1.92813, tol: 0.008,
          enunciado: 'Valor de la raíz tras esas iteraciones (el último punto medio).',
          placeholder: '0,00000',
          desarrollo: [
            {
              table: {
                head: [M`$k$`, M`$a_k$`, M`$b_k$`, M`$m_{k+1}$`, M`$f(m_{k+1})$`, M`$\Delta m_{k+1}$`, M`$\Delta m/m$`],
                rows: [
                  ['0', '1,6', '2,6', '2,1', '0,239291', '0,5', '0,238095'],
                  ['1', '1,6', '2,1', '1,85', '−0,10565', '0,25', '0,135135'],
                  ['2', '1,85', '2,1', '1,975', '0,05574', '0,125', '0,063291'],
                  ['3', '1,85', '1,975', '1,9125', '−0,02777', '0,0625', '0,032680'],
                  ['4', '1,9125', '1,975', '1,94375', '0,013286', '0,03125', '0,016077'],
                  ['5', '1,9125', '1,94375', '1,928125', '−0,00742', '0,015625', '0,008104']
                ]
              }
            },
            { p: M`Con $\Delta m = 0{,}02$ el resultado se expresa reteniendo el dígito del orden de la cota:` },
            { math: M`m = 1{,}93 \pm 0{,}02` }
          ]
        },
        {
          id: 'q2_4', tag: '2.d', tipo: 'num', respuesta: 4, tol: 0.4,
          enunciado: M`Si la tolerancia de $0{,}02$ es sobre el error <em>relativo</em>, ¿cuántas iteraciones se requieren?`,
          ayuda: 'Mirá la columna $\\Delta m/m$ de la tabla anterior.',
          placeholder: '0',
          desarrollo: [
            { p: M`En la columna $\Delta m/m$, el primer valor que baja de $0{,}02$ aparece en $k=4$: $0{,}016077$.` },
            { math: M`\frac{\Delta m}{m} = 0{,}02 \;\Longrightarrow\; m = 1{,}94375 \pm 0{,}03125` },
            { p: 'Redondeando la cota hacia arriba a una cifra significativa y el valor al orden de esa cota:' },
            { math: M`m = 1{,}94 \pm 0{,}04` },
            { p: 'Con tolerancia relativa hacen falta <strong>menos</strong> iteraciones que con la absoluta (4 contra 5), porque la raíz es mayor que 1.' }
          ]
        },
        {
          id: 'q2_5', tag: '2.e', tipo: 'num', respuesta: 17, tol: 0.4,
          enunciado: M`¿Cuántas iteraciones necesita la bisección para alcanzar los 5 decimales correctos de $\alpha = 1{,}93375$?`,
          ayuda: 'Se pide $\\Delta m < 0{,}5\\times 10^{-5}$.',
          placeholder: '0',
          desarrollo: [
            { math: M`\frac{1}{2^{k+1}} < 0{,}5\times 10^{-5} \;\Longrightarrow\; k+1 > \frac{\ln(2\times 10^{5})}{\ln 2} = 17{,}61` },
            { p: M`La tabla de la cátedra llega a $m = 1{,}93375$ con $\Delta m = 0{,}00000$ en $k = 17$. Se requieren <strong>17 iteraciones</strong> para 5 decimales.` },
            { p: 'La conclusión sobre la performance: la convergencia es segura pero lenta, y el error no baja de forma monótona — la tabla de la clase muestra iteraciones donde la estimación se acerca al valor exacto y luego se vuelve a alejar.' }
          ]
        },
        {
          id: 'q2_6', tag: '2.f', tipo: 'num', respuesta: 1, tol: 0.15,
          enunciado: 'Orden de convergencia $p$ estimado experimentalmente.',
          ayuda: 'Usá las primeras cuatro filas de la tabla.',
          placeholder: '0,0',
          desarrollo: [
            { p: M`Como no se conoce $\alpha$, se usa la diferencia entre iteraciones sucesivas $\Delta x^{(k+1)} = \left|x^{(k+1)}-x^{(k)}\right|$:` },
            { math: M`p = \frac{\ln\left(\Delta x^{(k+1)}/\Delta x^{(k)}\right)}{\ln\left(\Delta x^{(k)}/\Delta x^{(k-1)}\right)} \qquad \lambda = \frac{\Delta x^{(k+1)}}{\left(\Delta x^{(k)}\right)^{p}}` },
            { math: M`\begin{aligned}
              \Delta x^{(3)} &= \left|1{,}9125 - 1{,}975\right| = 0{,}0625 \\
              \Delta x^{(2)} &= \left|1{,}975 - 1{,}85\right| = 0{,}125 \\
              \Delta x^{(1)} &= \left|1{,}85 - 2{,}1\right| = 0{,}25
            \end{aligned}` },
            { math: M`p = \frac{\ln(0{,}0625/0{,}125)}{\ln(0{,}125/0{,}25)} = \frac{\ln(0{,}5)}{\ln(0{,}5)} = 1` },
            { p: M`En bisección el orden es <strong>exactamente 1</strong> y la constante asintótica $\lambda = 0{,}5$ en todas las iteraciones: cada paso corta el intervalo a la mitad, sin importar la función.` }
          ]
        },
        {
          id: 'q2_7', tag: '2.g', tipo: 'num', respuesta: 0.5, tol: 0.05,
          enunciado: 'Constante asintótica del error $\\lambda$ para la bisección.',
          placeholder: '0,00',
          desarrollo: [
            { math: M`\lambda = \frac{\Delta x^{(3)}}{\left(\Delta x^{(2)}\right)^{p}} = \frac{0{,}0625}{(0{,}125)^{1}} = 0{,}5` },
            { p: 'Es el factor de reducción del intervalo: exactamente ½ por iteración.' }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 3 ===================== */
    {
      id: 'p3',
      titulo: 'Punto fijo: convergencia y orden',
      enunciado: [
        { p: M`La función $F(x) = \operatorname{sen}(x) - \tfrac{1}{2}\sqrt{x}$ tiene 2 ceros en $I=[0;\,2]$. Uno es $x=0$; se desea hallar el otro. Para ello se utilizará un método de punto fijo basado en la función de iteración:` },
        { math: M`g(x) = x - F(x) = x - \operatorname{sen}(x) + \tfrac{1}{2}\sqrt{x}` },
        { ul: [
          'a) Hallar, mediante justificación teórica, un intervalo que contenga al cero buscado como único cero de $F(x)$, y mostrar que allí el método converge.',
          'b) Hallar el cero con una tolerancia del 1 % para el error relativo entre 2 pasos consecutivos.',
          'c) Hallar el orden de convergencia del método y la constante asintótica del error.'
        ] },
        { note: 'Las condiciones de punto fijo son dos: que $g$ mapee el intervalo en sí mismo ($g([a,b]) \\subseteq [a,b]$ asegura que existe punto fijo) y que $|g\'(x)| < 1$ en todo el intervalo (asegura que es único y que la iteración converge).' }
      ],
      preguntas: [
        {
          id: 'q3_1', tag: '3.a', tipo: 'mc', correcta: 'B',
          enunciado: M`¿Cuál de estos intervalos sirve para garantizar la convergencia del método de punto fijo al cero no nulo?`,
          opciones: [
            { v: 'A', tex: M`[0;\ 2]` },
            { v: 'B', tex: M`[0{,}2;\ 0{,}4]` },
            { v: 'C', tex: M`[1{,}5;\ 2]` },
            { v: 'D', tex: M`[0;\ 0{,}1]` }
          ],
          desarrollo: [
            { p: M`El cero no nulo está en $x \approx 0{,}2555$. Se verifica el intervalo $[0{,}2;\,0{,}4]$:` },
            { math: M`g(0{,}2) = 0{,}22494 \qquad g(0{,}4) = 0{,}32681` },
            { p: M`Como $g$ es creciente ahí, $g([0{,}2;\,0{,}4]) = [0{,}22494;\,0{,}32681] \subset [0{,}2;\,0{,}4]$: <strong>primera condición cumplida</strong>.` },
            { math: M`g'(x) = 1 - \cos(x) + \frac{1}{4\sqrt{x}}` },
            { math: M`\left|g'(x)\right| \le 0{,}579 < 1 \quad \text{en } [0{,}2;\,0{,}4] \qquad \textbf{segunda condición cumplida}` },
            { p: M`En $[0;\,2]$ no sirve: cerca de $x=2$ es $|g'| \approx 1{,}59 > 1$, y cerca de $x=0$ el término $1/(4\sqrt{x})$ diverge. El intervalo $[1{,}5;\,2]$ ni siquiera contiene la raíz.` }
          ]
        },
        {
          id: 'q3_2', tag: '3.b', tipo: 'num', respuesta: 0.2572, tol: 0.006,
          enunciado: M`Valor del cero, iterando desde $x_0 = 0{,}3$ hasta que el error relativo entre pasos consecutivos sea menor al 1 %.`,
          placeholder: '0,0000',
          desarrollo: [
            { math: M`x_{k+1} = g(x_k) = x_k - \operatorname{sen}(x_k) + \tfrac{1}{2}\sqrt{x_k}` },
            {
              table: {
                head: [M`$k$`, M`$x_k$`, M`$\Delta x = |x_k - x_{k-1}|$`, M`$\Delta x / x_k$`],
                rows: [
                  ['0', '0,300000', '—', '—'],
                  ['1', '0,278341', '0,021659', '0,077814'],
                  ['2', '0,267370', '0,010971', '0,041032'],
                  ['3', '0,261714', '0,005657', '0,021614'],
                  ['4', '0,258767', '0,002946', '0,011386'],
                  ['5', '0,257224', '0,001543', '0,005999']
                ]
              }
            },
            { p: M`En $k=5$ el error relativo baja del 1 %: $x \approx 0{,}2572$. El valor exacto de la raíz es $0{,}255512$.` }
          ]
        },
        {
          id: 'q3_3', tag: '3.c', tipo: 'num', respuesta: 1, tol: 0.15,
          enunciado: 'Orden de convergencia $p$ del método de punto fijo.',
          placeholder: '0,0',
          desarrollo: [
            { math: M`p = \frac{\ln(0{,}001543/0{,}002946)}{\ln(0{,}002946/0{,}005657)} = \frac{\ln(0{,}5238)}{\ln(0{,}5208)} = 0{,}99` },
            { p: M`El punto fijo con $g'(\alpha) \ne 0$ tiene orden <strong>lineal</strong> ($p=1$). Es el mismo resultado que obtiene la cátedra en su tabla ($p \to 1{,}000$).` }
          ]
        },
        {
          id: 'q3_4', tag: '3.d', tipo: 'num', respuesta: 0.527, reltol: 0.08,
          enunciado: 'Constante asintótica del error $\\lambda$.',
          ayuda: 'En un método de punto fijo lineal coincide con un valor teórico conocido.',
          placeholder: '0,000',
          desarrollo: [
            { math: M`\lambda = \frac{\Delta x^{(5)}}{\left(\Delta x^{(4)}\right)^{1}} = \frac{0{,}001543}{0{,}002946} = 0{,}524` },
            { p: M`En un método de punto fijo de orden 1, la constante asintótica es exactamente $\left|g'(\alpha)\right|$:` },
            { math: M`\begin{aligned}
              \left|g'(\alpha)\right| &= \left|1 - \cos(\alpha) + \frac{1}{4\sqrt{\alpha}}\right| \\[2pt]
              &= 0{,}5270 \qquad (\alpha = 0{,}255512)
            \end{aligned}` },
            { p: 'El valor experimental converge al teórico, como debe ser.' }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 4 ===================== */
    {
      id: 'p4',
      titulo: 'Newton-Raphson para $x = \\cos(x)$',
      enunciado: [
        { p: M`Se desea hallar la primera raíz positiva de la ecuación $x = \cos(x)$ con el método de Newton-Raphson.` },
        { ul: [
          'a) Plantee el método para el problema de punto fijo planteado.',
          'b) Estudie las propiedades de convergencia. Encuentre explícitamente un intervalo de convergencia.',
          'c) Encuentre el cero buscado con una tolerancia para el error relativo de $10^{-10}$.',
          'd) Estime en forma experimental el orden de convergencia del método.'
        ] }
      ],
      preguntas: [
        {
          id: 'q4_1', tag: '4.a', tipo: 'mc', correcta: 'A',
          enunciado: 'Fórmula iterativa de Newton-Raphson para esta ecuación:',
          opciones: [
            { v: 'A', tex: M`x_{k+1} = x_k - \frac{x_k - \cos(x_k)}{1 + \operatorname{sen}(x_k)}` },
            { v: 'B', tex: M`x_{k+1} = x_k - \frac{x_k - \cos(x_k)}{1 - \operatorname{sen}(x_k)}` },
            { v: 'C', tex: M`x_{k+1} = x_k - \frac{\cos(x_k) - x_k}{1 + \operatorname{sen}(x_k)}` },
            { v: 'D', tex: M`x_{k+1} = \cos(x_k)` }
          ],
          desarrollo: [
            { p: M`Se lleva la ecuación a la forma $F(x)=0$:` },
            { math: M`F(x) = x - \cos(x) \qquad F'(x) = 1 + \operatorname{sen}(x)` },
            { math: M`x_{k+1} = x_k - \frac{F(x_k)}{F'(x_k)} = x_k - \frac{x_k - \cos(x_k)}{1 + \operatorname{sen}(x_k)}` },
            { p: M`La opción D es la iteración de punto fijo simple $g(x)=\cos(x)$, que también converge pero sólo linealmente. La B tiene el signo cambiado en la derivada.` }
          ]
        },
        {
          id: 'q4_2', tag: '4.b', tipo: 'mc', correcta: 'C',
          enunciado: M`¿Cuál es un intervalo de convergencia válido, y por qué?`,
          opciones: [
            { v: 'A', html: '$[0;\\,1]$, porque ahí $F$ cambia de signo.' },
            { v: 'B', html: 'Todo $\\mathbb{R}$, porque $F\'$ nunca se anula.' },
            { v: 'C', html: '$[0{,}5;\\,1{,}5]$, porque ahí $|g\'(x)| \\le 0{,}15 < 1$ con $g\'= FF\'\'/(F\')^2$.' },
            { v: 'D', html: '$[0;\\,\\pi/2]$, porque $F\'\' = \\cos(x) \\ge 0$ en ese intervalo.' }
          ],
          desarrollo: [
            { p: M`Newton-Raphson es un caso particular de punto fijo con $g(x) = x - F(x)/F'(x)$, de donde:` },
            { math: M`g'(x) = \frac{F(x)\,F''(x)}{\left[F'(x)\right]^{2}}, \qquad F''(x) = \cos(x)` },
            { p: M`Evaluando en $[0{,}5;\,1{,}5]$ resulta $|g'(x)| \le 0{,}1514 < 1$, y además $F' = 1+\operatorname{sen}(x) \ge 1 > 0$ no se anula: la iteración está bien definida y converge.` },
            { p: M`En $[0;\,1]$ el máximo de $|g'|$ llega a 1 (en $x=0$, donde $F=-1$ y $F''=1$ con $F'=1$), así que la cota no cierra. No basta con que $F$ cambie de signo: eso habilita la bisección, no Newton.` },
            { math: M`\alpha = 0{,}739085133215` }
          ]
        },
        {
          id: 'q4_3', tag: '4.c', tipo: 'num', respuesta: 0.7390851332, reltol: 0.0001,
          enunciado: M`Valor de la raíz con tolerancia $10^{-10}$ para el error relativo.`,
          placeholder: '0,0000000000',
          desarrollo: [
            {
              table: {
                head: [M`$k$`, M`$x_k$`, M`$\Delta x$`, M`$\Delta x / x_k$`],
                rows: [
                  ['0', '0,500000000000', '—', '—'],
                  ['1', '0,755222417106', '2,552×10⁻¹', '3,379×10⁻¹'],
                  ['2', '0,739141666150', '1,608×10⁻²', '2,176×10⁻²'],
                  ['3', '0,739085133921', '5,653×10⁻⁵', '7,649×10⁻⁵'],
                  ['4', '0,739085133215', '7,056×10⁻¹⁰', '9,548×10⁻¹⁰']
                ]
              }
            },
            { p: M`En 4 iteraciones desde $x_0 = 0{,}5$ se alcanza la tolerancia. Notar cómo el número de dígitos correctos <em>se duplica</em> en cada paso: 1, 3, 5, 10 — la firma de la convergencia cuadrática.` }
          ]
        },
        {
          id: 'q4_4', tag: '4.d', tipo: 'num', respuesta: 2, tol: 0.2,
          enunciado: 'Orden de convergencia estimado experimentalmente.',
          placeholder: '0,0',
          desarrollo: [
            { math: M`p = \frac{\ln\left(7{,}056\times 10^{-10} / 5{,}653\times 10^{-5}\right)}{\ln\left(5{,}653\times 10^{-5} / 1{,}608\times 10^{-2}\right)} = 1{,}998 \approx 2` },
            { p: M`Newton-Raphson tiene orden <strong>cuadrático</strong> ($p=2$) cuando la raíz es simple y $F'(\alpha) \ne 0$. La constante asintótica teórica es:` },
            { math: M`\lambda = \left|\frac{F''(\alpha)}{2F'(\alpha)}\right| = \left|\frac{\cos(0{,}739085)}{2\left[1+\operatorname{sen}(0{,}739085)\right]}\right| = 0{,}2208` },
            { p: M`El valor experimental da $\lambda \approx 0{,}217$: coincide.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 5 ===================== */
    {
      id: 'p5',
      titulo: 'Fórmulas iterativas de Newton-Raphson',
      enunciado: [
        { p: 'Obtener fórmulas iterativas de Newton-Raphson para calcular funciones que la máquina no provee:' },
        { ul: [
          'a) La raíz cúbica de un número positivo $c$.',
          'b) El $\\arcsin(a)$, siendo dato el valor de $a$. Determinar $\\arcsin(0{,}5)$ con 3 dígitos significativos.',
          'c) El logaritmo natural de $a$, disponiendo únicamente de la función exponencial. Evaluarlo con aritmética de punto flotante de 4 dígitos, para $a = 1{,}2$.'
        ] },
        { note: 'La idea es siempre la misma: plantear una $F(x)=0$ cuya raíz sea el valor buscado, usando sólo operaciones que la máquina sí tiene.' }
      ],
      preguntas: [
        {
          id: 'q5_1', tag: '5.a', tipo: 'mc', correcta: 'B',
          enunciado: M`Fórmula iterativa para $\sqrt[3]{c}$:`,
          opciones: [
            { v: 'A', tex: M`x_{k+1} = \frac{1}{2}\left(x_k + \frac{c}{x_k}\right)` },
            { v: 'B', tex: M`x_{k+1} = \frac{1}{3}\left(2x_k + \frac{c}{x_k^{2}}\right)` },
            { v: 'C', tex: M`x_{k+1} = x_k - \frac{x_k^{3}-c}{3x_k}` },
            { v: 'D', tex: M`x_{k+1} = \frac{1}{3}\left(x_k + \frac{2c}{x_k^{2}}\right)` }
          ],
          desarrollo: [
            { p: M`Se busca $x = \sqrt[3]{c}$, o sea la raíz de:` },
            { math: M`F(x) = x^{3} - c \qquad F'(x) = 3x^{2}` },
            { math: M`x_{k+1} = x_k - \frac{x_k^{3}-c}{3x_k^{2}} = \frac{3x_k^{3} - x_k^{3} + c}{3x_k^{2}} = \frac{1}{3}\left(2x_k + \frac{c}{x_k^{2}}\right)` },
            { p: M`La opción A es la fórmula de la <em>raíz cuadrada</em> (método babilónico). La C tiene mal la derivada: $3x_k$ en vez de $3x_k^2$.` },
            { p: M`Control: con $c=27$ y $x_0=3{,}5$ converge a $3{,}0000000000$.` }
          ]
        },
        {
          id: 'q5_2', tag: '5.b', tipo: 'mc', correcta: 'A',
          enunciado: M`Fórmula iterativa para $\arcsin(a)$:`,
          opciones: [
            { v: 'A', tex: M`x_{k+1} = x_k - \frac{\operatorname{sen}(x_k) - a}{\cos(x_k)}` },
            { v: 'B', tex: M`x_{k+1} = x_k - \frac{\cos(x_k) - a}{-\operatorname{sen}(x_k)}` },
            { v: 'C', tex: M`x_{k+1} = x_k - \frac{\operatorname{sen}(x_k) - a}{-\cos(x_k)}` },
            { v: 'D', tex: M`x_{k+1} = x_k - \left[\operatorname{sen}(x_k) - a\right]\cos(x_k)` }
          ],
          desarrollo: [
            { p: M`Si $x = \arcsin(a)$ entonces $\operatorname{sen}(x) = a$. Se plantea:` },
            { math: M`F(x) = \operatorname{sen}(x) - a \qquad F'(x) = \cos(x)` },
            { math: M`x_{k+1} = x_k - \frac{\operatorname{sen}(x_k) - a}{\cos(x_k)}` }
          ]
        },
        {
          id: 'q5_3', tag: '5.c', tipo: 'num', respuesta: 0.524, tol: 0.0006,
          enunciado: M`Valor de $\arcsin(0{,}5)$ con 3 dígitos significativos.`,
          placeholder: '0,000',
          desarrollo: [
            { p: M`Arrancando en $x_0 = 0{,}5$:` },
            {
              table: {
                head: [M`$k$`, M`$x_k$`],
                rows: [
                  ['1', '0,52344447'],
                  ['2', '0,52359877'],
                  ['3', '0,52359878']
                ]
              }
            },
            { math: M`\arcsin(0{,}5) = \frac{\pi}{6} = 0{,}52359878\ldots \;\longrightarrow\; 0{,}524` }
          ]
        },
        {
          id: 'q5_4', tag: '5.d', tipo: 'mc', correcta: 'C',
          enunciado: M`Para calcular $\ln(a)$ disponiendo sólo de la exponencial, la iteración es:`,
          opciones: [
            { v: 'A', tex: M`x_{k+1} = x_k - \frac{\ln(x_k) - a}{1/x_k}` },
            { v: 'B', tex: M`x_{k+1} = x_k + 1 - a\,e^{-x_k}` },
            { v: 'C', tex: M`x_{k+1} = x_k - 1 + a\,e^{-x_k}` },
            { v: 'D', tex: M`x_{k+1} = x_k - \frac{e^{x_k} - a}{a}` }
          ],
          desarrollo: [
            { p: M`Si $x = \ln(a)$ entonces $e^{x} = a$. Se plantea una $F$ que sólo use la exponencial:` },
            { math: M`F(x) = e^{x} - a \qquad F'(x) = e^{x}` },
            { math: M`x_{k+1} = x_k - \frac{e^{x_k}-a}{e^{x_k}} = x_k - 1 + a\,e^{-x_k}` },
            { p: M`La opción A usa justamente el logaritmo, que es lo que no está disponible.` }
          ]
        },
        {
          id: 'q5_5', tag: '5.e', tipo: 'num', respuesta: 0.1823, tol: 0.0002,
          enunciado: M`Valor de $\ln(1{,}2)$ con aritmética de 4 dígitos de precisión, partiendo de $x_0 = 0$.`,
          placeholder: '0,0000',
          desarrollo: [
            {
              table: {
                head: [M`$k$`, M`$x_k$`],
                rows: [
                  ['0', '0,0000'],
                  ['1', '0,2000'],
                  ['2', '0,1825'],
                  ['3', '0,1823'],
                  ['4', '0,1823']
                ]
              }
            },
            { p: M`El valor exacto es $\ln(1{,}2) = 0{,}18232156\ldots$, que a 4 dígitos es $0{,}1823$. La iteración se estabiliza en $k=3$: con 4 dígitos de precisión no se puede pedir más.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 6 ===================== */
    {
      id: 'p6',
      titulo: 'Precisión limitada de $f$ y $f\'$',
      enunciado: [
        { p: M`Se desea hallar la raíz de $F(x) = \operatorname{sen}(x)$ que se encuentra en $3 < x < 3{,}3$ con una precisión de 6 dígitos significativos, por Newton-Raphson partiendo de $x_0 = 3$.` },
        { note: 'Suponer que $F(x)$ y $F\'(x)$ sólo se conocen con una precisión de 4 decimales.' }
      ],
      preguntas: [
        {
          id: 'q6_1', tag: '6.a', tipo: 'num', respuesta: 3.14163, tol: 0.00006,
          enunciado: M`¿En qué valor se estanca la iteración cuando $F$ y $F'$ se redondean a 4 decimales?`,
          placeholder: '0,00000',
          desarrollo: [
            {
              table: {
                head: [M`$k$`, M`$F(x_k)$`, M`$F'(x_k)$`, M`$x_{k+1}$`],
                rows: [
                  ['0', '+0,1411', '−0,9900', '3,14252525'],
                  ['1', '−0,0009', '−1,0000', '3,14162525'],
                  ['2', '−0,0000', '−1,0000', '3,14162525']
                ]
              }
            },
            { p: M`A partir de $k=2$ el valor ya no cambia: $F(x_k)$ redondeado a 4 decimales da 0 y la corrección se anula. La iteración queda congelada en $3{,}14163$, mientras que $\pi = 3{,}14159265\ldots$` }
          ]
        },
        {
          id: 'q6_2', tag: '6.b', tipo: 'mc', correcta: 'B',
          enunciado: '¿Se alcanzan los 6 dígitos significativos pedidos?',
          opciones: [
            { v: 'A', html: 'Sí, en 3 iteraciones.' },
            { v: 'B', html: 'No: el error se estanca en $3{,}3\\times 10^{-5}$, y para 6 dígitos haría falta un error menor que $0{,}5\\times 10^{-5}$.' },
            { v: 'C', html: 'Sí, pero hacen falta más de 20 iteraciones.' },
            { v: 'D', html: 'No, porque el método diverge con datos redondeados.' }
          ],
          desarrollo: [
            { math: M`\left|x_{\text{final}} - \pi\right| = \left|3{,}14162525 - 3{,}14159265\right| = 3{,}26\times 10^{-5}` },
            { p: M`Para 6 dígitos significativos en un número del orden de 3 se necesita un error menor que $0{,}5\times 10^{-5}$. No se llega, y <em>ninguna</em> cantidad de iteraciones adicionales ayuda: el método ya convergió a lo que puede.` },
            { p: 'La incertidumbre heredada del redondeo de los datos se estima propagando el error a través de la fórmula de Newton:' },
            { math: M`\left|\delta x\right| \approx \frac{\left|\delta F\right|}{\left|F'\right|} = \frac{0{,}5\times 10^{-4}}{\left|\cos(\pi)\right|} = 5\times 10^{-5}` },
            { p: M`Es exactamente el orden del error observado. La precisión alcanzable está limitada por los <strong>datos</strong>, no por el método: con $F$ y $F'$ exactos, la misma iteración llega a $\pi$ con error $2{,}9\times 10^{-10}$ en 2 pasos.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 7 ===================== */
    {
      id: 'p7',
      titulo: 'Método de la secante',
      enunciado: [
        { p: 'El método de la secante consiste en reemplazar la derivada de Newton-Raphson por su aproximación por cociente incremental:' },
        { math: M`F'(x_n) \approx \frac{F(x_n)-F(x_{n-1})}{x_n - x_{n-1}} \qquad\Longrightarrow\qquad x_{k+1} = x_k - \frac{F(x_k)}{\dfrac{F(x_k)-F(x_{k-1})}{x_k - x_{k-1}}}` },
        { p: M`a) Aplicarlo para hallar la raíz no nula de $F(x) = \dfrac{x^2}{4} - \operatorname{sen}(x)$ con una tolerancia del $0{,}1\,\%$.` },
        { p: 'b) Encontrar experimentalmente el orden de convergencia y compararlo con el de Newton-Raphson.' },
        { note: 'Se necesitan 2 puntos de arranque, pero —a diferencia de bisección y regula-falsi— no hace falta que encierren a la raíz.' }
      ],
      preguntas: [
        {
          id: 'q7_1', tag: '7.a', tipo: 'num', respuesta: 1.93373, tol: 0.002,
          enunciado: M`Raíz obtenida partiendo de $x_{-1} = 1{,}6$ y $x_0 = 2{,}6$, con tolerancia $0{,}1\,\%$ para el error relativo.`,
          placeholder: '0,00000',
          desarrollo: [
            {
              table: {
                head: [M`$k$`, M`$x_{k-1}$`, M`$x_k$`, M`$x_{k+1}$`, M`$\Delta m$`, M`$\Delta m/m$`],
                rows: [
                  ['0', '1,6', '2,6', '1,83439', '0,76561', '0,41736'],
                  ['1', '2,6', '1,83439', '1,90762', '0,07322', '0,03839'],
                  ['2', '1,83439', '1,90762', '1,93528', '0,02767', '0,01430'],
                  ['3', '1,90762', '1,93528', '1,93373', '0,00155', '0,00080']
                ]
              }
            },
            { p: M`En $k=3$ el error relativo baja de $0{,}001$: $x \approx 1{,}93373$. Dos pasos más dan $1{,}93375$, el valor exacto a 5 decimales.` }
          ]
        },
        {
          id: 'q7_2', tag: '7.b', tipo: 'num', respuesta: 1.618, tol: 0.12,
          enunciado: 'Orden de convergencia del método de la secante.',
          ayuda: 'Es un número irracional conocido; se admite el valor experimental de la cátedra (≈1,6).',
          placeholder: '0,00',
          desarrollo: [
            { p: 'Estimando con ternas sucesivas de diferencias, como hace la cátedra:' },
            {
              table: {
                head: [M`$\text{terna}$`, M`$p$`, M`$\lambda$`],
                rows: [
                  ['3', '1,477', '0,310'],
                  ['4', '1,667', '1,064'],
                  ['5', '1,598', '0,504']
                ]
              }
            },
            { p: M`Los valores oscilan alrededor de $1{,}6$. El orden teórico es la <strong>razón áurea</strong>:` },
            { math: M`p = \frac{1+\sqrt{5}}{2} = 1{,}618\ldots` },
            { p: M`Es un método <em>supralineal</em>: más rápido que el punto fijo ($p=1$) pero más lento que Newton-Raphson ($p=2$). A cambio, no necesita calcular la derivada — y en la práctica suele requerir casi las mismas iteraciones que Newton (5 contra 6 en este caso), con la mitad de evaluaciones por paso.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 8 ===================== */
    {
      id: 'p8',
      titulo: 'Newton-Raphson sobre una exponencial',
      enunciado: [
        { p: M`Dada la función $F(x) = 0{,}5 - e^{-x}$, se desea encontrar la raíz por el método de Newton-Raphson.` },
        { ul: [
          'a) Calcular partiendo de $x_0 = 0{,}25$, iterando hasta lograr un error relativo menor al 1 %.',
          'b) Estimar experimentalmente el orden de convergencia del método.'
        ] }
      ],
      preguntas: [
        {
          id: 'q8_1', tag: '8.a', tipo: 'num', respuesta: 0.69314, tol: 0.004,
          enunciado: M`Valor de la raíz con error relativo menor al $1\,\%$.`,
          placeholder: '0,00000',
          desarrollo: [
            { math: M`F(x) = 0{,}5 - e^{-x} \qquad F'(x) = e^{-x} \qquad x_{k+1} = x_k - \frac{0{,}5 - e^{-x_k}}{e^{-x_k}}` },
            {
              table: {
                head: [M`$k$`, M`$x_k$`, M`$\Delta x$`, M`$\Delta x / x_k$`],
                rows: [
                  ['0', '0,25000000', '—', '—'],
                  ['1', '0,60798729', '0,357987', '0,588807'],
                  ['2', '0,68962186', '0,081635', '0,118376'],
                  ['3', '0,69314097', '0,003519', '0,005077']
                ]
              }
            },
            { p: M`En 3 iteraciones se alcanza la tolerancia. La raíz exacta es analítica:` },
            { math: M`0{,}5 = e^{-x} \;\Longrightarrow\; x = \ln(2) = 0{,}693147\ldots` }
          ]
        },
        {
          id: 'q8_2', tag: '8.b', tipo: 'num', respuesta: 2, tol: 0.25,
          enunciado: 'Orden de convergencia estimado experimentalmente.',
          placeholder: '0,0',
          desarrollo: [
            { math: M`p = \frac{\ln(0{,}003519/0{,}081635)}{\ln(0{,}081635/0{,}357987)} = 2{,}13 \approx 2` },
            { p: M`Newton-Raphson mantiene su orden cuadrático: la raíz $\ln 2$ es simple y $F'(\ln 2) = 0{,}5 \ne 0$.` },
            { p: M`La estimación con pocas iteraciones da $2{,}13$ en vez de $2{,}00$ exacto porque el régimen asintótico recién se establece cerca de la raíz; con un paso más el valor se acomoda.` }
          ]
        }
      ]
    },

    /* ===================== EXTRA: COMPARACIÓN ===================== */
    {
      id: 'pX1',
      extra: true,
      titulo: 'Comparación de los cinco métodos',
      enunciado: [
        { p: M`La clase del 08/04/2025 resuelve la misma ecuación $F(x) = \dfrac{x^2}{4} - \operatorname{sen}(x) = 0$ con los cinco métodos, partiendo siempre del intervalo $[1{,}6;\,2{,}6]$ y exigiendo $\Delta m < 0{,}5\times 10^{-5}$ (5 decimales).` },
        {
          table: {
            head: [M`$\text{Método}$`, M`$\lambda$`, M`$p$`, M`$N$`],
            rows: [
              ['Bisección', '0,5', '1', '17'],
              ['Regula-Falsi', '≈0,25', '≈1', '8'],
              ['Punto Fijo', '≈0,32', '≈1', '10'],
              ['Secante', '≈0,5', '≈1,6', '6'],
              ['Newton-Raphson', '≈0,5', '≈2', '5']
            ]
          }
        },
        { note: 'El eje de la comparación es INFORMACIÓN contra VELOCIDAD: los métodos de arranque piden poca información y siempre convergen, pero son lentos; los de convergencia son rápidos pero necesitan una semilla suficientemente buena.' }
      ],
      preguntas: [
        {
          id: 'qx1_1', tag: '★.a', tipo: 'mc', correcta: 'C',
          enunciado: 'Bisección y Regula-Falsi se llaman «métodos de arranque». ¿Cuál es su propiedad distintiva?',
          opciones: [
            { v: 'A', html: 'Tienen orden de convergencia mayor que 1.' },
            { v: 'B', html: 'No requieren evaluar la función, sólo su derivada.' },
            { v: 'C', html: 'Siempre convergen, porque mantienen la raíz encerrada verificando $F(a_k)\\cdot F(b_k) < 0$ en cada paso.' },
            { v: 'D', html: 'Convergen en un número de pasos que no depende de la tolerancia.' }
          ],
          desarrollo: [
            { p: M`Bisección y Regula-Falsi conservan en todo momento un intervalo $[a_k;\,b_k]$ con $F(a_k)\cdot F(b_k) < 0$. Por Bolzano, la raíz nunca se escapa: la convergencia está garantizada.` },
            { p: M`Punto fijo, Newton y secante no tienen ese control (la clase los anota como <em>«sin control»</em>): si la semilla es mala, pueden divergir. Por eso el uso combinado — arrancar con bisección para acercarse, refinar con Newton.` }
          ]
        },
        {
          id: 'qx1_2', tag: '★.b', tipo: 'mc', correcta: 'B',
          enunciado: M`El punto fijo y la bisección tienen ambos $p \approx 1$, pero el punto fijo converge en 10 iteraciones contra 17. ¿Por qué?`,
          opciones: [
            { v: 'A', html: 'Porque el punto fijo tiene orden algo mayor que 1 en este caso.' },
            { v: 'B', html: 'Porque su constante asintótica es menor ($\\lambda \\approx 0{,}32$ contra $0{,}5$): con igual orden, achica el error más rápido por iteración.' },
            { v: 'C', html: 'Porque el punto fijo evalúa la derivada y la bisección no.' },
            { v: 'D', html: 'Porque la bisección pierde precisión por cancelación catastrófica.' }
          ],
          desarrollo: [
            { p: M`Con orden lineal el error se reduce aproximadamente en un factor $\lambda$ por paso: $\varepsilon^{(k+1)} \approx \lambda\,\varepsilon^{(k)}$.` },
            { math: M`\text{bisección: } \lambda = 0{,}5 \qquad \text{punto fijo: } \lambda = \left|g'(\alpha)\right| = 0{,}322` },
            { p: M`El número de iteraciones para ganar un factor de precisión escala como $1/\left|\ln\lambda\right|$, de modo que $\ln(0{,}5)/\ln(0{,}322) = 0{,}61$ — coherente con $10/17 = 0{,}59$.` },
            { p: 'Moraleja: el orden no cuenta toda la historia. Entre dos métodos del mismo orden, decide la constante asintótica.' }
          ]
        },
        {
          id: 'qx1_3', tag: '★.c', tipo: 'mc', correcta: 'A',
          enunciado: 'Newton-Raphson tiene el mayor orden ($p=2$), pero la secante resuelve este problema en 6 iteraciones contra 5. ¿Cuándo conviene la secante?',
          opciones: [
            { v: 'A', html: 'Cuando evaluar $F\'$ es caro o imposible: la secante usa una sola evaluación nueva de $F$ por paso, contra $F$ y $F\'$ de Newton.' },
            { v: 'B', html: 'Cuando la función tiene raíces múltiples, porque ahí la secante recupera el orden 2.' },
            { v: 'C', html: 'Nunca: Newton-Raphson es superior en todos los casos.' },
            { v: 'D', html: 'Cuando se necesita garantía de convergencia, porque la secante siempre converge.' }
          ],
          desarrollo: [
            { p: M`La clase plantea justamente esta pregunta: <em>«¿desventajas del método [de Newton]? Requiere evaluar la derivada primera en cada iteración → ¿qué se puede hacer?»</em>. La respuesta es la secante.` },
            { p: M`Medido en <strong>evaluaciones de función</strong> y no en iteraciones, la secante suele ganar: su eficiencia por evaluación es $p^{1/1} = 1{,}618$, contra $2^{1/2} = 1{,}414$ de Newton.` },
            { p: M`La opción D es falsa: la secante tampoco tiene control sobre la convergencia, y si $F(x_k) \approx F(x_{k-1})$ el denominador se hace chico y el paso se dispara.` }
          ]
        }
      ]
    },

    /* ===================== EXTRA: FÍSICA ===================== */
    {
      id: 'pX2',
      extra: true,
      titulo: 'Aplicaciones: electrostática y mecánica',
      enunciado: [
        { p: 'Los dos últimos problemas de la guía requieren conocimientos de Física, que la cátedra aclara que no serán evaluados. Se incluyen por el planteo: en los dos casos, el modelo físico desemboca en una ecuación no lineal que no se puede despejar.' },
        { p: '<strong>Electrostática.</strong> Dos cargas de masa $m$ y carga $q$ cuelgan del mismo punto por hilos de longitud $L$. El sistema está en equilibrio por la gravedad y la repulsión entre las cargas. Hallar la expresión que satisface el ángulo $\\alpha$ que cada hilo forma con la vertical.' },
        { p: '<strong>Mecánica.</strong> Una partícula $m$ está unida a dos resortes de constante $k$ y longitud natural $L_0$, cuyos extremos fijos están separados $2a$. Por simetría la masa sólo se mueve en $y$. La fuerza resultante es:' },
        { math: M`F_{\text{res}}(y) = -2ky\left(1 - \frac{L_0}{\sqrt{y^2+a^2}}\right) - mg` }
      ],
      preguntas: [
        {
          id: 'qx2_1', tag: '★.d', tipo: 'mc', correcta: 'B',
          enunciado: M`Ecuación de equilibrio para el ángulo $\alpha$ en el problema electrostático:`,
          opciones: [
            { v: 'A', tex: M`\operatorname{sen}(\alpha)\tan(\alpha) = \frac{k_e q^{2}}{4mgL^{2}}` },
            { v: 'B', tex: M`\operatorname{sen}^{2}(\alpha)\tan(\alpha) = \frac{k_e q^{2}}{4mgL^{2}}` },
            { v: 'C', tex: M`\tan(\alpha) = \frac{k_e q^{2}}{4mgL^{2}}` },
            { v: 'D', tex: M`\cos^{2}(\alpha)\tan(\alpha) = \frac{k_e q^{2}}{4mgL^{2}}` }
          ],
          desarrollo: [
            { p: 'Equilibrio de cada carga: la tensión se descompone en vertical y horizontal.' },
            { math: M`T\cos(\alpha) = mg \qquad T\operatorname{sen}(\alpha) = F_e = \frac{k_e q^{2}}{d^{2}}` },
            { p: M`La separación entre cargas es $d = 2L\operatorname{sen}(\alpha)$. Dividiendo las dos ecuaciones:` },
            { math: M`\tan(\alpha) = \frac{k_e q^{2}}{mg\,d^{2}} = \frac{k_e q^{2}}{4mgL^{2}\operatorname{sen}^{2}(\alpha)}` },
            { math: M`\operatorname{sen}^{2}(\alpha)\tan(\alpha) = \frac{k_e q^{2}}{4mgL^{2}}` },
            { p: M`El miembro izquierdo no se puede invertir analíticamente: es una ecuación no lineal en $\alpha$, y se resuelve por cualquiera de los métodos de la guía. Como el miembro izquierdo es monótono creciente en $(0;\,\pi/2)$, la solución existe y es única.` }
          ]
        },
        {
          id: 'qx2_2', tag: '★.e', tipo: 'mc', correcta: 'C',
          enunciado: M`Sin gravedad ($g=0$), ¿dónde están los puntos de equilibrio del sistema mecánico?`,
          opciones: [
            { v: 'A', html: 'Sólo en $y=0$, siempre.' },
            { v: 'B', html: 'En $y = \\pm\\sqrt{L_0^2 + a^2}$, siempre.' },
            { v: 'C', html: 'En $y=0$ y además en $y = \\pm\\sqrt{L_0^2 - a^2}$, estos últimos sólo si $L_0 > a$.' },
            { v: 'D', html: 'No hay puntos de equilibrio.' }
          ],
          desarrollo: [
            { p: M`Con $g=0$ la condición $F_{\text{res}}(y)=0$ queda:` },
            { math: M`-2ky\left(1 - \frac{L_0}{\sqrt{y^2+a^2}}\right) = 0` },
            { p: 'El producto se anula si alguno de los factores lo hace:' },
            { math: M`\begin{aligned}
              y &= 0 \\[2pt]
              \sqrt{y^2+a^2} &= L_0 \;\Longrightarrow\; y = \pm\sqrt{L_0^{2}-a^{2}}
            \end{aligned}` },
            { p: M`Los dos últimos existen sólo si $L_0 > a$, es decir si los resortes están <em>comprimidos</em> en la posición horizontal. Éste es el caso interesante: el equilibrio central $y=0$ se vuelve inestable y aparecen dos estables a los costados (una bifurcación).` },
            { p: M`Con $L_0 = 1$ y $a = 0{,}6$: $y = \pm 0{,}8$.` }
          ]
        },
        {
          id: 'qx2_3', tag: '★.f', tipo: 'mc', correcta: 'D',
          enunciado: M`Con gravedad ($g \ne 0$), ¿cómo se obtienen los puntos de equilibrio?`,
          opciones: [
            { v: 'A', html: 'Igual que antes, desplazando las raíces en $-mg/(2k)$.' },
            { v: 'B', html: 'No existen puntos de equilibrio.' },
            { v: 'C', html: 'Despejando $y$ analíticamente de la ecuación cuártica resultante.' },
            { v: 'D', html: 'Numéricamente: la ecuación no se puede despejar, así que se busca la raíz de $F_{\\text{res}}(y)=0$ con alguno de los métodos de la guía.' }
          ],
          desarrollo: [
            { math: M`-2ky\left(1 - \frac{L_0}{\sqrt{y^2+a^2}}\right) - mg = 0` },
            { p: M`Ahora el término $-mg$ rompe la factorización: $y$ aparece tanto fuera como dentro de la raíz cuadrada, y no hay despeje posible. Es exactamente la situación que motiva toda la unidad — la misma que abre la clase: <em>«resolver problemas de la Física/Ingeniería donde no existe solución analítica»</em>.` },
            { p: M`Ejemplo numérico con $k=100$ N/m, $m=1$ kg, $L_0=1$ m, $a=0{,}6$ m: por bisección en $[-2;\,-0{,}05]$ se obtiene $y_{\text{eq}} = -0{,}873250$ m, con $F_{\text{res}}(y_{\text{eq}}) \approx 10^{-15}$.` },
            { p: 'Notar que la gravedad rompe la simetría: el equilibrio se corre hacia abajo respecto del $\\pm 0{,}8$ del caso sin peso.' }
          ]
        }
      ]
    }
  ]
};

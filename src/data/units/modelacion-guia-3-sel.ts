/* ============================================================================
   Unidad — 95.13 Métodos Matemáticos y Numéricos (FIUBA), Guía 3: Sistemas de Ecuaciones Lineales
   ----------------------------------------------------------------------------
   Contenido puro: el motor vive en src/components / src/lib. Para dar de alta
   otra unidad, copiá src/data/units/_plantilla.ts — no hace falta tocar el motor.

   La notación y los criterios siguen las clases «SEL Directos» y «SEL
   Iterativos». Todos los valores fueron verificados con numpy antes de
   escribirse.

   ========================================================================== */

import type { Unidad } from '@/types/quiz';
import { M } from '@/lib/tex';

export const unidad: Unidad = {
  id: 'modelacion-guia-3-sel',
  codigo: '95.13',
  materia: 'Métodos Numéricos',
  unidad: 'Guía 3 — Sistemas de Ecuaciones Lineales',
  facultad: 'Facultad de Ingeniería — UBA',

  problemas: [
    /* ===================== PROBLEMA 1 ===================== */
    {
      id: 'p1',
      titulo: 'Eliminación de Gauss sin pivoteo (Vandermonde 4×4)',
      enunciado: [
        { p: M`Resolver el sistema lineal $A\,x = b$ utilizando eliminación de Gauss <strong>sin pivoteo</strong>:` },
        { math: M`A = \begin{bmatrix} 1 & 2 & 3 & 4 \\ 1 & 4 & 9 & 16 \\ 1 & 8 & 27 & 64 \\ 1 & 16 & 81 & 256 \end{bmatrix}` },
        { math: M`b = \begin{Bmatrix} 2 \\ 10 \\ 44 \\ 190 \end{Bmatrix}` },
        { note: 'Los coeficientes son enteros y todos los multiplicadores dan exactos: se puede trabajar sin error de redondeo. Es el ejemplo que la cátedra desarrolla paso a paso en la clase de métodos directos.' }
      ],
      preguntas: [
        {
          id: 'q1_1', tag: '1.a', tipo: 'mc', correcta: 'C',
          enunciado: M`Después de triangular, ¿cuál es la matriz $U$ (triangular superior) que queda?`,
          opciones: [
            { v: 'A', tex: M`U = \begin{bmatrix} 1 & 2 & 3 & 4 \\ 0 & 2 & 6 & 12 \\ 0 & 0 & 6 & 12 \\ 0 & 0 & 0 & 12 \end{bmatrix}` },
            { v: 'B', tex: M`U = \begin{bmatrix} 1 & 2 & 3 & 4 \\ 0 & 2 & 6 & 12 \\ 0 & 0 & 12 & 48 \\ 0 & 0 & 0 & 24 \end{bmatrix}` },
            { v: 'C', tex: M`U = \begin{bmatrix} 1 & 2 & 3 & 4 \\ 0 & 2 & 6 & 12 \\ 0 & 0 & 6 & 24 \\ 0 & 0 & 0 & 24 \end{bmatrix}` },
            { v: 'D', tex: M`U = \begin{bmatrix} 1 & 2 & 3 & 4 \\ 0 & 3 & 6 & 12 \\ 0 & 0 & 6 & 24 \\ 0 & 0 & 0 & 18 \end{bmatrix}` }
          ],
          desarrollo: [
            { p: M`<strong>Primera columna.</strong> Los multiplicadores son $m_{21} = m_{31} = m_{41} = 1$ (todos los $a_{i1}$ valen 1 y el pivote también). Con $E_i \leftarrow E_i - m_{i1}E_1$:` },
            { math: M`[A\,|\,b] = \left[\begin{array}{cccc|c}
              1 & 2 & 3 & 4 & 2 \\ 0 & 2 & 6 & 12 & 8 \\ 0 & 6 & 24 & 60 & 42 \\ 0 & 14 & 78 & 252 & 188
              \end{array}\right]` },
            { p: M`<strong>Segunda columna.</strong> $m_{32} = 6/2 = 3$, $m_{42} = 14/2 = 7$:` },
            { math: M`\left[\begin{array}{cccc|c}
              1 & 2 & 3 & 4 & 2 \\ 0 & 2 & 6 & 12 & 8 \\ 0 & 0 & 6 & 24 & 18 \\ 0 & 0 & 36 & 168 & 132
              \end{array}\right]` },
            { p: M`<strong>Tercera columna.</strong> $m_{43} = 36/6 = 6$:` },
            { math: M`\left[\begin{array}{cccc|c}
              1 & 2 & 3 & 4 & 2 \\ 0 & 2 & 6 & 12 & 8 \\ 0 & 0 & 6 & 24 & 18 \\ 0 & 0 & 0 & 24 & 24
              \end{array}\right]` },
            { p: M`Ninguna división es inexacta, así que la triangulación es exacta: no hay error de redondeo que arrastrar.` }
          ]
        },
        {
          id: 'q1_2', tag: '1.b', tipo: 'num', respuesta: 1, tol: 0.001,
          enunciado: M`Por sustitución inversa, ¿cuánto vale $x_4$?`,
          placeholder: '0,00',
          desarrollo: [
            { math: M`x_4 = \frac{24}{24} = 1` }
          ]
        },
        {
          id: 'q1_3', tag: '1.b', tipo: 'num', respuesta: -1, tol: 0.001,
          enunciado: M`¿Cuánto vale $x_3$?`,
          placeholder: '0,00',
          desarrollo: [
            { math: M`x_3 = \frac{18 - 24\,x_4}{6} = \frac{18 - 24}{6} = -1` }
          ]
        },
        {
          id: 'q1_4', tag: '1.b', tipo: 'num', respuesta: 1, tol: 0.001,
          enunciado: M`¿Cuánto vale $x_2$?`,
          placeholder: '0,00',
          desarrollo: [
            { math: M`x_2 = \frac{8 - 12\,x_4 - 6\,x_3}{2} = \frac{8 - 12 + 6}{2} = \frac{2}{2} = 1` }
          ]
        },
        {
          id: 'q1_5', tag: '1.b', tipo: 'num', respuesta: -1, tol: 0.001,
          enunciado: M`¿Cuánto vale $x_1$?`,
          ayuda: 'La solución completa alterna signos.',
          placeholder: '0,00',
          desarrollo: [
            { math: M`x_1 = \frac{2 - 4\,x_4 - 3\,x_3 - 2\,x_2}{1} = 2 - 4 + 3 - 2 = -1` },
            { p: M`La solución es $x = \{-1,\;1,\;-1,\;1\}^{T}$, y se verifica reemplazando en la primera ecuación: $-1 + 2 - 3 + 4 = 2$ ✓.` },
            { p: M`La matriz es de Vandermonde con nodos $2,\,4,\,8,\,16$ (en realidad, $A_{ij} = (2^i)^j$). Su determinante es $\det A = 288$ y su número de condición $K_\infty(A) = 3540$: aun sin errores de redondeo en este caso, es un sistema mal condicionado.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 2 ===================== */
    {
      id: 'p2',
      titulo: 'Pivoteo parcial y refinamiento con $t=4$',
      enunciado: [
        { p: M`Resolver el siguiente sistema con aritmética de punto flotante de $t = 4$ dígitos y <strong>redondeo simétrico</strong>:` },
        { math: M`\begin{bmatrix} 3{,}241 & 160 \\ 10200 & 1540 \end{bmatrix}
                  \begin{Bmatrix} x \\ y \end{Bmatrix}
                  = \begin{Bmatrix} 163{,}2 \\ 11740 \end{Bmatrix}` },
        { p: '<strong>a)</strong> Eliminación de Gauss sin pivoteo.<br><strong>b)</strong> Ídem con pivoteo parcial.<br><strong>c)</strong> Ídem (a), con refinamiento de la solución.<br><strong>d)</strong> Conclusiones.' },
        { note: 'La solución exacta es x = 1,000039 ; y = 0,999743 — es decir, prácticamente (1 ; 1).' }
      ],
      preguntas: [
        {
          id: 'q2_1', tag: '2.a', tipo: 'num', respuesta: 3147, reltol: 0.002,
          enunciado: M`<strong>Sin pivoteo:</strong> ¿cuánto vale el multiplicador $m_{21}$ redondeado a 4 dígitos?`,
          ayuda: 'Multiplicador = elemento a eliminar sobre el pivote.',
          placeholder: '0000',
          desarrollo: [
            { math: M`m_{21} = \frac{a_{21}}{a_{11}} = \frac{10200}{3{,}241} = 3147{,}1767\ldots \;\xrightarrow{t=4}\; 3147` },
            { p: M`Un multiplicador de este tamaño es la señal de alarma: al hacer $E_2 \leftarrow E_2 - m_{21}E_1$ los términos originales de la fila 2 quedan aplastados por los productos, y su información se pierde en el redondeo. La clase lo dice explícitamente: «los multiplicadores grandes generan más error de redondeo».` }
          ]
        },
        {
          id: 'q2_2', tag: '2.a', tipo: 'mc', correcta: 'B',
          enunciado: M`Siguiendo con $t=4$, ¿qué valores toman $a_{22}'$ y $b_2'$?`,
          opciones: [
            { v: 'A', tex: M`a_{22}' = -502000 \;;\quad b_2' = -513600` },
            { v: 'B', tex: M`a_{22}' = -502000 \;;\quad b_2' = -501900` },
            { v: 'C', tex: M`a_{22}' = 503500 \;;\quad b_2' = 513600` },
            { v: 'D', tex: M`a_{22}' = -1500 \;;\quad b_2' = -1900` }
          ],
          desarrollo: [
            { math: M`\begin{aligned}
              m_{21}\,a_{12} &= 3147 \times 160 = 503520 \;\xrightarrow{t=4}\; 503500 \\[2pt]
              a_{22}' &= 1540 - 503500 = -501960 \;\xrightarrow{t=4}\; -502000 \\[6pt]
              m_{21}\,b_1 &= 3147 \times 163{,}2 = 513590{,}4 \;\xrightarrow{t=4}\; 513600 \\[2pt]
              b_2' &= 11740 - 513600 = -501860 \;\xrightarrow{t=4}\; -501900
            \end{aligned}` },
            { p: M`Los cuatro dígitos de $1540$ y de $11740$ desaparecen: el resultado queda determinado casi por completo por los productos $m_{21}a_{12}$ y $m_{21}b_1$, que ya venían redondeados. Ese es el mecanismo por el que el pivote chico destruye la precisión.` }
          ]
        },
        {
          id: 'q2_3', tag: '2.a', tipo: 'num', respuesta: 0.9873, tol: 0.02,
          enunciado: M`Terminando la sustitución inversa sin pivoteo, ¿cuánto vale $x$?`,
          ayuda: 'El valor exacto es 1,000039: mirá cuánto se despegó.',
          placeholder: '0,0000',
          desarrollo: [
            { math: M`y = \frac{b_2'}{a_{22}'} = \frac{-501900}{-502000} = 0{,}99980\ldots \;\xrightarrow{t=4}\; 0{,}9998` },
            { math: M`x = \frac{b_1 - a_{12}\,y}{a_{11}} = \frac{163{,}2 - 160 \times 0{,}9998}{3{,}241} = \frac{163{,}2 - 159{,}97}{3{,}241} = \frac{3{,}230}{3{,}241} = 0{,}9966\ldots` },
            { p: M`Según el orden exacto en que se apliquen los redondeos intermedios, el resultado cae entre $0{,}987$ y $0{,}997$. En cualquiera de las variantes el error de $x$ es de <strong>dos a tres órdenes de magnitud mayor</strong> que el de $y$: $y$ salió con cuatro dígitos correctos y $x$ con dos o tres.` },
            { p: M`La asimetría se explica sola: $x$ se despeja de una resta $163{,}2 - 159{,}97$ que cancela casi tres dígitos, y esa cancelación amplifica el error que traía $y$.` }
          ]
        },
        {
          id: 'q2_4', tag: '2.b', tipo: 'mc', correcta: 'A',
          enunciado: M`<strong>Con pivoteo parcial</strong> (se permutan las filas porque $|10200| > |3{,}241|$), la solución con $t=4$ resulta:`,
          opciones: [
            { v: 'A', tex: M`x = 1{,}000 \;;\quad y = 1{,}000` },
            { v: 'B', tex: M`x = 0{,}9873 \;;\quad y = 0{,}9998` },
            { v: 'C', tex: M`x = 1{,}013 \;;\quad y = 0{,}9998` },
            { v: 'D', tex: M`x = 1{,}000 \;;\quad y = 0{,}9873` }
          ],
          desarrollo: [
            { p: M`Permutando $E_1 \leftrightarrow E_2$ el pivote pasa a ser $10200$ y el multiplicador se vuelve minúsculo:` },
            { math: M`m_{21} = \frac{3{,}241}{10200} = 0{,}00031774\ldots \;\xrightarrow{t=4}\; 0{,}0003177` },
            { math: M`\begin{aligned}
              a_{22}' &= 160 - 0{,}0003177 \times 1540 = 160 - 0{,}4893 = 159{,}5 \\[2pt]
              b_2' &= 163{,}2 - 0{,}0003177 \times 11740 = 163{,}2 - 3{,}730 = 159{,}5
            \end{aligned}` },
            { math: M`y = \frac{159{,}5}{159{,}5} = 1{,}000 \qquad
                      x = \frac{11740 - 1540 \times 1{,}000}{10200} = \frac{10200}{10200} = 1{,}000` },
            { p: M`Con sólo cuatro dígitos se recupera la solución prácticamente exacta. La diferencia con (a) no está en el sistema sino en el <em>algoritmo</em>: el pivoteo mantiene los multiplicadores por debajo de 1 y evita que los términos de la fila se aplasten entre sí.` }
          ]
        },
        {
          id: 'q2_5', tag: '2.c', tipo: 'mc', correcta: 'C',
          enunciado: M`Para refinar la solución de (a) hay que calcular el residuo $r = b - A\tilde{x}$. ¿Por qué la cátedra insiste en evaluarlo en <strong>doble precisión</strong>?`,
          opciones: [
            { v: 'A', html: 'Porque el sistema $A\\,\\delta x = r$ es más difícil de resolver que el original.' },
            { v: 'B', html: 'Porque el residuo siempre es exactamente cero si se usa la misma precisión.' },
            { v: 'C', html: 'Porque $r$ es una diferencia entre números casi iguales: con $t$ dígitos la cancelación catastrófica se lleva casi todas las cifras significativas del residuo, y el refinamiento deja de aportar información.' },
            { v: 'D', html: 'Porque el residuo es un vector y los vectores requieren más precisión que los escalares.' }
          ],
          desarrollo: [
            { p: M`$A\tilde{x}$ se parece mucho a $b$ justamente porque $\tilde{x}$ es una buena solución aproximada. Restar dos números casi iguales es el caso de libro de <strong>cancelación catastrófica</strong>: los dígitos de más peso se anulan y lo que sobrevive son los últimos dígitos, que son precisamente los contaminados por el redondeo.` },
            { p: M`En este sistema el residuo es $r = (0{,}00007;\;28{,}87)$ para la solución sin pivoteo: obtenerlo con $t=4$ desde productos del orden de $10^{4}$ significa quedarse sin dígitos útiles.` },
            { p: M`El punto (d) del Problema 5 de la guía muestra el resultado de no hacerlo: la «solución refinada» sale <em>peor</em> que la de partida.` }
          ]
        },
        {
          id: 'q2_6', tag: '2.d', tipo: 'mc', correcta: 'B',
          enunciado: M`¿Cuál es la conclusión correcta del problema?`,
          opciones: [
            { v: 'A', html: 'La matriz está muy mal condicionada, por eso ningún algoritmo puede resolverla con $t=4$.' },
            { v: 'B', html: 'La matriz está <strong>bien condicionada</strong> ($K_\\infty(A) \\approx 74$); el error de (a) lo genera el algoritmo —el pivote chico y el multiplicador enorme—, no el problema. Pivotear lo elimina.' },
            { v: 'C', html: 'El error se debe a que $b$ tiene componentes de órdenes muy distintos, y eso no se puede corregir.' },
            { v: 'D', html: 'Sin pivoteo y con refinamiento se obtiene siempre la misma precisión que con pivoteo, así que el pivoteo es opcional.' }
          ],
          desarrollo: [
            { p: M`Calculando el número de condición exacto:` },
            { math: M`K_\infty(A) = \|A\|_\infty \cdot \|A^{-1}\|_\infty \approx 73{,}6` },
            { p: M`Un $K \approx 74$ es perfectamente manejable: con $t=4$ dígitos uno esperaría perder apenas $p = \log_{10} K \approx 1{,}9$ dígitos y conservar $q = t - p \approx 2$. Sin embargo, sin pivoteo se perdieron casi todos.` },
            { p: M`Moraleja: <strong>condicionamiento y estabilidad numérica son cosas distintas</strong>. El condicionamiento es una propiedad del problema; la estabilidad, del algoritmo. Acá el problema estaba sano y el algoritmo era el enfermo, y la cura (pivotear) es gratis.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 3 ===================== */
    {
      id: 'p3',
      titulo: 'Gauss con pivoteo, LU y refinamiento ($t=3$)',
      enunciado: [
        { p: M`Resolver el siguiente sistema con aritmética de punto flotante de <strong>3 dígitos</strong>:` },
        { math: M`\begin{bmatrix} 2{,}15 & -0{,}924 & -1{,}29 \\ -4{,}12 & 2{,}29 & 0{,}294 \\ 1{,}01 & 0{,}872 & -3{,}25 \end{bmatrix}
                  \begin{Bmatrix} x_1 \\ x_2 \\ x_3 \end{Bmatrix}
                  = \begin{Bmatrix} 1{,}22 \\ -3{,}56 \\ -0{,}972 \end{Bmatrix}` },
        { p: '<strong>a)</strong> Eliminación de Gauss con pivoteo parcial.<br><strong>b)</strong> Hallar la descomposición $LU$ de la matriz de coeficientes y usarla para estimar el error de redondeo, refinando la solución.' },
        { note: 'Este es el ejercicio que la cátedra desarrolla completo en la clase «SEL Directos»: primero sin pivoteo, después con pivoteo parcial, y finalmente refinando el caso sin pivoteo. La solución exacta es x = (0,85198 ; −0,09102 ; 0,53942).' }
      ],
      preguntas: [
        {
          id: 'q3_1', tag: '3.a', tipo: 'mc', correcta: 'C',
          enunciado: M`<strong>Sin pivoteo</strong>, la factorización con $t=3$ da $L$ y $U$ iguales a:`,
          opciones: [
            { v: 'A', tex: M`L = \begin{bmatrix} 1 & 0 & 0 \\ 1{,}92 & 1 & 0 \\ -0{,}470 & -2{,}54 & 1 \end{bmatrix},\;
                             U = \begin{bmatrix} 2{,}15 & -0{,}924 & -1{,}29 \\ 0 & 0{,}516 & -2{,}18 \\ 0 & 0 & 2{,}90 \end{bmatrix}` },
            { v: 'B', tex: M`L = \begin{bmatrix} 1 & 0 & 0 \\ -1{,}92 & 1 & 0 \\ 0{,}470 & 2{,}54 & 1 \end{bmatrix},\;
                             U = \begin{bmatrix} 2{,}15 & -0{,}924 & -1{,}29 \\ 0 & 0{,}516 & -2{,}18 \\ 0 & 0 & -2{,}90 \end{bmatrix}` },
            { v: 'C', tex: M`L = \begin{bmatrix} 1 & 0 & 0 \\ -1{,}92 & 1 & 0 \\ 0{,}470 & 2{,}54 & 1 \end{bmatrix},\;
                             U = \begin{bmatrix} 2{,}15 & -0{,}924 & -1{,}29 \\ 0 & 0{,}516 & -2{,}18 \\ 0 & 0 & 2{,}90 \end{bmatrix}` },
            { v: 'D', tex: M`L = \begin{bmatrix} 2{,}15 & 0 & 0 \\ -4{,}12 & 0{,}516 & 0 \\ 1{,}01 & 2{,}54 & 2{,}90 \end{bmatrix},\;
                             U = \begin{bmatrix} 1 & -0{,}430 & -0{,}600 \\ 0 & 1 & -4{,}22 \\ 0 & 0 & 1 \end{bmatrix}` }
          ],
          desarrollo: [
            { p: M`En Doolittle ($l_{ii} = 1$) la clase lo resume así: <em>$U$ es la matriz que queda al triangular por Gauss y $L$ es la matriz formada por los multiplicadores de ese proceso</em>.` },
            { math: M`m_{21} = \frac{-4{,}12}{2{,}15} = -1{,}9162\ldots \to -1{,}92 \qquad
                      m_{31} = \frac{1{,}01}{2{,}15} = 0{,}46976\ldots \to 0{,}470` },
            { math: M`\left[\begin{array}{ccc|c}
              2{,}15 & -0{,}924 & -1{,}29 & 1{,}22 \\
              [-1{,}92] & 0{,}516 & -2{,}18 & -1{,}22 \\
              [0{,}470] & 1{,}31 & -2{,}64 & -1{,}55
              \end{array}\right]` },
            { math: M`m_{32} = \frac{1{,}31}{0{,}516} = 2{,}5387\ldots \to 2{,}54
                      \quad\Longrightarrow\quad u_{33} = -2{,}64 - 2{,}54 \times (-2{,}18) = 2{,}90` },
            { p: M`Ojo con el signo de $L$: los multiplicadores entran <strong>tal cual</strong>, con su signo, porque $A = LU$ y no $A = -LU$. La opción A invierte los signos (error clásico de confundir $m_{ij}$ con $-m_{ij}$) y la B se equivoca en el signo de $u_{33}$.` }
          ]
        },
        {
          id: 'q3_2', tag: '3.a', tipo: 'num', respuesta: 0.534, tol: 0.006,
          enunciado: M`Resolviendo $L\,y = b$ y después $U\,x = y$ (sin pivoteo, $t=3$), ¿cuánto vale $x_3$?`,
          ayuda: 'Sustitución directa y luego inversa; tres dígitos en cada paso.',
          placeholder: '0,000',
          desarrollo: [
            { p: M`<strong>Sustitución directa</strong> en $L\,y = b$:` },
            { math: M`\begin{aligned}
              y_1 &= 1{,}22 \\
              y_2 &= -3{,}56 + 1{,}92\,y_1 = -3{,}56 + 2{,}34 = -1{,}22 \\
              y_3 &= -0{,}972 - 0{,}470\,y_1 - 2{,}54\,y_2 = -0{,}972 - 0{,}573 + 3{,}10 = 1{,}55
            \end{aligned}` },
            { p: M`<strong>Sustitución inversa</strong> en $U\,x = y$:` },
            { math: M`x_3 = \frac{1{,}55}{2{,}90} = 0{,}53448\ldots \;\xrightarrow{t=3}\; 0{,}534` },
            { p: M`El valor exacto es $0{,}53942$: con tres dígitos ya se perdió el tercero.` }
          ]
        },
        {
          id: 'q3_3', tag: '3.a', tipo: 'mc', correcta: 'A',
          enunciado: M`Comparando la solución <strong>sin pivoteo</strong> con la de <strong>pivoteo parcial</strong> (ambas con $t=3$), ¿cuál es el par correcto?`,
          opciones: [
            { v: 'A', tex: M`\text{sin piv.: } \begin{Bmatrix} 0{,}841 \\ -0{,}108 \\ 0{,}534 \end{Bmatrix}
                             \quad\text{con piv.: } \begin{Bmatrix} 0{,}851 \\ -0{,}0925 \\ 0{,}537 \end{Bmatrix}` },
            { v: 'B', tex: M`\text{sin piv.: } \begin{Bmatrix} 0{,}851 \\ -0{,}0925 \\ 0{,}537 \end{Bmatrix}
                             \quad\text{con piv.: } \begin{Bmatrix} 0{,}841 \\ -0{,}108 \\ 0{,}534 \end{Bmatrix}` },
            { v: 'C', tex: M`\text{sin piv.: } \begin{Bmatrix} 0{,}841 \\ -0{,}108 \\ 0{,}534 \end{Bmatrix}
                             \quad\text{con piv.: } \begin{Bmatrix} 0{,}841 \\ -0{,}108 \\ 0{,}534 \end{Bmatrix}` },
            { v: 'D', tex: M`\text{sin piv.: } \begin{Bmatrix} 1{,}22 \\ -1{,}22 \\ 1{,}55 \end{Bmatrix}
                             \quad\text{con piv.: } \begin{Bmatrix} -3{,}56 \\ -1{,}84 \\ -0{,}288 \end{Bmatrix}` }
          ],
          desarrollo: [
            { p: M`Con <strong>pivoteo parcial</strong> se permuta $f_1 \leftrightarrow f_2$ (porque $|-4{,}12| > |2{,}15|$) y luego $f_2 \leftrightarrow f_3$:` },
            { math: M`U = \begin{bmatrix} -4{,}12 & 2{,}29 & 0{,}294 \\ 0 & 1{,}43 & -3{,}18 \\ 0 & 0 & -0{,}536 \end{bmatrix}
                      \qquad
                      L = \begin{bmatrix} 1 & 0 & 0 \\ -0{,}245 & 1 & 0 \\ -0{,}522 & 0{,}190 & 1 \end{bmatrix}` },
            { math: M`y = \begin{Bmatrix} -3{,}56 \\ -1{,}84 \\ -0{,}288 \end{Bmatrix}
                      \quad\Longrightarrow\quad
                      x_3 = \frac{-0{,}288}{-0{,}536} = 0{,}537,\quad
                      x_2 = \frac{-1{,}84 + 3{,}18 \times 0{,}537}{1{,}43} = -0{,}0925,\quad
                      x_1 = 0{,}851` },
            { p: M`Contra la solución exacta $(0{,}85198;\,-0{,}09102;\,0{,}53942)$:` },
            {
              table: {
                head: ['', 'sin pivoteo', 'con pivoteo', 'exacta'],
                rows: [
                  [M`x_1`, '0,841', '0,851', '0,85198'],
                  [M`x_2`, '−0,108', '−0,0925', '−0,09102'],
                  [M`x_3`, '0,534', '0,537', '0,53942']
                ]
              }
            },
            { p: M`El pivoteo gana aproximadamente un dígito significativo en cada componente, y lo gana gratis: la cuenta de operaciones es la misma, sólo cambia el orden de las filas. La opción D confunde el vector intermedio $y$ con la solución $x$, que es el error de olvidarse la segunda sustitución.` }
          ]
        },
        {
          id: 'q3_4', tag: '3.b', tipo: 'mc', correcta: 'B',
          enunciado: M`Para refinar la solución sin pivoteo se calcula $r = b - A\tilde{x}$ en doble precisión. ¿Qué sistema hay que resolver a continuación, y qué conviene reutilizar?`,
          opciones: [
            { v: 'A', html: 'Resolver $A\\,x^{(1)} = r$ desde cero, factorizando $A$ de nuevo.' },
            { v: 'B', html: 'Resolver $A\\,\\delta x = r$ reutilizando la factorización $LU$ ya calculada: $L\\,\\delta y = r$ y $U\\,\\delta x = \\delta y$. Luego $x^{(1)} = \\tilde{x} + \\delta x$.' },
            { v: 'C', html: 'Resolver $A^{-1}\\,\\delta x = r$ invirtiendo explícitamente la matriz.' },
            { v: 'D', html: 'Resolver $A\\,\\delta x = b$ y restar: $x^{(1)} = \\tilde{x} - \\delta x$.' }
          ],
          desarrollo: [
            { p: M`Partiendo de $A\,x = b$ y de la solución aproximada $\tilde{x}$:` },
            { math: M`b - A\tilde{x} = r \neq 0
                      \quad\Longrightarrow\quad
                      A\,x - A\tilde{x} = A\,(x - \tilde{x}) = A\,\delta x = r` },
            { p: M`Como la clase remarca: «<em>no hace falta resolver el SEL: para algo factoricé en $L$ y $U$ antes</em>». La factorización no depende de $b$, así que cada refinamiento cuesta sólo dos sustituciones ($O(n^2)$) en lugar de una eliminación completa ($O(n^3)/3$). Ése es el gran argumento a favor de guardar $L$ y $U$ en vez de triangular la matriz aumentada.` },
            { math: M`r = \begin{Bmatrix} 0{,}000918 \\ -0{,}00476 \\ 0{,}00827 \end{Bmatrix}
                      \;\Longrightarrow\;
                      \delta y = \begin{Bmatrix} 0{,}00918 \\ -0{,}00300 \\ 0{,}0155 \end{Bmatrix}
                      \;\Longrightarrow\;
                      \delta x = \begin{Bmatrix} 0{,}0108 \\ 0{,}0168 \\ 0{,}0535 \end{Bmatrix}` }
          ]
        },
        {
          id: 'q3_5', tag: '3.b', tipo: 'num', respuesta: 0.852, tol: 0.004,
          enunciado: M`Con $\delta x_1 = 0{,}0108$, ¿cuánto vale la primera componente de la solución refinada $x^{(1)}$?`,
          placeholder: '0,000',
          desarrollo: [
            { math: M`x_1^{(1)} = \tilde{x}_1 + \delta x_1 = 0{,}841 + 0{,}0108 = 0{,}8518 \;\xrightarrow{t=3}\; 0{,}852` },
            { p: M`Las tres componentes refinadas quedan $x^{(1)} = (0{,}852;\,-0{,}0914;\,0{,}539)$, contra la exacta $(0{,}85198;\,-0{,}09102;\,0{,}53942)$: <strong>una sola pasada de refinamiento recupera los tres dígitos</strong>, y deja la solución sin pivoteo mejor que la que se obtuvo con pivoteo.` }
          ]
        },
        {
          id: 'q3_6', tag: '3.b', tipo: 'num', respuesta: 42, reltol: 0.6,
          enunciado: M`Estimar experimentalmente el número de condición con $K(A) \approx \dfrac{\|\delta x\|_\infty}{\|\tilde{x}\|_\infty}\,10^{\,t}$, con $t = 3$.`,
          ayuda: 'Norma infinito de un vector = módulo de la componente más grande.',
          placeholder: '00',
          desarrollo: [
            { math: M`\|\delta x\|_\infty = \max\{0{,}0108;\; 0{,}0168;\; 0{,}0535\} = 0{,}0535
                      \qquad
                      \|\tilde{x}\|_\infty = \max\{0{,}841;\; 0{,}108;\; 0{,}534\} = 0{,}841` },
            { math: M`K(A) \approx \frac{0{,}0535}{0{,}841}\,10^{3} = 0{,}0636 \times 1000 \approx 64` },
            { p: M`El valor exacto es $K_\infty(A) = \|A\|_\infty\|A^{-1}\|_\infty \approx 50$, así que la estimación es buena. La clase escribe $K(A) \approx 20$, un número del mismo orden: la fórmula sólo pretende dar el <strong>orden de magnitud</strong>, que es lo único que se usa después.` },
            { p: M`Por eso se acepta cualquier valor entre 17 y 67, que cubre tanto la cuenta directa como la estimación de la cátedra.` },
            { p: M`Con ese $K$: $p = \log_{10} K$ está entre $1{,}3$ y $1{,}8$ dígitos perdidos, y $q = t - p$ entre $1{,}2$ y $1{,}7$ dígitos ganados por refinamiento. Como dice la clase, «en cada refinamiento mejoraría 1 ó 2 dígitos», y <strong>si $q < 0$ no vale la pena refinar</strong>.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 4 ===================== */
    {
      id: 'p4',
      titulo: 'LU de Doolittle con vector de permutaciones',
      enunciado: [
        { p: M`Dada la siguiente descomposición $LU$ de Doolittle de la matriz $A$, efectuada con pivoteo parcial:` },
        { math: M`L = \begin{bmatrix} 1 & 0 & 0 \\ -1/2 & 1 & 0 \\ 1/2 & 1/5 & 1 \end{bmatrix}
                  \qquad
                  U = \begin{bmatrix} 4 & 1 & 0 \\ 0 & 5/2 & 1 \\ 0 & 0 & 4/5 \end{bmatrix}
                  \qquad
                  p = \begin{Bmatrix} 2 \\ 3 \\ 1 \end{Bmatrix}` },
        { p: M`El vector $p$ indica cómo fueron las permutaciones de filas: el «2» en la primera posición indica que la segunda fila de la matriz original quedó en la primera fila.` },
        { p: M`<strong>a)</strong> Resolver $A\,x = b$ con $b = \{1 \;\; -2 \;\; 7\}^{T}$.<br><strong>b)</strong> Obtener la matriz $A$ y verificar la solución.` }
      ],
      preguntas: [
        {
          id: 'q4_1', tag: '4.a', tipo: 'mc', correcta: 'B',
          enunciado: M`Antes de sustituir hay que permutar $b$ del mismo modo que se permutaron las filas de $A$. ¿Cuál es el $b^{*}$ correcto?`,
          opciones: [
            { v: 'A', tex: M`b^{*} = \begin{Bmatrix} 7 \\ 1 \\ -2 \end{Bmatrix}` },
            { v: 'B', tex: M`b^{*} = \begin{Bmatrix} -2 \\ 7 \\ 1 \end{Bmatrix}` },
            { v: 'C', tex: M`b^{*} = \begin{Bmatrix} 1 \\ -2 \\ 7 \end{Bmatrix}` },
            { v: 'D', tex: M`b^{*} = \begin{Bmatrix} 2 \\ 3 \\ 1 \end{Bmatrix}` }
          ],
          desarrollo: [
            { p: M`El vector $p$ se usa para <strong>indexar</strong> el acceso a $b$: $b^{*}_i = b_{p_i}$.` },
            { math: M`b^{*} = \begin{Bmatrix} b_{p_1} \\ b_{p_2} \\ b_{p_3} \end{Bmatrix}
                            = \begin{Bmatrix} b_2 \\ b_3 \\ b_1 \end{Bmatrix}
                            = \begin{Bmatrix} -2 \\ 7 \\ 1 \end{Bmatrix}` },
            { p: M`La opción A es el error de leer $p$ al revés (aplicar la permutación inversa) y la C es olvidarse de permutar, que es el error más frecuente cuando la factorización llega ya hecha.` }
          ]
        },
        {
          id: 'q4_2', tag: '4.a', tipo: 'mc', correcta: 'C',
          enunciado: M`Por sustitución directa en $L\,y = b^{*}$, el vector $y$ resulta:`,
          opciones: [
            { v: 'A', tex: M`y = \begin{Bmatrix} -2 \\ 6 \\ 2 \end{Bmatrix}` },
            { v: 'B', tex: M`y = \begin{Bmatrix} -2 \\ 8 \\ 0{,}4 \end{Bmatrix}` },
            { v: 'C', tex: M`y = \begin{Bmatrix} -2 \\ 6 \\ 0{,}8 \end{Bmatrix}` },
            { v: 'D', tex: M`y = \begin{Bmatrix} 1 \\ -2 \\ 7 \end{Bmatrix}` }
          ],
          desarrollo: [
            { math: M`\begin{aligned}
              y_1 &= -2 \\[2pt]
              y_2 &= 7 - \left(-\tfrac{1}{2}\right)y_1 = 7 - 1 = 6 \\[2pt]
              y_3 &= 1 - \tfrac{1}{2}\,y_1 - \tfrac{1}{5}\,y_2 = 1 + 1 - 1{,}2 = 0{,}8
            \end{aligned}` },
            { p: M`Atención al signo en $y_2$: $l_{21} = -1/2$, así que restarle $l_{21}y_1$ equivale a <em>sumar</em> $\tfrac{1}{2}y_1 = -1$. El distractor A sale de tomar $l_{31}$ y $l_{32}$ con el signo cambiado.` }
          ]
        },
        {
          id: 'q4_3', tag: '4.a', tipo: 'num', respuesta: 1, tol: 0.01,
          enunciado: M`Por sustitución inversa en $U\,x = y$, ¿cuánto vale $x_3$?`,
          placeholder: '0,00',
          desarrollo: [
            { math: M`x_3 = \frac{y_3}{u_{33}} = \frac{0{,}8}{4/5} = \frac{0{,}8}{0{,}8} = 1` }
          ]
        },
        {
          id: 'q4_4', tag: '4.a', tipo: 'num', respuesta: 2, tol: 0.01,
          enunciado: M`¿Cuánto vale $x_2$?`,
          placeholder: '0,00',
          desarrollo: [
            { math: M`x_2 = \frac{y_2 - u_{23}\,x_3}{u_{22}} = \frac{6 - 1 \times 1}{5/2} = \frac{5}{2{,}5} = 2` }
          ]
        },
        {
          id: 'q4_5', tag: '4.a', tipo: 'num', respuesta: -1, tol: 0.01,
          enunciado: M`¿Cuánto vale $x_1$?`,
          placeholder: '0,00',
          desarrollo: [
            { math: M`x_1 = \frac{y_1 - u_{12}\,x_2 - u_{13}\,x_3}{u_{11}} = \frac{-2 - 1 \times 2 - 0}{4} = \frac{-4}{4} = -1` },
            { p: M`La solución es $x = \{-1;\;2;\;1\}^{T}$, exactamente la de la clase.` }
          ]
        },
        {
          id: 'q4_6', tag: '4.b', tipo: 'mc', correcta: 'A',
          enunciado: M`¿Cuál es la matriz $A$ original (la de <em>antes</em> de permutar)?`,
          opciones: [
            { v: 'A', tex: M`A = \begin{bmatrix} 2 & 1 & 1 \\ 4 & 1 & 0 \\ -2 & 2 & 1 \end{bmatrix}` },
            { v: 'B', tex: M`A = \begin{bmatrix} 4 & 1 & 0 \\ -2 & 2 & 1 \\ 2 & 1 & 1 \end{bmatrix}` },
            { v: 'C', tex: M`A = \begin{bmatrix} 4 & 1 & 0 \\ 0 & 5/2 & 1 \\ 0 & 0 & 4/5 \end{bmatrix}` },
            { v: 'D', tex: M`A = \begin{bmatrix} 1 & 0 & 0 \\ -1/2 & 1 & 0 \\ 1/2 & 1/5 & 1 \end{bmatrix}` }
          ],
          desarrollo: [
            { p: M`El producto $L\,U$ no devuelve $A$ sino la matriz <strong>ya permutada</strong> $P A$:` },
            { math: M`L\,U = \begin{bmatrix} 4 & 1 & 0 \\ -2 & 2 & 1 \\ 2 & 1 & 1 \end{bmatrix} = P\,A` },
            { p: M`Para recuperar $A$ hay que deshacer la permutación: la fila $k$ de $LU$ es la fila $p_k$ de $A$. Con $p = \{2,\,3,\,1\}$:` },
            { ul: [
              M`fila 1 de $LU$ $\to$ fila 2 de $A$: $\;(4,\,1,\,0)$`,
              M`fila 2 de $LU$ $\to$ fila 3 de $A$: $\;(-2,\,2,\,1)$`,
              M`fila 3 de $LU$ $\to$ fila 1 de $A$: $\;(2,\,1,\,1)$`
            ] },
            { math: M`A = \begin{bmatrix} 2 & 1 & 1 \\ 4 & 1 & 0 \\ -2 & 2 & 1 \end{bmatrix}` },
            { p: M`<strong>Verificación:</strong> $A\,x = (2(-1)+2+1;\;4(-1)+2;\;2+4+1) = (1;\,-2;\,7) = b$ ✓.` },
            { p: M`La opción B es $L\,U$ sin deshacer la permutación: el error de creer que $LU = A$ cuando hubo pivoteo. En rigor $P A = L U$, o equivalentemente $A = P^{T} L U$.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 5 ===================== */
    {
      id: 'p5',
      titulo: 'Refinamiento iterativo y dígitos significativos ($t=4$)',
      enunciado: [
        { p: M`Dado el sistema:` },
        { math: M`\begin{bmatrix} 31{,}69 & 14{,}31 \\ 13{,}11 & 5{,}890 \end{bmatrix}
                  \begin{Bmatrix} x \\ y \end{Bmatrix}
                  = \begin{Bmatrix} 45{,}00 \\ 19{,}00 \end{Bmatrix}` },
        { p: '<strong>a)</strong> Resolver por eliminación de Gauss con cuatro dígitos.<br><strong>b)</strong> Refinar iterativamente (residuo en doble precisión).<br><strong>c)</strong> Estimar el número de dígitos significativos de la solución.<br><strong>d)</strong> Repetir (b) sin doble precisión en el residuo.<br><strong>e)</strong> Comparar con la solución exacta y concluir.' },
        { note: 'La clase «SEL Directos» desarrolla este ejercicio completo con t = 4 y redondeo por corte. La solución exacta es x = 7,200 ; y = −12,80.' }
      ],
      preguntas: [
        {
          id: 'q5_1', tag: '5.a', tipo: 'num', respuesta: -0.028, tol: 0.0025,
          enunciado: M`Con $m_{21} = 0{,}4136$, ¿cuánto vale $a_{22}'$ luego de la triangulación con $t=4$?`,
          ayuda: 'Es una resta entre números muy parecidos: fijate cuántos dígitos sobreviven.',
          placeholder: '0,0000',
          desarrollo: [
            { math: M`m_{21} = \frac{a_{21}}{a_{11}} = \frac{13{,}11}{31{,}69} = 0{,}413695\ldots \;\xrightarrow{t=4}\; 0{,}4136` },
            { math: M`a_{22}' = a_{22} - m_{21}\,a_{12} = 5{,}890 - 0{,}4136 \times 14{,}31 = 5{,}890 - 5{,}918 = -0{,}028` },
            { p: M`Acá está el veneno del ejercicio: $5{,}890$ y $5{,}918$ tienen cuatro dígitos cada uno, pero su diferencia tiene <strong>sólo dos</strong>. Se perdieron dos dígitos significativos de golpe por cancelación, y todo lo que venga después arrastra ese daño.` },
            { math: M`b_2' = 19{,}00 - 0{,}4136 \times 45{,}00 = 19{,}00 - 18{,}61 = 0{,}3900` }
          ]
        },
        {
          id: 'q5_2', tag: '5.a', tipo: 'num', respuesta: -13.92, tol: 0.15,
          enunciado: M`Por sustitución inversa, ¿cuánto vale $y$ (segunda componente de $x^{(0)}$)?`,
          ayuda: 'El valor exacto es −12,80. Mirá el desastre.',
          placeholder: '-00,00',
          desarrollo: [
            { math: M`y = \frac{b_2'}{a_{22}'} = \frac{0{,}3900}{-0{,}028} = -13{,}92857\ldots \;\xrightarrow{t=4}\; -13{,}92` },
            { math: M`x = \frac{b_1 - a_{12}\,y}{a_{11}} = \frac{45{,}00 + 199{,}1}{31{,}69} = \frac{244{,}1}{31{,}69} = 7{,}702` },
            { p: M`La solución de partida es $x^{(0)} = (7{,}702;\;-13{,}92)$ contra la exacta $(7{,}200;\;-12{,}80)$: un error del 7 % con cuatro dígitos de trabajo. La matriz está mal condicionada ($K_\infty = 2169$) y además el pivote quedó chiquísimo.` }
          ]
        },
        {
          id: 'q5_3', tag: '5.b', tipo: 'mc', correcta: 'B',
          enunciado: M`El residuo $r = b - A\,x^{(0)}$, calculado en <strong>doble precisión</strong>, vale:`,
          opciones: [
            { v: 'A', tex: M`r = \begin{Bmatrix} 0{,}1 \\ 0{,}08 \end{Bmatrix}` },
            { v: 'B', tex: M`r = \begin{Bmatrix} 0{,}11882 \\ 0{,}01558 \end{Bmatrix}` },
            { v: 'C', tex: M`r = \begin{Bmatrix} 0 \\ 0 \end{Bmatrix}` },
            { v: 'D', tex: M`r = \begin{Bmatrix} -0{,}502 \\ 1{,}12 \end{Bmatrix}` }
          ],
          desarrollo: [
            { math: M`A\,x^{(0)} = \begin{Bmatrix} 244{,}07638 - 199{,}1952 \\ 100{,}97322 - 81{,}9888 \end{Bmatrix}
                                 = \begin{Bmatrix} 44{,}88118 \\ 18{,}98442 \end{Bmatrix}` },
            { math: M`r = \begin{Bmatrix} 45{,}00 - 44{,}88118 \\ 19{,}00 - 18{,}98442 \end{Bmatrix}
                        = \begin{Bmatrix} 0{,}11882 \\ 0{,}01558 \end{Bmatrix}
                        \;\xrightarrow{t=4}\; \begin{Bmatrix} 0{,}1188 \\ 0{,}01558 \end{Bmatrix}` },
            { p: M`La opción A es exactamente el resultado del punto (d): el mismo residuo calculado con $t=4$ en lugar de doble precisión. Se ve el destrozo: de $0{,}11882$ queda $0{,}1$, un solo dígito.` },
            { p: M`La D es el error de confundir el residuo con la corrección $\delta x$, que es lo que sale <em>después</em> de resolver el sistema.` }
          ]
        },
        {
          id: 'q5_4', tag: '5.b', tipo: 'num', respuesta: 7.165, tol: 0.05,
          enunciado: M`Resolviendo $A\,\delta x = r$ con $t=4$ se obtiene $\delta x = (-0{,}5370;\;1{,}198)$. ¿Cuál es la primera componente de $x^{(1)}$?`,
          placeholder: '0,000',
          desarrollo: [
            { math: M`x^{(1)} = x^{(0)} + \delta x
                      = \begin{Bmatrix} 7{,}702 \\ -13{,}92 \end{Bmatrix} + \begin{Bmatrix} -0{,}5370 \\ 1{,}198 \end{Bmatrix}
                      = \begin{Bmatrix} 7{,}165 \\ -12{,}72 \end{Bmatrix}` },
            { p: M`Contra la exacta $(7{,}200;\,-12{,}80)$: el error bajó de 0,50 a 0,035. Se ganó aproximadamente un dígito significativo, exactamente lo que predice $q$.` }
          ]
        },
        {
          id: 'q5_5', tag: '5.c', tipo: 'num', respuesta: 860, reltol: 0.35,
          enunciado: M`Estimar $K(A) \approx \dfrac{\|\delta x\|_\infty}{\|x^{(0)}\|_\infty}\,10^{\,t}$ con $t=4$.`,
          ayuda: 'Norma infinito: la componente de mayor módulo, en numerador y denominador.',
          placeholder: '000',
          desarrollo: [
            { math: M`\|\delta x\|_\infty = \max\{0{,}5370;\;1{,}198\} = 1{,}198
                      \qquad
                      \|x^{(0)}\|_\infty = \max\{7{,}702;\;13{,}92\} = 13{,}92` },
            { math: M`K(A) \approx \frac{1{,}198}{13{,}92}\,10^{4} = 0{,}08606 \times 10^{4} \approx 860` },
            { p: M`El valor exacto es $K_\infty(A) = 2169$, que «parece muy distinto». Pero lo que importa es el logaritmo: $\log_{10}(860) = 2{,}93$ contra $\log_{10}(2169) = 3{,}34$. Como estimación del <strong>orden de magnitud</strong> es perfectamente aceptable, y es lo único que se necesita para decidir si conviene refinar.` }
          ]
        },
        {
          id: 'q5_6', tag: '5.c', tipo: 'num', respuesta: 1.07, tol: 0.35,
          enunciado: M`Con esa estimación, ¿cuántos dígitos significativos $q$ tiene la solución $x^{(0)}$?`,
          ayuda: M`$p = \log_{10} K(A)$ es la cantidad de dígitos que se pierden; $q = t - p$ los que quedan.`,
          placeholder: '0,0',
          desarrollo: [
            { math: M`p = \log_{10} K(A) \approx \log_{10}(860) = 2{,}93` },
            { math: M`q = t - p = 4 - 2{,}93 \approx 1{,}1` },
            { p: M`«La solución tiene aproximadamente un dígito significativo. <strong>Es válido refinar</strong>», dice la clase. Y en efecto: $x^{(0)} = 7{,}702$ contra la exacta $7{,}200$ acierta sólo el primer dígito.` },
            { p: M`Cada refinamiento gana otros $q$ dígitos: $x^{(1)}$ tendrá $2q \approx 2$ y $x^{(2)}$, $3q \approx 3$. El criterio práctico es <strong>si $q < 0$ no vale la pena refinar</strong>: significa que la precisión de trabajo no alcanza ni para un dígito.` }
          ]
        },
        {
          id: 'q5_7', tag: '5.d', tipo: 'mc', correcta: 'C',
          enunciado: M`Repitiendo el refinamiento <strong>sin</strong> doble precisión en el residuo ($r = (0{,}1;\;0{,}08)$ con $t=4$), se obtiene $\delta x = (0{,}6260;\;-1{,}380)$ y $x^{(1)} = (8{,}328;\;-15{,}30)$. ¿Qué conclusión corresponde?`,
          opciones: [
            { v: 'A', html: 'La solución mejoró un poco menos, pero el refinamiento sigue siendo útil.' },
            { v: 'B', html: 'Da igual: el refinamiento converge de todos modos, sólo que más lento.' },
            { v: 'C', html: 'La solución es <strong>peor que la de partida</strong> (se alejó de la exacta en vez de acercarse): el residuo calculado con la misma precisión que la solución no contiene información útil, y el refinamiento se vuelve contraproducente.' },
            { v: 'D', html: 'El error está en $\\delta x$, que debería haberse restado en lugar de sumarse.' }
          ],
          desarrollo: [
            { p: M`Comparando contra la solución exacta $(7{,}200;\,-12{,}80)$:` },
            {
              table: {
                head: ['', M`$x$`, M`$y$`, 'error en $y$'],
                rows: [
                  [M`x^{(0)}`, '7,702', '−13,92', '1,12'],
                  ['refinado con doble prec.', '7,165', '−12,72', '0,08'],
                  ['refinado con $t=4$', '8,328', '−15,30', '2,50']
                ]
              }
            },
            { p: M`El residuo verdadero era $(0{,}11882;\;0{,}01558)$ y con $t=4$ salió $(0{,}1;\;0{,}08)$: la segunda componente está equivocada en un factor 5. Ese residuo basura se propaga a $\delta x$ y empuja la solución en la dirección equivocada.` },
            { p: M`La regla es entonces: <strong>el residuo siempre en precisión extendida</strong>. Es la única parte del algoritmo que la exige, y cuesta muy poco: son $n^2$ productos.` }
          ]
        },
        {
          id: 'q5_8', tag: '5.e', tipo: 'num', respuesta: 7.202, tol: 0.03,
          enunciado: M`Una segunda pasada de refinamiento da $\delta x^{(1)} = (0{,}03739;\;-0{,}08535)$. ¿Cuál es la primera componente de $x^{(2)}$?`,
          placeholder: '0,000',
          desarrollo: [
            { math: M`r^{(1)} = b - A\,x^{(1)} = \begin{Bmatrix} -0{,}03565 \\ -0{,}01235 \end{Bmatrix}
                      \quad\text{(doble precisión)}` },
            { math: M`x^{(2)} = x^{(1)} + \delta x^{(1)}
                      = \begin{Bmatrix} 7{,}165 \\ -12{,}72 \end{Bmatrix} + \begin{Bmatrix} 0{,}03739 \\ -0{,}08535 \end{Bmatrix}
                      = \begin{Bmatrix} 7{,}202 \\ -12{,}80 \end{Bmatrix}` },
            { p: M`Contra la exacta $(7{,}200;\;-12{,}80)$: prácticamente los cuatro dígitos. La progresión completa muestra que cada pasada gana $q \approx 1$ dígito:` },
            {
              table: {
                head: ['iteración', M`$x$`, M`$y$`, 'dígitos ≈'],
                rows: [
                  [M`x^{(0)}`, '7,702', '−13,92', '1'],
                  [M`x^{(1)}`, '7,165', '−12,72', '2'],
                  [M`x^{(2)}`, '7,202', '−12,80', '3–4']
                ]
              }
            },
            { p: M`Se puede refinar «hasta alcanzar (casi) los $t$ dígitos significativos»; el límite llega cuando el residuo se hace tan chico que se confunde con cero.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 6 ===================== */
    {
      id: 'p6',
      titulo: 'Matriz casi singular: pivoteo parcial vs. total',
      enunciado: [
        { p: M`Sea el sistema de ecuaciones lineales:` },
        { math: M`\begin{bmatrix} 0{,}003152 & -15{,}28 \\ -0{,}009413 & 45{,}60 \end{bmatrix}
                  \begin{Bmatrix} x_1 \\ x_2 \end{Bmatrix}
                  = \begin{Bmatrix} 14{,}98 \\ -44{,}75 \end{Bmatrix}` },
        { p: '<strong>a)</strong> Obtener la solución numérica con eliminación de Gauss con pivoteo parcial y con pivoteo total.<br><strong>b)</strong> Estimar el número de condición de la matriz de coeficientes.' },
        { note: 'La solución exacta es x₁ = 6958,97 ; x₂ = 0,455149.' }
      ],
      preguntas: [
        {
          id: 'q6_1', tag: '6.b', tipo: 'num', respuesta: -9.944e-5, reltol: 0.05,
          enunciado: M`¿Cuánto vale el determinante de $A$?`,
          ayuda: 'Podés escribirlo en notación científica: -9,944e-5',
          placeholder: '-0,00009944',
          desarrollo: [
            { math: M`\det A = 0{,}003152 \times 45{,}60 - (-15{,}28)\times(-0{,}009413)` },
            { math: M`\det A = 0{,}1437312 - 0{,}14383064 = -9{,}944\times 10^{-5}` },
            { p: M`Los dos productos coinciden en sus cuatro primeros dígitos ($0{,}1437$): la matriz está <strong>al borde de la singularidad</strong>, y la resta es una cancelación catastrófica de manual. Sus filas son casi proporcionales — $-0{,}009413 / 0{,}003152 = -2{,}9864$ y $45{,}60/(-15{,}28) = -2{,}9843$ — y esa casi-proporcionalidad es la que hace explotar el número de condición.` }
          ]
        },
        {
          id: 'q6_2', tag: '6.b', tipo: 'num', respuesta: 2.79e7, reltol: 0.3,
          enunciado: M`Estimar $K_\infty(A) = \|A\|_\infty\,\|A^{-1}\|_\infty$.`,
          ayuda: M`$\|A\|_\infty$ es el máximo de las sumas de módulos <em>por fila</em>. Escribilo en notación científica: 2,8e7`,
          placeholder: '0,0e0',
          desarrollo: [
            { math: M`\|A\|_\infty = \max\{0{,}003152 + 15{,}28;\;\; 0{,}009413 + 45{,}60\} = 45{,}61` },
            { p: M`Para la inversa, $A^{-1} = \dfrac{1}{\det A}\begin{bmatrix} 45{,}60 & 15{,}28 \\ 0{,}009413 & 0{,}003152 \end{bmatrix}$:` },
            { math: M`A^{-1} \approx \begin{bmatrix} -458568 & -153661 \\ -94{,}66 & -31{,}70 \end{bmatrix}
                      \qquad
                      \|A^{-1}\|_\infty = 458568 + 153661 = 612229` },
            { math: M`K_\infty(A) = 45{,}61 \times 612229 \approx 2{,}79 \times 10^{7}` },
            { p: M`Con $p = \log_{10} K \approx 7{,}4$, una máquina de $t = 4$ dígitos daría $q = 4 - 7{,}4 < 0$: <strong>ni un solo dígito significativo</strong>. Hacen falta al menos ocho dígitos de trabajo para obtener uno confiable. Se acepta cualquier valor entre 2×10⁷ y 3,6×10⁷.` },
            { p: M`Nótese que con la norma 1 el resultado es idéntico ($K_1 = 2{,}79\times 10^{7}$) porque para una matriz $2\times 2$ casi-singular ambas normas están dominadas por los mismos elementos. En general <strong>no</strong> coinciden.` }
          ]
        },
        {
          id: 'q6_3', tag: '6.a', tipo: 'mc', correcta: 'D',
          enunciado: M`Resolviendo con $t=4$, el pivoteo parcial da $x \approx (8588;\;0{,}7915)$ y el pivoteo total $x \approx (6847;\;0{,}4320)$, contra la exacta $(6959;\;0{,}4551)$. ¿Qué conclusión se extrae?`,
          opciones: [
            { v: 'A', html: 'El pivoteo total es incorrecto porque permuta columnas y cambia el sistema.' },
            { v: 'B', html: 'Ambos algoritmos fallan porque están mal implementados; con pivoteo el resultado debería ser exacto.' },
            { v: 'C', html: 'El pivoteo parcial es mejor que el total, porque no necesita reordenar las incógnitas.' },
            { v: 'D', html: 'El pivoteo total da un resultado algo mejor, pero <strong>ninguno de los dos salva el problema</strong>: el error no lo genera el algoritmo sino el condicionamiento de $A$, y con $K \\approx 2{,}8\\times10^{7}$ y $t=4$ no hay estrategia de pivoteo que alcance.' }
          ],
          desarrollo: [
            { p: M`Comparando los errores relativos contra la solución exacta $(6958{,}97;\;0{,}455149)$:` },
            {
              table: {
                head: ['estrategia', M`$x_1$`, M`$x_2$`, 'error rel. en $x_1$'],
                rows: [
                  ['pivoteo parcial', '8588', '0,7915', '23 %'],
                  ['pivoteo total', '6847', '0,4320', '1,6 %'],
                  ['exacta', '6958,97', '0,455149', '—']
                ]
              }
            },
            { p: M`El pivoteo total mejora, pero sigue sin dar ni dos dígitos confiables en $x_2$. Y no es culpa de la implementación: con $K_\infty \approx 2{,}8\times10^{7}$ se pierden $p = \log_{10}K \approx 7{,}4$ dígitos, así que con $t=4$ queda $q = 4 - 7{,}4 \approx -3{,}4$. <strong>Un $q$ negativo significa que no sobrevive ningún dígito significativo</strong>: el resultado que salga será numéricamente casual.` },
            { p: M`La diferencia con el Problema 2 es exactamente la opuesta: allá el problema estaba bien condicionado ($K \approx 74$) y el algoritmo era el culpable, así que pivotear lo arreglaba todo. Acá el algoritmo hace lo que puede y el <em>problema</em> es el enfermo. <strong>Ninguna estrategia de pivoteo arregla un mal condicionamiento</strong>; lo único que ayuda es aumentar la precisión de trabajo (a $t \ge 9$) o replantear el modelo que dio origen a esa matriz.` },
            { p: M`Sobre los distractores: (A) es falso, el pivoteo total es perfectamente válido siempre que se registre la permutación de columnas para reordenar las incógnitas al final. (C) invierte el orden de calidad: el total es <em>más</em> robusto que el parcial, sólo que más caro.` }
          ]
        },
        {
          id: 'q6_4', tag: '6.a', tipo: 'mc', correcta: 'B',
          enunciado: M`¿En qué se diferencia el pivoteo <strong>total</strong> del <strong>parcial</strong>?`,
          opciones: [
            { v: 'A', html: 'El parcial busca el máximo en toda la matriz y el total sólo en la columna activa.' },
            { v: 'B', html: 'El parcial busca el pivote de mayor módulo en la <strong>columna</strong> activa y permuta filas (permutando también $b$). El total lo busca en toda la <strong>submatriz</strong> activa y permuta filas y columnas; al permutar columnas hay que llevar registro para reordenar las incógnitas al final.' },
            { v: 'C', html: 'Son equivalentes: sólo cambia el nombre según el autor.' },
            { v: 'D', html: 'El total normaliza las filas antes de elegir el pivote; el parcial no.' }
          ],
          desarrollo: [
            { p: M`<strong>Pivoteo parcial:</strong> en el paso $k$ se busca $\max_{i \ge k} |a_{ik}|$ y se permuta esa fila con la $k$. Como se permutan filas completas, el sistema no cambia: basta permutar $b$ del mismo modo. Cuesta $O(n)$ comparaciones por paso.` },
            { p: M`<strong>Pivoteo total:</strong> se busca $\max_{i,j \ge k} |a_{ij}|$ en toda la submatriz que queda por triangular. Permutar la columna $j$ con la $k$ equivale a <strong>reordenar las incógnitas</strong>, así que hay que guardar un vector de permutación de columnas y deshacerlo sobre $x$ al terminar. Cuesta $O(n^2)$ comparaciones por paso.` },
            { p: M`En la práctica el pivoteo parcial es el estándar: es casi tan robusto y mucho más barato. El total se reserva para matrices patológicas como ésta, y aun así —como muestra (a)— no hace milagros.` },
            { p: M`La opción D describe el <em>pivoteo parcial escalado</em>, que es una tercera estrategia: se compara $|a_{ik}|/s_i$ con $s_i$ el máximo de la fila $i$, para que una fila mal escalada no se lleve el pivote.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 7 ===================== */
    {
      id: 'p7',
      titulo: 'Jacobi y Gauss-Seidel en un sistema 2×2 general',
      enunciado: [
        { p: M`Dado el sistema de ecuaciones lineales, con $A$ no singular:` },
        { math: M`\begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}
                  \begin{Bmatrix} x_1 \\ x_2 \end{Bmatrix}
                  = \begin{Bmatrix} b_1 \\ b_2 \end{Bmatrix}` },
        { p: '<strong>a)</strong> Establecer cuándo el método de Jacobi diverge.<br><strong>b)</strong> Demostrar que si el método de Jacobi converge, el de Gauss-Seidel lo hace más rápido.' },
        { note: 'Criterio de la cátedra (Teo 4): el método converge ⟺ ρ(T) = máx|λᵢ| < 1, donde T es la matriz de iteración. El radio espectral mide además la velocidad de convergencia.' }
      ],
      preguntas: [
        {
          id: 'q7_1', tag: '7.a', tipo: 'mc', correcta: 'A',
          enunciado: M`¿Cuál es la matriz de iteración $T_J$ del método de Jacobi para este sistema?`,
          opciones: [
            { v: 'A', tex: M`T_J = \begin{bmatrix} 0 & -\frac{a_{12}}{a_{11}} \\[4pt] -\frac{a_{21}}{a_{22}} & 0 \end{bmatrix}` },
            { v: 'B', tex: M`T_J = \begin{bmatrix} 0 & \frac{a_{12}}{a_{11}} \\[4pt] \frac{a_{21}}{a_{22}} & 0 \end{bmatrix}` },
            { v: 'C', tex: M`T_J = \begin{bmatrix} \frac{1}{a_{11}} & 0 \\[4pt] 0 & \frac{1}{a_{22}} \end{bmatrix}` },
            { v: 'D', tex: M`T_J = \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}` }
          ],
          desarrollo: [
            { p: M`Despejando cada incógnita de su propia ecuación:` },
            { math: M`x_1^{(k+1)} = \frac{b_1 - a_{12}\,x_2^{(k)}}{a_{11}}
                      \qquad
                      x_2^{(k+1)} = \frac{b_2 - a_{21}\,x_1^{(k)}}{a_{22}}` },
            { p: M`En forma matricial $x^{(k+1)} = T_J\,x^{(k)} + c$, con la descomposición $A = D + L + U$:` },
            { math: M`T_J = -D^{-1}(L + U) = \begin{bmatrix} 0 & -\frac{a_{12}}{a_{11}} \\[4pt] -\frac{a_{21}}{a_{22}} & 0 \end{bmatrix}
                      \qquad
                      c = D^{-1}b = \begin{Bmatrix} \frac{b_1}{a_{11}} \\[4pt] \frac{b_2}{a_{22}} \end{Bmatrix}` },
            { p: M`El signo menos no es decorativo: los términos fuera de la diagonal <em>pasan restando</em> al despejar. La opción B es el error de olvidarlo (aunque para el radio espectral no cambia nada, sí cambia el resultado de cada iteración).` }
          ]
        },
        {
          id: 'q7_2', tag: '7.a', tipo: 'mc', correcta: 'B',
          enunciado: M`El método de Jacobi <strong>diverge</strong> cuando:`,
          opciones: [
            { v: 'A', tex: M`\left|\frac{a_{12}\,a_{21}}{a_{11}\,a_{22}}\right| < 1` },
            { v: 'B', tex: M`\left|\frac{a_{12}\,a_{21}}{a_{11}\,a_{22}}\right| \ge 1
                            \quad\text{es decir}\quad |a_{11}\,a_{22}| \le |a_{12}\,a_{21}|` },
            { v: 'C', tex: M`\det A = a_{11}a_{22} - a_{12}a_{21} = 0` },
            { v: 'D', tex: M`|a_{11}| + |a_{22}| < |a_{12}| + |a_{21}|` }
          ],
          desarrollo: [
            { p: M`Los autovalores de $T_J$ salen de su polinomio característico:` },
            { math: M`\det(T_J - \lambda I) = \lambda^{2} - \frac{a_{12}\,a_{21}}{a_{11}\,a_{22}} = 0
                      \quad\Longrightarrow\quad
                      \lambda_{1,2} = \pm\sqrt{\frac{a_{12}\,a_{21}}{a_{11}\,a_{22}}}` },
            { math: M`\rho(T_J) = \left|\sqrt{\frac{a_{12}\,a_{21}}{a_{11}\,a_{22}}}\right|
                                = \sqrt{\left|\frac{a_{12}\,a_{21}}{a_{11}\,a_{22}}\right|}` },
            { p: M`Por el Teo 4, converge $\iff \rho(T_J) < 1$, o sea $\left|\dfrac{a_{12}a_{21}}{a_{11}a_{22}}\right| < 1$. Negando:` },
            { math: M`\boxed{\;\text{diverge} \iff |a_{11}\,a_{22}| \le |a_{12}\,a_{21}|\;}` },
            { p: M`Interpretación: es una <strong>condición de dominancia diagonal en producto</strong> — el producto de los elementos diagonales tiene que superar al de los antidiagonales. Es más débil que pedir dominancia diagonal fila por fila (Teo 1), que sería suficiente pero no necesaria.` },
            { p: M`La opción C confunde divergencia del método iterativo con singularidad de $A$: son cosas independientes. Una matriz perfectamente invertible puede hacer diverger a Jacobi, y de hecho el Problema 10 muestra un caso así.` }
          ]
        },
        {
          id: 'q7_3', tag: '7.b', tipo: 'mc', correcta: 'C',
          enunciado: M`¿Qué relación hay entre $\rho(T_{GS})$ y $\rho(T_J)$ en este sistema $2\times2$?`,
          opciones: [
            { v: 'A', tex: M`\rho(T_{GS}) = \rho(T_J)` },
            { v: 'B', tex: M`\rho(T_{GS}) = \frac{1}{2}\,\rho(T_J)` },
            { v: 'C', tex: M`\rho(T_{GS}) = \rho(T_J)^{2}` },
            { v: 'D', tex: M`\rho(T_{GS}) = \sqrt{\rho(T_J)}` }
          ],
          desarrollo: [
            { p: M`Gauss-Seidel usa el valor ya actualizado de $x_1$ al calcular $x_2$:` },
            { math: M`x_1^{(k+1)} = \frac{b_1 - a_{12}\,x_2^{(k)}}{a_{11}}
                      \qquad
                      x_2^{(k+1)} = \frac{b_2 - a_{21}\,x_1^{(k+1)}}{a_{22}}` },
            { p: M`Sustituyendo la primera en la segunda queda la matriz de iteración:` },
            { math: M`T_{GS} = -(D+L)^{-1}U
                              = \begin{bmatrix} 0 & -\frac{a_{12}}{a_{11}} \\[4pt]
                                                0 & \frac{a_{12}\,a_{21}}{a_{11}\,a_{22}} \end{bmatrix}` },
            { p: M`Es triangular superior, así que sus autovalores son los de la diagonal: $\lambda_1 = 0$ y $\lambda_2 = \dfrac{a_{12}a_{21}}{a_{11}a_{22}}$. Entonces:` },
            { math: M`\rho(T_{GS}) = \left|\frac{a_{12}\,a_{21}}{a_{11}\,a_{22}}\right|
                                  = \left(\sqrt{\left|\frac{a_{12}a_{21}}{a_{11}a_{22}}\right|}\right)^{2}
                                  = \rho(T_J)^{2}` },
            { p: M`<strong>Conclusión.</strong> Si Jacobi converge, $\rho(T_J) < 1$, y entonces $\rho(T_{GS}) = \rho(T_J)^2 < \rho(T_J) < 1$: Gauss-Seidel no sólo converge, sino que lo hace con un radio espectral menor. Como el error se reduce aproximadamente como $\rho^{k}$, hacen falta <strong>la mitad de iteraciones</strong> para el mismo error. ∎` },
            { p: M`Corolario práctico: una iteración de GS equivale a dos de Jacobi, y además ambos convergen o divergen juntos en este caso $2\times2$. <em>Cuidado:</em> esto <strong>no</strong> es válido en general para $n > 2$; existen matrices donde Jacobi converge y GS no, y viceversa.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 8 ===================== */
    {
      id: 'p8',
      titulo: 'Jacobi: reordenar filas para garantizar convergencia',
      enunciado: [
        { p: M`Sea el sistema de ecuaciones lineales:` },
        { math: M`\begin{bmatrix} 0{,}01235 & -2{,}387 \\ 5{,}462 & 0{,}008406 \end{bmatrix}
                  \begin{Bmatrix} x_1 \\ x_2 \end{Bmatrix}
                  = \begin{Bmatrix} 1{,}370 \\ 10{,}85 \end{Bmatrix}` },
        { p: '<strong>a)</strong> Resolverlo por el método de Jacobi, efectuando las modificaciones necesarias para garantizar la convergencia. Trabajar con 5 dígitos de precisión.<br><strong>b)</strong> Explicar la convergencia o no de los algoritmos en términos de la norma de la matriz de iteración.' }
      ],
      preguntas: [
        {
          id: 'q8_1', tag: '8.b', tipo: 'num', respuesta: 354.4, reltol: 0.1,
          enunciado: M`Sobre el sistema <strong>tal como viene</strong>, ¿cuánto vale el radio espectral $\rho(T_J)$ de la matriz de iteración de Jacobi?`,
          ayuda: M`Para un $2\times2$, $\rho(T_J) = \sqrt{|a_{12}a_{21}/(a_{11}a_{22})|}$.`,
          placeholder: '000',
          desarrollo: [
            { math: M`T_J = \begin{bmatrix} 0 & -\frac{-2{,}387}{0{,}01235} \\[4pt]
                                           -\frac{5{,}462}{0{,}008406} & 0 \end{bmatrix}
                          = \begin{bmatrix} 0 & 193{,}28 \\ -649{,}77 & 0 \end{bmatrix}` },
            { math: M`\rho(T_J) = \sqrt{193{,}28 \times 649{,}77} = \sqrt{125594} = 354{,}4` },
            { p: M`También $\|T_J\|_\infty = \|T_J\|_1 = 649{,}77$. Con $\rho \approx 354 \ggg 1$ el método <strong>diverge de forma explosiva</strong>: cada iteración multiplica el error por unos 350.` },
            { p: M`El diagnóstico es evidente mirando la matriz: los elementos diagonales ($0{,}01235$ y $0{,}008406$) son ridículamente chicos frente a los de fuera de la diagonal ($2{,}387$ y $5{,}462$). Es lo opuesto a la dominancia diagonal.` }
          ]
        },
        {
          id: 'q8_2', tag: '8.a', tipo: 'mc', correcta: 'B',
          enunciado: M`¿Cuál es la modificación que garantiza la convergencia?`,
          opciones: [
            { v: 'A', html: 'Multiplicar ambas ecuaciones por 100 para agrandar los elementos diagonales.' },
            { v: 'B', html: '<strong>Permutar las dos ecuaciones</strong> ($E_1 \\leftrightarrow E_2$), de modo que los coeficientes grandes queden sobre la diagonal y la matriz resulte diagonalmente dominante.' },
            { v: 'C', html: 'Cambiar la semilla inicial por una más cercana a la solución.' },
            { v: 'D', html: 'Usar Gauss-Seidel en lugar de Jacobi, que converge siempre.' }
          ],
          desarrollo: [
            { p: M`Permutando las filas:` },
            { math: M`\begin{bmatrix} 5{,}462 & 0{,}008406 \\ 0{,}01235 & -2{,}387 \end{bmatrix}
                      \begin{Bmatrix} x_1 \\ x_2 \end{Bmatrix}
                      = \begin{Bmatrix} 10{,}85 \\ 1{,}370 \end{Bmatrix}` },
            { p: M`Ahora sí es diagonalmente dominante: $|5{,}462| > |0{,}008406|$ y $|-2{,}387| > |0{,}01235|$. Por el Teo 1, Jacobi y Gauss-Seidel <strong>convergen</strong>.` },
            { p: M`Sobre los distractores: (A) escalar ambas filas por el mismo factor no cambia $T_J$ en absoluto, porque $T_J = -D^{-1}(L+U)$ es invariante frente al escalado de filas. (C) la semilla no afecta la convergencia, sólo cuántas iteraciones hacen falta: si $\rho > 1$ diverge desde cualquier punto de partida que no sea la solución exacta. (D) es falso: GS no converge siempre, y acá con la matriz original también divergiría.` }
          ]
        },
        {
          id: 'q8_3', tag: '8.b', tipo: 'num', respuesta: 0.0051739, reltol: 0.1,
          enunciado: M`Ya permutado, ¿cuánto vale $\|T_J\|_\infty$?`,
          ayuda: M`$\|T\|_\infty$ = máxima suma de módulos por fila. Notación científica: 5,17e-3`,
          placeholder: '0,00000',
          desarrollo: [
            { math: M`T_J = \begin{bmatrix} 0 & -\frac{0{,}008406}{5{,}462} \\[4pt]
                                           -\frac{0{,}01235}{-2{,}387} & 0 \end{bmatrix}
                          = \begin{bmatrix} 0 & -0{,}0015390 \\ 0{,}0051739 & 0 \end{bmatrix}` },
            { math: M`\|T_J\|_\infty = \max\{0{,}0015390;\;\; 0{,}0051739\} = 0{,}0051739` },
            { p: M`Como $\|T_J\|_\infty < 1$, el Teo 3 ya garantiza la convergencia sin necesidad de calcular autovalores. Y como además $\|T_J\| \le 0{,}5$, vale la simplificación de la cota de truncamiento:` },
            { math: M`\|x^{(k)} - x\| \le \frac{\|T\|}{1 - \|T\|}\,\|x^{(k)} - x^{(k-1)}\|
                      \;\le\; \|x^{(k)} - x^{(k-1)}\|` },
            { p: M`es decir, la diferencia entre dos iteraciones sucesivas ya es una cota del error verdadero.` },
            { p: M`El radio espectral es $\rho(T_J) = \sqrt{0{,}0015390 \times 0{,}0051739} = 0{,}002822$, aún menor. <strong>Ojo con el distractor conceptual:</strong> la norma es una <em>cota superior</em> del radio espectral ($\rho(T) \le \|T\|$ para toda norma inducida), nunca al revés.` }
          ]
        },
        {
          id: 'q8_4', tag: '8.a', tipo: 'num', respuesta: 1.9873, tol: 0.002,
          enunciado: M`Iterando con Jacobi desde $x^{(0)} = (0;\,0)$ y 5 dígitos, ¿a qué valor converge $x_1$?`,
          placeholder: '0,0000',
          desarrollo: [
            { math: M`c = D^{-1}b = \begin{Bmatrix} \frac{10{,}85}{5{,}462} \\[4pt] \frac{1{,}370}{-2{,}387} \end{Bmatrix}
                                  = \begin{Bmatrix} 1{,}9865 \\ -0{,}57394 \end{Bmatrix}` },
            {
              table: {
                head: [M`$k$`, M`$x_1$`, M`$x_2$`],
                rows: [
                  ['0', '0,0000', '0,0000'],
                  ['1', '1,9865', '−0,57394'],
                  ['2', '1,9873', '−0,56366'],
                  ['3', '1,9873', '−0,56366']
                ]
              }
            },
            { p: M`Converge en <strong>tres iteraciones</strong>: con $\rho(T_J) = 0{,}0028$ cada paso gana casi tres dígitos decimales. La solución es $x = (1{,}9873;\;-0{,}56366)$, que coincide con la exacta hasta los 5 dígitos de trabajo.` },
            { p: M`Moraleja del problema: la convergencia de un método iterativo no es una propiedad del <em>sistema</em> sino de <strong>cómo se lo escribe</strong>. El mismo sistema, con las ecuaciones en otro orden, pasa de $\rho = 354$ a $\rho = 0{,}0028$.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 9 ===================== */
    {
      id: 'p9',
      titulo: 'Gauss-Seidel con criterio de parada',
      enunciado: [
        { p: M`Resolver el siguiente sistema utilizando el método de Gauss-Seidel, iterando hasta que la máxima diferencia entre dos valores sucesivos de $x$, $y$, $z$ sea menor que $0{,}02$:` },
        { math: M`\begin{aligned}
          10x + 2y + 6z &= 28 \\
          x + 10y + 4z &= 7 \\
          2x - 7y - 10z &= -17
        \end{aligned}` },
        { note: 'Éste es el sistema que la cátedra desarrolla en la clase «SEL Iterativos», con las tablas de Jacobi y de Gauss-Seidel partiendo de la semilla (1 ; 2 ; 3). La solución exacta es x = 1,5201 ; y = −0,35225 ; z = 2,2506.' }
      ],
      preguntas: [
        {
          id: 'q9_1', tag: '9.a', tipo: 'mc', correcta: 'A',
          enunciado: M`¿Cuáles son las fórmulas de iteración de <strong>Gauss-Seidel</strong> para este sistema?`,
          opciones: [
            { v: 'A', tex: M`\begin{aligned}
              x^{(k+1)} &= \frac{28 - 2y^{(k)} - 6z^{(k)}}{10} \\[3pt]
              y^{(k+1)} &= \frac{7 - x^{(k+1)} - 4z^{(k)}}{10} \\[3pt]
              z^{(k+1)} &= \frac{17 + 2x^{(k+1)} - 7y^{(k+1)}}{10}
            \end{aligned}` },
            { v: 'B', tex: M`\begin{aligned}
              x^{(k+1)} &= \frac{28 - 2y^{(k)} - 6z^{(k)}}{10} \\[3pt]
              y^{(k+1)} &= \frac{7 - x^{(k)} - 4z^{(k)}}{10} \\[3pt]
              z^{(k+1)} &= \frac{17 + 2x^{(k)} - 7y^{(k)}}{10}
            \end{aligned}` },
            { v: 'C', tex: M`\begin{aligned}
              x^{(k+1)} &= \frac{28 - 2y^{(k)} - 6z^{(k)}}{10} \\[3pt]
              y^{(k+1)} &= \frac{7 - x^{(k+1)} - 4z^{(k)}}{10} \\[3pt]
              z^{(k+1)} &= \frac{-17 - 2x^{(k+1)} + 7y^{(k+1)}}{10}
            \end{aligned}` },
            { v: 'D', tex: M`\begin{aligned}
              x^{(k+1)} &= \frac{28 + 2y^{(k)} + 6z^{(k)}}{10} \\[3pt]
              y^{(k+1)} &= \frac{7 + x^{(k+1)} + 4z^{(k)}}{10} \\[3pt]
              z^{(k+1)} &= \frac{17 - 2x^{(k+1)} + 7y^{(k+1)}}{10}
            \end{aligned}` }
          ],
          desarrollo: [
            { p: M`Se despeja cada incógnita de la ecuación cuyo coeficiente diagonal le corresponde, usando <strong>siempre el valor más reciente disponible</strong>: ahí está la diferencia con Jacobi (opción B), que usa los tres valores del paso anterior.` },
            { p: M`La tercera ecuación es $2x - 7y - 10z = -17$. Despejando $z$:` },
            { math: M`-10z = -17 - 2x + 7y
                      \quad\Longrightarrow\quad
                      z = \frac{17 + 2x - 7y}{10}` },
            { p: M`La opción C se olvida de cambiar el signo al dividir por $-10$ — el error más común de este ejercicio.` },
            { p: M`La matriz es diagonalmente dominante ($10 > 2+6$, $10 > 1+4$, $10 > 2+7$), así que por el Teo 1 ambos métodos convergen.` }
          ]
        },
        {
          id: 'q9_2', tag: '9.a', tipo: 'num', respuesta: 2.212, tol: 0.005,
          enunciado: M`Partiendo de la semilla $(x^{(0)}, y^{(0)}, z^{(0)}) = (1;\,2;\,3)$, ¿cuánto vale $z^{(1)}$?`,
          ayuda: 'Ojo: para z ya tenés que usar los x e y recién calculados.',
          placeholder: '0,000',
          desarrollo: [
            { math: M`x^{(1)} = \frac{28 - 2(2) - 6(3)}{10} = \frac{28 - 4 - 18}{10} = 0{,}600` },
            { math: M`y^{(1)} = \frac{7 - 0{,}600 - 4(3)}{10} = \frac{7 - 0{,}6 - 12}{10} = -0{,}560` },
            { math: M`z^{(1)} = \frac{17 + 2(0{,}600) - 7(-0{,}560)}{10} = \frac{17 + 1{,}2 + 3{,}92}{10} = 2{,}212` },
            { p: M`Con Jacobi, en cambio, $z^{(1)} = \dfrac{17 + 2(1) - 7(2)}{10} = 0{,}500$: mucho peor, porque descarta la información recién calculada.` }
          ]
        },
        {
          id: 'q9_3', tag: '9.a', tipo: 'num', respuesta: 4, tol: 0.4,
          enunciado: M`¿En qué iteración $k$ se alcanza el criterio de parada (máxima diferencia $< 0{,}02$), partiendo de $(1;\,2;\,3)$?`,
          placeholder: '0',
          desarrollo: [
            {
              table: {
                head: [M`$k$`, M`$x$`, M`$y$`, M`$z$`, 'máx. dif.'],
                rows: [
                  ['0', '1,000', '2,000', '3,000', '—'],
                  ['1', '0,600', '−0,560', '2,212', '2,560'],
                  ['2', '1,585', '−0,343', '2,257', '0,985'],
                  ['3', '1,514', '−0,354', '2,251', '0,0705'],
                  ['4', '1,520', '−0,3524', '2,2507', '<strong>0,00603</strong> ✓']
                ]
              }
            },
            { p: M`En $k = 4$ la máxima diferencia es $0{,}0060 < 0{,}02$, así que ahí se corta. La solución es $(1{,}520;\;-0{,}352;\;2{,}251)$, contra la exacta $(1{,}5201;\;-0{,}35225;\;2{,}2506)$: tres dígitos correctos.` },
            { p: M`Con Jacobi, el mismo criterio recién se cumple cerca de la <strong>iteración 9</strong>: la tabla de la clase llega a $k=8$ con $(1{,}529;\,-0{,}346;\,2{,}255)$ y todavía oscila.` }
          ]
        },
        {
          id: 'q9_4', tag: '9.b', tipo: 'mc', correcta: 'D',
          enunciado: M`La clase reporta $\|T_J\|_1 = 1$, $\|T_J\|_\infty = 0{,}9$, $\|T_{GS}\|_1 = 1{,}058$, $\|T_{GS}\|_\infty = 0{,}8$, $\rho(T_J) = 0{,}48$ y $\rho(T_{GS}) = 0{,}21$. ¿Qué se concluye?`,
          opciones: [
            { v: 'A', html: 'Como $\\|T_{GS}\\|_1 = 1{,}058 > 1$, Gauss-Seidel diverge.' },
            { v: 'B', html: 'Como $\\|T_J\\|_1 = 1$, Jacobi está en el límite y no se puede decidir nada.' },
            { v: 'C', html: 'Jacobi converge más rápido porque tiene la norma 1 más chica.' },
            { v: 'D', html: 'Ambos convergen, y el criterio decisivo es el <strong>radio espectral</strong>: $\\rho(T_{GS}) = 0{,}21 < \\rho(T_J) = 0{,}48$, así que Gauss-Seidel converge más rápido. Que alguna norma dé $\\ge 1$ no prueba divergencia, porque $\\|T\\| < 1$ es sólo <em>suficiente</em>.' }
          ],
          desarrollo: [
            { p: M`Hay que distinguir con cuidado los dos criterios:` },
            { ul: [
              M`<strong>Teo 3</strong> ($\exists\,\|T\| < 1 \Rightarrow$ converge) es sólo <em>suficiente</em>. Basta con que <strong>alguna</strong> norma sea menor que 1. Que una norma particular dé $\ge 1$ no dice nada.`,
              M`<strong>Teo 4</strong> ($\rho(T) < 1 \iff$ converge) es <em>necesario y suficiente</em>. Es el criterio definitivo.`
            ] },
            { p: M`Acá $\|T_{GS}\|_1 = 1{,}058 > 1$ pero $\|T_{GS}\|_\infty = 0{,}8 < 1$: con eso alcanza para garantizar convergencia por Teo 3. Y $\rho(T_{GS}) = 0{,}21$ lo confirma por Teo 4.` },
            { p: M`Sobre la velocidad: el error decae como $\rho^{k}$. Para ganar un factor $10^{-3}$, Jacobi necesita $k \approx \log(10^{-3})/\log(0{,}48) \approx 9{,}4$ iteraciones y Gauss-Seidel $k \approx \log(10^{-3})/\log(0{,}21) \approx 4{,}4$: menos de la mitad, tal como se observó en la tabla.` },
            { p: M`Recordá siempre que el radio espectral relevante es el de la <strong>matriz de iteración $T$</strong>, no el de $A$. Aquí $\rho(A) \approx 10{,}6$, un número que no dice absolutamente nada sobre la convergencia.` }
          ]
        },
        {
          id: 'q9_5', tag: '9.b', tipo: 'num', respuesta: 4, tol: 0.2,
          enunciado: M`Con $\|T_{GS}\|_\infty = 0{,}8$, ¿cuánto vale el factor $\dfrac{\|T\|}{1-\|T\|}$ de la cota del error de truncamiento?`,
          placeholder: '0,0',
          desarrollo: [
            { math: M`\|x^{(k)} - x\| \le \frac{\|T\|}{1 - \|T\|}\,\|x^{(k)} - x^{(k-1)}\|
                      = \frac{0{,}8}{1 - 0{,}8} = \frac{0{,}8}{0{,}2} = 4` },
            { p: M`Es decir: el error verdadero puede ser hasta <strong>4 veces</strong> la diferencia entre iteraciones sucesivas. Con la parada en $k=4$ y una diferencia de $0{,}00603$, la cota del error es $4 \times 0{,}00603 = 0{,}024$ — y el error real resulta $0{,}0004$, holgadamente dentro de la cota.` },
            { p: M`La clase remarca el caso cómodo: <strong>si $\|T\| \le 0{,}5$ el factor es $\le 1$</strong> y entonces la diferencia entre iteraciones sucesivas ya es directamente una cota del error. Acá no estamos en ese caso ($0{,}8 > 0{,}5$), así que el criterio «máxima diferencia $< 0{,}02$» no garantiza por sí solo un error menor que $0{,}02$.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 10 ===================== */
    {
      id: 'p10',
      titulo: 'Un sistema donde ambos métodos fallan',
      enunciado: [
        { p: M`Resolver el siguiente sistema utilizando los métodos de Jacobi y Gauss-Seidel:` },
        { math: M`\begin{aligned}
          a \phantom{{}+4b} \phantom{{}+c} + d &= 2 \\
          a + 4b \phantom{{}+c} - d &= 4 \\
          a \phantom{{}+4b} + c \phantom{{}+d} &= 2 \\
          \phantom{a+4b} \; c + d &= 2
        \end{aligned}` },
        { p: M`¿Cómo se comporta la solución a medida que se itera? Explicar el comportamiento en base al criterio de convergencia del radio espectral.` }
      ],
      preguntas: [
        {
          id: 'q10_1', tag: '10.a', tipo: 'mc', correcta: 'A',
          enunciado: M`¿Cuál es la solución exacta del sistema, y es $A$ singular?`,
          opciones: [
            { v: 'A', tex: M`(a,b,c,d) = (1,\,1,\,1,\,1) \;;\quad \det A = 8 \neq 0 \;\text{(no singular)}` },
            { v: 'B', tex: M`\det A = 0 \;;\quad \text{el sistema no tiene solución única}` },
            { v: 'C', tex: M`(a,b,c,d) = (2,\,1,\,0,\,0) \;;\quad \det A = 8` },
            { v: 'D', tex: M`(a,b,c,d) = (0,\,1,\,2,\,2) \;;\quad \det A = 4` }
          ],
          desarrollo: [
            { math: M`A = \begin{bmatrix} 1 & 0 & 0 & 1 \\ 1 & 4 & 0 & -1 \\ 1 & 0 & 1 & 0 \\ 0 & 0 & 1 & 1 \end{bmatrix}
                      \qquad
                      b = \begin{Bmatrix} 2 \\ 4 \\ 2 \\ 2 \end{Bmatrix}
                      \qquad
                      \det A = 8` },
            { p: M`Reemplazando $(1,1,1,1)$: $1+1=2$ ✓, $1+4-1=4$ ✓, $1+1=2$ ✓, $1+1=2$ ✓.` },
            { p: M`El sistema es <strong>perfectamente resoluble por métodos directos</strong>: una eliminación de Gauss lo resuelve en dos pasos. El problema que sigue es exclusivamente de los métodos iterativos.` }
          ]
        },
        {
          id: 'q10_2', tag: '10.b', tipo: 'num', respuesta: 1, tol: 0.02,
          enunciado: M`¿Cuánto vale $\rho(T_J)$, el radio espectral de la matriz de iteración de Jacobi?`,
          ayuda: 'Los autovalores son 0, −1 y 1/2 ± (√3/2)i. Calculá el máximo de sus módulos.',
          placeholder: '0,00',
          desarrollo: [
            { p: M`Con $a_{11}=1$, $a_{22}=4$, $a_{33}=1$, $a_{44}=1$:` },
            { math: M`T_J = -D^{-1}(L+U) = \begin{bmatrix}
              0 & 0 & 0 & -1 \\
              -\tfrac{1}{4} & 0 & 0 & \tfrac{1}{4} \\
              -1 & 0 & 0 & 0 \\
              0 & 0 & -1 & 0 \end{bmatrix}` },
            { math: M`\lambda = \left\{\,0,\;\; -1,\;\; \tfrac{1}{2} + \tfrac{\sqrt{3}}{2}i,\;\; \tfrac{1}{2} - \tfrac{\sqrt{3}}{2}i \,\right\}` },
            { p: M`Los módulos de los tres autovalores no nulos son todos exactamente 1:` },
            { math: M`\left|\tfrac{1}{2} \pm \tfrac{\sqrt{3}}{2}i\right| = \sqrt{\tfrac{1}{4} + \tfrac{3}{4}} = 1
                      \quad\Longrightarrow\quad \rho(T_J) = 1` },
            { p: M`De hecho son raíces cúbicas de la unidad multiplicadas por $-1$: están sobre la circunferencia unitaria, exactamente en la frontera entre convergencia y divergencia.` }
          ]
        },
        {
          id: 'q10_3', tag: '10.b', tipo: 'mc', correcta: 'C',
          enunciado: M`Iterando con Jacobi desde $x^{(0)} = (0;\,0;\,0;\,0)$, ¿cómo se comporta la sucesión?`,
          opciones: [
            { v: 'A', html: 'Converge lentamente a $(1;1;1;1)$.' },
            { v: 'B', html: 'Diverge: las componentes crecen sin cota hacia el infinito.' },
            { v: 'C', html: '<strong>Oscila periódicamente</strong> entre $(2;1;2;2)$ y $(0;1;0;0)$, sin acercarse nunca a la solución ni escaparse al infinito.' },
            { v: 'D', html: 'Se estanca en $(0;0;0;0)$ porque la semilla es un punto fijo.' }
          ],
          desarrollo: [
            {
              table: {
                head: [M`$k$`, M`$a$`, M`$b$`, M`$c$`, M`$d$`],
                rows: [
                  ['0', '0', '0', '0', '0'],
                  ['1', '2', '1', '2', '2'],
                  ['2', '0', '1', '0', '0'],
                  ['3', '2', '1', '2', '2'],
                  ['4', '0', '1', '0', '0'],
                  ['⋮', '⋮', '⋮', '⋮', '⋮']
                ]
              }
            },
            { p: M`Es un <strong>ciclo de período 2</strong>. Sólo $b$ acertó el valor correcto, y por casualidad. Gauss-Seidel hace exactamente lo mismo, alternando entre $(2;\,0{,}5;\,0;\,2)$ y $(0;\,1{,}5;\,2;\,0)$ — también con $\rho(T_{GS}) = 1$.` },
            { p: M`El promedio de dos iteraciones consecutivas <em>sí</em> da la solución: $\tfrac{1}{2}[(2;1;2;2)+(0;1;0;0)] = (1;1;1;1)$. Es la idea detrás de los métodos de aceleración y de la relajación con $w \ne 1$.` }
          ]
        },
        {
          id: 'q10_4', tag: '10.b', tipo: 'mc', correcta: 'B',
          enunciado: M`¿Cuál es la explicación en términos del criterio del radio espectral?`,
          opciones: [
            { v: 'A', html: 'Como $\\rho(T) = 1 > 0$, el método diverge; todo radio espectral positivo produce divergencia.' },
            { v: 'B', html: 'El Teo 4 exige $\\rho(T) < 1$ <em>estrictamente</em>. Con $\\rho(T) = 1$ estamos en la <strong>frontera</strong>: el error no se amplifica pero tampoco se amortigua, y como los autovalores del módulo 1 son complejos (raíces de la unidad), el error rota sin decrecer y la iteración cicla indefinidamente. La causa de fondo es que $A$ <strong>no es diagonalmente dominante</strong>.' },
            { v: 'C', html: 'El problema es que $\\det A = 8$ es demasiado chico, lo que impide la convergencia.' },
            { v: 'D', html: 'Los métodos iterativos nunca funcionan con matrices ralas de $4\\times4$.' }
          ],
          desarrollo: [
            { p: M`El error $e^{(k)} = x^{(k)} - x$ evoluciona como $e^{(k)} = T^{k}e^{(0)}$. Descomponiendo $e^{(0)}$ en la base de autovectores, cada componente se multiplica por $\lambda_i^{k}$:` },
            { ul: [
              M`$|\lambda_i| < 1$: esa componente del error se extingue.`,
              M`$|\lambda_i| > 1$: explota.`,
              M`$|\lambda_i| = 1$: <strong>se conserva</strong> — y si $\lambda_i$ es complejo, además rota en el plano complejo, produciendo la oscilación periódica que se observa.`
            ] },
            { p: M`Mirando $A$: la fila 1 tiene $|a_{11}| = 1$ y $\sum_{j\neq1}|a_{1j}| = 1$; la fila 3, $|a_{33}| = 1$ contra $|a_{31}| = 1$; la fila 4 igual. Ninguna es <em>estrictamente</em> dominante, todas están justo en el límite — y esa igualdad se traslada directamente a $\rho(T) = 1$.` },
            { p: M`<strong>Cómo se arregla:</strong> reordenando las ecuaciones no se gana nada (la estructura de ceros no lo permite), pero sí funcionaría aplicar SOR con un $w$ adecuado, o simplemente resolver por un método directo: el sistema es chico, ralo y perfectamente bien condicionado ($K_\infty(A) = 9$).` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 11 ===================== */
    {
      id: 'p11',
      titulo: 'Sistema poco denso (matriz rala tridiagonal)',
      enunciado: [
        { p: M`Considerar el sistema poco denso de ecuaciones:` },
        { math: M`\begin{aligned}
          2a - b \phantom{{}+2c} \phantom{{}-d} &= 1 \\
          -a + 2b - c \phantom{{}-d} &= 1 \\
          \phantom{-a+} -b + 2c - d &= 1 \\
          \phantom{-a+2b} -c + 2d &= 1
        \end{aligned}` },
        { p: M`«Poco denso» sugiere que la matriz tiene gran cantidad de ceros a ambos lados de la diagonal (también llamada matriz <strong>rala</strong>).` },
        { p: M`Mostrar que el sistema permanece poco denso al llevarlo a la forma triangular por eliminación de Gauss. Hallar la solución por Gauss y luego por Gauss-Seidel.` }
      ],
      preguntas: [
        {
          id: 'q11_1', tag: '11.a', tipo: 'mc', correcta: 'B',
          enunciado: M`Al triangular por Gauss, ¿qué pasa con la estructura de ceros?`,
          opciones: [
            { v: 'A', html: 'La matriz se llena por completo: la eliminación destruye la ralitud.' },
            { v: 'B', html: '<strong>Se conserva.</strong> $U$ queda bidiagonal superior y $L$ bidiagonal inferior: en cada paso sólo hay un elemento que anular, y la operación $E_i \\leftarrow E_i - m\\,E_{i-1}$ afecta únicamente a la diagonal y a la superdiagonal.' },
            { v: 'C', html: 'Se llena sólo la última fila.' },
            { v: 'D', html: 'Aparecen ceros nuevos y la matriz se vuelve diagonal.' }
          ],
          desarrollo: [
            { p: M`En una matriz tridiagonal, al eliminar $a_{i,i-1}$ el único multiplicador no nulo de la columna $i-1$ es $m_{i,i-1}$, y la fila $i-1$ tiene ceros desde la posición $i+1$ en adelante. Por lo tanto la resta no genera ningún elemento nuevo fuera de la banda:` },
            { math: M`U = \begin{bmatrix}
              2 & -1 & 0 & 0 \\
              0 & 1{,}5 & -1 & 0 \\
              0 & 0 & 1{,}3333 & -1 \\
              0 & 0 & 0 & 1{,}25 \end{bmatrix}
              \qquad
              L = \begin{bmatrix}
              1 & 0 & 0 & 0 \\
              -0{,}5 & 1 & 0 & 0 \\
              0 & -0{,}6667 & 1 & 0 \\
              0 & 0 & -0{,}75 & 1 \end{bmatrix}` },
            { p: M`Los pivotes siguen la sucesión $2,\;\tfrac{3}{2},\;\tfrac{4}{3},\;\tfrac{5}{4}$ — es decir $u_{kk} = \dfrac{k+1}{k}$ — y los multiplicadores son $m_{k+1,k} = -\dfrac{k}{k+1}$.` },
            { p: M`<strong>Por qué importa.</strong> Una matriz tridiagonal $n\times n$ se resuelve en $O(n)$ operaciones y se almacena en $3n$ números, contra $O(n^3)/3$ y $n^2$ de una matriz llena. Es el fundamento del <strong>algoritmo de Thomas</strong> y la razón por la que discretizar una ecuación diferencial da sistemas enormes pero baratos de resolver.` },
            { p: M`<strong>Contraste:</strong> la <em>inversa</em> sí es completamente llena. Todos los elementos de $A^{-1}$ son distintos de cero, lo que confirma que nunca conviene invertir una matriz rala: hay que factorizarla.` },
            { p: M`Advertencia: esto vale para matrices tridiagonales <em>sin pivoteo</em>. Si hiciera falta pivotear, aparecería <em>fill-in</em> (elementos nuevos no nulos). Acá la matriz es simétrica y definida positiva —subdeterminantes $2,\,3,\,4,\,5$, todos positivos— así que el pivoteo es innecesario.` }
          ]
        },
        {
          id: 'q11_2', tag: '11.a', tipo: 'num', respuesta: 2, tol: 0.01,
          enunciado: M`¿Cuánto vale $a$ en la solución exacta (por Gauss)?`,
          placeholder: '0,00',
          desarrollo: [
            { p: M`Sustitución inversa sobre $U$, con el término independiente transformado $b' = (1;\;1{,}5;\;2;\;2{,}5)$:` },
            { math: M`d = \frac{2{,}5}{1{,}25} = 2 \qquad
                      c = \frac{2 + d}{1{,}3333} = 3 \qquad
                      b = \frac{1{,}5 + c}{1{,}5} = 3 \qquad
                      a = \frac{1 + b}{2} = 2` },
            { p: M`La solución es $(a,b,c,d) = (2;\,3;\,3;\,2)$, simétrica como corresponde a una matriz simétrica con término independiente simétrico.` }
          ]
        },
        {
          id: 'q11_3', tag: '11.b', tipo: 'num', respuesta: 0.809, tol: 0.02,
          enunciado: M`¿Cuánto vale $\rho(T_J)$ para esta matriz?`,
          ayuda: M`Para la tridiagonal $(-1,\,2,\,-1)$ de orden $n$: $\rho(T_J) = \cos\!\left(\frac{\pi}{n+1}\right)$.`,
          placeholder: '0,000',
          desarrollo: [
            { math: M`\rho(T_J) = \cos\!\left(\frac{\pi}{5}\right) = 0{,}80902` },
            { p: M`Es menor que 1, así que Jacobi converge — pero apenas: con $\rho = 0{,}81$ hacen falta unas 11 iteraciones para ganar un solo dígito decimal.` },
            { p: M`Nótese que $\|T_J\|_\infty = 1$ exactamente (las filas interiores suman $\tfrac{1}{2}+\tfrac{1}{2}$), así que el Teo 3 <strong>no permite concluir nada</strong> y hay que recurrir al radio espectral. Es el ejemplo perfecto de por qué el Teo 4 es el criterio verdadero: la matriz es diagonalmente dominante sólo en sentido <em>débil</em> (con igualdad en las filas 2 y 3), pero al ser irreducible la convergencia queda garantizada igual.` },
            { p: M`Para Gauss-Seidel: $\rho(T_{GS}) = \rho(T_J)^2 = 0{,}6545$ —la relación del Problema 7 vale también acá, porque la matriz es tridiagonal— y $\|T_{GS}\|_\infty = 0{,}875 < 1$.` }
          ]
        },
        {
          id: 'q11_4', tag: '11.b', tipo: 'mc', correcta: 'C',
          enunciado: M`Iterando por Gauss-Seidel desde $(0;0;0;0)$, ¿cuántas iteraciones hacen falta para que la máxima diferencia entre iteraciones sucesivas baje de $0{,}02$?`,
          opciones: [
            { v: 'A', html: '3 iteraciones' },
            { v: 'B', html: '6 iteraciones' },
            { v: 'C', html: '11 iteraciones' },
            { v: 'D', html: 'No converge' }
          ],
          desarrollo: [
            { p: M`Las fórmulas de iteración son:` },
            { math: M`a^{(k+1)} = \frac{1 + b^{(k)}}{2},\quad
                      b^{(k+1)} = \frac{1 + a^{(k+1)} + c^{(k)}}{2},\quad
                      c^{(k+1)} = \frac{1 + b^{(k+1)} + d^{(k)}}{2},\quad
                      d^{(k+1)} = \frac{1 + c^{(k+1)}}{2}` },
            {
              table: {
                head: [M`$k$`, M`$a$`, M`$b$`, M`$c$`, M`$d$`, 'máx. dif.'],
                rows: [
                  ['1', '0,5000', '0,7500', '0,8750', '0,9375', '0,9375'],
                  ['2', '0,8750', '1,3750', '1,6563', '1,3281', '0,7813'],
                  ['3', '1,1875', '1,9219', '2,1250', '1,5625', '0,5469'],
                  ['⋮', '⋮', '⋮', '⋮', '⋮', '⋮'],
                  ['10', '1,9575', '2,9444', '2,9550', '1,9775', '0,0293'],
                  ['11', '1,9722', '2,9636', '2,9706', '1,9853', '<strong>0,0192</strong> ✓']
                ]
              }
            },
            { p: M`La convergencia es <strong>monótona pero lenta</strong>: $\rho(T_{GS}) = 0{,}65$ implica que la diferencia se multiplica por $0{,}65$ en cada paso, y desde una diferencia inicial cercana a 1 hacen falta unas 11 iteraciones para bajar de $0{,}02$.` },
            { p: M`Además, como $\|T_{GS}\|_\infty = 0{,}875 > 0{,}5$, el factor de la cota es $\dfrac{0{,}875}{1-0{,}875} = 7$: el error verdadero en $k=11$ puede llegar a $7 \times 0{,}0192 = 0{,}134$. Y efectivamente lo es: $a = 1{,}97$ contra el valor exacto $2$.` },
            { p: M`<strong>Comparación con Gauss.</strong> El método directo resolvió el sistema exacto en 3 eliminaciones y 4 sustituciones. Para $n = 4$ los métodos iterativos no tienen ninguna ventaja; recién la tienen cuando $n$ es de miles y la matriz es rala, porque ahí cada iteración cuesta $O(n)$ en lugar de $O(n^2)$.` },
            { p: M`Con SOR y el $w$ óptimo del Teo 5, $w = \dfrac{2}{1+\sqrt{1-\rho(T_{GS})}} = 1{,}26$, la convergencia se acelera notablemente.` }
          ]
        }
      ]
    },

    /* ===================== PROBLEMA 12 ===================== */
    {
      id: 'p12',
      titulo: 'Reordenar para garantizar convergencia de Gauss-Seidel',
      enunciado: [
        { p: M`Dado el siguiente sistema de ecuaciones:` },
        { math: M`\begin{aligned}
          3{,}210\,x_1 + 0{,}943\,x_2 + 1{,}020\,x_3 &= 2{,}300 \\
          0{,}745\,x_1 \phantom{{}+0{,}943x_2} - 1{,}290\,x_3 &= 0{,}740 \\
          0{,}875\,x_1 - 2{,}540\,x_2 + 0{,}247\,x_3 &= 3{,}390
        \end{aligned}` },
        { p: '<strong>a)</strong> Efectuar, si es posible, las modificaciones necesarias para garantizar la convergencia con Gauss-Seidel.<br><strong>b)</strong> Resolver iterando hasta alcanzar una precisión de 3 dígitos significativos.' },
        { note: 'La solución exacta es x₁ = 1,00465 ; x₂ = −0,98792 ; x₃ = 0,00656.' }
      ],
      preguntas: [
        {
          id: 'q12_1', tag: '12.a', tipo: 'mc', correcta: 'A',
          enunciado: M`¿Por qué el sistema <strong>tal como viene</strong> no permite siquiera arrancar con Gauss-Seidel?`,
          opciones: [
            { v: 'A', html: 'Porque $a_{22} = 0$: la segunda ecuación no tiene $x_2$, y al despejar $x_2$ de ella habría que dividir por cero.' },
            { v: 'B', html: 'Porque la matriz es singular.' },
            { v: 'C', html: 'Porque los coeficientes tienen demasiados dígitos.' },
            { v: 'D', html: 'Porque el término independiente tiene componentes de distinto signo.' }
          ],
          desarrollo: [
            { math: M`A = \begin{bmatrix} 3{,}210 & 0{,}943 & 1{,}020 \\ 0{,}745 & \mathbf{0} & -1{,}290 \\ 0{,}875 & -2{,}540 & 0{,}247 \end{bmatrix}` },
            { p: M`El elemento $a_{22}$ vale cero, y tanto Jacobi como Gauss-Seidel dividen por los elementos diagonales ($T = -D^{-1}(L+U)$ requiere $D$ invertible). El método ni siquiera está definido.` },
            { p: M`La matriz <strong>no</strong> es singular: $\det A = -13{,}69$. El problema es la <em>disposición</em> de los coeficientes, no el sistema.` }
          ]
        },
        {
          id: 'q12_2', tag: '12.a', tipo: 'mc', correcta: 'B',
          enunciado: M`¿Qué reordenamiento de las ecuaciones garantiza la convergencia?`,
          opciones: [
            { v: 'A', tex: M`E_2,\;E_1,\;E_3` },
            { v: 'B', tex: M`E_1,\;E_3,\;E_2 \quad\text{(intercambiar la segunda con la tercera)}` },
            { v: 'C', tex: M`E_3,\;E_2,\;E_1` },
            { v: 'D', tex: M`\text{Ningún reordenamiento sirve}` }
          ],
          desarrollo: [
            { p: M`Hay que llevar a la diagonal, en cada fila, el coeficiente de mayor módulo. El coeficiente grande de $x_2$ está en la tercera ecuación ($-2{,}540$) y el de $x_3$ en la segunda ($-1{,}290$), así que se intercambian:` },
            { math: M`\begin{bmatrix} 3{,}210 & 0{,}943 & 1{,}020 \\ 0{,}875 & -2{,}540 & 0{,}247 \\ 0{,}745 & 0 & -1{,}290 \end{bmatrix}
                      \begin{Bmatrix} x_1 \\ x_2 \\ x_3 \end{Bmatrix}
                      = \begin{Bmatrix} 2{,}300 \\ 3{,}390 \\ 0{,}740 \end{Bmatrix}` },
            { p: M`Verificación de la dominancia diagonal <strong>estricta</strong> (Teo 1):` },
            {
              table: {
                head: ['fila', M`$|a_{ii}|$`, M`$\sum_{j\neq i}|a_{ij}|$`, '¿dominante?'],
                rows: [
                  ['1', '3,210', '0,943 + 1,020 = 1,963', 'sí ✓'],
                  ['2', '2,540', '0,875 + 0,247 = 1,122', 'sí ✓'],
                  ['3', '1,290', '0,745 + 0 = 0,745', 'sí ✓']
                ]
              }
            },
            { p: M`Por el Teo 1, Jacobi y Gauss-Seidel convergen. Verificando con el radio espectral: $\rho(T_{GS}) = 0{,}204$ y $\rho(T_J) = 0{,}537$, ambos cómodamente menores que 1, y $\|T_{GS}\|_\infty = 0{,}612$.` },
            { p: M`Las otras permutaciones dan $\rho(T_{GS}) > 1$ (por ejemplo $E_2,E_1,E_3$ da $\rho_{GS} = 77{,}9$) o directamente dejan un cero en la diagonal.` }
          ]
        },
        {
          id: 'q12_3', tag: '12.b', tipo: 'num', respuesta: 0.7165, tol: 0.01,
          enunciado: M`Iterando desde $x^{(0)} = (0;\,0;\,0)$, ¿cuánto vale $x_1^{(1)}$?`,
          placeholder: '0,0000',
          desarrollo: [
            { math: M`x_1^{(1)} = \frac{2{,}300 - 0{,}943\,x_2^{(0)} - 1{,}020\,x_3^{(0)}}{3{,}210}
                               = \frac{2{,}300}{3{,}210} = 0{,}71651` },
            { p: M`Siguiendo con los valores ya actualizados:` },
            { math: M`x_2^{(1)} = \frac{3{,}390 - 0{,}875(0{,}71651) - 0{,}247(0)}{-2{,}540} = -1{,}0878` },
            { math: M`x_3^{(1)} = \frac{0{,}740 - 0{,}745(0{,}71651)}{-1{,}290} = -0{,}15984` }
          ]
        },
        {
          id: 'q12_4', tag: '12.b', tipo: 'num', respuesta: 5, tol: 1.2,
          enunciado: M`¿En qué iteración se estabilizan los <strong>3 primeros dígitos significativos</strong> de las tres componentes?`,
          ayuda: 'Mirá a partir de qué k la solución ya no cambia en sus 3 primeros dígitos significativos.',
          placeholder: '0',
          desarrollo: [
            {
              table: {
                head: [M`$k$`, M`$x_1$`, M`$x_2$`, M`$x_3$`],
                rows: [
                  ['1', '0,716511', '−1,087816', '−0,159844'],
                  ['2', '1,086870', '−0,975776', '0,054045'],
                  ['3', '0,985991', '−0,989728', '−0,004215'],
                  ['4', '1,008602', '−0,987604', '0,008844'],
                  ['5', '1,003829', '−0,987979', '0,006087'],
                  ['6', '1,004815', '−0,987907', '0,006657'],
                  ['7', '1,004613', '−0,987921', '0,006540'],
                  ['8', '1,004654', '−0,987918', '0,006564']
                ]
              }
            },
            { p: M`Desde $k = 5$–$6$ las tres componentes ya tienen fijos sus 3 dígitos significativos: $x_1 = 1{,}00$, $x_2 = -0{,}988$, $x_3 = 0{,}00656$. Se acepta cualquier respuesta entre 4 y 6.` },
            { p: M`<strong>Cuidado con $x_3$:</strong> vale $0{,}00656$, un número chico. «Tres dígitos significativos» en $x_3$ significa acertar el $6{,}56\times10^{-3}$, no tres decimales — con tres decimales $x_3$ sería simplemente $0{,}007$. Por eso la guía pide <em>dígitos significativos</em> y no <em>decimales</em>, y por eso también aclara que hay que «trabajar con una precisión que garantice un error de redondeo despreciable»: si se itera con 3 dígitos, $x_3$ no tendría ninguno confiable.` },
            { p: M`La velocidad es la esperada: con $\rho(T_{GS}) = 0{,}204$ cada iteración gana un factor 5, es decir unos 0,7 dígitos decimales por paso.` }
          ]
        }
      ]
    },

    /* ===================== EXTRA ===================== */
    {
      id: 'pex',
      extra: true,
      titulo: 'Extra: ejercicio de examen (Jacobi con autovalores complejos)',
      enunciado: [
        { p: M`Dado el sistema lineal $A\,x = b$ con:` },
        { math: M`A = \begin{bmatrix} 2 & 0 & 1 \\ 1 & 2 & 1 \\ 0 & 1 & 2 \end{bmatrix}
                  \qquad
                  b = \begin{Bmatrix} 1 \\ 1 \\ 1 \end{Bmatrix}` },
        { p: M`<strong>a)</strong> ¿Es posible resolver este sistema con el método de Jacobi? ¿Qué indica el criterio de diagonal dominante aplicado a este caso?<br><strong>b)</strong> Dar una estimación con 2 dígitos significativos del radio espectral de la matriz de iteración $T$ de Jacobi, sabiendo que sus autovalores son $\lambda_1 = -0{,}6624$; $\lambda_2 = 0{,}3312 + 0{,}2811i$; $\lambda_3 = 0{,}3312 - 0{,}2811i$. ¿Está garantizada la convergencia?<br><strong>c)</strong> Realizar 2 iteraciones con la semilla $x_0 = [0{,}29\;\;0{,}15\;\;0{,}43]$.` },
        { note: 'Ejercicio de examen incluido en la clase «SEL Iterativos» de la cátedra.' }
      ],
      preguntas: [
        {
          id: 'qex_1', tag: '★.a', tipo: 'mc', correcta: 'C',
          enunciado: M`¿Qué indica el criterio de diagonal dominante en este caso?`,
          opciones: [
            { v: 'A', html: 'La matriz es diagonalmente dominante, por lo tanto Jacobi converge.' },
            { v: 'B', html: 'La matriz no es diagonalmente dominante, por lo tanto Jacobi diverge.' },
            { v: 'C', html: 'La matriz <strong>no</strong> es diagonalmente dominante (la fila 2 falla: $|2| = |1| + |1|$), así que el criterio <strong>no permite concluir nada</strong>: es una condición suficiente, no necesaria. Hay que recurrir al radio espectral.' },
            { v: 'D', html: 'El criterio no se aplica a matrices $3\\times3$.' }
          ],
          desarrollo: [
            {
              table: {
                head: ['fila', M`$|a_{ii}|$`, M`$\sum_{j\neq i}|a_{ij}|$`, '¿estricta?'],
                rows: [
                  ['1', '2', '0 + 1 = 1', 'sí ✓'],
                  ['2', '2', '1 + 1 = 2', '<strong>no</strong> (igualdad)'],
                  ['3', '2', '1 + 0 = 1', 'sí ✓']
                ]
              }
            },
            { p: M`La fila 2 cumple con igualdad, no con desigualdad estricta. El Teo 1 pide $|a_{ii}| > \sum_{j\neq i}|a_{ij}|$ para <strong>todas</strong> las filas, así que no se aplica.` },
            { p: M`Ése es el punto conceptual que busca el examen: fallar el criterio <strong>no</strong> significa divergir. El Teo 1 es una condición <em>suficiente</em>; la única condición necesaria y suficiente es $\rho(T) < 1$.` },
            { p: M`Además, $D$ es invertible (todos los $a_{ii} = 2 \neq 0$), así que el método <em>está definido</em> y se puede intentar. Ésa es la respuesta a «¿es posible resolver este sistema con Jacobi?»: sí, se puede plantear; si converge o no lo dirá el radio espectral.` }
          ]
        },
        {
          id: 'qex_2', tag: '★.b', tipo: 'num', respuesta: 0.66, tol: 0.015,
          enunciado: M`Estimar con 2 dígitos significativos el radio espectral $\rho(T_J)$.`,
          ayuda: M`$\rho(T) = \max_i |\lambda_i|$, y el módulo de un complejo es $|a+bi| = \sqrt{a^2+b^2}$.`,
          placeholder: '0,00',
          desarrollo: [
            { math: M`|\lambda_1| = |-0{,}6624| = 0{,}6624` },
            { math: M`|\lambda_2| = |\lambda_3| = \sqrt{0{,}3312^{2} + 0{,}2811^{2}}
                               = \sqrt{0{,}10969 + 0{,}07902}
                               = \sqrt{0{,}18871} = 0{,}43441` },
            { math: M`\rho(T_J) = \max\{0{,}6624;\;0{,}4344;\;0{,}4344\} = 0{,}6624 \approx 0{,}66` },
            { p: M`<strong>La trampa está en $\lambda_2$ y $\lambda_3$:</strong> quien tome sólo la parte real ($0{,}3312$) o sume parte real e imaginaria ($0{,}6123$) obtiene un número parecido y se equivoca igual. Con autovalores complejos hay que calcular el módulo.` },
            { p: M`Como $\rho(T_J) = 0{,}66 < 1$, por el Teo 4 <strong>la convergencia está garantizada</strong>, a pesar de que el criterio de diagonal dominante no se cumplía. Es la confirmación de lo anterior.` },
            { p: M`Para referencia, $\rho(T_{GS}) = 0{,}125$: Gauss-Seidel sería bastante más rápido acá.` }
          ]
        },
        {
          id: 'qex_3', tag: '★.c', tipo: 'num', respuesta: 0.2875, tol: 0.004,
          enunciado: M`Con la semilla $x^{(0)} = (0{,}29;\;0{,}15;\;0{,}43)$, ¿cuánto vale $x_1^{(2)}$ (primera componente tras <strong>dos</strong> iteraciones de Jacobi)?`,
          placeholder: '0,0000',
          desarrollo: [
            { p: M`Las fórmulas de Jacobi son:` },
            { math: M`x_1^{(k+1)} = \frac{1 - x_3^{(k)}}{2},\qquad
                      x_2^{(k+1)} = \frac{1 - x_1^{(k)} - x_3^{(k)}}{2},\qquad
                      x_3^{(k+1)} = \frac{1 - x_2^{(k)}}{2}` },
            { p: M`<strong>Primera iteración:</strong>` },
            { math: M`x^{(1)} = \left(\frac{1-0{,}43}{2};\;\; \frac{1-0{,}29-0{,}43}{2};\;\; \frac{1-0{,}15}{2}\right)
                             = (0{,}2850;\;\; 0{,}1400;\;\; 0{,}4250)` },
            { p: M`<strong>Segunda iteración:</strong>` },
            { math: M`x^{(2)} = \left(\frac{1-0{,}4250}{2};\;\; \frac{1-0{,}2850-0{,}4250}{2};\;\; \frac{1-0{,}1400}{2}\right)
                             = (0{,}2875;\;\; 0{,}1450;\;\; 0{,}4300)` },
            { p: M`La solución exacta es $x = \left(\tfrac{2}{7};\;\tfrac{1}{7};\;\tfrac{3}{7}\right) = (0{,}28571;\;0{,}14286;\;0{,}42857)$. Con dos iteraciones ya se tienen 2 dígitos significativos en cada componente.` },
            { p: M`«Dar una solución adecuada»: con $\rho = 0{,}66$ el error se reduce apenas un tercio por iteración, así que informar más de 3 dígitos sería mentir. Lo correcto es $x \approx (0{,}29;\;0{,}14;\;0{,}43)$.` }
          ]
        }
      ]
    }
  ]
};

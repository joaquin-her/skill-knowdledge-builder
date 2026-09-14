/* ============================================================================
   mode_quizz — motor reutilizable
   ----------------------------------------------------------------------------
   No contiene contenido: sólo render + KaTeX + corrección + puntaje. Las
   unidades viven en js/units/ y se registran solas con QUIZ.registerUnit().

   API pública (window.QUIZ):
     M                     String.raw, para escribir LaTeX sin escapar
     units                 unidades registradas, en orden de carga
     registerUnit(unidad)  la llama cada archivo de js/units/
     init(config)          la llama js/app.js, después de todas las unidades

   Restricciones de diseño (no romper):
   - Script clásico, nunca type="module": el index se abre por file:// con doble
     clic y los módulos ES fallan ahí por CORS.
   - Cada unidad va dentro de una IIFE: en scripts clásicos el scope léxico es
     compartido y dos `const M` globales tiran "already been declared".
   - Los ids de pregunta se namespacean con el id de la unidad, así dos guías
     pueden numerar igual sin chocar.
   ========================================================================== */

(function () {
  'use strict';

  var SEP = '__';                       // separador de namespace: unidad__qid
  var TEMA_KEY = 'mode_quizz.tema';
  var UNIDAD_KEY = 'mode_quizz.unidad';

  var UNIDADES = [];                    // en orden de carga
  var POR_ID = {};                      // id de unidad -> unidad
  var INDICE = {};                      // qid namespaceado -> { pregunta, problema, unidad }
  var RESULTADOS = {};                  // qid namespaceado -> true | false
  var RESPUESTAS = {};                  // qid namespaceado -> lo elegido/tipeado, para repintar
  var ACTIVA = null;                    // unidad en pantalla
  var CONFIG = {};                      // lo que pasó js/app.js a QUIZ.init()

  /* ---------------------------------------------------------------- KaTeX -- */

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function tex(src, display) {
    if (typeof katex === 'undefined') return '<code>' + escapeHtml(src) + '</code>';
    try {
      return katex.renderToString(src, {
        displayMode: !!display,
        throwOnError: false,
        strict: false
      });
    } catch (err) {
      console.error('KaTeX:', err, src);
      return '<code>' + escapeHtml(src) + '</code>';
    }
  }

  /** Texto con HTML libre y fórmulas en línea delimitadas por $…$ */
  function inline(text) {
    if (text == null) return '';
    return String(text).replace(/\$([^$]+)\$/g, function (_, src) {
      return tex(src, false);
    });
  }

  /* ------------------------------------------------------- bloques de texto -- */

  function renderBloques(bloques) {
    if (!bloques || !bloques.length) return '';
    return bloques.map(function (b) {
      if (b.p) return '<p>' + inline(b.p) + '</p>';
      if (b.math) return '<div class="math-display">' + tex(b.math, true) + '</div>';
      if (b.note) return '<div class="note">' + inline(b.note) + '</div>';
      if (b.ul) {
        return '<ul class="data-list">' + b.ul.map(function (li) {
          return '<li>' + inline(li) + '</li>';
        }).join('') + '</ul>';
      }
      if (b.table) {
        var t = b.table;
        var head = '<tr>' + t.head.map(function (h) { return '<th>' + inline(h) + '</th>'; }).join('') + '</tr>';
        var rows = t.rows.map(function (r) {
          return '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
        }).join('');
        return '<div class="scrollx"><table class="datatable"><thead>' + head + '</thead><tbody>' + rows + '</tbody></table></div>';
      }
      return '';
    }).join('');
  }

  /* ------------------------------------------------------------ namespaces -- */

  function nsQid(unidad, qid) { return unidad.id + SEP + qid; }
  function nsPid(unidad, pid) { return unidad.id + SEP + pid; }

  /* ------------------------------------------------------------- preguntas -- */

  function renderPregunta(unidad, q) {
    var qid = nsQid(unidad, q.id);
    var html = '<article class="q" id="' + qid + '" data-qid="' + qid + '">';

    html += '<p class="qtext">';
    if (q.tag) html += '<span class="qtag">' + escapeHtml(q.tag) + '</span>';
    html += inline(q.enunciado) + '</p>';
    if (q.ayuda) html += '<p class="qhelp">' + inline(q.ayuda) + '</p>';

    if (q.tipo === 'mc') {
      html += '<div class="opts" role="radiogroup">';
      q.opciones.forEach(function (o) {
        html += '<label class="opt" data-val="' + o.v + '">' +
          '<input type="radio" name="' + qid + '" value="' + o.v + '">' +
          // \displaystyle: las fracciones de las opciones se ven en tamaño pleno
          '<span class="opt-body">' + (o.tex ? tex('\\displaystyle ' + o.tex, false) : inline(o.html)) + '</span>' +
          '<span class="opt-mark" aria-hidden="true"></span>' +
          '</label>';
      });
      html += '</div>';
    } else {
      // type=text + inputmode=decimal: admite coma decimal y notación científica,
      // que es justo lo que type=number rechaza.
      html += '<div class="inputrow">' +
        '<input type="text" inputmode="decimal" autocomplete="off" spellcheck="false" ' +
        'id="in_' + qid + '" aria-label="Respuesta" placeholder="' + (q.placeholder || '0,00') + '">' +
        (q.unidad ? '<span class="unit">' + inline(q.unidad) + '</span>' : '') +
        '</div>';
    }

    html += '<div class="qactions">' +
      '<button type="button" class="btn" data-verify="' + qid + '">Verificar</button>' +
      '<span class="fb" hidden></span>' +
      '</div>';

    if (q.desarrollo && q.desarrollo.length) {
      html += '<details class="explain"><summary>Ver desarrollo</summary>' +
        '<div class="explain-body">' + renderBloques(q.desarrollo) + '</div></details>';
    }

    html += '</article>';
    return html;
  }

  function renderProblema(unidad, p, i) {
    var html = '<section class="problema" id="' + nsPid(unidad, p.id) + '">';
    html += '<header class="problema-head">' +
      '<h2><span class="pnum">' + (p.extra ? '★' : (i + 1)) + '</span>' + escapeHtml(p.titulo) + '</h2>' +
      '<span class="pscore" data-pscore="' + nsPid(unidad, p.id) + '">0/' + p.preguntas.length + '</span>' +
      '</header>';
    html += '<div class="statement">' + renderBloques(p.enunciado) + '</div>';
    html += p.preguntas.map(function (q) { return renderPregunta(unidad, q); }).join('');
    html += '</section>';
    return html;
  }

  /* -------------------------------------------------------------- corrección -- */

  function parseNumero(str) {
    if (str == null) return NaN;
    var s = String(str).trim().replace(/\s/g, '').replace(',', '.');
    if (s === '') return NaN;
    return Number(s);
  }

  function esCorrecta(q, valor) {
    if (typeof q.reltol === 'number') {
      return Math.abs(valor - q.respuesta) <= Math.abs(q.respuesta) * q.reltol;
    }
    return Math.abs(valor - q.respuesta) <= (typeof q.tol === 'number' ? q.tol : 0);
  }

  function mostrarFeedback(el, clase, texto) {
    el.hidden = false;
    el.className = 'fb ' + clase;
    el.textContent = texto;
  }

  function verificar(qid) {
    var ref = INDICE[qid];
    if (!ref) return;
    var q = ref.pregunta;
    var nodo = document.getElementById(qid);
    if (!nodo) return;
    var fb = nodo.querySelector('.fb');
    var ok, dada;

    if (q.tipo === 'mc') {
      var elegida = nodo.querySelector('input[type=radio]:checked');
      if (!elegida) {
        mostrarFeedback(fb, 'warn', 'Elegí una opción antes de verificar.');
        return;
      }
      dada = elegida.value;
      ok = dada === q.correcta;
      marcarOpciones(nodo, q, dada);
    } else {
      var input = nodo.querySelector('input');
      var valor = parseNumero(input.value);
      if (isNaN(valor)) {
        mostrarFeedback(fb, 'warn', 'Ingresá un valor numérico.');
        return;
      }
      dada = input.value;
      ok = esCorrecta(q, valor);
      input.classList.toggle('input-ok', ok);
      input.classList.toggle('input-bad', !ok);
    }

    mostrarFeedback(fb, ok ? 'ok' : 'bad', ok ? '✓ Correcto' : '✗ Incorrecto');
    nodo.classList.toggle('q-ok', ok);
    nodo.classList.toggle('q-bad', !ok);

    var det = nodo.querySelector('details.explain');
    if (det) det.open = true;

    RESULTADOS[qid] = ok;
    RESPUESTAS[qid] = dada;
    actualizarPuntaje();
  }

  function marcarOpciones(nodo, q, elegida) {
    nodo.querySelectorAll('.opt').forEach(function (opt) {
      opt.classList.remove('opt-correct', 'opt-incorrect');
      var v = opt.getAttribute('data-val');
      if (v === q.correcta) opt.classList.add('opt-correct');
      else if (v === elegida) opt.classList.add('opt-incorrect');
    });
  }

  /* ------------------------------------------------------------- repintado -- */

  function repintarUnidad(unidad) {
    unidad.problemas.forEach(function (p) {
      p.preguntas.forEach(function (q) {
        var qid = nsQid(unidad, q.id);
        if (!(qid in RESULTADOS)) return;

        var nodo = document.getElementById(qid);
        if (!nodo) return;
        var ok = RESULTADOS[qid];
        var dada = RESPUESTAS[qid];

        if (q.tipo === 'mc') {
          var radio = nodo.querySelector('input[type=radio][value="' + dada + '"]');
          if (radio) radio.checked = true;
          marcarOpciones(nodo, q, dada);
        } else {
          var input = nodo.querySelector('input');
          if (input) {
            if (dada != null) input.value = dada;
            input.classList.toggle('input-ok', ok);
            input.classList.toggle('input-bad', !ok);
          }
        }

        var fb = nodo.querySelector('.fb');
        if (fb) mostrarFeedback(fb, ok ? 'ok' : 'bad', ok ? '✓ Correcto' : '✗ Incorrecto');
        nodo.classList.toggle('q-ok', ok);
        nodo.classList.toggle('q-bad', !ok);
        var det = nodo.querySelector('details.explain');
        if (det) det.open = true;
      });
    });
  }

  /* ---------------------------------------------------------------- puntaje -- */

  function avanceDe(unidad) {
    var respondidas = 0, correctas = 0, total = 0;
    unidad.problemas.forEach(function (p) {
      p.preguntas.forEach(function (q) {
        var qid = nsQid(unidad, q.id);
        total++;
        if (qid in RESULTADOS) {
          respondidas++;
          if (RESULTADOS[qid]) correctas++;
        }
      });
    });
    return { respondidas: respondidas, correctas: correctas, total: total };
  }

  function setTexto(id, valor) {
    var el = document.getElementById(id);
    if (el) el.textContent = valor;
  }

  function actualizarPuntaje() {
    if (!ACTIVA) return;
    var a = avanceDe(ACTIVA);

    setTexto('statRespondidas', a.respondidas);
    setTexto('statTotal', a.total);
    setTexto('statCorrectas', a.correctas);
    setTexto('resumenCorrectas', a.correctas);
    setTexto('resumenTotal', a.total);

    var fill = document.getElementById('progressFill');
    if (fill) {
      fill.style.width = (a.total ? Math.round((a.respondidas / a.total) * 100) : 0) + '%';
    }

    ACTIVA.problemas.forEach(function (p) {
      var bien = p.preguntas.filter(function (q) {
        return RESULTADOS[nsQid(ACTIVA, q.id)];
      }).length;
      var badge = document.querySelector('[data-pscore="' + nsPid(ACTIVA, p.id) + '"]');
      if (!badge) return;
      badge.textContent = bien + '/' + p.preguntas.length;
      badge.classList.toggle('pscore-full', bien === p.preguntas.length);
    });

    actualizarOpcionesSelector();
  }

  /* --------------------------------------------------------------- reiniciar -- */

  function reiniciar() {
    if (!ACTIVA) return;
    var nombre = ACTIVA.materia + ' · ' + ACTIVA.unidad;
    if (!confirm('¿Reiniciar el intento de ' + nombre + '? Se borran las respuestas de esta unidad.')) return;

    // Sólo la unidad activa: el avance de las otras sobrevive.
    ACTIVA.problemas.forEach(function (p) {
      p.preguntas.forEach(function (q) {
        var qid = nsQid(ACTIVA, q.id);
        delete RESULTADOS[qid];
        delete RESPUESTAS[qid];
      });
    });

    document.querySelectorAll('#quiz .q').forEach(function (nodo) {
      nodo.classList.remove('q-ok', 'q-bad');
      nodo.querySelectorAll('.opt').forEach(function (o) {
        o.classList.remove('opt-correct', 'opt-incorrect');
      });
      nodo.querySelectorAll('input').forEach(function (i) {
        if (i.type === 'radio') i.checked = false;
        else { i.value = ''; i.classList.remove('input-ok', 'input-bad'); }
      });
      var fb = nodo.querySelector('.fb');
      if (fb) { fb.hidden = true; fb.textContent = ''; }
      var det = nodo.querySelector('details.explain');
      if (det) det.open = false;
    });

    actualizarPuntaje();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* -------------------------------------------------------------------- tema -- */

  function aplicarTema(modo) {
    var raiz = document.documentElement;
    if (modo === 'dark' || modo === 'light') raiz.setAttribute('data-theme', modo);
    else raiz.removeAttribute('data-theme');
    var btn = document.getElementById('btnTema');
    if (btn) {
      btn.textContent = modo === 'dark' ? '◐ Oscuro' : modo === 'light' ? '◑ Claro' : '◓ Sistema';
      btn.setAttribute('data-modo', modo);
    }
  }

  function leerGuardado(clave, fallback) {
    try { return localStorage.getItem(clave) || fallback; } catch (e) { return fallback; }
  }

  function guardar(clave, valor) {
    try { localStorage.setItem(clave, valor); } catch (e) { /* file:// o modo privado */ }
  }

  function rotarTema() {
    var btn = document.getElementById('btnTema');
    var actual = (btn && btn.getAttribute('data-modo')) || 'system';
    var siguiente = actual === 'system' ? 'light' : actual === 'light' ? 'dark' : 'system';
    aplicarTema(siguiente);
    guardar(TEMA_KEY, siguiente);
  }

  /* ---------------------------------------------------------------- selector -- */

  function etiquetaUnidad(unidad) {
    var a = avanceDe(unidad);
    return unidad.materia + ' · ' + unidad.unidad + ' — ' + a.correctas + '/' + a.total;
  }

  function construirSelector() {
    var sel = document.getElementById('selectorUnidad');
    if (!sel) return;

    sel.innerHTML = UNIDADES.map(function (u) {
      return '<option value="' + escapeHtml(u.id) + '">' + escapeHtml(etiquetaUnidad(u)) + '</option>';
    }).join('');

    // Con una sola unidad el selector no aporta nada: se oculta la fila entera.
    var fila = sel.closest('.unit-row');
    if (fila) fila.hidden = UNIDADES.length < 2;

    sel.addEventListener('change', function () {
      mostrarUnidad(sel.value);
    });
  }

  function actualizarOpcionesSelector() {
    var sel = document.getElementById('selectorUnidad');
    if (!sel) return;
    UNIDADES.forEach(function (u, i) {
      if (sel.options[i]) sel.options[i].textContent = etiquetaUnidad(u);
    });
  }

  /* ------------------------------------------------------------------ unidad -- */

  function mostrarUnidad(id) {
    var unidad = POR_ID[id] || UNIDADES[0];
    if (!unidad) return;
    ACTIVA = unidad;

    var tag = document.getElementById('cursoTag');
    if (tag) tag.textContent = unidad.codigo + ' ' + unidad.materia + ' — ' + unidad.unidad;

    var marca = document.getElementById('marcaTitulo');
    if (marca && CONFIG.titulo) marca.innerHTML = CONFIG.titulo;

    var pie = document.getElementById('pieUnidad');
    if (pie) {
      pie.textContent = unidad.unidad + ' · ' + unidad.codigo + ' ' + unidad.materia +
        ' · ' + unidad.facultad + '.';
    }

    document.title = (CONFIG.tituloTexto ? CONFIG.tituloTexto + ' — ' : '') +
      unidad.materia + ' — ' + unidad.unidad;

    document.getElementById('quiz').innerHTML = unidad.problemas.map(function (p, i) {
      return renderProblema(unidad, p, i);
    }).join('');

    var sel = document.getElementById('selectorUnidad');
    if (sel && sel.value !== unidad.id) sel.value = unidad.id;

    repintarUnidad(unidad);
    actualizarPuntaje();
    guardar(UNIDAD_KEY, unidad.id);
  }

  /* -------------------------------------------------------------------- init -- */

  function arrancar() {
    if (!UNIDADES.length) {
      console.error('mode_quizz: no hay unidades registradas. Revisá el bloque UNIDADES de index.html.');
      return;
    }

    construirSelector();

    document.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-verify]');
      if (b) { verificar(b.getAttribute('data-verify')); return; }
      if (ev.target.closest('#btnReiniciar, #btnReiniciarPie')) { reiniciar(); return; }
      if (ev.target.closest('#btnTema')) { rotarTema(); }
    });

    // Enter dentro de un campo numérico = Verificar
    document.getElementById('quiz').addEventListener('keydown', function (ev) {
      if (ev.key !== 'Enter') return;
      var campo = ev.target.closest('input[type=text]');
      if (!campo) return;
      ev.preventDefault();
      var nodo = campo.closest('.q');
      if (nodo) verificar(nodo.getAttribute('data-qid'));
    });

    aplicarTema(leerGuardado(TEMA_KEY, 'system'));

    var guardada = leerGuardado(UNIDAD_KEY, null);
    mostrarUnidad(POR_ID[guardada] ? guardada : UNIDADES[0].id);
  }

  /* ------------------------------------------------------------------- API -- */

  window.QUIZ = {
    M: String.raw,

    units: UNIDADES,

    registerUnit: function (unidad) {
      if (!unidad || !unidad.id) {
        console.error('mode_quizz: la unidad necesita un id.', unidad);
        return;
      }
      if (POR_ID[unidad.id]) {
        console.error('mode_quizz: id de unidad duplicado:', unidad.id);
        return;
      }
      POR_ID[unidad.id] = unidad;
      UNIDADES.push(unidad);

      unidad.problemas.forEach(function (p) {
        p.preguntas.forEach(function (q) {
          INDICE[nsQid(unidad, q.id)] = { pregunta: q, problema: p, unidad: unidad };
        });
      });
    },

    init: function (config) {
      CONFIG = config || {};
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', arrancar);
      } else {
        arrancar();
      }
    }
  };
})();

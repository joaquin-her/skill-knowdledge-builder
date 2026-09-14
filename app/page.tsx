import Link from 'next/link';
import { UNIDADES } from '@/data/units';

export default function Landing() {
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <h1>
              Laboratorio<span className="dot">·</span>Errores
            </h1>
            <span className="course-tag">Facultad de Ingeniería — UBA</span>
          </div>
        </div>
      </header>

      <main className="wrap">
        <section className="hero">
          <h2>Practicá como si fuera el parcial.</h2>
          <p className="hero-lead">
            Guías de ejercicios de materias de ingeniería, resueltas por vos y corregidas al
            instante. Cada ejercicio se responde por opción múltiple o ingresando el valor
            calculado, y se corrige solo, con el desarrollo completo desplegable.
          </p>
          <p className="hero-lead">
            El avance queda guardado en tu navegador: podés cerrar la pestaña y seguir después.
          </p>
        </section>

        <section className="intro">
          <h2>Cómo practicar</h2>
          <ol className="intro-steps">
            <li>
              <span className="num">1</span> Resolvé cada ejercicio en papel o calculadora, como
              en un parcial.
            </li>
            <li>
              <span className="num">2</span> Cargá tu resultado y presioná{' '}
              <strong>Verificar</strong> (o Enter en los campos numéricos).
            </li>
            <li>
              <span className="num">3</span> Vas a ver al instante si está correcto o incorrecto,
              con el desarrollo completo desplegado.
            </li>
          </ol>
          <p className="intro-note">
            Las respuestas numéricas admiten un margen de tolerancia por redondeo de cifras
            significativas: no hace falta que coincidan dígito a dígito. Usá coma o punto decimal
            indistintamente; para valores muy chicos podés escribir notación científica, como{' '}
            <code>8,3e-9</code>.
          </p>
        </section>

        <section className="unidades">
          <h2>Unidades disponibles</h2>
          <ul className="unidad-grid">
            {UNIDADES.map((u) => {
              const ejercicios = u.problemas.reduce((n, p) => n + p.preguntas.length, 0);
              return (
                <li key={u.id}>
                  <Link className="unidad-card" href={`/unidad/${u.id}/`}>
                    <span className="unidad-codigo">
                      {u.codigo} {u.materia}
                    </span>
                    <span className="unidad-nombre">{u.unidad}</span>
                    <span className="unidad-meta">
                      {u.problemas.length} problemas · {ejercicios} ejercicios
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <footer className="footer-note">
          <p>Práctica autoevaluable · Facultad de Ingeniería — UBA.</p>
          <p>
            Fórmulas renderizadas con KaTeX (incluido en <code>vendor/</code>, funciona sin
            conexión).
          </p>
        </footer>
      </main>
    </>
  );
}

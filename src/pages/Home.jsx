import { Link } from 'react-router-dom'

function Home() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>

            {/* Hero */}
            <div style={{ background: '#1a1a2e', color: 'white', padding: '4rem 2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem' }}>🗳️ Candidatos Colombia 2026</h1>
                <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto' }}>
                    Conoce a los candidatos a Presidencia y Congreso de Colombia para las elecciones del 2026.
                    Infórmate antes de votar.
                </p>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/registro" style={{ background: '#e94560', color: 'white', padding: '0.8rem 2rem', borderRadius: '8px', textDecoration: 'none' }}>
                        Registrarse
                    </Link>
                    <Link to="/login" style={{ background: 'white', color: '#1a1a2e', padding: '0.8rem 2rem', borderRadius: '8px', textDecoration: 'none' }}>
                        Iniciar Sesión
                    </Link>
                </div>
            </div>

            {/* Info electoral */}
            <div style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>¿Qué se elige en 2026?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>

                    <div style={{ background: '#f4f4f4', borderRadius: '12px', padding: '1.5rem' }}>
                        <h3>🏛️ Presidente</h3>
                        <p>El Presidente de Colombia es elegido por voto popular para un período de 4 años. Es el Jefe de Estado y de Gobierno.</p>
                    </div>

                    <div style={{ background: '#f4f4f4', borderRadius: '12px', padding: '1.5rem' }}>
                        <h3>📜 Senado</h3>
                        <p>El Senado está compuesto por 108 senadores elegidos en circunscripción nacional para un período de 4 años.</p>
                    </div>

                    <div style={{ background: '#f4f4f4', borderRadius: '12px', padding: '1.5rem' }}>
                        <h3>🏢 Cámara de Representantes</h3>
                        <p>La Cámara tiene 188 representantes elegidos por circunscripciones territoriales y especiales.</p>
                    </div>

                </div>
            </div>

            {/* Fechas clave */}
            <div style={{ background: '#1a1a2e', color: 'white', padding: '3rem 2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>📅 Fechas Clave 2026</h2>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #ffffff33' }}>
                        <span>Consultas interpartidistas</span>
                        <span style={{ color: '#e94560' }}>Marzo 2026</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #ffffff33' }}>
                        <span>Elecciones Congreso</span>
                        <span style={{ color: '#e94560' }}>Marzo 2026</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #ffffff33' }}>
                        <span>Primera vuelta Presidencial</span>
                        <span style={{ color: '#e94560' }}>Mayo 2026</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0' }}>
                        <span>Segunda vuelta Presidencial</span>
                        <span style={{ color: '#e94560' }}>Junio 2026</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', padding: '2rem', background: '#0f0f1a', color: '#888' }}>
                <p>© 2026 Candidatos Colombia — Proyecto académico</p>
            </div>

        </div>
    )
}

export default Home
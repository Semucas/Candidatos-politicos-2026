import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'

function Candidatos() {
    const [candidatos, setCandidatos] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        fetchCandidatos()
    }, [])

    const fetchCandidatos = async () => {
        const { data, error } = await supabase
            .from('candidatos')
            .select('*')
            .limit(100)
        if (!error) setCandidatos(data)
        setCargando(false)
    }

    const handleEliminar = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este candidato?')) return
        await supabase.from('candidatos').delete().eq('id', id)
        fetchCandidatos()
    }

    const candidatosFiltrados = candidatos.filter(c =>
        c.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )

    return (
        <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>🗳️ Candidatos 2026</h2>
                <Link to="/candidatos/nuevo" style={{ background: '#e94560', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '8px', textDecoration: 'none' }}>
                    + Agregar Candidato
                </Link>
            </div>

            <input
                type="text"
                placeholder="🔍 Buscar por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', marginBottom: '1.5rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}
            />

            {cargando && <p>Cargando candidatos...</p>}

            {!cargando && candidatosFiltrados.length === 0 && (
                <p>No hay candidatos registrados aún. ¡Agrega el primero!</p>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {candidatosFiltrados.map(candidato => (
                    <div key={candidato.id} style={{ background: '#f9f9f9', borderRadius: '12px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <img
                            src={candidato.imagen || 'https://via.placeholder.com/150'}
                            alt={candidato.nombre}
                            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <h3 style={{ margin: '0.8rem 0 0.3rem', color: '#1a1a2e' }}>{candidato.nombre}</h3>
                        <p style={{ color: '#666', margin: '0.2rem 0' }}>🏛️ {candidato.cargo}</p>
                        <p style={{ color: '#666', margin: '0.2rem 0' }}>🎗️ {candidato.partido}</p>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <Link to={`/candidatos/${candidato.id}/editar`} style={{ flex: 1, textAlign: 'center', background: '#1a1a2e', color: 'white', padding: '0.4rem', borderRadius: '6px', textDecoration: 'none' }}>
                                ✏️ Editar
                            </Link>
                            <button onClick={() => handleEliminar(candidato.id)} style={{ flex: 1, background: '#e94560', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                                🗑️ Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Candidatos
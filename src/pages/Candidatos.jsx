import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'

function Candidatos() {
    const [candidatos, setCandidatos] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [cargando, setCargando] = useState(true)
    const [session, setSession] = useState(null)
    const [votoUsuario, setVotoUsuario] = useState(null)
    const [votando, setVotando] = useState(false)

    useEffect(() => {
        fetchCandidatos()
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if (session) fetchVotoUsuario(session.user.id)
        })
    }, [])

    const fetchCandidatos = async () => {
        const { data, error } = await supabase
            .from('candidatos')
            .select('*')
            .order('votos', { ascending: false })
            .limit(100)
        if (!error) setCandidatos(data)
        setCargando(false)
    }

    const fetchVotoUsuario = async (userId) => {
        const { data } = await supabase
            .from('votos')
            .select('candidato_id')
            .eq('user_id', userId)
            .single()
        if (data) setVotoUsuario(data.candidato_id)
    }

    const handleVotar = async (candidatoId) => {
        if (!session) return alert('Debes iniciar sesión para votar')
        if (votoUsuario) return alert('Ya votaste, solo puedes votar una vez')

        setVotando(true)

        // Registrar el voto del usuario
        const { error: errorVoto } = await supabase
            .from('votos')
            .insert([{ user_id: session.user.id, candidato_id: candidatoId }])

        if (errorVoto) {
            alert('Error al votar: ' + errorVoto.message)
            setVotando(false)
            return
        }

        // Incrementar el contador de votos del candidato
        const candidato = candidatos.find(c => c.id === candidatoId)
        await supabase
            .from('candidatos')
            .update({ votos: candidato.votos + 1 })
            .eq('id', candidatoId)

        setVotoUsuario(candidatoId)
        fetchCandidatos()
        setVotando(false)
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
        <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>🗳️ Candidatos 2026</h2>
                {session && (
                    <Link to="/candidatos/nuevo" style={{ background: '#e94560', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '8px', textDecoration: 'none' }}>
                        + Agregar Candidato
                    </Link>
                )}
            </div>

            {votoUsuario && (
                <div style={{ background: '#d4edda', color: '#155724', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem' }}>
                    ✅ Ya emitiste tu voto. ¡Gracias por participar!
                </div>
            )}

            {!session && (
                <div style={{ background: '#fff3cd', color: '#856404', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem' }}>
                    ℹ️ <Link to="/login">Inicia sesión</Link> para poder votar por tu candidato favorito
                </div>
            )}

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
                    <div key={candidato.id} style={{ background: '#f9f9f9', borderRadius: '12px', padding: '1rem', boxShadow: votoUsuario === candidato.id ? '0 0 0 3px #e94560' : '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <img
                            src={candidato.imagen || 'https://via.placeholder.com/150'}
                            alt={candidato.nombre}
                            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <h3 style={{ margin: '0.8rem 0 0.3rem', color: '#1a1a2e' }}>{candidato.nombre}</h3>
                        <p style={{ color: '#666', margin: '0.2rem 0' }}>🏛️ {candidato.cargo}</p>
                        <p style={{ color: '#666', margin: '0.2rem 0' }}>🎗️ {candidato.partido}</p>
                        <p style={{ fontWeight: 'bold', margin: '0.5rem 0', color: '#e94560' }}>
                            🗳️ {candidato.votos} votos
                        </p>

                        {session && !votoUsuario && (
                            <button
                                onClick={() => handleVotar(candidato.id)}
                                disabled={votando}
                                style={{ width: '100%', background: '#1a1a2e', color: 'white', border: 'none', borderRadius: '8px', padding: '0.6rem', cursor: 'pointer', marginBottom: '0.5rem' }}
                            >
                                👍 Votar
                            </button>
                        )}

                        {votoUsuario === candidato.id && (
                            <p style={{ color: '#e94560', fontWeight: 'bold' }}>⭐ Tu candidato</p>
                        )}

                        {session && (
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <Link to={`/candidatos/${candidato.id}/editar`} style={{ flex: 1, textAlign: 'center', background: '#1a1a2e', color: 'white', padding: '0.4rem', borderRadius: '6px', textDecoration: 'none' }}>
                                    ✏️ Editar
                                </Link>
                                <button onClick={() => handleEliminar(candidato.id)} style={{ flex: 1, background: '#e94560', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                                    🗑️ Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Candidatos
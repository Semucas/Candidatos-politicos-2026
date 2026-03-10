import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate, useParams } from 'react-router-dom'

function CandidatoForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const esEdicion = !!id

    const [form, setForm] = useState({
        nombre: '',
        imagen: '',
        partido: '',
        cargo: '',
        departamento: '',
        propuestas: ''
    })
    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        if (esEdicion) cargarCandidato()
    }, [id])

    const cargarCandidato = async () => {
        const { data } = await supabase.from('candidatos').select('*').eq('id', id).single()
        if (data) setForm(data)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleGuardar = async () => {
        if (!form.nombre) return setMensaje('El nombre es obligatorio')

        if (esEdicion) {
            await supabase.from('candidatos').update(form).eq('id', id)
        } else {
            await supabase.from('candidatos').insert([form])
        }

        navigate('/candidatos')
    }

    const inputStyle = {
        display: 'block', width: '100%', padding: '0.6rem',
        marginBottom: '1rem', borderRadius: '8px',
        border: '1px solid #ccc', fontSize: '1rem'
    }

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem' }}>
            <h2>{esEdicion ? '✏️ Editar Candidato' : '➕ Nuevo Candidato'}</h2>

            <label>Nombre *</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} style={inputStyle} placeholder="Nombre completo" />

            <label>URL de imagen</label>
            <input name="imagen" value={form.imagen} onChange={handleChange} style={inputStyle} placeholder="https://..." />

            <label>Partido político</label>
            <input name="partido" value={form.partido} onChange={handleChange} style={inputStyle} placeholder="Nombre del partido" />

            <label>Cargo</label>
            <select name="cargo" value={form.cargo} onChange={handleChange} style={inputStyle}>
                <option value="">Seleccionar cargo</option>
                <option value="Presidente">Presidente</option>
                <option value="Senador">Senador</option>
                <option value="Representante a la Cámara">Representante a la Cámara</option>
            </select>

            <label>Departamento</label>
            <input name="departamento" value={form.departamento} onChange={handleChange} style={inputStyle} placeholder="Departamento" />

            <label>Propuestas</label>
            <textarea name="propuestas" value={form.propuestas} onChange={handleChange} style={{ ...inputStyle, height: '100px' }} placeholder="Principales propuestas..." />

            {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={handleGuardar} style={{ flex: 1, background: '#e94560', color: 'white', padding: '0.8rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>
                    {esEdicion ? 'Guardar cambios' : 'Crear candidato'}
                </button>
                <button onClick={() => navigate('/candidatos')} style={{ flex: 1, background: '#1a1a2e', color: 'white', padding: '0.8rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>
                    Cancelar
                </button>
            </div>
        </div>
    )
}

export default CandidatoForm
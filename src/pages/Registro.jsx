import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function Registro() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mensaje, setMensaje] = useState('')
    const navigate = useNavigate()

    const handleRegistro = async (e) => {
        e.preventDefault()
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) {
            setMensaje('Error: ' + error.message)
        } else {
            setMensaje('¡Registro exitoso! Revisa tu correo para confirmar.')
            setTimeout(() => navigate('/login'), 3000)
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
            <h2>Registro</h2>
            <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
            />
            <button onClick={handleRegistro} style={{ padding: '0.5rem 1rem' }}>
                Registrarse
            </button>
            {mensaje && <p style={{ marginTop: '1rem', color: 'green' }}>{mensaje}</p>}
        </div>
    )
}

export default Registro
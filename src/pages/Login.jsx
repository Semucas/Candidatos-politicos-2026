import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mensaje, setMensaje] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            setMensaje('Error: ' + error.message)
        } else {
            navigate('/candidatos')
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
            <h2>Iniciar Sesión</h2>
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
            <button onClick={handleLogin} style={{ padding: '0.5rem 1rem' }}>
                Iniciar Sesión
            </button>
            {mensaje && <p style={{ marginTop: '1rem', color: 'red' }}>{mensaje}</p>}
        </div>
    )
}

export default Login
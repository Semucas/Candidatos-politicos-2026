import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function Navbar() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }

    return (
        <nav style={{ padding: '1rem', background: '#1a1a2e', display: 'flex', gap: '1rem' }}>
            <Link to="/" style={{ color: 'white' }}>Inicio</Link>
            <Link to="/candidatos" style={{ color: 'white' }}>Candidatos</Link>
            <Link to="/registro" style={{ color: 'white' }}>Registro</Link>
            <Link to="/login" style={{ color: 'white' }}>Login</Link>
            <button onClick={handleLogout} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
                Cerrar sesión
            </button>
        </nav>
    )
}

export default Navbar
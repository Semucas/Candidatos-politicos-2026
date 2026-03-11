import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Candidatos from './pages/Candidatos'
import CandidatoForm from './pages/CandidatoForm'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/candidatos" element={<Candidatos />} />
        <Route path="/candidatos/nuevo" element={
          <ProtectedRoute>
            <CandidatoForm />
          </ProtectedRoute>
        } />
        <Route path="/candidatos/:id/editar" element={
          <ProtectedRoute>
            <CandidatoForm />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
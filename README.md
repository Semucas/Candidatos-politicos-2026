# 🗳️ Candidatos Colombia 2026

Plataforma web informativa sobre los candidatos a Presidencia y Congreso de Colombia para las elecciones del 2026. Desarrollada con React, Supabase y desplegada en Cloudflare Pages.

🌐 **Demo en vivo:** [candidatos-politicos-2026.semucas27.workers.dev](https://candidatos-politicos-2026.semucas27.workers.dev)

---

## 📋 Descripción

Esta aplicación permite a los usuarios consultar información sobre los candidatos políticos colombianos del 2026. Incluye autenticación de usuarios y un panel administrativo para gestionar los candidatos registrados en la base de datos.

---

## 🚀 Tecnologías utilizadas

- **React** — Biblioteca de UI
- **Vite** — Bundler y servidor de desarrollo
- **React Router DOM** — Navegación y rutas
- **Supabase** — Base de datos PostgreSQL + Autenticación
- **Cloudflare Pages** — Despliegue y hosting

---

## ✅ Funcionalidades

### Sección pública
- Página informativa sobre los cargos que se eligen en 2026 (Presidente, Senado, Cámara)
- Fechas clave del calendario electoral
- Acceso a registro e inicio de sesión

### Autenticación
- Registro de nuevos usuarios con email y contraseña
- Inicio de sesión
- Cierre de sesión
- Rutas protegidas para usuarios no autenticados

### Panel de candidatos (solo usuarios autenticados)
- Listado de hasta 100 candidatos registrados
- Buscador en tiempo real por nombre
- Crear nuevo candidato
- Editar candidato existente
- Eliminar candidato

---

## 🗂️ Estructura del proyecto

```
candidatos-2026/
├── public/
│   └── _redirects
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── CandidatoCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Registro.jsx
│   │   ├── Candidatos.jsx
│   │   └── CandidatoForm.jsx
│   ├── supabaseClient.js
│   └── App.jsx
├── .env
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛠️ Instalación y uso local

### 1. Clonar el repositorio
```bash
git clone https://github.com/Semucas/Candidatos-politicos-2026.git
cd Candidatos-politicos-2026
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con:
```
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_KEY=tu_supabase_key
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🗄️ Base de datos

La tabla `candidatos` en Supabase tiene la siguiente estructura:

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID | Identificador único (auto-generado) |
| `nombre` | TEXT | Nombre completo del candidato |
| `imagen` | TEXT | URL de la imagen |
| `partido` | TEXT | Partido político |
| `cargo` | TEXT | Presidente / Senador / Representante |
| `departamento` | TEXT | Departamento de origen |
| `propuestas` | TEXT | Principales propuestas |
| `created_at` | TIMESTAMP | Fecha de registro |

---

## 🔒 Variables de entorno

| Variable | Descripción |
|---|---|
| `VITE_SUPABASE_URL` | URL del proyecto en Supabase |
| `VITE_SUPABASE_KEY` | Publishable key de Supabase |

> ⚠️ Nunca subas el archivo `.env` a GitHub. Está incluido en `.gitignore`.

---

## 📦 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Previsualiza el build localmente |

---

## 👤 Autor

**Semucas** — [@Semucas](https://github.com/Semucas)

---

## 📄 Licencia

Este proyecto es de uso académico.

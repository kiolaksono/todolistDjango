import ProtectedRoute from './components/ProtectedRoute'
import react from "react"
import { BrowserRouter,Route, Routes, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// BrowserRouter is a component that wraps the entire application and provides routing capabilities
// Route is a component that renders a component based on the URL path

function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<RegisterAndLogout/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

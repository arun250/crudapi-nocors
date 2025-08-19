import LoginForm from "./components/LoginForm"
import StartPage from "./components/StartPage"
import Dashboard from "./components/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import PublicRoute from "./components/PublicRoute";


function App() {

  return (
    <>
      <Routes>        
        <Route path="/" element={<PublicRoute><LoginForm /></PublicRoute>} />
        <Route path="/startpage" element={<ProtectedRoute><StartPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      </Routes>
      
    </>
  )
}

export default App

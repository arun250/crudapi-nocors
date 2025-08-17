import LoginForm from "./components/LoginForm"
import StartPage from "./components/StartPage"
import Dashboard from "./components/Dashboard"

import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"



function App() {

  return (
    <>
      <Routes>        
        <Route path="/" element={<LoginForm />} />
        <Route path="/startpage" element={<StartPage />} />
        <Route path="/dashboard" element={<Dashboard/> } />
      </Routes>
      
    </>
  )
}

export default App

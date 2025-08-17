import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './assets/css/app-saas.min.css';
import './assets/css/style.css';
import './assets/css/icons.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./assets/vendor/fullcalendar/main.min.css";
import "./assets/vendor/daterangepicker/daterangepicker.css";
import "./assets/vendor/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.css"
import "./components/HyperConfig.jsx"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Usedcontext from './context.jsx'

createRoot(document.getElementById('root')).render(
  <Usedcontext>
    <App />
  </Usedcontext>,
)

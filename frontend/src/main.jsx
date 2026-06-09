import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 🔥 추가
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //  {/* 🔥 App을 Router로 감싸기 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </StrictMode>,
)
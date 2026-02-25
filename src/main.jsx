import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import './styles/rooms.css'
import './styles/animations.css'
import './styles/cursor.css'
import { ReactLenis } from '@studio-freight/react-lenis'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ReactLenis root>
            <App />
            <Toaster position="bottom-right" />
        </ReactLenis>
    </React.StrictMode>,
)

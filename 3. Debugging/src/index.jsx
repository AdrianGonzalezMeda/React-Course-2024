// Podmeos importarlo y usarlo en cualquier otro componente. Lo que hace es ejecutar lo que este dentro 2 veces,
// lo que puede ayudar a detectar ciertos errores en la logica del codigo
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import ProductsContextProvider from './context/products-context.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ProductsContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ProductsContextProvider>
);

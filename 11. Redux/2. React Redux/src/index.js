import React from 'react';
import ReactDOM from 'react-dom/client';
// This npm module allows us to connect redux with react
import { Provider } from 'react-redux';
import store from './store/index.js';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Now we need to set wich store is used, at the high level component in the app, so this way all the childs components have access
root.render(<Provider store={store}><App /></Provider>);

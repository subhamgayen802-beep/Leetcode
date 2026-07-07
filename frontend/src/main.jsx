<<<<<<< HEAD
import { StrictMode } from 'react'
=======

>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import {store} from "./store/store.js"
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
<<<<<<< HEAD
  <StrictMode>
=======

>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
<<<<<<< HEAD
  </StrictMode>,
=======

>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
)

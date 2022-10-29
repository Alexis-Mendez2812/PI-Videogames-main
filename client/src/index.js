import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./store"
import axios from 'axios';
// import dotenv from 'dotenv';
const container = document.getElementById("root")
const root = createRoot(container)
// dotenv.config();

// axios.defaults.baseURL = 'https://yachtimeapp.herokuapp.com';
axios.defaults.baseURL = 'http://localhost:3001';


root.render(
  <BrowserRouter>
    <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
    </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

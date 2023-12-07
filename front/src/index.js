import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

const host = window.location.hostname === "localhost" 
  ? 'http://3.34.50.151'
  : "api";

//axios.defaults.crossDomain = false;
// axios.defaults.withCredentials = true;
axios.defaults.withCredentials = false;
axios.defaults.baseURL = 'http://3.34.50.151'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);



import React from 'react';
import ReactDOM from 'react-dom/client';

import axios from 'axios';

import App from './app';

//axios.defaults.crossDomain = false;
axios.defaults.withCredentials = true;
//axios.defaults.withCredentials = false;
axios.defaults.baseURL = 'http://localhost:8080'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);



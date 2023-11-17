import React from 'react';
//import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './app';
import axios from 'axios';

//axios.defaults.crossDomain = false;
axios.defaults.withCredentials = true;
//axios.defaults.withCredentials = false;


axios.defaults.baseURL = 'http://localhost:8080'

/*
ReactDOM.render(
	<App />,
	document.getElementById('root')
);
*/
//=>
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);



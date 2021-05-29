import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginLoading from "../src/components/user/loginloading"

LoginLoading();
ReactDOM.render( <App />,document.getElementById('root'));


reportWebVitals();

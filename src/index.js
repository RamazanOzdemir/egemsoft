import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import EmployeeContextProvider from './context/EmployeeContext';

const app = (
    <EmployeeContextProvider>
        <App/>
    </EmployeeContextProvider>
);
ReactDOM.render(app, document.getElementById('root'));



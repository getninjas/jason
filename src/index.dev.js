import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import data from './form.json';

ReactDOM.render(<App form={data.form} />, document.getElementById('root'));

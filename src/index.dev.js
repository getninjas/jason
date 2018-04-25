import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import fields from './fields.json';


ReactDOM.render(<App fields={fields} />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { form } from './form.json';

ReactDOM.render(<App data={form} />, document.getElementById('root'));

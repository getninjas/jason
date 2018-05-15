import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { form } from './form.json';

const devData = {
  ...form,
  onZipcodeFetchSuccess: data => data,
  onZipcodeFetchError: data => data,
};

ReactDOM.render(<App data={devData} />, document.getElementById('root'));

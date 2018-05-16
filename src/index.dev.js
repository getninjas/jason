import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { form } from './form.json';

const devData = {
  ...form,
  onZipcodeFetchSuccess: data => data,
  onZipcodeFetchError: data => data,
};

ReactDOM.render(
  <App
  name='form-name'
  action='http://www.mocky.io/v2/5afb459c2f00005b00f7c7ab'
  data={devData}
  onSubmit={ () => console.log('App onSubmit') }
  onSubmitSuccess={ () => console.log('App onSubmitSuccess') }
  onSubmitError={ () => console.log('App onSubmitError') } />,
  document.getElementById('root'));

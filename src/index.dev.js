import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { form } from './form.json';

ReactDOM.render(
  <App
  name='form-name'
  action='http://www.mocky.io/v2/5afb459c2f00005b00f7c7ab'
  data={form}
  onZipcodeFetchSuccess={ data => console.log('App onZipcodeFetchSuccess', data) }
  onZipcodeFetchError={ data => console.log('App onZipcodeFetchError', data) }
  onSubmit={ () => console.log('App onSubmit') }
  onSubmitSuccess={ () => console.log('App onSubmitSuccess') }
  onSubmitError={ () => console.log('App onSubmitError') }
  onStepChange={ () => console.log('App onStepChange') } />,
  document.getElementById('root'));

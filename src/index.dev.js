import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { form } from './form.json';

ReactDOM.render(
  <App
  name='form-name'
  action='http://www.mocky.io/v2/5afb459c2f00005b00f7c7ab'
  data={form}
  onZipcodeFetchSuccess={ data => console.log('App Index Dev onZipcodeFetchSuccess', data) }
  onZipcodeFetchError={ data => console.log('App Index Dev onZipcodeFetchError', data) }
  onSubmit={ () => console.log('App Index Dev onSubmit') }
  onSubmitSuccess={ () => console.log('App Index Dev onSubmitSuccess') }
  onSubmitError={ () => console.log('App Index Dev onSubmitError') }
  onStepChange={ () => console.log('App Index Dev onStepChange') } />,
  document.getElementById('root'));

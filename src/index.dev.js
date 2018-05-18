import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form';
import { form } from './form.json';

ReactDOM.render(
  <Form
  name='form-name'
  action='http://www.mocky.io/v2/5afb459c2f00005b00f7c7ab'
  data={form}
  onReady={ () => console.log('App Index Dev onReady') }
  onZipcodeFetchSuccess={ data => console.log('App Index Dev onZipcodeFetchSuccess', data) }
  onZipcodeFetchError={ data => console.log('App Index Dev onZipcodeFetchError', data) }
  onSubmit={ () => console.log('App Index Dev onSubmit') }
  onSubmitSuccess={ data => console.log('App Index Dev onSubmitSuccess') }
  onSubmitError={ data => console.log('App Index Dev onSubmitError') }
  onStepChange={ () => console.log('App Index Dev onStepChange') } />,
  document.getElementById('root'));

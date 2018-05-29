import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form';
import { form } from './form.json';

ReactDOM.render(
  <Form
  name='form-name'
  action='http://www.mocky.io/v2/5afb459c2f00005b00f7c7ab'
  data={form}
  onReady={ () => {} }
  onZipcodeFetchSuccess={ data => data }
  onZipcodeFetchError={ data => data }
  onSubmit={ () => {} }
  onSubmitSuccess={ data => data }
  onSubmitFieldError={ data => data }
  onSubmitError={ data => data }
  onStepChange={ () => {} } />,
  document.getElementById('root'));

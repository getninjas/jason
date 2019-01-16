import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form';
import { form } from './form.dev.json';

class Jason {
  constructor(options) {
    Object.assign(this, options);

    this.form = null;
  }

  post() {
    this.form.formSubmit();
  }

  updateState(state) {
    this.form.updateState(state);
  }

  init() {
    ReactDOM.render(
      <Form data={this.data.form}
        name={this.name}
        action={this.action}
        onReady={this.onReady}
        onZipcodeFetchSuccess={(data) => { this.onZipcodeFetchSuccess(data); }}
        onZipcodeFetchError={(data) => { this.onZipcodeFetchError(data); }}
        onSubmit={this.onSubmit}
        onSubmitSuccess={this.onSubmitSuccess}
        onSubmitFieldError={this.onSubmitFieldError}
        onSubmitError={this.onSubmitError}
        onStepChange={this.onStepChange}
        ref={(component) => { this.form = component; }} />,
      this.element,
    );
  }
}


const jason = new Jason({
  name: 'form-name',
  action: 'http://www.mocky.io/v2/5afb459c2f00005b00f7c7ab',
  data: { form },
  onReady: () => { },
  onZipcodeFetchSuccess: data => data,
  onZipcodeFetchError: data => data,
  onSubmit: () => { },
  onSubmitSuccess: data => data,
  onSubmitFieldError: data => data,
  onSubmitError: data => data,
  onStepChange: () => { },
  element: document.getElementById('root'),
});

jason.init();

document.body.addEventListener('dblclick', () => {
  form.steps[1].fields = [{
    title: 'Example Select Field',
    placeholder: 'Placeholder',
    required: true,
    id: '1_id',
    name: '1_name_select',
    type: 'select',
    value: null,
    values: [
      {
        databaseId: '',
        value: 'Placeholder Example',
      },
      {
        databaseId: 7117,
        value: 'Construção',
      },
      {
        databaseId: 7118,
        value: 'Reformas',
      },
      {
        databaseId: 7119,
        value: 'Instalações',
      },
      {
        databaseId: 7120,
        value: 'Troca',
      },
      {
        databaseId: 7121,
        value: 'Outros',
      },
    ],
  }];

  jason.updateState(form);
});

import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form';
import { form } from './form.json';

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
        onStepChangeAsync={this.onStepChangeAsync}
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
  onStepChangeAsync: async (step) => {
    console.log('start onStepChangeAsync change', step);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('end onStepChangeAsync change', step);
        resolve();
      }, 3000);
    });
  },
  element: document.getElementById('root'),
});

jason.init();

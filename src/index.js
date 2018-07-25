import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form';

export default class Jason {
  constructor(options) {
    Object.assign(this, options);

    this.form = null;
  }

  post() {
    this.form.formSubmit();
  }

  updateUserFields(fields) {
    this.form.updateUserFields(fields);
  }

  init() {
    ReactDOM.render(
      <Form data={this.data.form}
        name={this.name}
        action={this.action}
        onReady={ this.onReady }
        onZipcodeFetchSuccess={ (data) => { this.onZipcodeFetchSuccess(data); } }
        onZipcodeFetchError={ (data) => { this.onZipcodeFetchError(data); } }
        onSubmit={ this.onSubmit }
        onSubmitSuccess={ this.onSubmitSuccess }
        onSubmitFieldError={ this.onSubmitFieldError }
        onSubmitError={ this.onSubmitError }
        onStepChange={ this.onStepChange }
        ref={(component) => { this.form = component; }} />,
        this.element,
      );
  }
}

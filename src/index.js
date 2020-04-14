import 'react-app-polyfill/ie11';
import './polyfill/custom-event';
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

  updateState(state) {
    this.form.updateState(state);
  }

  init() {
    ReactDOM.render(
      <Form data={this.data.form}
        name={this.name}
        action={this.action}
        onReady={ this.onReady }
        handleZipcodeExternalLinkClick={ event => this.handleZipcodeExternalLinkClick(event) }
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

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export default class Jason {
  constructor(options) {
    Object.assign(this, options);

    this.jason = null;
  }

  post() {
    this.jason.post();
  }

  init() {
    ReactDOM.render(
      <App data={this.data.form}
        name={this.name}
        action={this.action}
        onZipcodeFetchSuccess={ (data) => { this.onZipcodeFetchSuccess(data); } }
        onZipcodeFetchError={ (data) => { this.onZipcodeFetchError(data); } }
        onSubmit={ this.onSubmit }
        onSubmitSuccess={ this.onSubmitSuccess }
        onSubmitError={ this.onSubmitError }
        onStepChange={ this.onStepChange }
        ref={(jason) => { this.jason = jason; }} />,
        this.element,
    );
  }
}

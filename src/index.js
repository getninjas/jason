import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export default class Jason {
  constructor(options) {
    Object.assign(this, options);

    this.jason = null;
  }

  post() {
    this.jason.formSubmit();
  }

  init() {
    ReactDOM.render(<App data={this.data.form} ref={(jason) => { this.jason = jason; }} />, this.element);
  }
}

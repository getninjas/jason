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
      <App data={this.data.form} {...this} ref={(jason) => { this.jason = jason; }} />,
      this.element,
    );
  }
}

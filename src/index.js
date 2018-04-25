import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export default class Jason {
  constructor(options) {
    Object.assign(this, options);
  }

  init() {
    ReactDOM.render(<App jsonFields={this.jsonFields} />, this.element);
  }
}

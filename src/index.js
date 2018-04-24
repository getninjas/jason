import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export default class Jason {
  constructor(options) {
    Object.assign(this, options);
    console.log('construct!');
  }

  init() {
    console.log('init!');
    ReactDOM.render(<App />, this.element);
  }
}

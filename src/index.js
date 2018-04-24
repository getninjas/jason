import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

export default class Jason {
  constructor(options) {
    Object.assign(this, options);
  }

  init() {
    ReactDOM.render(<App />, this.element);
  }
}

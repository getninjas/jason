import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import { form } from '../src/form.json';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App form={form}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

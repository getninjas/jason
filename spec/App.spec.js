import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import data from '../src/form.json';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App form={data.form}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

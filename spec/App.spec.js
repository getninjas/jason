import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import fields from '../src/fields.json';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App jsonFields={fields}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

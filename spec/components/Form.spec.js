import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../../src/components/Form';
import data from '../../src/form.json';

describe('Form', () => {
  it('renders custom props', () => {
    const component = renderer.create(
      <Form name={'form'} form={data.form} />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders defaultProps', () => {
    const component = renderer.create(
      <Form name={'form'} form={data.form} />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

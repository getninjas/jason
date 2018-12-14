import React from 'react';
import renderer from 'react-test-renderer';
import { form } from '../../src/form.json';
import Radio from '../../src/components/Radio';
import { enzymeConfig, mount } from '../enzymeConfig';

enzymeConfig();

function createNodeMock(element) {
  if (element.type === 'radio') {
    return {
      addEventListener() {},
      values: '',
    };
  }

  return null;
}

const radio = form.steps[0].fields[0];

describe('Radio', () => {
  const commonProps = {
    id: 'idTest',
    name: 'nameTest',
    onFieldChange: () => {},
    onFieldBlur: () => {},
    placeholder: 'placeholderTest',
    type: 'radio',
    required: true,
  };

  it('renders defaultProps', () => {
    const options = { createNodeMock };
    const component = renderer.create(
      <Radio
        {...commonProps}
        values={[radio.values[0]]}
      />, options,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('.onChange', () => {
    const onChange = jest.fn();

    const component = mount(
      <Radio
        {...commonProps}
        values={[radio.values[0]]}
        onFieldChange={onChange}
      />,
    );

    component.find('input').simulate('change', { target: { value: 6792, id: 'idTest' } });

    expect(component.instance().props.onFieldChange).toBeCalledWith({ value: 6792, id: 'idTest' });
  });

  it('.onBlur', () => {
    const onBlur = jest.fn();

    const component = mount(
      <Radio
        {...commonProps}
        values={[radio.values[0]]}
        onFieldBlur={onBlur}
      />,
    );

    component.find('input').simulate('blur');

    expect(component.instance().props.onFieldBlur).toBeCalled();
  });
});

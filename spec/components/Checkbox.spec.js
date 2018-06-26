import React from 'react';
import renderer from 'react-test-renderer';
import Checkbox from '../../src/components/Checkbox';
import { form } from '../../src/form.json';
import { enzymeConfig, mount } from '../enzymeConfig';

enzymeConfig();

function createNodeMock(element) {
  if (element.type === 'checkbox') {
    return {
      addEventListener() {},
      values: '',
    };
  }

  return null;
}

const checkbox = form.steps[0].fields[3];

describe('Checkbox', () => {
  const commonProps = {
    id: 'idTest',
    name: 'nameTest',
    onFieldChange: () => {},
    onFieldBlur: () => {},
    placeholder: 'placeholderTest',
    type: 'checkbox',
    required: true,
  };

  it('render component', () => {
    const options = { createNodeMock };
    const component = renderer.create(
      <Checkbox
        {...commonProps}
        values={[checkbox.values[0]]}
      />, options,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('changes input checked .onChage event', () => {
    const wrapper = mount(
      <Checkbox
        {...commonProps}
        values={[checkbox.values[0]]}
      />,
    );

    expect(wrapper.instance().state.values[0].checked).toBeFalsy();

    wrapper.find('input').simulate('change', { target: { checked: true, id: 6792 } });

    expect(wrapper.instance().state.values[0].checked).toBeTruthy();
  });
});

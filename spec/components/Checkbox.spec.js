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

  describe('with input text', () => {
    it('render component', () => {
      const options = { createNodeMock };
      const component = renderer.create(
        <Checkbox
          {...commonProps}
          values={[checkbox.values[5]]}
        />, options,
      );

      const tree = component.toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('checkbox with OTHER value need to have an input text', () => {
      const wrapper = mount(
        <Checkbox
          {...commonProps}
          values={[checkbox.values[5]]}
        />,
      );

      expect(wrapper.instance().state.values[0].checked).toBeFalsy();
      expect(wrapper.find('input[type="text"]').get(0).props.disabled).toBeTruthy();

      wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: true, id: 7639 } });

      expect(wrapper.find('input[type="text"]').get(0).props.disabled).toBeFalsy();
      expect(wrapper.instance().state.values[0].checked).toBeTruthy();
    });

    it('checkbox with OTHER value need to have an input text', () => {
      const wrapper = mount(
        <Checkbox
        {...commonProps}
        values={[checkbox.values[5]]}
        />,
      );

      wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: true, id: 7639 } });
      wrapper.find('input[type="text"]').simulate('blur', { target: { value: 'Teste value', getAttribute: () => 7639 } });

      expect(wrapper.instance().state.values[0].textOther).toEqual('Teste value');
    });
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import { enzymeConfig, shallow, mount } from '../enzymeConfig';
import Checkbox from '../../src/components/Checkbox';
import { form } from '../../src/form.json';

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

  it('changes input value .onChage event', () => {
    console.log("checkbox.type", checkbox.type);
    const wrapper = mount(
      <Checkbox
        {...commonProps}
        values={[checkbox.values[0]]}
      />,
    );

    wrapper.setProps({ active: true });

    // console.log("wrapper.find('input').get(0)", wrapper.find('input').get(0));

    // expect(wrapper.find('input').get(0).checked).toBeFalsy();
    // console.log("ANTES DO CLICK.....", wrapper.find('input').get(0));

    console.log("ATENS DO CLICK.....", wrapper.instance().props);

    wrapper.find('input').simulate('change');

    let checkboxNo = wrapper.find({ type: 'checkbox' });

    console.log("checkboxNo", checkboxNo);

    expect(checkboxNo.props().checked).to.equal(true);

    console.log("DEPOIS DO CLICK.....", wrapper.instance().props);


    expect(true).toEqual(true);
  });
});

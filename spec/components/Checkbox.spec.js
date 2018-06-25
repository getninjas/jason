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
    required: true,
  };

  it('render component', () => {
    const options = { createNodeMock };
    const component = renderer.create(
      <Checkbox
        {...commonProps}
        values={checkbox.values}
      />, options,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

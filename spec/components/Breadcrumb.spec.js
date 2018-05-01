import React from 'react';
import renderer from 'react-test-renderer';
import Breadcrumb from '../../src/components/Breadcrumb';
import data from '../../src/form.json';
import {enzimeConfig, shallow} from '../enzimeConfig';

enzimeConfig();

describe('Breadcrumb', () => {
  it('renders defaultProps', () => {
    const component = renderer.create(<Breadcrumb steps={data.form.steps} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders custom props', () => {
    const component = renderer.create(<Breadcrumb active={1} steps={data.form.steps} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

});

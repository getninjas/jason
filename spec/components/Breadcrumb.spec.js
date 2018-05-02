import React from 'react';
import renderer from 'react-test-renderer';
import Breadcrumb from '../../src/components/Breadcrumb';
import { form } from '../../src/form.json';
import { enzymeConfig, shallow } from '../enzymeConfig';

enzymeConfig();

describe('Breadcrumb', () => {
  it('renders defaultProps', () => {
    const component = renderer.create(<Breadcrumb active={0} steps={form.steps} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('.isActive', () => {
    const component = shallow(<Breadcrumb active={0} steps={form.steps} />);

    const result = component.instance().isActive(0);
    const secondResult = component.instance().isActive(1);

    expect(result).toBe(true);
    expect(secondResult).toBe(false);
  });

  describe('.handleActiveStyle', () => {
    const component = shallow(<Breadcrumb active={0} steps={form.steps} />);

    const result = component.instance().handleActiveStyle(0);
    const secondResult = component.instance().handleActiveStyle(1);

    expect(result).toEqual('form__steps-item--active');
    expect(secondResult).toEqual('');
  });

  describe('when second step is active', () => {
    it('expects the second breadcrumb to be active', () => {
      const component = shallow(<Breadcrumb active={1} steps={form.steps} />);

      expect(component.find('li').last().hasClass('form__steps-item--active')).toBe(true);
    });

    it('expects the first breadcrumb to be inactive', () => {
      const component = shallow(<Breadcrumb active={1} steps={form.steps} />);

      expect(component.find('li').first().hasClass('form__steps-item--active')).toBe(false);
    });
  });
});

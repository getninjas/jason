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
    describe('when first step is active', () => {
      const component = shallow(<Breadcrumb active={0} steps={form.steps} />);

      it('returns true for first step', () => {
        const result = component.instance().isActive(0);

        expect(result).toBe(true);
      });

      it('returns false for second step', () => {
        const secondResult = component.instance().isActive(1);

        expect(secondResult).toBe(false);
      });
    });

    describe('when second step is active', () => {
      const component = shallow(<Breadcrumb active={1} steps={form.steps} />);

      it('returns false for first step', () => {
        const result = component.instance().isActive(0);

        expect(result).toBe(false);
      });

      it('returns true for second step', () => {
        const secondResult = component.instance().isActive(1);

        expect(secondResult).toBe(true);
      });
    });
  });

  describe('.handleActiveStyle', () => {
    describe('when first step is active', () => {
      const component = shallow(<Breadcrumb active={0} steps={form.steps} />);

      it('returns active class .form__steps-item--active', () => {
        const result = component.instance().handleActiveStyle(0);

        expect(result).toEqual('form__steps-item--active');
      });

      it('does not return any class', () => {
        const result = component.instance().handleActiveStyle(1);

        expect(result).toEqual('');
      });
    });
  });

  describe('when second step is active', () => {
    const component = shallow(<Breadcrumb active={1} steps={form.steps} />);

    it('expects the first breadcrumb to be inactive', () => {
      expect(component.find('li').at(0).hasClass('form__steps-item--active')).toBe(false);
    });

    it('expects the second breadcrumb to be active', () => {
      expect(component.find('li').at(1).hasClass('form__steps-item--active')).toBe(true);
    });
  });

  describe('when third step is active', () => {
    const component = shallow(<Breadcrumb active={2} steps={form.steps} />);

    it('expects the first breadcrumb to be inactive', () => {
      expect(component.find('li').at(0).hasClass('form__steps-item--active')).toBe(false);
    });

    it('expects the second breadcrumb to be inactive', () => {
      expect(component.find('li').at(1).hasClass('form__steps-item--active')).toBe(false);
    });

    it('expects the second breadcrumb to be active', () => {
      expect(component.find('li').at(2).hasClass('form__steps-item--active')).toBe(true);
    });
  });
});

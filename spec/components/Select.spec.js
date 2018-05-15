import React from 'react';
import renderer from 'react-test-renderer';
import Select from '../../src/components/Select';
import { form } from '../../src/form.json';
import { enzymeConfig, shallow, mount } from '../enzymeConfig';

enzymeConfig();

describe('Select', () => {
  it('renders defaultProps', () => {
    const values = form.steps[0].fields[0].values.slice(0, 2);

    const component = renderer.create(
      <Select
        id={'idTest'}
        name={'nameTest'}
        placeholder={'placeholderTest'}
        required={false}
        onFieldChange={() => {}}
        values={values}
      />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('.onChange', () => {
    it('updates state selected', () => {
      const values = form.steps[0].fields[0].values.slice(0, 2);

      const component = shallow(
        <Select
          id={'idTest'}
          name={'nameTest'}
          placeholder={'placeholderTest'}
          required={false}
          onFieldChange={() => {}}
          values={values}
        />,
      );

      component.simulate('change', { target: { value: 'Reformas' } });

      expect(component.instance().state.value).toEqual('Reformas');
    });
  });

  describe('.addPlaceholder', () => {
    const values = form.steps[0].fields[0].values.slice(0, 2);

    it('sets placeholder as first option', () => {
      const component = mount(
        <Select
          id={'idTest'}
          name={'nameTest'}
          placeholder={'placeholderTest'}
          required={false}
          onFieldChange={() => {}}
          values={values}
        />,
      );

      expect(component.instance().state.values[0].value).toEqual('placeholderTest');
    });

    it('does not set placeholder', () => {
      const component = mount(
        <Select
          id={'idTest'}
          name={'nameTest'}
          placeholder={''}
          required={false}
          onFieldChange={() => {}}
          values={values}
        />,
      );

      expect(component.instance().state.values[0].value).not.toEqual('');
    });
  });
});

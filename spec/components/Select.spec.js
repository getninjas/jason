import React from 'react';
import renderer from 'react-test-renderer';
import Select from '../../src/components/Select';
import { form } from '../../src/form.json';
import { enzymeConfig, shallow } from '../enzymeConfig';

enzymeConfig();

describe('Select', () => {
  it('renders defaultProps', () => {
    const values = form.steps[0].fields[0].values.slice(0, 2);

    const component = renderer.create(
      <Select
        id='idTest'
        name='nameTest'
        placeholder='placeholderTest'
        required={false}
        onFieldChange={() => {}}
        onFieldBlur={() => {}}
        values={values}
      />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('.onChange', () => {
    it('calls onFieldChange', () => {
      const values = form.steps[0].fields[0].values.slice(0, 2);
      const onFieldChange = jest.fn();

      const component = shallow(
        <Select
          id='idTest'
          name='nameTest'
          placeholder='placeholderTest'
          required={false}
          onFieldChange={onFieldChange}
          onFieldBlur={() => {}}
          initialValue='this is the initialValue'
          values={values}
        />,
      );

      component.simulate('change', { target: { value: 'Reformas' } });

      const params = { value: 'Reformas', id: component.instance().props.id };

      expect(component.instance().props.onFieldChange).toHaveBeenCalledWith(params);
    });
  });

  describe('.onBlur', () => {
    it('calls onFieldBlur', () => {
      const values = form.steps[0].fields[0].values.slice(0, 2);
      const onFieldBlur = jest.fn();

      const component = shallow(
        <Select
          id='idTest'
          name='nameTest'
          placeholder=''
          required={false}
          onFieldBlur={onFieldBlur}
          onFieldChange={() => {}}
          values={values}
        />,
      );

      component.simulate('blur', { target: { value: 'Reformas' } });

      const params = { value: 'Reformas', id: component.instance().props.id, required: false };

      expect(component.instance().props.onFieldBlur).toHaveBeenCalledWith(params);
    });
  });
});

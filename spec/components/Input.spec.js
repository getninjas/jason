import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../../src/components/Input';
import { enzimeConfig, shallow } from '../enzimeConfig';

enzimeConfig();

describe('Input', () => {
  it('renders custom props', () => {
    const component = renderer.create(
      <Input
        id={'idTest'}
        name={'nameTest'}
        placeholder={'placeholderTest'}
        required={false}
        value={'ola test value'}
      />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders defaultProps', () => {
    const component = renderer.create(<Input />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('.onChange', () => {
    const component = shallow(
      <Input
        id={'idTest'}
        name={'nameTest'}
        placeholder={'placeholderTest'}
        required={false}
        value={'ola test value'}
      />
    );

    component.simulate('change', { target: { value: 'Bora pra action' } });

    expect(component.instance().state.value).toEqual('Bora pra action');
  });

  describe('with type', () => {
    it('renders type text', () => {
      const component = shallow(<Input/>);

      expect(component.prop('type')).toBe('text');
    });

    it('renders type email', () => {
      const component = shallow(<Input type={'email'}/>);

      expect(component.prop('type')).toBe('email');
    });

    it('renders type tel', () => {
      const component = shallow(<Input type={'phone'}/>);

      expect(component.prop('type')).toBe('tel');
    });
  });
});

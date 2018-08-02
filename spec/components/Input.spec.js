import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../../src/components/Input';
import { enzymeConfig, shallow, mount } from '../enzymeConfig';

enzymeConfig();

function createNodeMock(element) {
  if (element.type === 'input') {
    return {
      addEventListener() {},
      value: '',
    };
  }

  return null;
}

describe('Input', () => {
  const commonProps = {
    id: 'idTest',
    name: 'nameTest',
    onFieldChange: () => {},
    onFieldBlur: () => {},
    placeholder: 'placeholderTest',
    required: false,
  };

  it('renders defaultProps', () => {
    const options = { createNodeMock };
    const component = renderer.create(
      <Input
        {...commonProps}
        value={'ola test value'}
      />, options,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('triggers onFieldChange', () => {
    const onFieldChange = jest.fn();

    const component = shallow(
      <Input
        id={'idTest'}
        name={'nameTest'}
        onFieldBlur={() => {}}
        onFieldChange={onFieldChange}
        placeholder={'placeholderTest'}
        required={false}
        value={'ola test value'}
      />,
    );

    component.simulate('change', { target: { value: 'Bora pra action' } });

    expect(component.instance().props.onFieldChange).toBeCalledWith({
      value: 'Bora pra action',
      id: 'idTest',
    });
  });

  it('trims text to maxLength', () => {
    const onFieldChange = jest.fn();

    const component = mount(
      <Input
        {...commonProps}
        id={'idTest'}
        onFieldChange={onFieldChange}
        value={''}
        maxLength={5}
      />,
    );

    component.simulate('change', { target: { value: 'Bora pra action' } });

    expect(component.instance().props.onFieldChange).toBeCalledWith({
      value: 'Bora ',
      id: 'idTest',
    });
  });

  describe('with type', () => {
    it('renders type text', () => {
      const component = shallow(<Input id={'id_input'} name={'input_name'} onFieldChange={() => {}} onFieldBlur={() => {}} />);

      expect(component.prop('type')).toBe('text');
    });

    it('renders type email', () => {
      const component = shallow(<Input id={'id_input'} name={'input_name'} onFieldChange={() => {}} onFieldBlur={() => {}} type={'email'}/>);

      expect(component.prop('type')).toBe('email');
    });

    it('renders type tel when type equal phone', () => {
      const component = mount(<Input id={'id_input'} name={'input_name'} onFieldChange={() => {}} onFieldBlur={() => {}} type={'phone'}/>);

      const inputType = component.getDOMNode().attributes.type.value;

      expect(inputType).toBe('tel');
    });
  });

  describe('.onBlur', () => {
    it('calls onFieldBlur', () => {
      const onFieldBlur = jest.fn();

      const component = shallow(
        <Input
          id={'idTest'}
          name={'nameTest'}
          onFieldBlur={onFieldBlur}
          onFieldChange={() => {}}
          placeholder={'placeholderTest'}
          required={false}
          value={''}
          maxLength={5}
        />,
      );

      component.simulate('blur', { target: { value: '(11) 99999-8888' } });

      expect(component.instance().props.onFieldBlur).toBeCalled();
    });

    describe('when input is type phone', () => {
      it('triggers onFieldBlur with target values', () => {
        const onFieldBlur = jest.fn();

        const component = mount(
          <Input
            id='phone'
            name='phone'
            type='phone'
            onFieldChange={() => {}}
            onFieldBlur={onFieldBlur}
            placeholder='(__) _____-____'
            required={false}
            value=''
          />,
        );

        component.simulate('change', { target: { value: '(11) 99999-8888' } });
        component.simulate('blur', { target: { value: '(11) 97878-1212' } });

        expect(component.instance().props.onFieldBlur).toBeCalledWith({
          id: 'phone',
          minLength: 1,
          required: false,
          type: 'phone',
          value: '(11) 97878-1212',
        });
      });
    });
  });

  describe('.onChange', () => {
    it('applies mask input', () => {
      const onFieldChange = jest.fn();

      const component = mount(
        <Input
          id='phone'
          name='phone'
          type='phone'
          onFieldChange={onFieldChange}
          onFieldBlur={() => {}}
          placeholder='(__) _____-____'
          required={false}
          value=''
        />,
      );

      const instance = component.instance();

      component.simulate('change', { target: { value: '11999998888' } });

      expect(instance.props.onFieldChange).toBeCalledWith({
        id: 'phone',
        value: '(11) 99999-8888',
      });
    });

    it('calls applyMask onChange', () => {
      const component = mount(
        <Input
          id='phone'
          name='phone'
          type='phone'
          onFieldChange={() => {}}
          onFieldBlur={() => {}}
          placeholder='(__) _____-____'
          required={false}
          value=''
        />,
      );

      const instance = component.instance();

      instance.applyMask = jest.fn();

      component.simulate('change', { target: { value: '11999998888' } });

      expect(instance.applyMask).toBeCalledWith('11999998888');
    });
  });

  describe('.applyMask', () => {
    describe('when input type phone', () => {
      it('returns masked value', () => {
        const component = mount(
          <Input
            id='phone'
            name='phone'
            type='phone'
            onFieldChange={() => {}}
            onFieldBlur={() => {}}
            placeholder='(__) _____-____'
            required={false}
            value=''
          />,
        );

        expect(component.instance().applyMask('11999998888')).toBe('(11) 99999-8888');
      });
    });

    describe('when input not of type phone', () => {
      it('does not apply mask', () => {
        const component = mount(
          <Input
            id='idTest'
            name='idTest'
            type='text'
            onFieldChange={() => {}}
            onFieldBlur={() => {}}
            placeholder='(__) _____-____'
            required={false}
            value=''
          />,
        );

        expect(component.instance().applyMask('John Doe')).toBe('John Doe');
      });
    });
  });
});

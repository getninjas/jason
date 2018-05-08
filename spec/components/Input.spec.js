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
  it('renders defaultProps', () => {
    const options = { createNodeMock };
    const component = renderer.create(
      <Input
        id={'idTest'}
        name={'nameTest'}
        placeholder={'placeholderTest'}
        onFieldChange={()=>{}}
        required={false}
        value={'ola test value'}
      />, options
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('changes input value .onChage event', () => {
    const component = shallow(
      <Input
        id={'idTest'}
        name={'nameTest'}
        onFieldChange={()=>{}}
        placeholder={'placeholderTest'}
        required={false}
        value={'ola test value'}
      />
    );

    component.simulate('change', { target: { value: 'Bora pra action' } });

    expect(component.instance().state.value).toEqual('Bora pra action');
  });

  it('retrains input text to maxLenght', () => {
    const component = mount(
      <Input
        id={'idTest'}
        name={'nameTest'}
        onFieldChange={()=>{}}
        placeholder={'placeholderTest'}
        required={false}
        value={''}
        maxLength={5}
      />
    );

    component.simulate('change', { target: { value: 'Bora pra action' } });

    expect(component.instance().state.value).toHaveLength(5);
  });

  describe('with type', () => {
    it('renders type text', () => {
      const component = shallow(<Input id={'id_input'} name={'input_name'} onFieldChange={()=>{}}/>);

      expect(component.prop('type')).toBe('text');
    });

    it('renders type email', () => {
      const component = shallow(<Input id={'id_input'} name={'input_name'} onFieldChange={()=>{}} type={'email'}/>);

      expect(component.prop('type')).toBe('email');
    });

    it('renders type tel when type equal phone', () => {
      const component = mount(<Input id={'id_input'} name={'input_name'} onFieldChange={()=>{}} type={'phone'}/>);

      const inputType = component.getDOMNode().attributes.type.value;

      expect(inputType).toBe('tel');
    });

    it('renders type tel when type equal zipcode ', () => {
      const component = mount(<Input id={'id_input'} name={'input_name'} onFieldChange={()=>{}} type={'zipcode'}/>);

      const inputType = component.getDOMNode().attributes.type.value;

      expect(inputType).toBe('tel');
    });
  });
});

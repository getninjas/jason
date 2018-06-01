import React from 'react';
import renderer from 'react-test-renderer';
import TextArea from '../../src/components/TextArea';
import { enzymeConfig, shallow } from '../enzymeConfig';

enzymeConfig();

describe('TextArea', () => {
  it('renders defaultProps', () => {
    const component = renderer.create(
      <TextArea
        id={'idTest'}
        name={'nameTest'}
        placeholder={'placeholderTest'}
        onFieldChange={() => {}}
        onFieldBlur={() => {}}
        required={false}
        value={'ola test value'}
      />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('.onChange', () => {
    const onFieldChange = jest.fn();

    const component = shallow(
      <TextArea
        id={'idTest'}
        name={'nameTest'}
        placeholder={'placeholderTest'}
        onFieldChange={onFieldChange}
        onFieldBlur={() => {}}
        required={false}
        value={'ola test value'}
      />,
    );

    component.simulate('change', { target: { value: 'Bora pra action' } });

    expect(component.instance().state.value).toEqual('Bora pra action');
    expect(component.instance().props.onFieldChange).toBeCalled();
  });

  it('.onBlur', () => {
    const onFieldBlur = jest.fn();

    const component = shallow(
      <TextArea
        id={'idTest'}
        name={'nameTest'}
        placeholder={'placeholderTest'}
        onFieldBlur={onFieldBlur}
        onFieldChange={() => {}}
        required={false}
        value={'ola test value'}
      />,
    );

    component.simulate('blur');

    expect(component.instance().props.onFieldBlur).toBeCalled();
  });
});

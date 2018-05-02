import React from 'react';
import renderer from 'react-test-renderer';
import TextArea from '../../src/components/TextArea';
import { enzymeConfig, shallow } from '../enzymeConfig';

enzymeConfig();

describe('TextArea', () => {
  it('renders custom props', () => {
    const component = renderer.create(
      <TextArea
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
    const component = renderer.create(<TextArea />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('.onChange', () => {
    const component = shallow(
      <TextArea
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
});

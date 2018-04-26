import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../../src/components/Input';

describe('Input', () => {
  it('renders custom props', () => {
    const component = renderer.create(
      <Input id={'idTest'}
        placeholder={'placeholderTest'}
        required={false}
        value={'ola test value'}
      />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

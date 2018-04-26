import React from 'react';
import renderer from 'react-test-renderer';
import TextArea from '../../src/components/TextArea';

describe('TextArea', () => {
  it('renders custom props', () => {
    const component = renderer.create(
      <TextArea id={'idTest'}
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
});

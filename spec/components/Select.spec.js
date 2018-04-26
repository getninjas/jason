import React from 'react';
import renderer from 'react-test-renderer';
import Select from '../../src/components/Select';
import expectedFields from '../fixture/expected-fields.json';

describe('Select', () => {
  it('renders custom props', () => {
    const values = expectedFields[0].values.slice(0, 2);

    const component = renderer.create(
      <Select id={'idTest'}
        placeholder={'placeholderTest'}
        required={false}
        values={values}
      />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders defaultProps', () => {
    const component = renderer.create(<Select />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

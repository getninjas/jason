import React from 'react';
import renderer from 'react-test-renderer';
import Select from '../../src/components/Select';
import { form } from '../../src/form.json';

describe('Select', () => {
  it('renders custom props', () => {
    const values = form.steps[0].fields[0].values.slice(0, 2);

    const component = renderer.create(
      <Select
        id={'idTest'}
        name={'nameTest'}
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

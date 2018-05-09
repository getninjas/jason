import React from 'react';
import renderer from 'react-test-renderer';
import Zipcode from '../../src/components/Zipcode';
import { enzymeConfig, shallow } from '../enzymeConfig';

enzymeConfig();

describe('Zipcode', () => {
  it('renders defaultProps', () => {
    const component = renderer.create(
      <Zipcode
        type={'zipcode'}
        key={`zipcode-1`}
        id={'zipcodeTest'}
        name={'zipcodeTest'}
        placeholder={'00000-000'}
        onFieldChange={()=>{}}
      />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

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

  describe('.getFullAddress', () => {
    it('returns formatted full address', () => {
      const component = shallow(
        <Zipcode
          type={'zipcode'}
          key={`zipcode-1`}
          id={'zipcodeTest'}
          name={'zipcodeTest'}
          placeholder={'00000-000'}
          onFieldChange={()=>{}}
        />,
      );

      const responseAddress = {
        street: 'Avenida Rebouças',
        neighborhood: 'Pinheiros',
        city: 'São Paulo',
        uf: 'SP',
      }

      const result = component.instance().getFullAddress(responseAddress);

      const fullAddressFormatted = 'Avenida Rebouças, Pinheiros \nSão Paulo - SP';

      expect(result).toEqual(fullAddressFormatted);
    });
  });
});

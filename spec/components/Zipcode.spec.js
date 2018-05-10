import React from 'react';
import renderer from 'react-test-renderer';
import Zipcode from '../../src/components/Zipcode';
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

describe('Zipcode', () => {
  it('renders defaultProps', () => {
    const options = { createNodeMock };
    const component = renderer.create(
      <Zipcode
        type={'zipcode'}
        key={`zipcode-1`}
        id={'zipcodeTest'}
        name={'zipcodeTest'}
        placeholder={'00000-000'}
        onFieldChange={()=>{}}
      />, options
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('.getFullAddress', () => {
    it('returns formatted full address', () => {
      const component = mount(
        <Zipcode
          type={'zipcode'}
          key={`zipcode-1`}
          id={'zipcodeTest'}
          name={'zipcodeTest'}
          placeholder={'00000-000'}
          onFieldChange={()=>{}}
        />
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

  describe('.getEmptyState', () => {
    it('sets all key values to empty string', () => {
      const component = mount(
        <Zipcode
          type={'zipcode'}
          key={`zipcode-1`}
          id={'zipcodeTest'}
          name={'zipcodeTest'}
          placeholder={'00000-000'}
          onFieldChange={()=>{}}
        />,
      );

      const currentState = {
        value: '05402300',
        type_street: '',
        street: 'Aveninda Rebouças',
        city: 'São Paulo',
        neighborhood: 'Pinheiros',
        uf: 'SP',
        fullAddress: 'Avenida Rebouças, Pinheiros \nSão Paulo - SP',
      }

      const emptyState = {
        value: '',
        type_street: '',
        street: '',
        city: '',
        neighborhood: '',
        uf: '',
        fullAddress: '',
      }

      const result = component.instance().getEmptyState(currentState);

      expect(result).toEqual(emptyState);
    });
  });

  describe('.fillAddressState', () => {
    it('sets response data and value zipcode to key values', () => {
      const component = mount(
        <Zipcode
          type={'zipcode'}
          key={`zipcode-1`}
          id={'zipcodeTest'}
          name={'zipcodeTest'}
          placeholder={'00000-000'}
          onFieldChange={()=>{}}
        />,
      );

      const zipcodeValue = '05402300';

      const responseAddress = {
        type_street: '',
        street: 'Avenida Rebouças',
        city: 'São Paulo',
        neighborhood: 'Pinheiros',
        uf: 'SP',
      }

      const filledState = {
        value: '05402300',
        type_street: '',
        street: 'Avenida Rebouças',
        city: 'São Paulo',
        neighborhood: 'Pinheiros',
        uf: 'SP',
        fullAddress: 'Avenida Rebouças, Pinheiros \nSão Paulo - SP',
      }

      const result = component.instance().fillAddressState(responseAddress, zipcodeValue);

      expect(result).toEqual(filledState);

    });
  });
});

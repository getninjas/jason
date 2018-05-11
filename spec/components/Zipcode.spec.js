import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import renderer from 'react-test-renderer';
import Zipcode from '../../src/components/Zipcode';
import { enzymeConfig, shallow, mount } from '../enzymeConfig';

var mock = new MockAdapter(axios);
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

  describe('.onKeyUp', () => {
    it('calls valid zipcode methods', () => {
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

      component.instance().isUserTyping = jest.fn();
      component.instance().isValidZipCodeInput = jest.fn();

      const evt = { target: { value: '05402-300' }, key: 0 }
      component.instance().onKeyUp(evt);

      expect(component.instance().isUserTyping).toHaveBeenCalled();
      expect(component.instance().isValidZipCodeInput).toHaveBeenCalled();
    });

    it('starts zipcode fetch', () => {
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

      component.instance().getZipCode = jest.fn();

      const evt = { target: { value: '04707-060' }, key: 0 }
      component.instance().onKeyUp(evt);

      expect(component.instance().getZipCode).toHaveBeenCalled();
    });
  });

  describe('.isUserTyping', () => {
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

    it('returns true for incomplete zipcode format', () => {
      const zipcodeLength = 7;
      const keyboardKey = 'a';

      const result = component.instance().isUserTyping(zipcodeLength, keyboardKey);

      expect(result).toEqual(true);
    });

    it('returns false when last zipcode caracter is entered', () => {
      const zipcodeLength = 8;
      const keyboardKey = 0;

      const result = component.instance().isUserTyping(zipcodeLength, keyboardKey);

      expect(result).toEqual(false);
    });
  });

  describe('.isValidZipCodeInput', () => {
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

    it('returns true for a valid zipcode user input', () => {
      const zipcodeLength = 8;
      const fetchedCompleted = false;

      const result = component.instance().isValidZipCodeInput(zipcodeLength, fetchedCompleted);

      expect(result).toEqual(true);
    });

    it('returns false for invalid zipcode user input', () => {
      const zipcodeLength = 7;
      const fetchedCompleted = true;

      const result = component.instance().isValidZipCodeInput(zipcodeLength, fetchedCompleted);

      expect(result).toEqual(false);
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
        fetchCompleted: true,
      }

      const emptyState = {
        value: '',
        type_street: '',
        street: '',
        city: '',
        neighborhood: '',
        uf: '',
        fullAddress: '',
        fetchCompleted: false,
      }

      const result = component.instance().getEmptyState(currentState);

      expect(result).toEqual(emptyState);
    });
  });

  describe('.getZipCode', () => {
    mock.onGet('/api/correios', { params: { q: '05402300' } } ).reply(200, {
      data: {
        type_street: "",
        street: "Avenida Rebouças",
        city: "São Paulo",
        neighborhood: "Pinheiros",
        uf: "SP"
      },
    });

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

    it('should behave...', () => {
      const initialState = component.state();

      component.instance().getZipCode('05402300');

      axios.get('/api/correios', { params: { q: '05402300' } } )
        .then(function(response) {
        });

      const currentState = component.state();
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
        ...responseAddress,
        fullAddress: 'Avenida Rebouças, Pinheiros \nSão Paulo - SP',
        fetchCompleted: true,
      }

      const result = component.instance().fillAddressState(responseAddress, zipcodeValue);

      expect(result).toEqual(filledState);
    });
  });
});

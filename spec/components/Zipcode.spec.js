import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import renderer from 'react-test-renderer';
import { enzymeConfig, mount } from '../enzymeConfig';
import { AppContext } from '../../src/AppContextReact';
import Zipcode from '../../src/components/Zipcode';

enzymeConfig();

const getLanguageSelectorWithContext = (context = { onZipcodeFetchSuccess: zipcode => zipcode }) => {
  jest.doMock('../../src/AppContextReact', () => {
    return {
      AppContext: {
        Consumer: (props) => {
          return (props.children(context))
        }
      }
    }
  });

  return require('../../src/components/Zipcode').default;
};

function createNodeMock(element) {
  if (element.type === 'input') {
    return {
      addEventListener() {},
      value: '',
    };
  }

  return null;
}

const zipcodeElement = () => {
  return <AppContext.Provider value={ { onZipcodeFetchSuccess: zipcode => zipcode } } >
    <Zipcode
      type={'zipcode'}
      key={`zipcode-1`}
      id={'zipcodeTest'}
      name={'zipcodeTest'}
      placeholder={'00000-000'}
      onFieldChange={()=>{}}
  />
  </AppContext.Provider>
};

const getZipCodeMock = ()=> {
  const ZipcodeMock = getLanguageSelectorWithContext();
  return (<ZipcodeMock type={'zipcode'}
    key={`zipcode-1`}
    id={'zipcodeTest'}
    name={'zipcodeTest'}
    placeholder={'00000-000'}
    onFieldChange={()=>{}}
  />);
}

describe('Zipcode', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('renders defaultProps', () => {
    const options = { createNodeMock };
    const component = renderer.create(zipcodeElement(), options)

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('.getFullAddress', () => {
    it('returns formatted full address', () => {
      const component = mount(getZipCodeMock());

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
      const component = mount(getZipCodeMock());

      component.instance().isUserTyping = jest.fn();
      component.instance().isValidZipCodeInput = jest.fn();

      const evt = { target: { value: '05402-300' }, key: 0 }
      component.instance().onKeyUp(()=>{}, evt);

      expect(component.instance().isUserTyping).toHaveBeenCalled();
      expect(component.instance().isValidZipCodeInput).toHaveBeenCalled();
    });

    it('starts zipcode fetch when fetchCompleted false', () => {
      const component = mount(getZipCodeMock());

      component.instance().getZipCode = jest.fn();

      const evt = { target: { value: '04707-060' }, key: 0 };
      const successCallback = ()=>{};
      component.instance().onKeyUp(successCallback, evt);

      expect(component.instance().getZipCode).toHaveBeenCalledWith('04707060', successCallback);
    });

    it('does not fetch zipcode if fetchCompleted true', () => {
      const component = mount(getZipCodeMock());

      component.state().fetchCompleted = true;
      component.instance().getZipCode = jest.fn();

      const evt = { target: { value: '04707-060' }, key: 0 };
      const successCallback = ()=>{};
      component.instance().onKeyUp(successCallback, evt);

      expect(component.instance().getZipCode).not.toHaveBeenCalledWith('04707060', successCallback);
    });
  });

  describe('.isUserTyping', () => {
    it('returns true for incomplete zipcode format', () => {
      const zipcodeLength = 7;
      const keyboardKey = 'a';
      const component = mount(getZipCodeMock());

      const result = component.instance().isUserTyping(zipcodeLength, keyboardKey);

      expect(result).toEqual(true);
    });

    it('returns false when last zipcode caracter is entered', () => {
      const zipcodeLength = 8;
      const keyboardKey = 0;
      const component = mount(getZipCodeMock());

      const result = component.instance().isUserTyping(zipcodeLength, keyboardKey);

      expect(result).toEqual(false);
    });
  });

  describe('.isValidZipCodeInput', () => {
    it('returns true for a valid zipcode user input', () => {
      const zipcodeLength = 8;
      const fetchedCompleted = false;
      const component = mount(getZipCodeMock());

      const result = component.instance().isValidZipCodeInput(zipcodeLength, fetchedCompleted);

      expect(result).toEqual(true);
    });

    it('returns false for invalid zipcode user input', () => {
      const zipcodeLength = 7;
      const fetchedCompleted = true;
      const component = mount(getZipCodeMock());

      const result = component.instance().isValidZipCodeInput(zipcodeLength, fetchedCompleted);

      expect(result).toEqual(false);
    });
  });

  describe('.getEmptyState', () => {
    it('sets all key values to empty string', () => {
      const component = mount(getZipCodeMock());

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

  describe('.fillAddressState', () => {
    it('sets response data and value zipcode to key values', () => {
      const component = mount(getZipCodeMock());
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

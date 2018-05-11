import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import renderer from 'react-test-renderer';
import { enzymeConfig, mount } from '../enzymeConfig';

import AppContext from '../../src/appContext';
import Zipcode from '../../src/components/Zipcode';

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

describe('Zipcode', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  const getComponentWithContext = (context = { onZipcodeFetchSuccess: zipcode => zipcode } ) => {
    console.log(context);

    jest.doMock('../../src/appContext', () => {
      return {
        AppContext: {
          Consumer: (props) => props.children(context)
        }
      }
    });

    console.log('Possou do mock.');

    return Zipcode;
  };

  it('renders defaultProps', () => {
    const options = { createNodeMock };
    const component = renderer.create(zipcodeElement(), options)

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('.getFullAddress', () => {
    it('returns formatted full address', () => {
      const Zipcode2 = getComponentWithContext();
      console.log(Zipcode2);
      const component = mount(<Zipcode2
        type={'zipcode'}
        key={`zipcode-1`}
        id={'zipcodeTest'}
        name={'zipcodeTest'}
        placeholder={'00000-000'}
        onFieldChange={()=>{}}
      />);

      const responseAddress = {
        street: 'Avenida Rebouças',
        neighborhood: 'Pinheiros',
        city: 'São Paulo',
        uf: 'SP',
      }

      const result = component.instance().getFullAddress(responseAddress);

      const fullAddressFormatted = 'Avenida Rebouças, Pinheiros \nSão Paulo - SP';

      console.log(result);

      expect(result).toEqual(fullAddressFormatted);
    });
  });

  xdescribe('.onKeyUp', () => {
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

    it('starts zipcode fetch when fetchCompleted false', () => {
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

    it('does not fetch zipcode if fetchCompleted true', () => {
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


      component.state().fetchCompleted = true;
      component.instance().getZipCode = jest.fn();

      const evt = { target: { value: '04707-060' }, key: 0 }
      component.instance().onKeyUp(evt);

      expect(component.instance().getZipCode).not.toHaveBeenCalled();
    });
  });

  xdescribe('.isUserTyping', () => {
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

  xdescribe('.isValidZipCodeInput', () => {
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

  xdescribe('.getEmptyState', () => {
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

  xdescribe('.getZipCode', () => {
    mock.onGet('http://www.getninjas-homolog.com.br/api/correios?q=05402300').reply(200, {
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

    it('axios mock', () => {
      component.instance().getZipCode('05402300');

      expect(true).toEqual(true);
    });
  });

  xdescribe('.fillAddressState', () => {
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

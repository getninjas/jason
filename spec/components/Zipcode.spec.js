import React from 'react';
import renderer from 'react-test-renderer';
import { enzymeConfig, mount } from '../enzymeConfig';
import { AppContext } from '../../src/AppContext';
import Zipcode from '../../src/components/Zipcode';

enzymeConfig();

const getComponentWithContext = (context = { onZipcodeFetchSuccess: zipcode => zipcode }) => {
  jest.doMock('../../src/AppContext', () => {
    return {
      AppContext: {
        Consumer: props => (props.children(context)),
      },
    };
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

const commonProps = {
  type: 'zipcode',
  key: 'zipcode-1',
  id: 'zipcodeTest',
  name: 'zipcodeTest',
  placeholder: '00000-000',
  zipcodeUrlService: 'http://viacep.com.br/ws/@@zipcode@@/json/',
  onFieldChange: () => {},
};

const zipcodeElement = () => (
  <AppContext.Provider value={{ onZipcodeFetchSuccess: zipcode => zipcode }} >
    <Zipcode {...commonProps} />
  </AppContext.Provider>
);

const getZipCodeMock = () => {
  const ZipcodeMock = getComponentWithContext();
  return (<ZipcodeMock {...commonProps}/>);
};

describe('Zipcode', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('renders defaultProps', () => {
    const options = { createNodeMock };
    const component = renderer.create(zipcodeElement(), options);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('.onChange', () => {
    it('starts zipcode fetch when fetchCompleted false', () => {
      const component = mount(getZipCodeMock());

      component.instance().getZipCode = jest.fn();

      const evt = { target: { value: '04707-060' } };
      const successCallback = () => {};
      const errorCallback = () => {};

      component.instance().onChange(successCallback, errorCallback, evt);

      expect(component.instance().getZipCode).toHaveBeenCalledWith('04707060', successCallback, errorCallback);
    });

    it('does not fetch zipcode if fetchCompleted true', () => {
      const component = mount(getZipCodeMock());

      component.state().fetchCompleted = true;
      component.instance().getZipCode = jest.fn();

      const evt = { target: { value: '04707-060' } };
      const successCallback = () => {};
      const errorCallback = () => {};

      component.instance().onChange(successCallback, errorCallback, evt);

      expect(component.instance().getZipCode).not.toHaveBeenCalledWith('04707060', successCallback, errorCallback);
    });

    it('calls onZipcodeSuccess and successCallback on fetch success', async () => {
      const component = mount(getZipCodeMock());

      const responseData = {
        data: { type_street: '', street: 'Rua Mock', city: 'Cidade Mock', neighborhood: 'Bairro Mock', uf: 'SP' },
      };

      const successCallback = jest.fn();
      const errorCallback = jest.fn();
      component.instance().onZipcodeSuccess = jest.fn();

      await component.instance().getZipCode('04707060', successCallback, errorCallback);

      expect(successCallback).toHaveBeenCalledWith('04707060');
      expect(errorCallback).not.toHaveBeenCalledWith('04707060');
      expect(component.instance().onZipcodeSuccess).toHaveBeenCalledWith('04707060', responseData);
    });

    it('calls onZipcodeError on fetch error', async () => {
      const component = mount(getZipCodeMock());
      const successCallback = jest.fn();
      const errorCallback = jest.fn();

      component.instance().onZipcodeError = jest.fn();
      component.state().zipcodeUrlService = 'http://unknowservice/@@zipcode@@';

      await component.instance().getZipCode('04707060', successCallback, errorCallback);

      expect(successCallback).not.toHaveBeenCalledWith('04707060');
      expect(errorCallback).toHaveBeenCalledWith('04707060');
      expect(component.instance().onZipcodeError).toHaveBeenCalledWith('04707060');
    });
  });
});

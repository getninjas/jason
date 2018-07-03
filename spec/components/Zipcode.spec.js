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
  zipcodeUrlService: 'http://www.mocky.io/v2/5afd94c63200007f00f1ad38',
  onFieldChange: () => {},
  onFieldBlur: () => {},
};

const zipcodeElement = () => (
  <AppContext.Provider value={{ onZipcodeFetchSuccess: data => data, onZipcodeFetchError: data => data }} >
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
      const evt = { target: { value: '04707-060' } };
      const successCallback = () => {};
      const errorCallback = () => {};
      const instance = component.instance();

      instance.updateZipcode = jest.fn();

      instance.onChange(successCallback, errorCallback, evt);

      expect(instance.updateZipcode).toHaveBeenCalledWith('04707-060', successCallback, errorCallback);
    });

    it('does not fetch zipcode if fetchCompleted true', () => {
      const component = mount(getZipCodeMock());
      const evt = { target: { value: '04707-060' } };
      const successCallback = () => {};
      const errorCallback = () => {};
      const instance = component.instance();

      component.state().fetchCompleted = true;
      instance.updateZipcode = jest.fn();

      instance.onChange(successCallback, errorCallback, evt);

      expect(instance.updateZipcode).not.toHaveBeenCalledWith('04707060', successCallback, errorCallback);
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

      expect(successCallback).toHaveBeenCalledWith(component.instance().state);
      expect(errorCallback).not.toHaveBeenCalledWith(component.instance().state);
      expect(component.instance().onZipcodeSuccess).toHaveBeenCalledWith('04707060', responseData);
    });

    it('calls onZipcodeError on fetch error', async () => {
      const component = mount(getZipCodeMock());
      const successCallback = jest.fn();
      const errorCallback = jest.fn();

      component.instance().onZipcodeError = jest.fn();
      component.state().zipcodeUrlService = 'http://www.mocky.io/v2/5afd92203200009f00f1ad2c';

      await component.instance().getZipCode('04707060', successCallback, errorCallback);

      expect(successCallback).not.toHaveBeenCalledWith(component.instance().state);
      expect(errorCallback).toHaveBeenCalledWith({ ...component.instance().state, error: { data: {} } });
      expect(component.instance().onZipcodeError).toHaveBeenCalledWith('04707060');
    });
  });

  describe('.updateZipcode', () => {
    it('calls setState, getZipCode', () => {
      const component = mount(getZipCodeMock());
      const successCallback = jest.fn();
      const errorCallback = jest.fn();
      const zipcode = '04707060';
      const instance = component.instance();

      instance.setState = jest.fn();
      instance.getZipCode = jest.fn();

      instance.updateZipcode(zipcode, successCallback, errorCallback);

      expect(instance.setState).toHaveBeenCalledWith({ fetching: true, value: zipcode });
      expect(instance.getZipCode).toHaveBeenCalledWith(zipcode, successCallback, errorCallback);
    });
  });

  describe('.onZipcodeSuccess', () => {
    it('calls setState, this.props.onFieldChange', async () => {
      const onFieldChange = jest.fn();
      const ZipcodeMock = getComponentWithContext();
      const component = mount(<ZipcodeMock id='zip_id' name='zip_name' zipcodeUrlService='' onFieldBlur={() => {}} onFieldChange={ onFieldChange }/>);
      const responseData = {
        data: { type_street: '', street: 'Rua Mock', city: 'Cidade Mock', neighborhood: 'Bairro Mock', uf: 'SP' },
      };
      component.instance().setState = jest.fn();

      await component.instance().onZipcodeSuccess('04707060', responseData);

      expect(component.instance().setState).toHaveBeenCalled();
      expect(component.instance().props.onFieldChange).toHaveBeenCalled();
    });
  });

  describe('.onZipcodeError', () => {
    it('calls setState, this.props.onFieldBlur', async () => {
      const onFieldBlur = jest.fn();
      const ZipcodeMock = getComponentWithContext();
      const component = mount(<ZipcodeMock id='zip_id' name='zip_name' zipcodeUrlService='' onFieldChange={() => {}} onFieldBlur={onFieldBlur} />);

      component.instance().setState = jest.fn();

      await component.instance().onZipcodeError('04707060');
      expect(component.instance().setState).toHaveBeenCalled();
      expect(component.instance().props.onFieldBlur).toHaveBeenCalled();
    });
  });
});

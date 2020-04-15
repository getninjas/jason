import React from 'react';
import renderer from 'react-test-renderer';
import { AppContext } from '../../src/AppContext';
import Zipcode from '../../src/components/Zipcode';
import { enzymeConfig, mount } from '../enzymeConfig';

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
  mask: '00000-000',
};

const zipcodeElement = () => (
  <AppContext.Provider value={{ onZipcodeFetchSuccess: data => data, onZipcodeFetchError: data => data }} >
    <Zipcode {...commonProps} />
  </AppContext.Provider>
);

const getZipCodeMock = (params = {}) => {
  const ZipcodeMock = getComponentWithContext();
  return (<ZipcodeMock {...commonProps} {...params}/>);
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

  describe('with prefilled zipcode', () => {
    it('triggers native DOM event', () => {
      const component = mount(getZipCodeMock({ initialValue: '04707-060' }));
      const instance = component.instance();

      instance.triggerEvent = jest.fn();

      instance.componentDidMount();

      expect(instance.triggerEvent).toBeCalledWith('#zipcodeTest', 'blur');
    });
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

      expect(instance.updateZipcode).not.toHaveBeenCalledWith('04707-060', successCallback, errorCallback);
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
      expect(component.instance().onZipcodeError).toHaveBeenCalled();
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
      const component = mount(<ZipcodeMock id='zip_id' name='zip_name' zipcodeUrlService='' onFieldBlur={() => {}} onFieldChange={ onFieldChange } mask='00000-000' />);
      const responseData = {
        data: { type_street: '', street: 'Rua Mock', city: 'Cidade Mock', neighborhood: 'Bairro Mock', uf: 'SP' },
      };
      component.instance().setState = jest.fn();

      await component.instance().onZipcodeSuccess('04707060', responseData);

      expect(component.instance().setState).toHaveBeenCalled();
      expect(component.instance().props.onFieldChange).toHaveBeenCalled();
    });

    describe('with empty street on response', () => {
      it('does not display empty space with commma', async () => {
        const onFieldChange = jest.fn();
        const ZipcodeMock = getComponentWithContext();
        const component = mount(<ZipcodeMock id='zip_id' name='zip_name' zipcodeUrlService='' onFieldBlur={() => {}} onFieldChange={ onFieldChange } mask='00000-000' />);
        const instance = component.instance();
        const responseData = {
          data: { type_street: '', street: '', city: 'Cidade Mock', neighborhood: 'Bairro Mock', uf: 'SP' },
        };

        await instance.onZipcodeSuccess('04707060', responseData);

        expect(instance.state.fullAddress).toBe('Bairro Mock \nCidade Mock - SP');
      });
    });

    describe('with empty street and neighborhood', () => {
      it('does not display empty space with commma', async () => {
        const onFieldChange = jest.fn();
        const ZipcodeMock = getComponentWithContext();
        const component = mount(<ZipcodeMock id='zip_id' name='zip_name' zipcodeUrlService='' onFieldBlur={() => {}} onFieldChange={ onFieldChange } mask='00000-000' />);
        const instance = component.instance();
        const responseData = {
          data: { type_street: '', street: '', city: 'Cidade Mock', neighborhood: '', uf: 'SP' },
        };

        await instance.onZipcodeSuccess('04707060', responseData);

        expect(instance.state.fullAddress).toBe('Cidade Mock - SP');
      });
    });
  });

  describe('.onZipcodeError', () => {
    it('calls setState, this.props.onFieldBlur', async () => {
      const onFieldBlur = jest.fn();
      const ZipcodeMock = getComponentWithContext();
      const component = mount(<ZipcodeMock id='zip_id' name='zip_name' zipcodeUrlService='' onFieldChange={() => {}} onFieldBlur={onFieldBlur} mask='00000-000' />);

      component.instance().setState = jest.fn();

      await component.instance().onZipcodeError('04707060');
      expect(component.instance().setState).toHaveBeenCalled();
      expect(component.instance().props.onFieldBlur).toHaveBeenCalled();
    });
  });

  describe('.handleZipcodeExternalLinkClick', () => {
    it('calls function inside context using click simulator', () => {
      const ZipcodeMock = getComponentWithContext();
      const component = mount(<ZipcodeMock id='zip_id' name='zip_name' zipcodeUrlService='' onFieldChange={() => {}} onFieldBlur={() => {}} mask='00000-000' />);
      const componentInstance = component.instance();

      componentInstance.handleZipcodeExternalLinkClick = jest.fn();

      const zipcodeExternalLink = component.find('[data-js="zipcodeExternalLink"]');
      zipcodeExternalLink.simulate('click');

      expect(componentInstance.handleZipcodeExternalLinkClick).toHaveBeenCalled();
    });

    it('dont call if params are incorrect', async () => {
      const ZipcodeMock = getComponentWithContext();
      const handleZipcodeExternalLinkClick = undefined;
      const component = mount(<ZipcodeMock id='zip_id' name='zip_name' zipcodeUrlService='' onFieldChange={() => {}} onFieldBlur={() => {}} handleZipcodeExternalLinkClick={handleZipcodeExternalLinkClick} mask='00000-000' />);
      const componentInstance = component.instance();
      const clickEvent = new Event('click');
      const mouseoverEvent = new Event('mouseover');

      // !event && !context
      let zipcodeExternalLinkCall = componentInstance.handleZipcodeExternalLinkClick();
      expect(zipcodeExternalLinkCall).toBeFalsy();
      
      // whrong type event without context
      zipcodeExternalLinkCall = componentInstance.handleZipcodeExternalLinkClick(mouseoverEvent);
      expect(zipcodeExternalLinkCall).toBeFalsy();

      // correct type event without context
      zipcodeExternalLinkCall = componentInstance.handleZipcodeExternalLinkClick(clickEvent);
      expect(zipcodeExternalLinkCall).toBeFalsy();

      // correct type event with error type of context
      zipcodeExternalLinkCall = componentInstance.handleZipcodeExternalLinkClick(clickEvent, true);
      expect(zipcodeExternalLinkCall).toBeFalsy();

      // correct type event with empty context
      zipcodeExternalLinkCall = componentInstance.handleZipcodeExternalLinkClick(clickEvent, {});
      expect(zipcodeExternalLinkCall).toBeFalsy();

    });

    it('calls callback function if receive correct params', async () => {
      const ZipcodeMock = getComponentWithContext();
      const handleZipcodeExternalLinkClick = (event, context) => {};
      const component = mount(<ZipcodeMock id='zip_id' name='zip_name' zipcodeUrlService='' onFieldChange={() => {}} onFieldBlur={() => {}} handleZipcodeExternalLinkClick={handleZipcodeExternalLinkClick} mask='00000-000' />);
      const componentInstance = component.instance();

      let event = new Event('click');
      let context = { handleZipcodeExternalLinkClick : jest.fn() };
      
      // correct type event with expected type of context
      let zipcodeExternalLinkCall = componentInstance.handleZipcodeExternalLinkClick(event, context);
      expect(context.handleZipcodeExternalLinkClick).toHaveBeenCalled();

    });

  });

});

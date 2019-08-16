import axios from 'axios';
import IMask from 'imask';
import PropTypes from 'prop-types';
import React, { Component, createRef, Fragment } from 'react';
import { AppContext } from '../AppContext';
import triggerNativeEvent from '../helpers/domEvent';
import { fillAddressState, getEmptyState, isUserTyping, isValidZipCodeInput } from '../helpers/zipcode';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFieldBlur: PropTypes.func.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.string,
  initialValue: PropTypes.string,
  value: PropTypes.any,
  zipcodeUrlService: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  mask: PropTypes.string,
};

const defaultProps = {
  placeholder: '99999-999',
  required: true,
  title: 'Zipcode',
  type: 'zipcode',
  style: 'form__input',
  value: '',
  minLength: 9,
};

export default class Zipcode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.initialValue || defaultProps.value,
      type_street: '',
      street: '',
      city: '',
      neighborhood: '',
      uf: '',
      fullAddress: '',
      zipcodeInvalid: false,
      fetchCompleted: false,
      zipcodeUrlService: this.props.zipcodeUrlService,
      fetching: false,
    };

    this.mounted = false;
    this.inputRef = createRef();
    this.onBlur = this.onBlur.bind(this);
    this.triggerEvent = triggerNativeEvent;
  }

  updateZipcode(zipcode, successCallback, errorCallback) {
    this.setState({ fetching: true, value: zipcode });
    this.getZipCode(zipcode, successCallback, errorCallback);
  }

  onChange(successCallback, errorCallback, evt) {
    const zipcode = evt.target.value;

    if (isUserTyping(zipcode.length, this.props.minLength)) {
      this.setState({ value: zipcode, fullAddress: '', fetchCompleted: false });
    } else if (isValidZipCodeInput(zipcode.length, this.props.minLength, this.state.fetchCompleted)) {
      this.props.onFieldBlur({ ...this.props, value: zipcode });

      this.updateZipcode(zipcode, successCallback, errorCallback);
    }
  }

  onBlur(successCallback, errorCallback, evt) {
    const zipcode = evt.target.value;
    const { fetchCompleted, zipcodeInvalid } = this.state;

    this.props.onFieldBlur({ ...this.props, value: this.state.zipcodeInvalid ? '' : zipcode });

    if (isValidZipCodeInput(zipcode.length, this.props.minLength, fetchCompleted) && !zipcodeInvalid) {
      this.updateZipcode(zipcode, successCallback, errorCallback);
    }
  }

  async getZipCode(zipcode, successCallback, errorCallback) {
    try {
      const url = this.state.zipcodeUrlService.replace(/@@zipcode@@/, zipcode.replace(/[^0-9]/g, ''));
      const response = await axios.get(url);

      this.onZipcodeSuccess(zipcode, response);

      successCallback(this.state);
    } catch (error) {
      this.onZipcodeError();

      errorCallback({ ...this.state, error });
    }
  }

  onZipcodeSuccess(zipcode, response) {
    let result = getEmptyState(this.state);

    result = fillAddressState(response.data, zipcode);
    result.fetching = false;
    result.zipcodeUrlService = this.props.zipcodeUrlService;
    result.zipcodeInvalid = false;

    this.setState(result);

    this.props.onFieldChange({ ...this.props, value: zipcode });
  }

  onZipcodeError() {
    const { value } = this.state;
    this.setState({ fullAddress: '', fetching: false, zipcodeInvalid: true });

    this.props.onFieldBlur({ ...this.props, fetchCompleted: false, value: this.state.zipcodeInvalid ? '' : value });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    this.mask = new IMask(this.inputRef.current, { mask: this.props.mask });

    this.mask.on('complete', () => {
      this.props.onFieldChange({
        value: this.mask.value,
        id: this.props.id,
      });

      if (this.mounted) {
        this.setState({ value: this.mask.value, zipcodeInvalid: false });
      }
    });

    if (this.state.value.length) {
      this.triggerEvent(`#${this.props.id}`, 'blur');
    }
  }

  render() {
    const { id, name, required, placeholder, style } = this.props;
    const { street, city, neighborhood, uf, fullAddress, fetching } = this.state;
    const searchingZipcode = <span className='zipcode__loader' >Buscando CEP...</span>;
    const completeAddress = <span className='full-address'>{fullAddress}</span>;

    return (
      <AppContext.Consumer>
        { context => <Fragment>
          <a
            href='http://www.buscacep.correios.com.br'
            target='_blank'
            className='form__label-link'
            rel='noopener noreferrer'>
            Não lembra seu CEP?
          </a>
          <input
            id={id}
            name={name}
            className={style}
            type='tel'
            placeholder={placeholder}
            required={required}
            onChange={this.onChange.bind(this, context.onZipcodeFetchSuccess, context.onZipcodeFetchError)}
            onBlur={this.onBlur.bind(this, context.onZipcodeFetchSuccess, context.onZipcodeFetchError)}
            ref={this.inputRef} value={this.state.value}
          />
          { fetching ? searchingZipcode : completeAddress }
          <input id='street' name='street' type='hidden' value={street} />
          <input id='neighborhood' name='neighborhood' type='hidden' value={neighborhood} />
          <input id='city' name={'city'} type={'hidden'} value={city} />
          <input id='uf' name='uf' type='hidden' value={uf} />
        </Fragment>
        }
      </AppContext.Consumer>
    );
  }
}

Zipcode.propTypes = propTypes;
Zipcode.defaultProps = defaultProps;

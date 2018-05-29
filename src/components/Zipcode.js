import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import IMask from 'imask';
import { AppContext } from '../AppContext';
import { isUserTyping, isValidZipCodeInput, getEmptyState, fillAddressState } from '../helpers/zipcode';

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
  value: PropTypes.any,
  zipcodeUrlService: PropTypes.string.isRequired,
  minLength: PropTypes.number,
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

const ZIPCODE_MASK = '00000-000';

export default class Zipcode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
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

    this.inputRef = createRef();
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(successCallback, errorCallback, evt) {
    const zipcode = evt.target.value;

    if (isUserTyping(zipcode.length)) {
      this.setState({ value: zipcode, fullAddress: '', fetchCompleted: false });
    } else if (isValidZipCodeInput(zipcode.length, this.state.fetchCompleted)) {
      this.props.onFieldBlur({ ...this.props, value: zipcode });
      this.setState({ fetching: true, value: zipcode });
      this.getZipCode(zipcode, successCallback, errorCallback);
    }
  }

  onBlur(evt) {
    this.props.onFieldBlur({ ...this.props, value: this.state.zipcodeInvalid ? '' : evt.target.value });
  }

  async getZipCode(zipcode, successCallback, errorCallback) {
    try {
      const url = this.state.zipcodeUrlService.replace(/@@zipcode@@/, zipcode.replace(/[^0-9]/g, ''));
      const response = await axios.get(url);

      this.onZipcodeSuccess(zipcode, response);

      successCallback(this.state);
    } catch (error) {
      this.onZipcodeError(zipcode);

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
    this.setState({ fullAddress: '', fetching: false, zipcodeInvalid: true });

    this.props.onFieldChange({ value: '', fetchCompleted: false, ...this.props });
  }

  componentDidMount() {
    this.mask = new IMask(this.inputRef.current, { mask: ZIPCODE_MASK });
  }

  render() {
    const { id, name, required, placeholder, style } = this.props;
    const { street, city, neighborhood, uf, fullAddress, fetching } = this.state;

    return (
      <AppContext.Consumer>
        { context => <Fragment>
          <a href='http://www.buscacep.correios.com.br' target='_blank' className='form__label-link' rel='noopener noreferrer'>Não lembra seu CEP?</a>
          <input id={id} name={name} className={style} type='tel' placeholder={placeholder} required={required} onChange={this.onChange.bind(this, context.onZipcodeFetchSuccess, context.onZipcodeFetchError)} onBlur={this.onBlur} ref={this.inputRef} />
          { fetching ? <span className='zipcode__loader' >Buscando CEP...</span> : <span className='full-address'>{fullAddress}</span> }
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

import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import IMask from 'imask';
import { AppContext } from '../AppContextReact';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
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

const ZIPCODE_VALID_LENGTH = defaultProps.minLength - 1;
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
      fetchCompleted: false,
      zipcodeUrlService: this.props.zipcodeUrlService,
      fetching: false,
    }

    this.inputRef = createRef();
  }

  onKeyUp(successCallback, evt) {
    const zipcode = evt.target.value.replace(/[^0-9]/g, '');
    const key = Number(evt.key);

    this.props.onFieldChange({ ...this.props, value: evt.target.value });

    if (this.isUserTyping(zipcode.length, key)) {
      this.setState({ value: evt.target.value, fullAddress: '', fetchCompleted: false });

    } else if (this.isValidZipCodeInput(zipcode.length, this.state.fetchCompleted)) {
      this.setState({ fetching: true });
      this.getZipCode(zipcode, successCallback);
    }
  }

  isUserTyping(zipcodeLength, keyboardKey) {
    return zipcodeLength < ZIPCODE_VALID_LENGTH && isNaN(keyboardKey);
  }

  isValidZipCodeInput(zipcodeLength, fetchCompleted) {
    return zipcodeLength === ZIPCODE_VALID_LENGTH && !fetchCompleted;
  }

  async getZipCode(zipcode, successCallback) {
    try {
      const url = this.state.zipcodeUrlService.replace(/@@zipcode@@/, zipcode);
      const response = await axios.get(url);

      this.onZipcodeSuccess(zipcode, response);

      successCallback(zipcode);
    } catch (error) {
      this.onZipcodeError(zipcode);
    }
  }

  onZipcodeSuccess(zipcode, response) {

    let result = this.getEmptyState(this.state);

    result = this.fillAddressState(response.data, zipcode);
    result.fetching = false;

    this.setState(result);
  }

  onZipcodeError(zipcode) {
    let result = this.getEmptyState(this.state);

    result.value = zipcode;
    result.fetching = false;

    this.props.onFieldChange({ value: '', fetchCompleted: false, ...this.props });

    this.setState(result);
  }

  getEmptyState(state) {
    const result = Object.keys(state).reduce((output, key) => {
      let defaultValue = '';

      if (typeof state[key] === 'boolean') {
        defaultValue = false;
      }

      return { ...output, [key]: defaultValue };
    }, {});

    return result;
  }

  fillAddressState(responseAddress, zipcode) {
    let result = Object.keys(responseAddress).reduce((output, key) => {
      return { ...output, [key]: responseAddress[key] };
    }, {});

    result.value = zipcode;
    result.fetchCompleted = true;
    result.fullAddress = this.getFullAddress(responseAddress);

    return result;
  }

  getFullAddress({ street, neighborhood, city, uf }) {
    return `${street}, ${neighborhood} \n${city} - ${uf}`;
  }

  componentDidMount() {
    new IMask(this.inputRef.current, { mask: ZIPCODE_MASK });
  }

  render() {
    const { id, name, required, placeholder, style } = this.props;
    const { street, city, neighborhood, uf, fullAddress, fetching } = this.state;

    return (
      <AppContext.Consumer>
        { context => {
            return <Fragment>
              <a href={'http://www.buscacep.correios.com.br'} target={'_blank'} className={'form__label-link'} rel={'noopener noreferrer'}>Não lembra seu CEP?</a>
              <input id={id} name={name} className={style} type={'tel'} placeholder={placeholder} required={required} onKeyUp={this.onKeyUp.bind(this, context.onZipcodeFetchSuccess)} ref={this.inputRef} />
              <span className={'full-address'}>{fullAddress}</span>
              <input id={'street'} name={'street'} type={'hidden'} value={street} />
              <input id={'neighborhood'} name={'neighborhood'} type={'hidden'} value={neighborhood} />
              <input id={'city'} name={'city'} type={'hidden'} value={city} />
              <input id={'uf'} name={'uf'} type={'hidden'} value={uf} />
              { fetching ? <span className={'zipcode__loader'} >Buscando CEP...</span> : null }
            </Fragment>
          } }
      </AppContext.Consumer>
    );
  }
}

Zipcode.propTypes = propTypes;
Zipcode.defaultProps = defaultProps;

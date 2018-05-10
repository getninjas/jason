import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import IMask from 'imask';

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
  minLength: PropTypes.number,
};

const defaultProps = {
  placeholder: '99999-999',
  required: true,
  title: 'Zipcode',
  type: 'tel',
  style: 'form__input',
  value: '',
  minLength: 9,
};

export default class Zipcode extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      street: '',
      city: '',
      neighborhood: '',
      uf: '',
      fullAddress: '',
    }

    this.ref = createRef();
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onKeyUp(evt) {
    const zipcode = evt.target.value.replace(/[^0-9]/g, '');
    const key = Number(evt.key);

    this.props.onFieldChange({
      value: evt.target.value,
      id: this.props.id,
      required: this.props.required,
      type: this.props.type,
      minLength: this.props.minLength,
    });

    if (!isNaN(key)) {
      if (zipcode.length === 8) {
        this.getZipCode(zipcode);
      }
    }
  }

  getZipCode(zipcode) {
    axios.get(`http://www.getninjas-homolog.com.br/api/correios?q=${zipcode}`)
      .then((response) => {
        this.setState({
          value: zipcode,
          street: response.data.street,
          city: response.data.city,
          neighborhood: response.data.neighborhood,
          uf: response.data.uf,
          fullAddress: this.getFullAddress(response.data),
        })
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  getFullAddress({street, neighborhood, city, uf}) {
    return `${street}, ${neighborhood} \n${city} - ${uf}`;
  }

  componentDidMount() {
    new IMask(this.ref.current, { mask: '00000-000' });

    this.setState({ value: this.props.value });
  }

  render() {
    const { id, name, required, placeholder, type, style } = this.props;
    const { street, city, neighborhood, uf, fullAddress } = this.state;

    return (
      <Fragment>
        <a href={'http://www.buscacep.correios.com.br'} target={'_blank'} className={'form__label-link'}  rel={'noopener noreferrer'}>Não lembra seu CEP?</a>
        <input id={id} name={name} className={style} type={type} placeholder={placeholder} required={required} onKeyUp={this.onKeyUp} ref={this.ref}/>
        <span className={'full-address'}>{fullAddress}</span>
        <input id={'street'} name={'street'} type={'hidden'} value={street}/>
        <input id={'neighborhood'} name={'neighborhood'} type={'hidden'} value={neighborhood}/>
        <input id={'city'} name={'city'} type={'hidden'} value={city}/>
        <input id={'uf'} name={'uf'} type={'hidden'} value={uf}/>
      </Fragment>
    );
  }
}

Zipcode.propTypes = propTypes;
Zipcode.defaultProps = defaultProps;

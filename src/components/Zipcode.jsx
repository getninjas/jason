import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
};

const defaultProps = {
  placeholder: '99999-999',
  required: true,
  title: 'Zipcode',
  type: 'zipcode',
  value: '',
};

export default class Zipcode extends Component {
  render() {
    const { id, name, required, placeholder, type } = this.props;

    return (
      <Fragment>
        <a href={'http://www.buscacep.correios.com.br'} target={'_blank'} className={'form__label-link'} rel={'noopener noreferrer'}>Não lembra seu CEP?</a>
        <input id={id} name={name} className={'form__input form__input--filled'} type={type} placeholder={placeholder} required={required}/>
        <div className={'full-address'}></div>
        <input id={'city'} name={'city'} type={'hidden'} value={''} className={'form__input--filled'}/>
        <input id={'neighborhood'} name={'neighborhood'} type={'hidden'} value={''} className={'form__input--filled'}/>
        <input id={'street'} name={'street'} type={'hidden'} value={''} className={'form__input--filled'}/>
        <input id={'uf'} name={'uf'} type={'hidden'} value={''} className={'form__input--filled'}/>
      </Fragment>
    );
  }
}

Zipcode.propTypes = propTypes;
Zipcode.defaultProps = defaultProps;

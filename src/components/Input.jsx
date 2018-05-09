import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import IMask from 'imask';
import maxLength from '../helpers/input';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
  style: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
};

const defaultProps = {
  placeholder: '',
  required: false,
  title: '',
  type: 'text',
  value: '',
  style: 'form__input',
  minLength: 3,
  maxLength: 255,
};

export default class Input extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    }

    this.ref = createRef();
    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    const inputValue = maxLength(evt.target.value, this.props.maxLength);

    this.props.onFieldChange({
      value: inputValue,
      id: this.props.id,
      required: this.props.required,
      type: this.props.type,
      minLength: this.props.minLength,
    });

    this.setState({ value: inputValue });
  }

  componentDidMount() {
    const { type, value } = this.props;

    if (type === 'phone') {
      new IMask(this.ref.current, { mask: '(00) 00000-0000' });
    }

    if (type === 'zipcode') {
      new IMask(this.ref.current, { mask: '00000-000' });
    }

    this.setState({ value: value });
  }

  getInputType(type) {
    if (type === 'phone' || type === 'zipcode') {
      return 'tel';
    }

    return type;
  }

  render() {
    const {
      type,
      id,
      name,
      title,
      style,
      placeholder,
      required,
      minLength,
      maxLength,
    } = this.props;

    return (
      <input
        type={this.getInputType(type)}
        id={id}
        name={name}
        title={title}
        className={style}
        placeholder={placeholder}
        required={required ? 'true' : 'false'}
        value={this.state.value}
        onChange={this.onChange}
        minLength={minLength}
        maxLength={maxLength}
        ref={this.ref} />
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

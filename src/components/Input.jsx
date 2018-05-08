import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import IMask from 'imask';

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
  maxLength: 5,
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
    this.props.onFieldChange({
      value: evt.target.value,
      id: this.props.id,
      required: this.props.required,
      type: this.props.type,
    });

    this.setState({ value: evt.target.value });
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

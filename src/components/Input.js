import IMask from 'imask';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getInputType, maxLengthTrim } from '../helpers/input';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFieldBlur: PropTypes.func.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  initialValue: PropTypes.any,
  style: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  regexPattern: PropTypes.string,
};

const defaultProps = {
  placeholder: '',
  required: false,
  title: '',
  type: 'text',
  value: '',
  style: 'form__input',
  minLength: 1,
  maxLength: 255,
};

const mask = IMask.createMask({ mask: '(00) 00000-0000' });

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(evt) {
    let inputValue = maxLengthTrim(evt.target.value, this.props.maxLength);

    inputValue = this.applyMask(inputValue);

    this.props.onFieldChange({
      value: inputValue,
      id: this.props.id,
    });
  }

  onBlur(evt) {
    this.props.onFieldBlur({
      value: evt.target.value,
      id: this.props.id,
      required: this.props.required,
      type: this.props.type,
      minLength: this.props.minLength,
      regexPattern: this.props.regexPattern,
    });
  }

  applyMask(value) {
    if (this.props.type !== 'phone') {
      return value;
    }

    return mask.resolve(value);
  }

  componentDidMount() {
    const { initialValue } = this.props;

    this.applyMask(initialValue || '');
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
        type={getInputType(type)}
        id={id}
        name={name}
        title={title}
        className={style}
        placeholder={placeholder}
        required={required ? 'true' : 'false'}
        value={this.props.initialValue || defaultProps.value}
        onChange={this.onChange}
        onBlur={this.onBlur}
        minLength={minLength}
        maxLength={maxLength}
      />
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

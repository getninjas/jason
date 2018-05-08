import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
  style: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
};

const defaultProps = {
  id: '',
  placeholder: '',
  name: '',
  title: '',
  required: false,
  value: '',
  style: 'form__input',
  minLength: 3,
  maxLength: 255,
};

export default class TextArea extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    this.props.onFieldChange({
      value: evt.target.value,
      id: this.props.id,
      required: this.props.required,
    });

    this.setState({ value: evt.target.value });
  }

  render() {
    const {
      id,
      name,
      title,
      placeholder,
      required,
      style,
      minLength,
      maxLength,
    } = this.props;

    return (
      <textarea
        id={id}
        name={name}
        title={title}
        className={style}
        placeholder={placeholder}
        required={required}
        value={this.state.value}
        onChange={this.onChange}
        minLength={minLength}
        maxLength={maxLength} />
    );
  }
}

TextArea.propTypes = propTypes;
TextArea.defaultProps = defaultProps;

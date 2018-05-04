import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
};

const defaultProps = {
  placeholder: '',
  required: false,
  name: '',
  title: '',
  type: 'text',
  value: '',
  style: 'form__input',
};

export default class Input extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    }

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

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  getInputType(type) {
    return type === 'phone' ? 'tel' : type;
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
        onChange={this.onChange} />
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

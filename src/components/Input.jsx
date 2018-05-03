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
};

const defaultProps = {
  placeholder: '',
  required: false,
  name: '',
  title: '',
  type: 'text',
  value: '',
};

export default class Input extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    }

    this.onChange = this.onChange.bind(this);

    this.inputStyle = 'form__input';
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
    return (
      <input
        type={this.getInputType(this.props.type)}
        id={this.props.id}
        name={this.props.name}
        title={this.props.title}
        className={this.inputStyle}
        placeholder={this.props.placeholder}
        required={this.props.required ? 'true' : 'false'}
        value={this.state.value}
        onChange={this.onChange} />
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Input.defaultProps = {
  id: '',
  placeholder: '',
  required: false,
  name: '',
  type: 'text',
  title: '',
  value: '',
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextArea extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    }

    this.onChange = this.onChange.bind(this);
  }

  static defaultProps = {
    id: '',
    placeholder: '',
    name: '',
    title: '',
    required: false,
    value: '',
  }

  onChange(evt) {
    this.setState({ value: evt.target.value });
  }

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  render() {
    return (
      <textarea
        id={this.props.id}
        name={this.props.name}
        title={this.props.title}
        className="form__input"
        placeholder={this.props.placeholder}
        required={this.props.required}
        value={this.state.value}
        onChange={this.onChange} />
    );
  }
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
}

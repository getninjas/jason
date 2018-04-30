import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  static defaultProps = {
    id: '',
    placeholder: '',
    required: false,
    name: '',
    title: '',
    value: '',
  }

  render() {
    return (
      <input
        id={this.props.id}
        name={this.props.name}
        title={this.props.title}
        className="form__input"
        placeholder={this.props.placeholder}
        required={this.props.required}
        value={this.props.value} />
    );
  }
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
}

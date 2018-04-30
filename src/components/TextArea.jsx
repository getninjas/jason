import React from 'react';
import PropTypes from 'prop-types';

export default class TextArea extends React.Component {
  static defaultProps = {
    id: '',
    placeholder: '',
    name: '',
    title: '',
    required: false,
    value: '',
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
        value={this.props.value} />
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

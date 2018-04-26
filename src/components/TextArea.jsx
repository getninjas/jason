import React from 'react';
import PropTypes from 'prop-types';

export default class TextArea extends React.Component {
  render() {
    return (
      <textarea
        id={this.props.id}
        name={this.props.id}
        title={this.props.id}
        className="form__input"
        placeholder={this.props.placeholder}
        required={this.props.required}
        value={this.props.value} />
    );
  }
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
}

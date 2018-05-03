import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
};

const defaultProps = {
  errorMessage: '',
  value: '',
};

export default class Field extends Component {
  constructor() {
    super();

    this.wrapperStyle = 'form__field form__field--fluid input';
    this.spanStyle = 'form__message form__message--invalid space-element-small error';
  }

  render() {
    return (
      <div className={this.wrapperStyle}>
        <label htmlFor={this.props.id} className="form__label">
          { this.props.label }
        </label>

        { this.props.children }

        <span className={this.spanStyle}>
          { this.props.errorMessage }
        </span>
      </div>
    );
  }
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

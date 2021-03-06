import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
  wrapperClassName: PropTypes.string,
};

const defaultProps = {
  errorMessage: '',
  value: '',
  wrapperClassName: 'form__field form__field--fluid input',
};

export default class Field extends Component {
  constructor() {
    super();

    this.spanStyle = 'form__message form__message--invalid space-element-small error';
  }

  get style() {
    if (this.props.errorMessage) {
      return 'form__input form__input--invalid';
    }

    return 'form__input';
  }

  render() {
    return (
      <div className={this.props.wrapperClassName}>
        <label htmlFor={this.props.id} className="form__label">
          { this.props.label }
        </label>

        { cloneElement(this.props.children, { style: this.style }) }

        <span className={this.spanStyle}>
          { this.props.errorMessage }
        </span>
      </div>
    );
  }
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

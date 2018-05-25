import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
  isFluid: PropTypes.Boolean,
};

const defaultProps = {
  errorMessage: '',
  value: '',
  isFluid: true,
};

export default class Field extends Component {
  constructor(props) {
    super(props);

    this.wrapperStyle = this.props.isFluid ? 'form__field form__field--fluid input' : 'form__field input';
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
      <div className={this.wrapperStyle}>
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

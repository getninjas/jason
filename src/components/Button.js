import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../AppContext';

const propTypes = {
  children: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool,
  buttonCustomClasses: PropTypes.string,
};

const defaultProps = {
  children: 'Prosseguir',
  isSubmit: false,
  buttonCustomClasses: 'btn btn--regular btn--high-contrast btn--fluid space-box-medium',
};

export default class Button extends Component {
  render() {
    const { buttonCustomClasses, isSubmit, handleButtonClick, children } = this.props;
    const type = isSubmit ? 'submit' : 'button';

    return (
      <button
        type={type}
        className={buttonCustomClasses || defaultProps.buttonCustomClasses}
        onClick={handleButtonClick}>
        {children}
      </button>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

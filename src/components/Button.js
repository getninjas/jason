import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool,
};

const defaultProps = {
  children: 'Prosseguir',
  isSubmit: false,
};

export default class Button extends Component {
  render() {
    const type = this.props.isSubmit ? 'submit' : 'button';
    const style = 'btn btn--regular btn--high-contrast btn--fluid space-box-medium';

    return (
      <button type={type} className={style} onClick={this.props.handleButtonClick}>
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

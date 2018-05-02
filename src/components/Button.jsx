import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static defaultProps = {
    children: 'Prosseguir',
    isSubmit: false,
  }

  render() {
    const type = this.props.isSubmit ? 'submit' : 'button';
    const style = "btn btn--regular btn--high-contrast btn--fluid space-box-medium";

    return (
      <button type={type} className={style} onClick={this.props.handleButtonClick}>
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool,
}

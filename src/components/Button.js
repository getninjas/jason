import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../AppContext';

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
  constructor(props) {
    super(props);
    this.defaultButtonStyle = 'btn btn--regular btn--high-contrast btn--fluid space-box-medium';
  }

  render() {
    const type = this.props.isSubmit ? 'submit' : 'button';

    return (
      <AppContext.Consumer>
        { context =>
          <button
            type={type}
            className={context.buttonCustomClasses ? context.buttonCustomClasses : this.defaultButtonStyle}
            onClick={this.props.handleButtonClick}>
            {this.props.children}
          </button>
        }
      </AppContext.Consumer>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

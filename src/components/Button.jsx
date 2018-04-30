import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  render() {
    const type = this.props.isSubmit ? 'submit' : 'button';

    return (
      <button type={type} className="btn btn--regular btn--high-contrast btn--fluid space-box-medium" onClick={this.props.handleButtonClick}>
        {this.props.children}
      </button>
    );
  }
}

Button.defaultProps = {
  children: 'Prosseguir',
  isSubmit: false
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool,
}
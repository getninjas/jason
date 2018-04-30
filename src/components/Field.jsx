import React from 'react';
import PropTypes from 'prop-types';

export default class Field extends React.Component {
  static defaultProps = {
    label: '',
    id: '',
    errorMessage: ''
  }

  render() {
    return (
      <div className="form__field form__field--fluid input">
        <label forHTML={this.props.id} className="form__label">
          { this.props.label }
        </label>

        {this.props.children}

        <span className="form__message form__message--invalid space-element-small error">
          { this.props.errorMessage }
        </span>
      </div>
    );
  }
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  children: PropTypes.any.isRequired,
}

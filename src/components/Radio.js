import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFieldBlur: PropTypes.func.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  values: PropTypes.array,
  style: PropTypes.string,
};

const defaultProps = {
  required: false,
  type: 'radio',
  values: [],
};

export default class Radio extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const {
      name,
      required,
      type,
    } = this.props;

    return (
      <ul>
        {this.props.values.map((elem, idx) => (
          <li className='form__radio' key={`${elem.databaseId}-${idx}`}>
            <input
              type={type}
              id={elem.databaseId}
              name={name}
              // onChange={this.onChange}
              // onBlur={this.onBlurCheckbox}
              data-input-value={elem.value}
              required={required ? 'true' : 'false'} />
            <label htmlFor={elem.databaseId}>{elem.value}</label>
          </li>
        ))}
      </ul>
    );
  }
}

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

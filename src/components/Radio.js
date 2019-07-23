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
};

const defaultProps = {
  required: false,
  type: 'radio',
  values: [],
};

// TODO: test
export default class Radio extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  // TODO: test
  onChange(evt) {
    const value = evt.target.value;
    this.setState({ value });

    this.props.onFieldChange({
      value,
      id: this.props.id
    });
  }

  onBlur() {
    this.props.onFieldBlur({
      value: this.state.value,
      id: this.props.id,
      required: this.props.required,
    });
  }

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
              value={elem.databaseId}
              onChange={this.onChange}
              onBlur={this.onBlur}
              required={required} />
            <label htmlFor={elem.databaseId}>{elem.value}</label>
          </li>
        ))}
      </ul>
    );
  }
}

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

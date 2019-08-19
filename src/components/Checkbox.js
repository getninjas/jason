import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';

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
  type: 'text',
  values: [],
  style: 'form__input',
};

export default class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };

    this.ref = createRef();
    this.onChange = this.onChange.bind(this);
    this.onBlurCheckbox = this.onBlurCheckbox.bind(this);
    this.onBlurInputOther = this.onBlurInputOther.bind(this);
    this.normalizeInputCheck = this.normalizeInputCheck.bind(this);
    this.inputChecked = {};
  }

  normalizeInputCheck() {
    const arrayValues = Object.keys(this.inputChecked);
    const values = arrayValues.map(value => this.inputChecked[value]);

    return values;
  }

  onChange(evt) {
    const checkboxValue = evt.target.getAttribute('data-input-value');

    this.inputChecked[evt.target.id] = checkboxValue === 'OTHER' ? this.ref.current.value : evt.target.id;

    if (!evt.target.checked) {
      delete this.inputChecked[evt.target.id];
    }

    if (checkboxValue === 'OTHER') {
      this.setState({ checked: !this.state.checked });
    }

    this.props.onFieldChange({
      id: this.props.id,
      value: this.normalizeInputCheck(),
    });
  }

  onBlurCheckbox() {
    this.props.onFieldBlur({
      id: this.props.id,
      value: this.normalizeInputCheck(),
    });
  }

  onBlurInputOther(evt) {
    this.inputChecked[evt.target.getAttribute('data-id')] = evt.target.value;

    this.props.onFieldChange({
      id: this.props.id,
      value: this.normalizeInputCheck(),
    });
  }

  render() {
    const {
      name,
      style,
      required,
    } = this.props;

    return (
      <ul>
        {this.props.values.map((elem, idx) => (
          <li className='form__check' key={`${elem.databaseId}-${idx}`}>
            <input
              type='checkbox'
              id={elem.databaseId}
              name={name}
              className={style}
              onChange={this.onChange}
              onBlur={this.onBlurCheckbox}
              data-input-value={elem.value}
              required={required} />

            <label key={`${elem.databaseId}-${idx}`} htmlFor={elem.databaseId}>
              {elem.value === 'OTHER' ? (
                <input type="text"
                  className={style}
                  disabled={!this.state.checked}
                  required={this.state.checked}
                  data-id={elem.databaseId}
                  ref={this.ref}
                  onBlur={this.onBlurInputOther} />
              ) : <label key={`${elem.databaseId}-${idx}`} htmlFor={elem.databaseId}>
                    {elem.value}
                  </label>
              }
            </label>
          </li>
        ))}
      </ul>
    );
  }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

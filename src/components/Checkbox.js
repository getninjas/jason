import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFieldBlur: PropTypes.func.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  initialValue: PropTypes.any,
  values: PropTypes.array,
  style: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
};

const defaultProps = {
  placeholder: '',
  required: false,
  title: '',
  type: 'text',
  initialValue: '',
  values: [],
  style: 'form__input',
  minLength: 3,
  maxLength: 255,
};

export default class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: this.props.values,
    };

    this.ref = createRef();
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.mask = null;
    this.normalizeInputCheck = this.normalizeInputCheck.bind(this);
  }

  normalizeInputCheck(value) {
    const inputChecked = value.filter(input => input.checked)
      .map((input) => {
        if (input.value === 'OTHER') {
          return input.textOther;
        }

        return input.databaseId;
      });

    return inputChecked;
  }

  onChange(evt) {
    const idNumberEvt = parseInt(evt.target.id, 10);
    const values = this.state.values.map((eachItem) => {
      const itemToSave = eachItem;

      if (eachItem.databaseId === idNumberEvt) {
        itemToSave.checked = evt.target.checked;

        if (eachItem.value === 'OTHER' && evt.target.type !== 'checkbox') {
          itemToSave.textOther = evt.target.value;
        }
      }

      return Object.assign(eachItem, itemToSave);
    });

    this.props.onFieldChange({
      id: this.props.id,
      value: this.normalizeInputCheck(values),
    });

    this.setState({ values });
  }

  onBlur(evt) {
    const data = {
      target: {
        checked: true,
        id: evt.target.getAttribute('data-id'),
        value: evt.target.value,
      },
    };

    this.onChange(data);
  }

  render() {
    const {
      name,
      title,
      style,
      required,
    } = this.props;

    return (
      <ul required={required ? 'true' : 'false'}>
        {this.props.values.map((elem, idx) => (
          <li className='form__check' key={`${elem.databaseId}-${idx}`} htmlFor={elem.databaseId}>
            <input
              type='checkbox'
              id={elem.databaseId}
              name={name}
              className={style}
              defaultChecked={!elem.checked ? false : elem.checked}
              onChange={this.onChange} />

            <label key={`${elem.databaseId}-${idx}`} htmlFor={elem.databaseId}>
              {elem.value === 'OTHER' ? (
                <input type="text" className={style} disabled={!elem.checked} data-id={elem.databaseId} ref={this.ref} onBlur={this.onBlur} />
              ) : elem.value}
            </label>
          </li>
          ))}
      </ul>
    );
  }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

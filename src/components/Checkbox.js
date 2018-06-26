import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import IMask from 'imask';

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
      value: this.props.values,
    };

    this.ref = createRef();
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.mask = null;
    this.normalizeInputCheck = this.normalizeInputCheck.bind(this);
  }

  normalizeInputCheck(value) {
    const inputChecked = value.filter(input => input.isChecked)
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
    const value = this.state.value.map((eachItem) => {
      if (eachItem.databaseId === idNumberEvt) {
        const itemToSave = eachItem;
        itemToSave.checked = evt.target.checked;

        if (eachItem.value === 'OTHER') {
          itemToSave.textOther = this.ref.current.value;
        }

        Object.assign(eachItem, itemToSave);
      }

      return eachItem;
    });

    this.props.onFieldChange({
      id: this.props.id,
      value: this.normalizeInputCheck(value),
    });

    this.setState({ value });
  }

  onBlur(evt) {
    const data = {
      target: {
        checked: true,
        id: evt.target.getAttribute('data-id'),
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
            {console.log(this.state.value[idx].checked)}
            <input
              type='checkbox'
              id={elem.databaseId}
              name={name}
              title={title}
              className={style}
              defaultChecked={this.state.value[idx].checked ? this.state.value[idx].checked : elem.checked}
              value={elem.value}
              onChange={this.onChange} />

            <label key={`${elem.databaseId}-${idx}`} htmlFor={elem.databaseId}>
              {elem.value === 'OTHER' ? (
                <input type="text" className={style} disabled={!elem.isChecked} data-id={elem.databaseId} ref={this.ref} onBlur={this.onBlur} />
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

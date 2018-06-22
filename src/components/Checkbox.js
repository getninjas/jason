import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import IMask from 'imask';
import { getInputType } from '../helpers/input';

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
      other: {},
    };

    this.ref = createRef();
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.mask = null;
  }

  onChange(evt) {
    const idNumberEvt = parseInt(evt.target.id, 10);
    const value = this.state.value.map((eachItem) => {
      if (eachItem.databaseId === idNumberEvt) {
        const testsaporra = eachItem;
        testsaporra.isChecked = evt.target.checked;
        Object.assign(eachItem, testsaporra);
      }

      return eachItem;
    });

    console.log(value);

    this.setState({ value });

    setTimeout(() => {
      console.log('NOSSO STADO...............', this.state.value);
    }, 100);
  }

  onBlur(evt) {
    console.log('this.ref', this.ref.current.value);
    console.log('evt.target.value', evt.target.value);
    console.log('evt.target.value', evt.target.getAttribute('data-id'));
    // this.props.onFieldBlur({
    //   value: evt.target.value,
    //   id: this.props.id,
    //   required: this.props.required,
    //   type: this.props.type,
    //   minLength: this.props.minLength,
    // });
  }

  componentDidMount() {
    const { type } = this.props;

    if (type === 'phone') {
      this.mask = new IMask(this.ref.current, { mask: '(00) 00000-0000' });
      this.mask.on('complete', () => {
        this.props.onFieldChange({
          value: this.mask.value,
          id: this.props.id,
        });

        this.setState({ value: this.mask.value });
      });
    }
  }

  render() {
    const {
      type,
      id,
      name,
      title,
      style,
      required,
    } = this.props;

    return (
      <div required={required ? 'true' : 'false'}>
        {this.props.values.map((elem, idx) => (
          <label key={`${elem.databaseId}-${idx}`} htmlFor={elem.databaseId}>
            <input
              type={getInputType(type)}
              id={elem.databaseId}
              name={name}
              title={title}
              className={style}
              value={elem.value}
              onChange={this.onChange} />
            {elem.value === 'OTHER' ? (
              <input type="text" disabled={!elem.isChecked} data-id={elem.databaseId} ref={this.ref} onBlur={this.onBlur} />
            ) : elem.value}
          </label>
          ))}
      </div>
    );
  }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

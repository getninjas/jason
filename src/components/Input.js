import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import IMask from 'imask';
import { maxLengthTrim, getInputType } from '../helpers/input';

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

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: this.props.values,
      value: this.props.initialValue ? this.props.initialValue : '',
    };

    this.ref = createRef();
    this.onChange = this.onChange.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.mask = null;
  }

  onChange(evt) {
    const inputValue = maxLengthTrim(evt.target.value, this.props.maxLength);

    this.props.onFieldChange({
      value: inputValue,
      id: this.props.id,
    });

    this.setState({ value: inputValue });
  }

  onChangeCheck(evt) {
    console.log('evt', evt);
    let idList = [];
    if (!this.state.value.length) {
      idList.push(parseInt(evt.target.id, 10));
    } else {
      idList = this.state.value.filter(valor => valor !== parseInt(evt.target.id, 10));

      if (idList.length === this.state.value.length) {
        idList.push(parseInt(evt.target.id, 10));
      }
    }

    this.props.onFieldChange({
      id: this.props.id,
      value: idList,
    });

    this.setState({ value: idList });
  }

  onBlur(evt) {
    this.props.onFieldBlur({
      value: evt.target.value,
      id: this.props.id,
      required: this.props.required,
      type: this.props.type,
      minLength: this.props.minLength,
    });
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
      placeholder,
      required,
      minLength,
      maxLength,
    } = this.props;

    const prepareComponent = () => {
      if (type === 'checkbox') {
        return (
          <div required={required ? 'true' : 'false'}>
            {this.state.values.map((elem, idx) => (
                <label key={`${elem.databaseId}-${idx}`} htmlFor={elem.databaseId}>
                  <input
                    type={getInputType(type)}
                    id={elem.databaseId}
                    name={name}
                    title={title}
                    className={style}
                    value={elem.value}
                    onChange={this.onChangeCheck}
                    ref={this.ref} />
                    {elem.value === 'OTHER' ? (
                      <input type="text" />
                    ) : elem.value}
                </label>
              ))}
          </div>
        );
      }

      return (
        <input
          type={getInputType(type)}
          id={id}
          name={name}
          title={title}
          className={style}
          placeholder={placeholder}
          required={required ? 'true' : 'false'}
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          minLength={minLength}
          maxLength={maxLength}
          ref={this.ref} />
      );
    };

    return prepareComponent();
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

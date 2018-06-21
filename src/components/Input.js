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
  style: 'form__input',
  minLength: 3,
  maxLength: 255,
};

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.initialValue ? this.props.initialValue : '',
    };

    this.ref = createRef();
    this.onChange = this.onChange.bind(this);
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
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

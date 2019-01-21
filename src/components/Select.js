import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFieldBlur: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  selected: PropTypes.any,
  initialValue: PropTypes.any,
  values: PropTypes.array,
  placeholder: PropTypes.string,
  style: PropTypes.string,
};

const defaultProps = {
  id: '',
  name: '',
  title: '',
  required: false,
  initialValue: '',
  values: [],
  placeholder: '',
  style: 'form__input',
};

export default class Select extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(evt) {
    this.props.onFieldChange({
      value: evt.target.value,
      id: this.props.id,
    });
  }

  onBlur(evt) {
    this.props.onFieldBlur({
      value: evt.target.value,
      id: this.props.id,
      required: this.props.required,
    });
  }

  render() {
    const { id, name, required, style } = this.props;

    return (
      <select
        id={id}
        name={name}
        value={this.props.initialValue || ''}
        className={style}
        onChange={this.onChange}
        onBlur={this.onBlur}
        required={required}>
        {
          this.props.values.map((item, index) =>
            (
              <option key={`option-${index}`} value={item.databaseId}>
                {item.value}
              </option>
            ),
          )
        }
      </select>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

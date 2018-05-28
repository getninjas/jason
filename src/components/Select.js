import React, { Component } from 'react';
import PropTypes from 'prop-types';
import addPlaceholder from '../helpers/select';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  selected: PropTypes.any,
  initialValue: PropTypes.any,
  values: PropTypes.array,
  type: PropTypes.string,
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

    this.state = {
      values: [],
      value: this.props.initialValue ? this.props.initialValue : '',
    };

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    const values = addPlaceholder(this.props);

    this.setState({ values });
  }

  onChange(evt) {
    this.setState({ value: evt.target.value });
  }

  onBlur() {
    this.props.onFieldChange({
      value: this.state.value,
      id: this.props.id,
      required: this.props.required,
      type: this.props.type,
    });
  }

  render() {
    const { id, name, required, style } = this.props;

    return (
      <select
        id={id}
        name={name}
        value={this.state.value}
        className={style}
        onChange={this.onChange}
        onBlur={this.onBlur}
        required={required ? 'true' : 'false'}>
        {
          this.state.values.map((item, index) =>
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

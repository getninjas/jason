import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  selected: PropTypes.any,
  value: PropTypes.string,
  values: PropTypes.array,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

const defaultProps = {
  id: '',
  selected: '',
  name: '',
  title: '',
  required: false,
  values: [],
  placeholder: '',
};
export default class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      selected: '',
    }

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const values = this.addPlaceholder(this.props);

    this.setState({values});
  }

  onChange(evt) {
    this.props.onFieldChange({
      value: evt.target.value,
      id: this.props.id,
      required: this.props.required,
      type: this.props.type,
    });

    this.setState({ value: evt.target.value });
  }

  addPlaceholder({ values, placeholder }) {
    const localValues = [...values];

    placeholder.length ? localValues.unshift({ databaseId: '', value: placeholder }) : '';

    return localValues;
  }

  render() {
    const { id, name, selected, required } = this.props;

    return (
      <select
        id={id}
        name={name}
        defaultValue={selected}
        className="form__input"
        onChange={this.onChange}
        required={required ? 'true' : 'false'}>
        {
          this.state.values.map((item, index) => {
            return (
              <option key={`option-${index}`} value={item.databaseId}>
                {item.value}
              </option>
            );
          })
        }
      </select>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

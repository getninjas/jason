import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    }
  }

  componentDidMount() {
    const values = this.addPlaceholder(this.props);

    this.setState({values});
  }

  addPlaceholder({ values, placeholder }) {
    const localValues = [...values];

    placeholder.length? localValues.unshift({databaseId: '', value: placeholder}) : '';

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

Select.defaultProps = {
  id: '',
  selected: '',
  name: '',
  title: '',
  required: false,
  values: [],
  placeholder: '',
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  selected: PropTypes.any,
  values: PropTypes.array,
  placeholder: PropTypes.string,
}

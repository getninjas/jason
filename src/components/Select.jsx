import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    }
  }

  componentDidMount() {
    const values = [...this.props.values];

    this.props.placeholder.length? values.unshift({databaseId: '', value: this.props.placeholder}) : '';

    this.setState({values: values})
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

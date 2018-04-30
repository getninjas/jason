import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component {
  static defaultProps = {
    id: '',
    selected: '',
    name: '',
    title: '',
    values: [],
  }

  render() {
    const { id, name, selected, values } = this.props;

    return (
      <select id={id} name={name} defaultValue={selected} className="form__input">
        {
         values.map((item, index) => {
            return (
              <option key={index} value={item.databaseId}>
                {item.value}
              </option>
            );
          })
        }
      </select>
    );
  }
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  selected: PropTypes.any,
  values: PropTypes.array,
}

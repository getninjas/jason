import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component {
  render() {
    const { id, selected, values } = this.props;

    return (
      <select id={id} name={id} selected={selected} className="form__input">
        {
         values.map((item, index) => {
            return (
              <option key={index} value={item.databaseId} selected={item.databaseId === selected ? true : false}>
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
  selected: PropTypes.any,
  values: PropTypes.array,
}

import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component {
  render() {
    const { id, value, values } = this.props;

    return (
      <select id={id} name={id} value={value} className="form__input">
        {
         values.map((item, index) => {
            return (
              <option key={index} value={item.databaseId} selected={item.databaseId === value ? true : false}>
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
  value: PropTypes.any,
  values: PropTypes.array,
}

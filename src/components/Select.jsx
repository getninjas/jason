import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component {
  render() {
    const { id, selected, values } = this.props;

    return (
      <select id={id} name={id} defaultValue={selected} className="form__input">
        {
         values.map((item, index) => {
            return (
              <option key={index} defaultValue={item.databaseId}>
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

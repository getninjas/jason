import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component {
  render() {
    return (
      <select id={this.props.databaseId} name={this.props.name} className="form__input">
        {
         this.props.values.map((item, index)=> {
            return <option key={index} value={item.databaseId}>{item.value}</option>
          })
        }
      </select>
    );
  }
}

Select.propTypes = {
  databaseId: PropTypes.number.isRequired,
  values: PropTypes.array,
  name: PropTypes.string.isRequired
}

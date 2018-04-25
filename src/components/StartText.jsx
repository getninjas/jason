import React from 'react';
import PropTypes from 'prop-types';

export default class StartText extends React.Component {
  render() {
    return (
      <p className="App-intro">
        Hello, {this.props.name}!
      </p>
    );
  }
}

StartText.propTypes = {
  name: PropTypes.string.isRequired
}

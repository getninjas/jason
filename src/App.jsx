import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from './components/Form';

export default class App extends Component {
  render() {
    return <Form name={'title'} data={this.props.data} />;
  }
}

App.propTypes = {
  data: PropTypes.object.isRequired
}

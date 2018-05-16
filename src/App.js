import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from './components/Form';

export default class App extends Component {
  render() {
    return <Form {...this.props} data={this.props.data} />;
  }
}

App.propTypes = {
  data: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
};

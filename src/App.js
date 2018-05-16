import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Form from './components/Form';

export default class App extends Component {
  constructor() {
    super();

    this.ref = createRef();
  }

  post() {
    this.ref.current.formSubmit();
  }

  render() {
    return <Form {...this.props} ref={this.ref} data={this.props.data} />;
  }
}

App.propTypes = {
  data: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
  onStepChange: PropTypes.func,
};

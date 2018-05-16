import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Form from './components/Form';

const propTypes = {
  data: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  onZipcodeFetchSuccess: PropTypes.func,
  onZipcodeFetchError: PropTypes.func,
  onSubmit: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
  onStepChange: PropTypes.func,
};

const defaultProps = {
  onZipcodeFetchSuccess: () => {},
  onZipcodeFetchError: () => {},
  onSubmit: () => {},
  onSubmitSuccess: () => {},
  onSubmitError: () => {},
  onStepChange: () => {},
};

export default class App extends Component {
  constructor() {
    super();

    this.ref = createRef();
  }

  post() {
    this.ref.current.formSubmit();
  }

  render() {
    console.log('Jason App Render', this);

    return <Form {...this.props} ref={this.ref} data={this.props.data} />;
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;


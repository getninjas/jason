import React from 'react';
import PropTypes from 'prop-types';
import Form from './components/Form';

export default class App extends React.Component {
  render() {
    console.log('app>>>>', this.props.form)
    return <Form form={this.props.form} />;
  }
}

App.propTypes = {
  form: PropTypes.object.isRequired
}

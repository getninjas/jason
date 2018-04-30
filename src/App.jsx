import React from 'react';
import PropTypes from 'prop-types';
import Form from './components/Form';

export default class App extends React.Component {
  render() {
    return <Form  name={'title'} form={this.props.form} />;
  }
}

App.propTypes = {
  form: PropTypes.object.isRequired
}

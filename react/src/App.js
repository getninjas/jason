import React, { Component } from 'react';
import Form from './Form'
import request from './services/request'

class App extends Component {
  state = {
    data: '',
    type: ''
  }

  componentDidMount() {
    request().then(data => this.setState({ data: data._embedded, type: data.type }));
  }

  render() {
    return (!!this.state.data ? <Form data={this.state.data} type={this.state.type} />  : '' );
  }
}

export default App;

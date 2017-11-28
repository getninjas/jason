import React, { Component } from 'react';
import Form from './Form'
// import request from './services/request'

class App extends Component {
  state = {
    data: ''
  };

  componentWillMount() {
    fetch('https://raw.githubusercontent.com/nathpaiva/form-rendering/master/fields.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ data: data._embedded });
      })
      .catch(error => {
        console.log('fetch fails', error);
      });
  };

  render() {
    return (!!this.state.data ? <Form data={this.state.data} />  : '' );
  };
}

export default App;

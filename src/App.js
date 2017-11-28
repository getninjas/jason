import React, { Component } from 'react';
import MyForm from './Form'
// import request from './services/request'

class App extends Component {
  state = {
    data: {}
  };

  componentWillMount() {
    fetch('https://raw.githubusercontent.com/nathpaiva/form-rendering/master/fields.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ data: data });
      })
      .catch(error => {
        console.log('fetch fails', error);
      });
  };

  render() {
    return <MyForm data={this.state.data} />;
  };
}

export default App;

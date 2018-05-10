import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

export class AppProvider extends Component {
  state = {
    greeting : 'hello',
    sayHi: (greeting) => {
      this.setState({greeting: greeting})
    }
  }
  render() {
    return <AppContext.Provider value={this.state}>
    { this.props.children }
    </AppContext.Provider>
  }
}

AppProvider.propTypes = {
  children: PropTypes.any,
}

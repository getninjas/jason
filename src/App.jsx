import React from 'react';
import StartText from './components/StartText';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Jason!</h1>
        </header>

        <StartText name="Ion" />
      </div>
    );
  }
}

export default App;

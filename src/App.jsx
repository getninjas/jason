import React from 'react';
import PropTypes from 'prop-types';
import StartText from './components/StartText';
import ParserFields from './lib/ParserFields';

export default class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    new ParserFields(this.props.jsonFields).init();
  }

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

App.propTypes = {
  jsonFields: PropTypes.object.isRequired
}

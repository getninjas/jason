import React from 'react';
import PropTypes from 'prop-types';
import Select from './components/Select';
import ParserFields from './lib/ParserFields';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [{
        values: []
      }]
    }
  }

  componentDidMount() {
    const data = new ParserFields(this.props.jsonFields).init();

    this.setState({ data });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Jason!</h1>
        </header>

        <Select id={'teste-select'} values={this.state.data[0].values} name={'my-custom-select'}/>
      </div>
    );
  }
}

App.propTypes = {
  jsonFields: PropTypes.object.isRequired
}

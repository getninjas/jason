import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ParserFields from './lib/ParserFields';
import Select from './components/Select';
import Input from './components/Input';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const data = new ParserFields(this.props.jsonFields).init();

    this.setState({ data });
  }

  render() {
    if (this.state.data.length) {
      const selectField = this.state.data[0];
      const inputField = this.state.data[1];

      return (
        <Fragment>
          <h1>Welcome to Jason!</h1>

          <Select id={selectField.title} selected={selectField.value} values={selectField.values} />

          <Input id={inputField.title} placeholder={inputField.placeholder} />
        </Fragment>
      );
    }

    return <h1>Loading...</h1>;
  }
}

App.propTypes = {
  jsonFields: PropTypes.object.isRequired
}

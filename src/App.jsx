import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ParserFields from './lib/ParserFields';
import Select from './components/Select';
import Input from './components/Input';
import TextArea from './components/TextArea';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [{},{},{}]
    }
  }

  componentDidMount() {
    const data = new ParserFields(this.props.jsonFields).init();

    this.setState({ data });
  }

  render() {
    const selectField = this.state.data[0];
    const inputField = this.state.data[1];
    const textArea = this.state.data[2];

    return (
      <Fragment>
        <h1>Welcome to Jason!</h1>

        <Select id={selectField.title} selected={selectField.value} values={selectField.values} />

        <Input id={inputField.title} placeholder={inputField.placeholder} />

        <TextArea id={textArea.title} placeholder={textArea.placeholder} />
      </Fragment>
    );
  }
}

App.propTypes = {
  jsonFields: PropTypes.object.isRequired
}

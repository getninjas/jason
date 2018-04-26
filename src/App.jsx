import React from 'react';
import PropTypes from 'prop-types';
import ParserFields from './lib/ParserFields';
import Form from './components/Form';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [{}, {}, {}]
    }
  }

  componentDidMount() {
    const data = new ParserFields(this.props.jsonFields).init();

    this.setState({ data });
  }

  render() {
    return <Form name={'form'} formatedJSON={this.state.data} />;
  }
}

App.propTypes = {
  jsonFields: PropTypes.object.isRequired
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import Input from './Input';
import TextArea from './TextArea';

export default class Form extends Component {
  static defaultProps = {
    action: '',
    method: 'POST',
    name: '',
    formatedJSON: '',
  }

  render() {
    const { action, method, name} = this.props;

    const selectField = this.props.formatedJSON[0];
    const inputField = this.props.formatedJSON[1];
    const textArea = this.props.formatedJSON[2];

    return (
      <form action={action} method={method} name={name}>
        <Select id={selectField.title} selected={selectField.value} values={selectField.values} />

        <Input id={inputField.title} placeholder={inputField.placeholder} />

        <TextArea id={textArea.title} placeholder={textArea.placeholder} />
      </form>
    );
  }
}

Form.propTypes = {
  action: PropTypes.string,
  method: PropTypes.string,
  name: PropTypes.string.isRequired,
  formatedJSON: PropTypes.array.isRequired,
}

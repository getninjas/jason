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

  getField(field) {
    if (field.type === 'enumerable') {
      return <Select id={field.title} selected={field.value} values={field.values} />;
    }

    if (field.type === 'big_text') {
      return <TextArea id={field.title} placeholder={field.placeholder} />;
    }

    return <Input id={field.title} placeholder={field.placeholder} />
  }

  render() {
    const { action, method, name, formatedJSON } = this.props;

    return (
      <form action={action} method={method} name={name}>
        { formatedJSON.map((item) => this.getField(item)) }
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

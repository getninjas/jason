import React from 'react';
import Select from './Select';
import Input from './Input';
import TextArea from './TextArea';

export default class Factory {
  static getComponent({ item, index, onFieldChange }) {
    const { type, placeholder, id, name, value, values } = item;

    if (type === 'select') {
      return (
        <Select
          placeholder={placeholder}
          key={`select-${index}`}
          id={id}
          name={name}
          selected={value}
          values={values} />
      )
    }

    if (type === 'textarea') {
      return (
        <TextArea
          key={`textarea-${index}`}
          id={id}
          name={name}
          placeholder={placeholder}
          onFieldChange={onFieldChange} />
      );
    }

    if (type === 'phone' || type === 'email' || type === 'text') {
      return (
        <Input
          type={type}
          key={`input-${index}`}
          id={id}
          name={name}
          placeholder={placeholder}
          onFieldChange={onFieldChange} />
      );
    }

    throw new Error('Invalid argument type');
  }
}

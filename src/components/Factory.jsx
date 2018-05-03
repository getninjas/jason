import React from 'react';
import Select from './Select';
import Input from './Input';
import TextArea from './TextArea';

export default class Factory {
  static getComponent({ item, index, onFieldChange, formName }) {
    const { type, placeholder, id, name, value, values, required } = item;

    if (type === 'select') {
      return (
        <Select
          placeholder={placeholder}
          key={`${formName}-${index}`}
          id={`${formName}-${id}`}
          name={name}
          selected={value}
          values={values}
          onFieldChange={onFieldChange}
          required={required} />
      )
    }

    if (type === 'textarea') {
      return (
        <TextArea
          key={`${formName}-${index}`}
          id={`${formName}-${id}`}
          name={name}
          placeholder={placeholder}
          onFieldChange={onFieldChange}
          required={required} />
      );
    }

    if (type === 'phone' || type === 'email' || type === 'text') {
      return (
        <Input
          type={type}
          key={`${formName}-${index}`}
          id={`${formName}-${id}`}
          name={name}
          placeholder={placeholder}
          onFieldChange={onFieldChange}
          required={required} />
      );
    }

    throw new Error('Invalid argument type');
  }
}

import React from 'react';
import Select from './Select';
import Input from './Input';
import TextArea from './TextArea';
import Zipcode from './Zipcode';

export default class Factory {
  static getComponent({ item, index, onFieldChange, formName, zipcodeUrlService }) {
    const { type, placeholder, id, name, value, values, required } = item;

    const inputTypeAccepted = ['text', 'phone', 'email'];

    const commonProps = {
      id: `${formName}-${id}`,
      key: `${formName}-${index}`,
      name,
      onFieldChange,
      placeholder,
      initialValue: value,
      required,
    };

    if (type === 'select') {
      return (
        <Select
          {...commonProps}
          selected={value}
          values={values} />
      );
    }

    if (type === 'textarea') {
      return (
        <TextArea {...commonProps} />
      );
    }

    if (type === 'zipcode') {
      return (
        <Zipcode
          {...commonProps}
          type={type}
          zipcodeUrlService={zipcodeUrlService}
        />
      );
    }

    if (inputTypeAccepted.includes(type)) {
      return (
        <Input
          {...commonProps}
          type={type}
        />
      );
    }

    throw new Error('Invalid argument type');
  }
}

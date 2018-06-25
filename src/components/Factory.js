import React from 'react';
import Select from './Select';
import Input from './Input';
import TextArea from './TextArea';
import Zipcode from './Zipcode';
import Checkbox from './Checkbox';

export default class Factory {
  static getComponent({ item, index, onFieldChange, onFieldBlur, formName, zipcodeUrlService }) {
    const { type, placeholder, id, name, value, values, required } = item;

    const inputTypeAccepted = ['text', 'phone', 'email'];

    const commonProps = {
      id,
      key: `${formName}-${index}`,
      name,
      onFieldChange,
      onFieldBlur,
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

    if (type === 'checkbox') {
      return (
        <Checkbox
          {...commonProps}
          values={values}
        />
      );
    }

    if (inputTypeAccepted.toString().indexOf(type) > -1) {
      return (
        <Input
          {...commonProps}
          values={values}
          type={type}
        />
      );
    }

    throw new Error(`JasonForm: Invalid component type: ${type}`);
  }
}

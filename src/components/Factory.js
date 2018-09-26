import React from 'react';
import Checkbox from './Checkbox';
import Input from './Input';
import Select from './Select';
import TextArea from './TextArea';
import Zipcode from './Zipcode';

export default class Factory {
  static getComponent({ item, index, onFieldChange, onFieldBlur, formName, zipcodeUrlService }) {
    const {
      id,
      mask,
      maxlength,
      minlength,
      name,
      placeholder,
      required,
      regexPattern,
      type,
      value,
      values,
    } = item;

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
          values={values}
        />
      );
    }

    if (type === 'textarea') {
      return (
        <TextArea
          {...commonProps}
          maxLength={maxlength}
          minlength={minlength}
        />
      );
    }

    if (type === 'zipcode') {
      return (
        <Zipcode
          {...commonProps}
          key={commonProps.initialValue}
          mask={mask}
          maxLength={maxlength}
          minlength={minlength}
          regexPattern={regexPattern}
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
          mask={mask || ''}
          maxLength={maxlength}
          minlength={minlength}
          regexPattern={regexPattern}
          type={type}
        />
      );
    }

    throw new Error(`JasonForm: Invalid component type: ${type}`);
  }
}

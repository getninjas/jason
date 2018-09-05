import React from 'react';
import Checkbox from './Checkbox';
import Input from './Input';
import Select from './Select';
import SelectCategory from './SelectCategory';
import TextArea from './TextArea';
import Zipcode from './Zipcode';

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

    if (type === 'select_category') {
      return (
        <SelectCategory
          {...commonProps}
          selected={value}
          values={values}
          nested={item.nested_values} />
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
          key={commonProps.initialValue}
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
          type={type}
        />
      );
    }

    throw new Error(`JasonForm: Invalid component type: ${type}`);
  }
}

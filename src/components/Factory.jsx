import React from 'react';
import Select from './Select';
import Input from './Input';
import TextArea from './TextArea';

export default class Factory {
  static getComponent(field, key) {
    if (field.type === 'select') {
      return <Select placeholder={field.placeholder} key={`select-${key}`} id={field.name} name={field.name} selected={field.value} values={field.values} />;
    }

    if (field.type === 'textarea') {
      return <TextArea key={`textarea-${key}`} id={field.name} name={field.name} placeholder={field.placeholder} />;
    }

    if (field.type === 'phone' || field.type === 'email' || field.type === 'text') {
      return <Input type={field.type} key={`input-${key}`} id={field.name} name={field.name} placeholder={field.placeholder} />;
    }
  }
}

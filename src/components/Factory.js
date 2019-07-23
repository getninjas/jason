import React from 'react';
import Checkbox from './Checkbox';
import Input from './Input';
import Radio from './Radio';
import Select from './Select';
import TextArea from './TextArea';
import Zipcode from './Zipcode';

export default class Factory {
  static _components(props) {
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
    } = props.item;

    const { formName, index, onFieldBlur, onFieldChange, zipcodeUrlService } = props;
    const commonProps = {
      id,
      key: `${formName}-${index}`,
      name,
      onFieldChange,
      onFieldBlur,
      placeholder,
      initialValue: value ? value.toString() : '',
      required,
    };

    return {
      textarea: <TextArea {...commonProps} maxLength={maxlength} minLength={minlength} />,
      select: <Select {...commonProps} selected={value} values={values} />,
      checkbox: <Checkbox {...commonProps} values={values} />,
      radio: <Radio {...commonProps} values={values} />,
      phone: <Input {...commonProps}
              mask={mask || ''}
              maxLength={maxlength}
              minLength={minlength}
              regexPattern={regexPattern}
              type={type}
            />,
      text: <Input {...commonProps}
              mask={mask || ''}
              maxLength={maxlength}
              minLength={minlength}
              regexPattern={regexPattern}
              type={type}
            />,
      email: <Input {...commonProps}
              mask={mask || ''}
              maxLength={maxlength}
              minLength={minlength}
              regexPattern={regexPattern}
              type={type}
            />,
      zipcode: <Zipcode
          {...commonProps}
          key={commonProps.initialValue}
          mask={mask}
          maxLength={maxlength}
          minLength={minlength}
          regexPattern={regexPattern}
          type={type}
          zipcodeUrlService={zipcodeUrlService}
        />,
    };
  }

  // TODO: fix
  static getComponent(props) {
    const component = Factory._components(props);

    if (component[props.item.type]) {
      return component[props.item.type];
    }

    throw new Error(`JasonForm: Invalid component type: ${props.item.type}`);
  }
}

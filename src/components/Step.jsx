import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import Input from './Input';
import TextArea from './TextArea';
import Field from './Field';

export default class Step extends React.Component {
  static defaultProps = {
    fields: [],
  }

  getField(field, key) {
    if (field.type === 'select') {
      return <Select key={`select-${key}`} id={field.name} name={field.name} selected={field.value} values={field.values} />;
    }

    if (field.type === 'textarea') {
      return <TextArea key={`textarea-${key}`} id={field.name} name={field.name} placeholder={field.placeholder} />;
    }

    return <Input key={`input-${key}`} id={field.name} name={field.name} placeholder={field.placeholder} />
  }

  render() {
    return (
      <div style={ {border: '1px solid red'} }>
        {
          this.props.fields.map((item, index) => {
            return (
              <Field
                key={`field-${index}`}
                label={item.label}
                id={item.id}
                errorMessage='dsds'>
                { this.getField(item, index) }
              </Field>
            )
          })
        }
      </div>
    );
  }
}

Step.propTypes = {
  fields: PropTypes.array.isRequired,
}

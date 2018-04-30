import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import Input from './Input';
import TextArea from './TextArea';
import Field from './Field';

export default class Step extends React.Component {
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
    const { fields, button } = this.props.step;

    return (
      <fieldset className="form__container inputs" style={ {display: this.props.visible ? 'block' : 'none' } }>
        {
          fields.map((item, index) => {
            return (
              <Field
                key={`field-${index}`}
                label={item.title}
                id={item.id}
                errorMessage='dsds'>
                { this.getField(item, index) }
              </Field>
            )
          })
        }

        <button type="button" className="btn btn--regular btn--high-contrast btn--fluid space-box-medium">
          { button }
        </button>
      </fieldset>
    );
  }
}

Step.defaultProps = {
  step: [],
  visible: false
}

Step.propTypes = {
  step: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
}

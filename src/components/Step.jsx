import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import Input from './Input';
import TextArea from './TextArea';
import Field from './Field';
import Button from './Button';

export default class Step extends React.Component {
  getField(field, key) {
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

  _createMarkup(html) {
    return { __html: html };
  }

  render() {
    const { fields, button, headerMarkup } = this.props.step;

    return (
      <fieldset className="form__container inputs" style={ {display: this.props.visible ? 'block' : 'none' } }>
        { headerMarkup ? <div dangerouslySetInnerHTML={this._createMarkup(headerMarkup)} /> : '' }

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

        <Button isSubmit={this.props.isLast} handleButtonClick={this.props.handleButtonClick}>{ button }</Button>
      </fieldset>
    );
  }
}

Step.defaultProps = {
  step: [],
  visible: false,
  isLast: false,
}

Step.propTypes = {
  step: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
}

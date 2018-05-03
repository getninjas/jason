import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import Button from './Button';
import Factory from './Factory';

const propTypes = {
  step: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
};

const defaultProps = {
  step: [],
  visible: false,
  isLast: false,
};

export default class Step extends Component {
  constructor() {
    super();

    this.state = {
      step: {},
      valid: true,
    };

    this.handleStepButtonClick = this.handleStepButtonClick.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange({ value, id }) {
    console.log('>>> value: ', value);
    console.log('>>> id: ', id);

  }

  validate() {
    let isValid = true;

    const fields = this.state.step.fields.map((field) => {
      const modifiedField = Object.assign({}, field);

      modifiedField.errorMessage = null;

      if (modifiedField.required && !modifiedField.value) {
        modifiedField.errorMessage = 'This field is required';
      }

      if (modifiedField.type === 'phone') {
        modifiedField.errorMessage = 'Invalid phone';
      }

      if (modifiedField.type === 'email') {
        modifiedField.errorMessage = 'Invalid email';
      }

      if (modifiedField.errorMessage) {
        isValid = false;
      }

      return modifiedField;
    });

    this.setState({
      step: Object.assign({}, this.state.step, { fields }),
    });

    return isValid;
  }

  handleStepButtonClick() {
    this.validate();

    if (this.isValid) {
      this.props.handleButtonClick();
    }
  }

  componentWillMount() {
    this.setState({
      step: this.props.step,
    });
  }

  render() {
    const { fields, button, headerMarkup } = this.state.step;

    return (
      <fieldset className="form__container inputs" style={{ display: this.props.visible ? 'block' : 'none' }}>
        { headerMarkup ? <div dangerouslySetInnerHTML={this._createMarkup(headerMarkup)} /> : '' }

        {
          fields.map((item, index) => {
            return (
              <Field
                key={`field-${index}`}
                label={item.title}
                id={item.id}
                errorMessage={item.errorMessage} >

                {
                  Factory.getComponent({
                    item,
                    index,
                    onFieldChange: this.onFieldChange,
                    formName: this.props.formName,
                  })
                }
              </Field>
            )
          })
        }

        <Button isSubmit={this.props.isLast} handleButtonClick={this.handleStepButtonClick}>{ button }</Button>
      </fieldset>
    );
  }

  _createMarkup(html) {
    return { __html: html };
  }
}

Step.propTypes = propTypes;
Step.defaultProps = defaultProps;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import Field from './Field';
import Button from './Button';
import Factory from './Factory';

const propTypes = {
  step: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  isValidStep: PropTypes.func,
  formName: PropTypes.string.isRequired,
};

const defaultProps = {
  step: {},
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

  onFieldChange({ value, id, required, type }) {
    const fields = this.state.step.fields.map((item) => {
      const itemID = `${this.props.formName}-${item.id}`;

      if (itemID === id) {
        const errorMessage = this.validateValue({ required, type, value });

        return Object.assign({}, item, { value, errorMessage });
      }

      return item;
    });

    this.updateStep(fields);
  }

  updateStep(fields) {
    this.setState({
      step: Object.assign({}, this.state.step, { fields }),
    });
  }

  validateValue({ required, type, value }) {
    if (required && value === null) {
      return 'This field is required';
    }

    if (type === 'phone' && validator.isEmpty(value)) {
      return 'Invalid phone';
    }

    if (type === 'email' && !validator.isEmail(value)) {
      return 'Invalid email';
    }

    if (required && validator.isEmpty(value)) {
      return 'This field is required';
    }

    return '';
  }

  get validate() {
    let isValid = true;

    const fields = this.state.step.fields.map((field) => {
      const modifiedField = Object.assign({}, field);

      const errorMessage = this.validateValue(modifiedField);

      if (errorMessage) {
        modifiedField.errorMessage = errorMessage;
        isValid = false;
      }

      return modifiedField;
    });

    this.updateStep(fields);

    this.props.isValidStep(isValid);

    return isValid;
  }

  handleStepButtonClick(evt) {
    if (this.validate) {
      this.props.handleButtonClick(evt);
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

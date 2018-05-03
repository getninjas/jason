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

  onFieldChange({ value, id, required, type }) {
    const fields = this.state.step.fields.map((item) => {
      const itemID = `${this.props.formName}-${item.id}`;

      if (itemID === id) {
        const errorMessage = this.validateValue({ required, type, value });

        // console.log('>> errorMessage: ', errorMessage);
        // console.log('>> value: ', value);

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
    console.log(required);
    if (required && !value.length) {
      return 'This field is required';
    }

    if (type === 'phone') {
      return 'Invalid phone';
    }

    if (type === 'email') {
      return 'Invalid email';
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

    return isValid;
  }

  handleStepButtonClick() {
    if (this.validate) {
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import Step from './Step';
import Breadcrumb from './Breadcrumb';

const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  method: PropTypes.string,
};

const defaultProps = {
  method: 'POST',
};

export default class Form extends Component {
  constructor() {
    super();

    this.state =  {
      activeStep: 0,
      stepsCount: 0,
      steps: [],
    };

    this.sectionStyle = "wall--inverted col-normal-8 col-small-12";
    this.formStyle = "form container sh-form-content space-box-small";

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    // this.isValidStep = this.isValidStep.bind(this);
  }

  componentDidMount() {
    this.setState({
      activeStep: 0,
      stepsCount: this.props.data.steps.length - 1,
      steps: this.props.data.steps,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.isLastStep(this.state.activeStep) && !evt.target.checkValidity()) {
      //this.setState({ activeStep: this.state.activeStep + 1 });
    }
  }

  handleButtonClick(evt) {
    evt.preventDefault();

    if (this.validateStep()) {
      const { activeStep, stepsCount } = this.state;

      if (activeStep < stepsCount) {
        this.setState({ activeStep: activeStep + 1 });
      }
    }
  }

  onFieldChange({ value, id, required, type }) {
    const { steps, activeStep } = this.state;

    const fields = steps[activeStep].fields.map((item) => {
      const itemID = `${this.props.name}-${item.id}`;

      if (itemID === id) {
        const errorMessage = this.validateValue({ required, type, value });

        return Object.assign({}, item, { value, errorMessage });
      }

      return item;
    });

    this.updateStep(fields);
  }

  validateStep() {
    let isValid = true;

    const { steps, activeStep } = this.state;

    const fields = steps[activeStep].fields.map((field) => {
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

  updateStep(fields) {
    const { steps, activeStep } = this.state;

    let modifiedSteps = [...steps];
    let modifiedStep = Object.assign({}, modifiedSteps[activeStep], { fields });

    modifiedSteps[activeStep] = modifiedStep;

    this.setState({
      steps: modifiedSteps,
    });
  }

  isValidStep(valid) {
    // console.log('currentStep', valid);
  }

  isStepVisible(index) {
    return this.state.activeStep === index;
  }

  isLastStep(index) {
    return index === this.state.stepsCount;
  }

  render() {
    const { action, method, name } = this.props;

    return (
      <section className={this.sectionStyle}>
        <form noValidate onSubmit={this.handleSubmit} action={action} method={method} name={name} className={this.formStyle}>
          {
            this.state.steps.map((step, index) => {
              const { button, headerMarkup, fields } = step;

              return (
                <Step
                  visible={this.isStepVisible(index)}
                  key={`${name}-step-${index}`}
                  step={step}
                  isValidStep={this.isValidStep}
                  isLast={this.isLastStep(index)}
                  handleButtonClick={this.handleButtonClick}
                  onFieldChange={this.onFieldChange}
                  formName={name}
                  button={button}
                  headerMarkup={headerMarkup}
                  fields={fields} />
              )
            })
          }
        </form>

        <Breadcrumb active={this.state.activeStep} steps={this.state.steps}  />
      </section>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '../Step';
import Breadcrumb from '../Breadcrumb';
import { validateField, validateStep } from './validation';

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

    this.state = {
      activeStep: 0,
      stepsCount: 0,
      steps: [],
    };

    this.sectionStyle = "wall--inverted col-normal-8 col-small-12";
    this.formStyle = "form container sh-form-content space-box-small";

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  get actualStep() {
    const { steps, activeStep } = this.state;

    return steps[activeStep];
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

    this.validateChangeStep();
  }

  handleButtonClick(evt) {
    evt.preventDefault();

    this.validateChangeStep();
  }

  validateChangeStep() {
    const { updatedFields, isValid } = validateStep(this.actualStep.fields);

    this.updateStep(updatedFields);

    if (isValid) {
      this.nextStep(this.state);
    }
  }

  nextStep({ activeStep, stepsCount }) {
    if (activeStep < stepsCount) {
      this.setState({ activeStep: activeStep + 1 });
    }
  }

  onFieldChange({ value, id, required, type }) {
    const fields = this.actualStep.fields.map((item) => {
      const itemID = `${this.props.name}-${item.id}`;

      if (itemID === id) {
        const errorMessage = validateField({ required, type, value });

        return Object.assign({}, item, { value, errorMessage });
      }

      return item;
    });

    this.updateStep(fields);
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
              const { buttonText, headerMarkup, fields } = step;

              return (
                <Step
                  visible={this.isStepVisible(index)}
                  key={`${name}-step-${index}`}
                  isLast={this.isLastStep(index)}
                  handleButtonClick={this.handleButtonClick}
                  onFieldChange={this.onFieldChange}
                  formName={name}
                  buttonText={buttonText}
                  headerMarkup={headerMarkup}
                  fields={fields} />
              )
            })
          }
        </form>

        <Breadcrumb active={this.state.activeStep} steps={this.state.steps} />
      </section>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

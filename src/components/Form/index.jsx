import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../AppContext';
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
      activeStepIndex: 0,
      onZipcodeFetchSuccess: zipcode => window.alert(`zipcode fectch success hook ${zipcode}`),
      onZipcodeFetchError: zipcode => window.alert(`zipcode fectch error hook ${zipcode}`),
      stepsCount: 0,
      steps: [],
    };

    this.sectionStyle = "wall--inverted col-normal-8 col-small-12";
    this.formStyle = "form container sh-form-content space-box-small";

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  get currentStep() {
    const { steps, activeStepIndex } = this.state;

    return steps[activeStepIndex];
  }

  componentDidMount() {
    this.setState({
      activeStepIndex: 0,
      stepsCount: this.props.data.steps.length - 1,
      steps: this.props.data.steps,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.handleStepChange();
  }

  handleButtonClick(evt) {
    evt.preventDefault();

    this.handleStepChange();
  }

  handleStepChange() {
    const { updatedFields, isValid } = validateStep(this.currentStep.fields);

    this.updateStep(updatedFields);

    if (isValid) {
      this.nextStep(this.state);
    }
  }

  nextStep({ activeStepIndex, stepsCount }) {
    if (activeStepIndex < stepsCount) {
      this.setState({ activeStepIndex: activeStepIndex + 1 });
    }
  }

  onFieldChange({ value, id, required, type, minLength }) {
    const fields = this.currentStep.fields.map((item) => {
      const itemID = `${this.props.name}-${item.id}`;

      if (itemID === id) {
        const errorMessage = validateField({ required, type, value, minLength });

        return Object.assign({}, item, { value, errorMessage });
      }

      return item;
    });

    this.updateStep(fields);
  }

  updateStep(fields) {
    const { steps, activeStepIndex } = this.state;

    let modifiedSteps = [...steps];
    let modifiedStep = Object.assign({}, modifiedSteps[activeStepIndex], { fields });

    modifiedSteps[activeStepIndex] = modifiedStep;

    this.setState({
      steps: modifiedSteps,
    });
  }

  isStepVisible(index) {
    return this.state.activeStepIndex === index;
  }

  isLastStep(index) {
    return index === this.state.stepsCount;
  }

  render() {
    const { action, method, name } = this.props;

    return (
      <AppContext.Provider value={this.state}>
        <section className={this.sectionStyle}>
          <form noValidate onSubmit={this.handleSubmit} action={action} method={method} name={name} className={this.formStyle}>
            {
              this.state.steps.map((step, index) => {
                const { buttonText, headerMarkup, fields } = step;

                return (
                  <Step
                    buttonText={buttonText}
                    fields={fields}
                    formName={name}
                    handleButtonClick={this.handleButtonClick}
                    headerMarkup={headerMarkup}
                    isLast={this.isLastStep(index)}
                    key={`${name}-step-${index}`}
                    onFieldChange={this.onFieldChange}
                    visible={this.isStepVisible(index)}
                    zipcodeUrlService={this.props.data.zipcodeUrlService}
                  />
                )
              })
            }
          </form>

          <Breadcrumb active={this.state.activeStepIndex} steps={this.state.steps} />
        </section>
      </AppContext.Provider>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

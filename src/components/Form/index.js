import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AppContext } from '../../AppContext';
import Breadcrumb from '../Breadcrumb';
import Step from '../Step';
import { validateField, validateStep } from './validation';

const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  method: PropTypes.string,
  onReady: PropTypes.func,
  onZipcodeFetchSuccess: PropTypes.func,
  onZipcodeFetchError: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
  onSubmitFieldError: PropTypes.func,
  onSubmitError: PropTypes.func,
  onSubmit: PropTypes.func,
  onStepChange: PropTypes.func,
};

const defaultProps = {
  method: 'POST',
  onReady() {},
  onZipcodeFetchSuccess() {},
  onZipcodeFetchError() {},
  onSubmit() {},
  onSubmitSuccess() {},
  onSubmitFieldError() {},
  onSubmitError() {},
  onStepChange() {},
};

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStepIndex: 0,
      onZipcodeFetchSuccess: data => this.onZipcodeFetchSuccess(data),
      onZipcodeFetchError: data => this.props.onZipcodeFetchError(data),
      stepsCount: 0,
      address: {
        type_street: '',
        street: '',
        neighborhood: '',
        city: '',
        uf: '',
      },
      steps: [],
    };

    this.formStyle = 'form container sh-form-content space-box-small';
    this.onSubmit = this.onSubmit.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onFieldBlur = this.onFieldBlur.bind(this);
    this.errorMessages = this.props.data.errorMessages;
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
    }, this.props.onReady);
  }

  updateState(state) {
    Object.assign(state, { ...this.state });

    this.setState({ ...state });
  }

  onZipcodeFetchSuccess(data) {
    this.props.onZipcodeFetchSuccess(data);

    const { type_street, street, neighborhood, city, uf } = data;

    this.setState({
      address: {
        type_street,
        street,
        neighborhood,
        city,
        uf,
      },
    });
  }

  formSubmit() {
    this.handleStepChange();

    if (this.isLastStep(this.state.activeStepIndex)) {
      this.handleSubmit();
    }
  }

  onSubmit(evt) {
    evt.preventDefault();

    this.formSubmit();
  }

  handleSubmit() {
    if (this.isStepsValid()) {
      this.submitRequest();
    }
  }

  isStepsValid() {
    const errorMessages = this.errorMessages;
    const validSteps = this.state.steps.filter((step) => {
      const { isValid } = validateStep(step.fields, errorMessages);

      return isValid;
    });

    return validSteps.length === this.props.data.steps.length;
  }

  async submitRequest() {
    try {
      this.props.onSubmit();

      const body = this.getFields();
      const response = await axios.post(this.props.action, body);

      this.props.onSubmitSuccess(response);
    } catch (error) {
      this.props.onSubmitError(error.response);
    }
  }

  getFields() {
    const fields = this.state.steps.map(step => step.fields);

    return { data: { ...fields, address: { ...this.state.address } } };
  }

  beforeStepChange() {
    return this.state.steps[this.state.activeStepIndex].beforeChange();
  }

  async handleStepChange() {
    const { updatedFields, isValid } = validateStep(this.currentStep.fields, this.errorMessages);

    this.updateStep(updatedFields);

    if (isValid) {
      await this.beforeStepChange();

      this.nextStep(this.state);
      return;
    }

    const step = this.state.activeStepIndex < this.state.stepsCount ? 'current' : 'last';
    this.props.onSubmitFieldError(step);
  }

  async nextStep({ activeStepIndex, stepsCount }) {
    if (activeStepIndex < stepsCount) {
      this.setState({ activeStepIndex: activeStepIndex + 1 });
    }
  }

  onFieldBlur({ value, id, required, type, minLength, regexPattern }) {
    const errorMessages = this.errorMessages;
    const fields = this.currentStep.fields.map((item) => {
      if (item.id === id) {
        const errorMessage = validateField({
          minLength,
          regexPattern,
          required,
          type,
          value,
        }, errorMessages);

        return { ...item, value, errorMessage };
      }

      return item;
    });

    this.updateStep(fields);
  }

  onFieldChange({ value, id }) {
    const fields = this.currentStep.fields.map((item) => {
      if (item.reference === id) {
        const defaultValue = { values: [{ databaseId: '', value: item.mask }] };

        return { ...item, values: (item.nested_values[value] || defaultValue).values };
      }

      if (item.id === id) {
        return { ...item, value };
      }

      return item;
    });

    this.updateStep(fields);
  }

  updateStep(fields) {
    const { steps, activeStepIndex } = this.state;

    const modifiedSteps = [...steps];
    const modifiedStep = { ...modifiedSteps[activeStepIndex], fields };

    modifiedSteps[activeStepIndex] = modifiedStep;

    this.setState({ steps: modifiedSteps });
  }

  isStepVisible(index) {
    return this.state.activeStepIndex === index;
  }

  isLastStep(index) {
    return index === this.state.stepsCount;
  }

  render() {
    const { name, action } = this.props;

    return (
      <AppContext.Provider value={this.state}>
        <form noValidate onSubmit={this.onSubmit} name={name} action={action}
          className={this.formStyle}>
          {
            this.state.steps.map((step, index) => {
              const { buttonText, headerMarkup, fields } = step;

              return (
                <Step
                  buttonText={buttonText}
                  fields={fields}
                  formName={this.props.name}
                  onSubmit={this.onSubmit}
                  headerMarkup={headerMarkup}
                  isLast={this.isLastStep(index)}
                  key={`${this.props.name}-step-${index}`}
                  onFieldBlur={this.onFieldBlur}
                  onFieldChange={this.onFieldChange}
                  visible={this.isStepVisible(index)}
                  zipcodeUrlService={this.props.data.zipcodeUrlService}
                />
              );
            })
          }
        </form>

        <Breadcrumb active={this.state.activeStepIndex} steps={this.state.steps} />
      </AppContext.Provider>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

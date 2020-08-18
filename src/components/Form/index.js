import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AppContext } from '../../AppContext';
import Breadcrumb from '../Breadcrumb';
import Step from '../Step';
import { validateField, validateStep } from './validation';
import { addHeaderMarkup } from '../../helpers/step';

const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  method: PropTypes.string,
  onReady: PropTypes.func,
  handleZipcodeExternalLinkClick: PropTypes.func,
  onZipcodeFetchSuccess: PropTypes.func,
  onZipcodeFetchError: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
  onSubmitFieldError: PropTypes.func,
  onSubmitError: PropTypes.func,
  onSubmit: PropTypes.func,
  onStepChange: PropTypes.func,
  mustShowBreadcrumb: PropTypes.bool,
  buttonCustomClasses: PropTypes.string,
};

const defaultProps = {
  method: 'POST',
  onReady() {},
  handleZipcodeExternalLinkClick(event) { return false; },
  onZipcodeFetchSuccess() {},
  onZipcodeFetchError() {},
  onSubmit() {},
  onSubmitSuccess() {},
  onSubmitFieldError() {},
  onSubmitError() {},
  onStepChange() {},
  buttonCustomClasses: '',
};

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStepIndex: 0,
      handleZipcodeExternalLinkClick: event => this.handleZipcodeExternalLinkClick(event),
      onZipcodeFetchSuccess: data => this.onZipcodeFetchSuccess(data),
      onZipcodeFetchError: data => this.props.onZipcodeFetchError(data),
      stepsCount: 0,
      address: {
        typeStreet: '',
        street: '',
        neighborhood: '',
        city: '',
        uf: '',
      },
      action: this.props.action,
      steps: [],
      mustShowBreadcrumb: this.props.mustShowBreadcrumb,
      buttonCustomClasses: this.props.buttonCustomClasses,
    };

    this.formStyle = 'form container sh-form-content space-box-small';
    this.onSubmit = this.onSubmit.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onFieldBlur = this.onFieldBlur.bind(this);
    this.errorMessages = this.props.data.errorMessages;
    this.handleZipcodeExternalLinkClick = this.handleZipcodeExternalLinkClick.bind(this);
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
    Object.assign(state, { ...this.state, action: state.action || this.props.action });

    this.setState({ ...state });
  }

  handleZipcodeExternalLinkClick(event) {
    const handleZipcodeExists = this.props && this.props.handleZipcodeExternalLinkClick;
    if (!handleZipcodeExists) { return false; }
    const { handleZipcodeExternalLinkClick } = this.props;
    return handleZipcodeExternalLinkClick(event);
  }

  onZipcodeFetchSuccess(data) {
    this.props.onZipcodeFetchSuccess(data);
    const { typeStreet, street, neighborhood, city, uf } = data;

    this.setState({
      address: {
        typeStreet,
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
      const response = await axios.post(this.state.action, body);

      this.props.onSubmitSuccess(response);
    } catch (error) {
      this.props.onSubmitError(error);
    }
  }

  getFields() {
    const fields = this.state.steps.map(step => step.fields);

    return { data: { ...fields, address: { ...this.state.address } } };
  }

  beforeStepChange() {
    const currentStep = this.state.steps[this.state.activeStepIndex];

    return currentStep.beforeChange ? currentStep.beforeChange(currentStep) : this.props.onStepChange();
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

  nextStep({ activeStepIndex, stepsCount }) {
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

        return { ...item, values: (item.nested_values[value] || defaultValue).values, value: null };
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
    const { steps, activeStepIndex, action, mustShowBreadcrumb } = this.state;
    const { name, data } = this.props;
    const headerMarkup = (steps.length
      && steps[activeStepIndex]
      && steps[activeStepIndex].headerMarkup);
    return (
      <AppContext.Provider value={this.state}>
        { addHeaderMarkup(headerMarkup) }
        <form noValidate onSubmit={this.onSubmit} name={name} action={action}
          className={this.formStyle}>
          {
            steps.map((step, index) => {
              const { buttonText, fields } = step;

              return (
                <Step
                  buttonText={buttonText}
                  fields={fields}
                  formName={name}
                  onSubmit={this.onSubmit}
                  isLast={this.isLastStep(index)}
                  key={`${name}-step-${index}`}
                  onFieldBlur={this.onFieldBlur}
                  onFieldChange={this.onFieldChange}
                  visible={this.isStepVisible(index)}
                  zipcodeUrlService={data.zipcodeUrlService}
                />
              );
            })
          }
        </form>

        { mustShowBreadcrumb
          && <Breadcrumb active={activeStepIndex} steps={steps} />
        }
      </AppContext.Provider>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

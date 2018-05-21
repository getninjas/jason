import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AppContext } from '../../AppContext';
import Step from '../Step';
import Breadcrumb from '../Breadcrumb';
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
      steps: [],
    };

    this.requestAddress = {};
    this.sectionStyle = 'wall--inverted col-normal-8 col-small-12';
    this.formStyle = 'form container sh-form-content space-box-small';

    this.onSubmit = this.onSubmit.bind(this);
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

    this.props.onReady();
  }

  onZipcodeFetchSuccess(data) {
    this.props.onZipcodeFetchSuccess(data);

    const { type_street, street, neighborhood, city, uf } = data;

    this.requestAddress = {
      type_street,
      street,
      neighborhood,
      city,
      uf,
    };
  }

  formSubmit() {
    this.handleStepChange();

    this.handleSubmit();
  }

  onSubmit(evt) {
    evt.preventDefault();

    this.formSubmit();
  }

  handleButtonClick(evt) {
    evt.preventDefault();

    this.formSubmit();
  }

  handleSubmit() {
    if (this.isStepsValid()) {
      this.submitRequest();
    }
  }

  isStepsValid() {
    const validSteps = this.state.steps.filter((step) => {
      const { isValid } = validateStep(step.fields);

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
      this.props.onSubmitError(error);
    }
  }

  getFields() {
    const fields = this.state.steps.map(step => step.fields);

    return { data: { ...fields, address: { ...this.requestAddress } } };
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
      this.props.onStepChange();
      this.setState({ activeStepIndex: activeStepIndex + 1 });
    }
  }

  onFieldChange({ value, id, required, type, minLength }) {
    const fields = this.currentStep.fields.map((item) => {
      const itemID = `${this.props.name}-${item.id}`;

      if (itemID === id) {
        const errorMessage = validateField({ required, type, value, minLength });

        return { ...item, value, errorMessage };
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
        <section className={this.sectionStyle}>
          <form noValidate onSubmit={this.onSubmit} name={name} action={action} className={this.formStyle}>
            {
              this.state.steps.map((step, index) => {
                const { buttonText, headerMarkup, fields } = step;

                return (
                  <Step
                    buttonText={buttonText}
                    fields={fields}
                    formName={this.props.name}
                    handleButtonClick={this.handleButtonClick}
                    headerMarkup={headerMarkup}
                    isLast={this.isLastStep(index)}
                    key={`${this.props.name}-step-${index}`}
                    onFieldChange={this.onFieldChange}
                    visible={this.isStepVisible(index)}
                    zipcodeUrlService={this.props.data.zipcodeUrlService}
                  />
                );
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

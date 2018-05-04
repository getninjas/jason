import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.isValidStep = this.isValidStep.bind(this);
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

  isValidStep(valid) {
    console.log('currentStep', valid);
  }

  handleButtonClick(evt) {
    evt.preventDefault();

    const { activeStep, stepsCount } = this.state;

    if (activeStep < stepsCount) {
      this.setState({ activeStep: activeStep + 1 });
    }
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
              return (
                <Step
                  visible={this.isStepVisible(index)}
                  key={`${name}-step-${index}`}
                  step={step}
                  isValidStep={this.isValidStep}
                  isLast={this.isLastStep(index)}
                  handleButtonClick={this.handleButtonClick}
                  formName={name} />
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

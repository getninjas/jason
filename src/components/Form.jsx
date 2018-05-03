import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from './Step';
import Breadcrumb from './Breadcrumb';

const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  action: PropTypes.string,
  method: PropTypes.string,
};

const defaultProps = {
  method: 'POST',
  action: 'http://yourendpoint',
};

export default class Form extends Component {
  constructor() {
    super();

    this.state =  {
      activeStep: 0,
      stepsCount: 0,
    };

    this.sectionStyle = "wall--inverted col-normal-8 col-small-12";
    this.formStyle = "form container sh-form-content space-box-small";

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      activeStep: 0,
      stepsCount: this.props.data.steps.length - 1,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }

  handleButtonClick() {
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
    const { action, method, name, data } = this.props;

    return (
      <section className={this.sectionStyle}>
        <form onSubmit={this.handleSubmit} action={action} method={method} name={name} className={this.formStyle}>
          {
            data.steps.map((step, index) => {
              return (
                <Step
                  visible={this.isStepVisible(index)}
                  key={`step-${index}`}
                  step={step}
                  isLast={this.isLastStep(index)}
                  handleButtonClick={this.handleButtonClick}
                  formName={name} />
              )
            })
          }
        </form>

        <Breadcrumb active={this.state.activeStep} steps={data.steps}  />
      </section>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from './Step';
import Breadcrumb from './Breadcrumb';

export default class Form extends Component {
  constructor() {
    super();

    this.state =  {
      activeStep: 0,
      stepsCount: 0,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      activeStep: 0,
      stepsCount: this.props.form.steps.length - 1,
    });
  }

  handleButtonClick(evt) {
    evt.preventDefault();

    console.log(this.form);

    // this.form.submit();

    const { activeStep, stepsCount } = this.state;

    if (activeStep < stepsCount) {
      // this.setState({ activeStep: activeStep + 1 });
      return;
    }


    window.alert('finish');
  }

  render() {
    const { action, method, name, form } = this.props;

    return (
      <section className="wall--inverted col-normal-8 col-small-12">
        <form ref={(form=> this.form = form)} action={action} method={method} name={name} className="form container">
          {
            form.steps.map((step, index) => {
              return (
                <Step
                  visible={this.state.activeStep === index}
                  key={`step-${index}`}
                  step={step}
                  isLast={index === this.state.stepsCount}
                  handleButtonClick={this.handleButtonClick} />
              )
            })
          }
        </form>

        <Breadcrumb active={this.state.activeStep} steps={form.steps}  />
      </section>
    );
  }
}

Form.defaultProps = {
  form: {
    steps: [],
  }
}

Form.propTypes = {
  action: PropTypes.string,
  method: PropTypes.string,
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
}

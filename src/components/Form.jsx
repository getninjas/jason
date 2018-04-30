import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from './Step';
import Breadcrumb from './Breadcrumb';

export default class Form extends Component {
  constructor() {
    super();

    this.state =  {
      activeStep: 0,
    };
  }

  componentDidMount() {
    this.setState({ activeStep: 0 });
  }

  render() {
    const { action, method, name, form } = this.props;

    return (
      <section className="wall--inverted col-normal-8 col-small-12">
        <form action={action} method={method} name={name} className="form container">
          {
            form.steps.map((step, index) => {
              return <Step visible={this.state.activeStep === index} key={`step-${index}`} step={step} />
            })
          }
        </form>

        <Breadcrumb active={this.state.activeStep} steps={form.steps} />
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

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Step from './Step';
import Breadcrumb from './Breadcrumb';

export default class Form extends Component {

  static defaultProps = {
    form: {
      steps: []
    }
  }

  render() {
    const { action, method, name, form } = this.props;

    return (
      <section className="wall--inverted col-normal-8 col-small-12">
        <form action={action} method={method} name={name} className="form container">
          {
            form.steps.map((step, index) => {
              return <Step key={`step-${index}`} fields={step.fields} />
            })
          }
        </form>

        <Breadcrumb steps={form.steps} />
      </section>
    );
  }
}

Form.propTypes = {
  action: PropTypes.string,
  method: PropTypes.string,
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
}

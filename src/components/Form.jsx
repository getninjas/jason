import React, { Component } from 'react';
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
      <form action={action} method={method} name={name}>
        {
          form.steps.map((step, index) => {
            return <Step key={`step-${index}`} fields={step.fields} />
          })
        }

        <Breadcrumb steps={form.steps} />
      </form>
    );
  }
}

Form.propTypes = {
  action: PropTypes.string,
  method: PropTypes.string,
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
}

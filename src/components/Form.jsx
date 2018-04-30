import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from './Step';

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
            return <Step key={index} fields={step.fields} />
          })
        }
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

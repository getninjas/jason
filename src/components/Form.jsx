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
      <Fragment>
        <form action={action} method={method} name={name} className="form widget col-small-12 col-medium-8 col-normal-6 col-centered">
          {
            form.steps.map((step, index) => {
              return <Step key={`step-${index}`} fields={step.fields} />
            })
          }
        </form>

        <Breadcrumb steps={form.steps} />
      </Fragment>
    );
  }
}

Form.propTypes = {
  action: PropTypes.string,
  method: PropTypes.string,
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
}

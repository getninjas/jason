import React, { Component } from 'react';
import FormStep from './FormStep';

class Form extends Component {

  state = {
    step: 0
  }

  render() {
    return (
      <form>
        {Object.keys(this.props.data).map((stepKey, index) => {
          return <FormStep step={this.props.data[stepKey]} index={stepKey + index} key={stepKey} />;
        })}
      </form>
    );
  }
}

export default Form;

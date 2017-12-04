import React, { Component } from 'react';
import FormStep from './FormStep';

class Form extends Component {

  state = {
    step: 0
  }

  render() {
    const steps = Object.keys(this.props.data);

    return (
      <form>
        {steps.map((stepKey, index) => {
          if (index === this.state.step){
            return (
              <div key={stepKey}>
                <FormStep step={this.props.data[stepKey]} index={stepKey + index} last={steps.length} />
              </div>
            )
          }
        })}
      </form>
    );
  }
}

export default Form;

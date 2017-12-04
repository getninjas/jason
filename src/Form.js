import React, { Component } from 'react';
import FormStep from './FormStep';

class Form extends Component {

  state = {
    step: 0,
    totalSteps: Object.keys(this.props.data).length
  }

  render() {
    const steps = Object.keys(this.props.data);

    return (
      <form onSubmit={(e) =>{
        e.preventDefault();
        this.onButtonClick();
      }}>
        {steps.map((stepKey, index) => {
          if (index === this.state.step){
            return (
              <div key={stepKey}>
                <FormStep 
                  step={this.props.data[stepKey]} 
                  index={stepKey + index} 
                  last={this.state.totalSteps}
                />
              </div>
            )
          }
        })}
      </form>
    );
  }

  onButtonClick() {
    if (this.state.step + 1 !== this.state.totalSteps) {
      this.setState({ step: ++this.state.step });
      return;
    }

    alert('submit');
  }
}

export default Form;

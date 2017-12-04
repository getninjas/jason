import React, { Component } from 'react';
import FormStep from './FormStep';

class Form extends Component {

  state = {
    step: 0,
    totalSteps: Object.keys(this.props.data).length,
    formData: {}
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
                  index={index}
                  valueInput={this.state.formData}
                  onBackClick={this.onBackClick.bind(this)}
                  dataHandler={this.dataHandler.bind(this)}
                  stepBy={this.props.type === 'stepby' ? true : false}
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

  onBackClick() {
    if (!this.state.step) return;
    this.setState({ step: --this.state.step });
    return;
  }

  dataHandler(e) {
    const datas = Object.assign({}, this.state.formData, {[e.target.name]: e.target.value});
    this.setState({ formData: datas });
  }
}

export default Form;

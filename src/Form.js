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
          if(index === this.state.step){
            return (
              <div key={stepKey}>
                <FormStep step={this.props.data[stepKey]} index={stepKey + index} />
                <button>
                  Click
                </button>
              </div>
            )
          }
        })}
      </form>
    );
  }
}

export default Form;

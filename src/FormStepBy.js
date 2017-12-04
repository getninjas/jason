import React, { Component } from 'react';

class FormStep extends Component {

  state = {
    formData: this.props.valueInput
  }

  render() {
    return (
      <div id={this.props.index}>
        <h2>Step {this.props.index}</h2>

        {this.props.step.map((field, i) => {
          return (
            <div key={i}>
              <label htmlFor={field.name}>{field.label}</label><br />
              <input
                type="text"
                placeholder={field.mask}
                required={field.required}
                value={this.state.formData[field.name]}
                name={field.name}
                onChange={this.props.dataHandler} />
            </div>
          )
        })}

        {this.props.index !== 0 && (
          <button type="button" onClick={this.props.onBackClick}>Back</button>
        )}

        <button>Next</button>
      </div>
    );
  }
}

// const FormStep = ({ step, index, last, valueInput, onBackClick, dataHandler}) => {
//   return (
//     <div id={index}>
//       <h2>Step {index}</h2>

//       {step.map((field, i) => {
//         return (
//           <div key={i}>
//             <label htmlFor={field.name}>{field.label}</label><br />
//             <input
//               type="text"
//               placeholder={field.mask}
//               required={field.required}
//               value={valueInput[field.name]}
//               name={field.name}
//               onChange={dataHandler} />
//           </div>
//         )
//       })}

//       {index !== 0 && (
//         <button type="button" onClick={onBackClick}>
//           Back
//         </button>
//       )}
//       <button>
//         Next
//       </button>


//     </div>
//   );
// }

export default FormStep;

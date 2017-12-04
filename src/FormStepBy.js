import React from 'react';

const FormStep = ({ step, index, last, valueInput, onBackClick, dataHandler}) => {
  return (
    <div id={index}>
      <h2>Tab {index}</h2>

      {step.map((field, i) => {
        return (
          <div key={i}>
            <label htmlFor={field.name}>{field.label}</label><br />
            <input
              type="text"
              placeholder={field.mask}
              required={field.required}
              value={valueInput[field.name]}
              name={field.name}
              onChange={dataHandler} />
          </div>
        )
      })}

      <button type="button" onClick={onBackClick}>
        Back
      </button>

      <button>
        Next
      </button>
    </div>
  );
}

export default FormStep;

import React from 'react';

const FormStep = ({step, index}) => {
  {console.log(step)}
  return (
    <div id={index}>
      <h2>
        Tab {index}
      </h2>
      {step.map((field, i) => {
        return (
          <div key={i}>
            <label htmlFor={field.name}>{field.label}</label><br />
            <input type="text" placeholder={field.mask} required={field.required} />
          </div>
        )
      })}
    </div>
  );
}

export default FormStep;

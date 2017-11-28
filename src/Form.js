import React from 'react';
import FormStep from './FormStep';

const Form = ({data}) => {
  return (
    <form>
      {Object.keys(data).map((stepKey, index) => {
        return <FormStep step={data[stepKey]} index={stepKey + index} key={stepKey} />;
      })}
    </form>
  );

};

export default Form;

import React from 'react';
import { Form, Field } from 'react-final-form';


const onSubmit = () => console.log('ok')
const validate = () => console.log('ok')
const handleSubmit = () => console.log('ok')

const MyForm = ({data}) => {
  return (
    <Form
      render={() => {
        console.log(data);
        return (
          <form onSubmit={onSubmit}>
            <h2>Simple Default Input</h2>
            <div>
              <label>First Name</label>
              <Field name="firstName" component="input" placeholder="First Name" />
            </div>
          </form>
        );
      }}
    />
  );
};

export default MyForm;

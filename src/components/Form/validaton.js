import validator from 'validator';

export const validateValue = ({ required, type, value }) => {
  if (required && value === null) {
    return 'This field is required';
  }

  if (type === 'phone' && validator.isEmpty(value)) {
    return 'Invalid phone';
  }

  if (type === 'email' && !validator.isEmail(value)) {
    return 'Invalid email';
  }

  if (required && validator.isEmpty(value)) {
    return 'This field is required';
  }

  return '';
}

export const validateStep = (fields)=> {
  let isValid = true;

  const updatedFields = fields.map((field) => {
    const modifiedField = Object.assign({}, field);
    const errorMessage = validateValue(modifiedField);

    if (errorMessage) {
      modifiedField.errorMessage = errorMessage;
      isValid = false;
    }

    return modifiedField;
  });

  return { updatedFields, isValid };
}

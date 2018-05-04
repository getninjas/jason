export const isEmpty = (value) => {
  const regex = /^\s*$/;
  return regex.test(value.trim());
};

export const isValidEmail = (value) => {
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return regex.test(value.trim());
};

export const isValidPhone = (value) => {
  const regex = /^\d{2}[6-9]{1}[0-9]{8}$/g;
  return regex.test(value.replace(/\D+/g, '').trim());
};

export const validateValue = ({ required, type, value }) => {
  if (required && value === null) {
    return 'This field is required';
  }

  if (type === 'phone' && (isEmpty(value) || !isValidPhone(value))) {
    return 'Invalid phone';
  }

  if (type === 'email' && !isValidEmail(value)) {
    return 'Invalid email';
  }

  if (required && isEmpty(value)) {
    return 'This field is required';
  }

  return '';
};

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
};

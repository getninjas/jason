export const isEmpty = (value) => {
  const regex = /^\s*$/;
  return regex.test(value.trim());
};

export const isValidEmail = (value) => {
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return regex.test(value.trim());
};

export const isValidZipcode = (value) => {
  const regex = /^[0-9]{5}-[0-9]{3}$/;
  return regex.test(value.trim());
};

export const isValidPhone = (value) => {
  const regex = /^\d{2}[6-9]{1}[0-9]{8}$/g;
  return regex.test(value.replace(/\D+/g, '').trim());
};

export const validateField = ({ required, type, value }) => {
  if (required && value === null) {
    return 'Este campo é requerido';
  }

  if (type === 'phone' && (isEmpty(value) || !isValidPhone(value))) {
    return 'Celular válido requerido';
  }

  if (type === 'email' && !isValidEmail(value)) {
    return 'E-mail válido requerido';
  }

  if (type === 'zipcode' && !isValidZipcode(value)) {
    return 'CEP válido requerido';
  }

  if (required && isEmpty(value)) {
    return 'Este campo é requerido';
  }

  return '';
};

export const validateStep = (fields)=> {
  let isValid = true;

  const updatedFields = fields.map((field) => {
    const modifiedField = Object.assign({}, field);
    const errorMessage = validateField(modifiedField);

    if (errorMessage) {
      modifiedField.errorMessage = errorMessage;
      isValid = false;
    }

    return modifiedField;
  });

  return { updatedFields, isValid };
};
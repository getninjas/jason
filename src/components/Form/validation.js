export const isEmpty = (value) => {
  const regex = /^\s*$/;
  return regex.test(value.trim());
};

export const isMinLength = (text, length) => {
  return text.length < length;
}

export const isValidEmail = (value) => {
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return regex.test(value.trim());
};

export const isValidZipcode = (value) => {
  const regex = /^[0-9]{5}-[0-9]{3}$/;
  return regex.test(value.trim());
};

export const isValidCellPhone = (value) => {
  const regex = /^\d{2}[6-9]{1}[0-9]{8}$/g;
  return regex.test(value.replace(/\D+/g, '').trim());
};

export const validateField = ({ required, type, value, minLength }) => {
  if (required && value === null) {
    return 'Este campo é requerido';
  }

  if (type === 'phone' && (isEmpty(value) || !isValidCellPhone(value))) {
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

  if (required && isMinLength(value, minLength)) {
    return `Este campo requer ao menos ${minLength} caracteres.`;
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

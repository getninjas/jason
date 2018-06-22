import errorMessages from '../../../src/helpers/errorMessages';

export const isEmpty = (value) => {
  const regex = /^\s*$/;

  return regex.test(value.toString().trim());
};

export const isMinLength = (text, length) => {
  let result = true;

  if (length) {
    result = text.replace(/\s/gm, '').length >= length;
  }

  return result;
};

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
    return errorMessages.REQUIRED_FIELD;
  }

  if (type === 'phone' && (isEmpty(value) || !isValidCellPhone(value))) {
    return errorMessages.REQUIRED_VALID_CELLPHONE;
  }

  if (type === 'email' && !isValidEmail(value)) {
    return errorMessages.REQUIRED_VALID_EMAIL;
  }

  if (type === 'zipcode' && (isEmpty(value) || !isValidZipcode(value))) {
    return errorMessages.REQUIRED_VALID_ZIPCODE;
  }

  if (required && isEmpty(value)) {
    return errorMessages.REQUIRED_FIELD;
  }

  if (required && !isMinLength(value, minLength)) {
    return errorMessages.REQUIRED_MINLENGHT(minLength);
  }

  return '';
};

export const validateStep = (fields) => {
  let isValid = true;

  const updatedFields = fields.map((field) => {
    const modifiedField = Object.assign({}, field);

    modifiedField.errorMessage = validateField(modifiedField);

    if (modifiedField.errorMessage.length) {
      isValid = false;
    }

    return modifiedField;
  });

  return { updatedFields, isValid };
};

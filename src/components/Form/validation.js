export const isEmpty = (value) => {
  const regex = /^\s*$/;

  return regex.test(value.toString().trim());
};

export const arrayIsInvalid = (value) => {
  let arrayUndefined = false;

  if (value && value.length) {
    for (let i = 0; i < value.length; i += 1) {
      if ((value[i] === undefined) || (value[i].length !== undefined && !value[i].length)) {
        arrayUndefined = true;
      }
    }
  }

  return arrayUndefined;
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

export const isValidZipcode = (value, regexPattern) => {
  const regex = new RegExp(regexPattern);

  return regex.test(value.trim());
};

export const isValidCellPhone = (value, regexPattern) => {
  const regex = new RegExp(regexPattern);

  return regex.test(value.replace(/\D+/g, '').trim());
};

export const validateField = (optionsValidation, errorMessages) => {
  const { required, type, value, minLength, regexPattern } = optionsValidation;

  if (required && value === null) {
    return (type === 'checkbox') ? errorMessages.REQUIRED_CHECKBOX_FIELD : errorMessages.REQUIRED_FIELD;
  }

  if (type === 'phone' && (isEmpty(value) || !isValidCellPhone(value, regexPattern))) {
    return errorMessages.REQUIRED_VALID_CELLPHONE;
  }

  if (type === 'email' && !isValidEmail(value)) {
    return errorMessages.REQUIRED_VALID_EMAIL;
  }

  if (type === 'zipcode' && (isEmpty(value) || !isValidZipcode(value, regexPattern))) {
    return errorMessages.REQUIRED_VALID_ZIPCODE;
  }

  if (type === 'checkbox' && arrayIsInvalid(value)) {
    return errorMessages.REQUIRED_CHECKBOX_FIELD;
  }

  if (required && isEmpty(value)) {
    return errorMessages.REQUIRED_FIELD;
  }

  if (required && !isMinLength(value, minLength)) {
    return errorMessages.REQUIRED_MINLENGHT;
  }

  return '';
};

export const validateStep = (fields, errorMessages) => {
  let isValid = true;

  const updatedFields = fields.map((field) => {
    const modifiedField = Object.assign({}, field);

    modifiedField.errorMessage = validateField(modifiedField, errorMessages);

    if (modifiedField.errorMessage.length) {
      isValid = false;
    }

    return modifiedField;
  });

  return { updatedFields, isValid };
};

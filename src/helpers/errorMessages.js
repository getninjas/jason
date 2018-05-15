const errorMessages = {
  REQUIRED_FIELD: 'Este campo é requerido',
  REQUIRED_VALID_CELLPHONE: 'Celular válido requerido',
  REQUIRED_VALID_EMAIL: 'E-mail válido requerido',
  REQUIRED_VALID_ZIPCODE: 'CEP válido requerido',
  REQUIRED_MINLENGHT: minLength => `Este campo requer ao menos ${minLength} caracteres.`,
};

export default errorMessages;

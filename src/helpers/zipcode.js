const ZIPCODE_VALID_LENGTH = 8;

export const isUserTyping = zipcodeLength => zipcodeLength < ZIPCODE_VALID_LENGTH;


export const isValidZipCodeInput = (zipcodeLength, fetchCompleted) =>
  zipcodeLength === ZIPCODE_VALID_LENGTH && !fetchCompleted;

export const getEmptyState = state =>
  Object.keys(state).reduce((output, key) => {
    let defaultValue = '';

    if (typeof state[key] === 'boolean') {
      defaultValue = false;
    }

    return { ...output, [key]: defaultValue };
  }, {});

const getFullAddress = ({ street, neighborhood, city, uf }) =>
  `${street}, ${neighborhood} \n${city} - ${uf}`;


export const fillAddressState = (responseAddress, zipcode) => {
  const result = Object.keys(responseAddress)
    .reduce((output, key) => ({ ...output, [key]: responseAddress[key] }), {});

  result.value = zipcode;
  result.fetchCompleted = true;
  result.fullAddress = getFullAddress(responseAddress);

  return result;
};

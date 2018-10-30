export const isUserTyping = (zipcodeLength, zipcodeValidLength) =>
  zipcodeLength < zipcodeValidLength;

export const isValidZipCodeInput = (zipcodeLength, zipcodeValidLength, fetchCompleted) =>
  zipcodeLength === zipcodeValidLength && !fetchCompleted;

export const getEmptyState = state =>
  Object.keys(state).reduce((output, key) => {
    let defaultValue = '';

    if (typeof state[key] === 'boolean') {
      defaultValue = false;
    }

    return { ...output, [key]: defaultValue };
  }, {});

const getFullAddress = ({ street, neighborhood, city, uf }) => {
  const displayStreet = street ? `${street},` : '';
  const displayNeighborhood = neighborhood ? `${neighborhood} \n` : '';

  return `${displayStreet}${displayNeighborhood}${city} - ${uf}`;
};

export const fillAddressState = (responseAddress, zipcode) => {
  const result = Object.keys(responseAddress)
    .reduce((output, key) => ({ ...output, [key]: responseAddress[key] }), {});

  result.value = zipcode;
  result.fetchCompleted = true;
  result.fullAddress = getFullAddress(responseAddress);

  return result;
};

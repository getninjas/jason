export const getInputType = (type) => {
  if (type === 'phone') {
    return 'tel';
  }

  return type;
};

export const maxLengthTrim = (text, length) => {
  let result = text;

  if (text.length > length) {
    result = text.substr(0, length);
  }

  return result;
};

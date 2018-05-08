const maxLength = (text, length) => {
  let result = text;

  if (text.length > length) {
    result = text.substr(0, length);
  }

  return result;
}

export default maxLength;

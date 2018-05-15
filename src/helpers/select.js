export default ({ values, placeholder }) => {
  const localValues = [...values];

  if (placeholder.length) {
    localValues.unshift({ databaseId: '', value: placeholder });
  }

  return localValues;
};

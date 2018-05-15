const fillFormFields = (steps) => {
  return [...steps].map((step) => {
    const fields = step.fields.map((field) => {
      const updatedField = Object.assign({}, field);
      updatedField.value = '1111111';

      return updatedField;
    });

    return Object.assign({}, { ...step }, { fields });
  });
};

export default fillFormFields;

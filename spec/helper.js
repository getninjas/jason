const validFields = {
  text: '111111',
  textarea: '111111',
  zipcode: '11111-222',
  email: 'jondoe@xpto.com',
  phone: '(11) 99999-8888',
  select: 7117,
  checkbox: ['6792'],
  radio: 7890,
};

const fillFormFields = (steps) => {
  return [...steps].map((step) => {
    const fields = step.fields.map((field) => {
      const updatedField = Object.assign({}, field);

      Object.entries(validFields).map((entry) => {
        const [key, value] = entry;

        if (updatedField.type === key) {
          Object.assign(updatedField, { value });
        }

        return updatedField;
      });

      return updatedField;
    });

    return Object.assign({}, { ...step }, { fields });
  });
};

const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

export { sleep };

export default fillFormFields;

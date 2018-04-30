export default class ParserFields {
  constructor(json) {
    this.json = json;
  }

  init() {
    return this._extractData();
  }

  _extractData() {
    const fields = this.json.data.category.form.fields.edges;

    const formatedFields = fields.map((field) => {
      const { title, name, value, values, placeholder, component, required } = field.node;

      const formatedValues = this._extractChildrenValues(values.edges);

      return {
        title,
        name,
        value,
        values: formatedValues,
        placeholder,
        type: component,
        required,
      };
    });

    return formatedFields;
  }

  _extractChildrenValues(values) {
    return values.map((item) => {
      const { databaseId, value } = item.node;

      return { databaseId, value };
    });
  }
}

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
      const { title, value, values, placeholder, type, required } = field.node;

      const formatedValues = this._extractChildrenValues(values.edges);

      return {
        title,
        value,
        values: formatedValues,
        placeholder,
        type,
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

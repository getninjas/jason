export default class ParserFields {
  constructor(json) {
    this.json = json;
  }

  init() {
    this._extractData();
  }

  _extractData() {
    const fields = this.json.data.category.form.fields.edges;

    const formatedFields = fields.map((field) => {
      const { title, values, placeholder, type, required } = field.node;

      const formatedValues = this._extractChildrenValues(values);

      return {
        title,
        values: formatedValues,
        placeholder,
        type,
        required,
      };
    });

    return formatedFields;
  }

  _extractChildrenValues(values) {
    return values.edges.map((item) => {
      const { databaseId, value } = item.node;

      return { databaseId, value };
    });
  }
}

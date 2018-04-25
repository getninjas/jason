export default class ParserFields {
  constructor(json) {
    this.json = JSON.parse(json);
  }

  init() {
    const fields = this.json.data.form.fields.edges;

    fields.map((field) => field.node);
  }
}

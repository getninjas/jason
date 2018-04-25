import ParserFields from '../../src/lib/ParserFields';
import fields from '../../src/fields.json';

describe('ParserFields', () => {
  describe('.constructor', () => {
    it('defines json', () => {
      const parserFields = new ParserFields(null);

      expect(parserFields.json).toBeDefined();
    });
  });

  describe('.init', () => {
    it('expect to ._extractData to be called', () => {
      const parserFields = new ParserFields(fields);
      parserFields._extractData = jest.fn();

      parserFields.init();

      expect(parserFields._extractData).toHaveBeenCalled();
    });
  });

  describe('._extractData', () => {
    it('expect to ._extractChildrenValues to be called', () => {
      const parserFields = new ParserFields(fields);
      parserFields._extractChildrenValues = jest.fn();

      parserFields.init();

      expect(parserFields._extractChildrenValues).toHaveBeenCalled();
    });
  });
});

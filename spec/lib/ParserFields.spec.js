import ParserFields from '../../src/lib/ParserFields';
import fields from '../../src/fields.json';
import expectedFields from '../fixture/expected-fields.json';

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

    it('expects result to be parsed', () => {
      const parserFields = new ParserFields(fields);

      const result = parserFields.init();

      expect(result).toEqual(expectedFields);
    });
  });

  describe('._extractChildrenValues', () => {
    it('expect to return values structured properly', () => {
      const values = [
        {
          "node": {
            "databaseId": 4885,
            "value": "O quanto antes possível"
          }
        },
        {
          "node": {
            "databaseId": 4886,
            "value": "Nos próximos 30 dias"
          }
        },
        {
          "node": {
            "databaseId": 4887,
            "value": "Nos próximos 3 meses"
          }
        },
        {
          "node": {
            "databaseId": 4888,
            "value": "Não tenho certeza"
          }
        }
      ];

      const expectedValues = [
        {
          "databaseId": 4885,
          "value": "O quanto antes possível"
        },
        {
          "databaseId": 4886,
          "value": "Nos próximos 30 dias"
        },
        {
          "databaseId": 4887,
          "value": "Nos próximos 3 meses"
        },
        {
          "databaseId": 4888,
          "value": "Não tenho certeza"
        }
      ];

      const parserFields = new ParserFields(fields);

      const result = parserFields._extractChildrenValues(values);

      expect(result).toEqual(expectedValues);
    });
  });
});

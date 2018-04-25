import ParserFields from '../../src/lib/ParserFields';

describe('ParserFields', () => {
  describe('.constructor', () => {
    it('defines json', () => {
      const parserFields = new ParserFields(null);

      expect(parserFields.json).toBeDefined();
    });
  });

  describe('.init', () => {
    it('expect to be called', () => {
      const parserFields = new ParserFields(null);
      window.alert = jest.fn();

      parserFields.init();

      expect(window.alert).toHaveBeenCalled();
    });
  });
});

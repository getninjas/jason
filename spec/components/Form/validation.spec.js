import { isEmpty } from '../../../src/components/Form/validation';

describe('.isEmpty', () => {
  it('returns true for empty string', () => {
    const result = isEmpty('');

    expect(result).toBe(true);
  });

  it('returns false for not empty string', () => {
    const result = isEmpty('xpto');

    expect(result).toBe(false);
  });
});

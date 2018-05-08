import { isEmpty, isMinLength } from '../../../src/components/Form/validation';

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

describe('.isMinLength', () => {
  it('returns false for string greather than minLength', () => {
    const minLength = 3;
    const result = isMinLength('xpto', minLength);

    expect(result).toBe(false);
  });

  it('returns true for string smaller than minLength', () => {
    const minLength = 3;
    const result = isMinLength('xp', minLength);

    expect(result).toBe(true);
  });
});

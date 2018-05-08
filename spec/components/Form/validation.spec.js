import { isEmpty, isMinLength, isValidEmail } from '../../../src/components/Form/validation';

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

describe('.isValidEmail', () => {
  it('returns true for mitch@nbc.com', () => {
    const result = isValidEmail('mitch@nbc.com');

    expect(result).toBe(true);
  });

  it('returns true for ion.drimba@getninjas.com.br', () => {
    const result = isValidEmail('ion.drimba@getninjas.com.br');

    expect(result).toBe(true);
  });

  it('returns true for mitch-able@nbc.com', () => {
    const result = isValidEmail('mitch-able@nbc.com');

    expect(result).toBe(true);
  });

  it('returns false for \\xpto@ig.com', () => {
    const result = isValidEmail('\\xpto@ig.com');

    expect(result).toBe(false);
  });

  it('returns false for a...a@ig,com', () => {
    const result = isValidEmail('a...a@ig,com');

    expect(result).toBe(false);
  });

  it('returns false for empty email', () => {
    const result = isValidEmail('');

    expect(result).toBe(false);
  });

  it('returns false for xpto@', () => {
    const result = isValidEmail('xpto@');

    expect(result).toBe(false);
  });

  it('returns false for xpto@gmail', () => {
    const result = isValidEmail('xpto@gmail');

    expect(result).toBe(false);
  });
});

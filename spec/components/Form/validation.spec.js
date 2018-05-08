import { isEmpty, isMinLength, isValidEmail, isValidZipcode, isValidCellPhone } from '../../../src/components/Form/validation';

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

describe('.isValidZipcode', () => {
  it('returns false for empty zipcode', () => {
    const result = isValidZipcode('');

    expect(result).toBe(false);
  });

  it('returns false for zipcode 1111-111', () => {
    const result = isValidZipcode('1111-111');

    expect(result).toBe(false);
  });

  it('returns true for zipcode 05402-300', () => {
    const result = isValidZipcode('05402-300');

    expect(result).toBe(true);
  });
});

describe('.isValidCellPhone', () => {
  it('returns false for empty cellphone', () => {
    const result = isValidCellPhone('');

    expect(result).toBe(false);
  });

  it('returns false for landline (11) 5181-5683', () => {
    const result = isValidCellPhone('(11) 5181-5683');

    expect(result).toBe(false);
  });

  it('returns false for cellphone (11) 9181-3567', () => {
    const result = isValidCellPhone('(11) 9181-3567');

    expect(result).toBe(false);
  });

  it('returns true for cellphone (11) 99654-1515', () => {
    const result = isValidCellPhone('(11) 99654-1515');

    expect(result).toBe(true);
  });
});

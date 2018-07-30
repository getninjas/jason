import { arrayIsInvalid, isEmpty, isMinLength, isValidCellPhone, isValidEmail, isValidZipcode, validateField, validateStep } from '../../../src/components/Form/validation';
import { form } from '../../../src/form.json';
import errorMessages from '../../../src/helpers/errorMessages';
import fillFormFields from '../../helper';

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

describe('.arrayIsInvalid', () => {
  it('returns false for empty array', () => {
    const result = arrayIsInvalid([]);

    expect(result).toBe(false);
  });

  it('returns true for array contains undefined', () => {
    const result = arrayIsInvalid([7962, undefined]);

    expect(result).toBe(true);
  });

  it('returns true for array contains empty string', () => {
    const result = arrayIsInvalid([7962, '']);

    expect(result).toBe(true);
  });

  it('returns true for array only undefined value', () => {
    const result = arrayIsInvalid([undefined]);

    expect(result).toBe(true);
  });

  it('returns false for array contains valid values', () => {
    const result = arrayIsInvalid([7962, 'Test value']);

    expect(result).toBe(false);
  });
});


describe('.isMinLength', () => {
  it('returns true for string greather than minLength', () => {
    const minLength = 3;
    const result = isMinLength('xpto', minLength);

    expect(result).toBe(true);
  });

  it('returns false for string with empty spaces smaller than minLength', () => {
    const minLength = 3;
    const result = isMinLength(' x   x', minLength);

    expect(result).toBe(false);
  });

  it('returns false for string smaller than minLength', () => {
    const minLength = 3;
    const result = isMinLength('xp', minLength);

    expect(result).toBe(false);
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

describe('.validateField', () => {
  it('returns required field error message', () => {
    const result = validateField({ required: true, value: null });

    expect(result).toBe(errorMessages.REQUIRED_FIELD);
  });

  it('returns error message for empty cellphone', () => {
    const result = validateField({ required: true, type: 'phone', value: '' });

    expect(result).toBe(errorMessages.REQUIRED_VALID_CELLPHONE);
  });

  it('returns error message for invalid cellphone', () => {
    const result = validateField({ required: true, type: 'phone', value: '(11) 5367-8741' });

    expect(result).toBe(errorMessages.REQUIRED_VALID_CELLPHONE);
  });

  it('returns error message for invalid email', () => {
    const result = validateField({ required: true, type: 'email', value: 'xpto@' });

    expect(result).toBe(errorMessages.REQUIRED_VALID_EMAIL);
  });

  it('returns error message for invalid zipcode', () => {
    const result = validateField({ required: true, type: 'zipcode', value: '1111-111' });

    expect(result).toBe(errorMessages.REQUIRED_VALID_ZIPCODE);
  });

  it('returns error message for invalid checkbox', () => {
    const result = validateField({ required: true, type: 'checkbox', value: [7692, undefined] });

    expect(result).toBe(errorMessages.REQUIRED_CHECKBOX_FIELD);
  });

  it('returns error message for empty value', () => {
    const result = validateField({ required: true, value: '' });

    expect(result).toBe(errorMessages.REQUIRED_FIELD);
  });

  it('returns error message for value smaller than minlength', () => {
    const result = validateField({ required: true, value: 'ab', minLength: 3 });

    expect(result).toBe(errorMessages.REQUIRED_MINLENGHT(3));
  });

  it('returns empty error message', () => {
    const result = validateField({ required: true, type: 'text', value: 'xpto', minLength: 3 });

    expect(result).toBe('');
  });
});

describe('.validateStep', () => {
  it('expects output to be invalid', () => {
    const steps = [...form.steps];
    const result = validateStep(steps[0].fields);

    expect(result.isValid).toBe(false);
  });

  it('expects output to be valid', () => {
    const steps = [...form.steps];
    const data = Object.assign({}, { steps });

    data.steps = fillFormFields(data.steps);

    const result = validateStep(data.steps[0].fields);

    expect(result.isValid).toBe(true);
  });
});

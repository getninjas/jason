import {
  arrayIsInvalid,
  isEmpty,
  isMinLength,
  isValidCellPhone,
  isValidEmail,
  isValidZipcode,
  validateField,
  validateStep,
  validateWhenEmailRequired,
  validateWhenEmailNonRequired } from '../../../src/components/Form/validation';
import { form } from '../../../src/form.json';
import fillFormFields from '../../helper';

const CONTACT_FIELD = 2;
const errorMessages = form.errorMessages;
const brazilianZipcodeRegexPattern = form.steps[CONTACT_FIELD].fields[0].regexPattern;
const brazilianCellphoneRegexPattern = form.steps[CONTACT_FIELD].fields[3].regexPattern;

describe('.isEmpty', () => {
  it('returns true for empty string', () => {
    const result = isEmpty('');

    expect(result).toBe(true);
  });

  it('returns true for undefined value', () => {
    const result = isEmpty(undefined);

    expect(result).toBe(true);
  });

  it('returns true for null value', () => {
    const result = isEmpty(null);

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
    const result = isValidZipcode('', brazilianZipcodeRegexPattern);

    expect(result).toBe(false);
  });

  describe('Brazilian zipcode format', () => {
    it('returns false for zipcode 1111-111', () => {
      const result = isValidZipcode('1111-111', brazilianZipcodeRegexPattern);

      expect(result).toBe(false);
    });

    it('returns true for zipcode 05402-300', () => {
      const result = isValidZipcode('05402-300', brazilianZipcodeRegexPattern);

      expect(result).toBe(true);
    });
  });

  describe('Mexican zipcode format', () => {
    it('returns true for zipcode 22891', () => {
      const mexicanZipcodeRegexPattern = '\\d{5}';
      const result = isValidZipcode('22891', mexicanZipcodeRegexPattern);

      expect(result).toBe(true);
    });
  });
});

describe('.isValidCellPhone', () => {
  it('returns false for empty cellphone', () => {
    const result = isValidCellPhone('', brazilianCellphoneRegexPattern);

    expect(result).toBe(false);
  });

  describe('PT-BR format phone', () => {
    it('returns false for landline (11) 5181-5683', () => {
      const result = isValidCellPhone('(11) 5181-5683', brazilianCellphoneRegexPattern);

      expect(result).toBe(false);
    });

    it('returns false for cellphone (11) 9181-3567', () => {
      const result = isValidCellPhone('(11) 9181-3567', brazilianCellphoneRegexPattern);

      expect(result).toBe(false);
    });

    it('returns true for cellphone (11) 99654-1515', () => {
      const result = isValidCellPhone('(11) 99654-1515', brazilianCellphoneRegexPattern);

      expect(result).toBe(true);
    });
  });

  describe('ES-MX format phone', () => {
    it('returns true for cellphone 55 1234 5678', () => {
      const mexicanCellphoneRegexPattern = '^[0-9]{2}\\s[0-9]{4}\\s[0-9]{4}$';
      const result = isValidCellPhone('55 1234 5678', mexicanCellphoneRegexPattern);

      expect(result).toBe(true);
    });
  });
});

describe('.validateField', () => {
  it('returns required field error message', () => {
    const result = validateField({ required: true, value: null }, errorMessages);

    expect(result).toBe(errorMessages.REQUIRED_FIELD);
  });

  it('returns error message for empty cellphone', () => {
    const result = validateField({ required: true, type: 'phone', value: '', regexPattern: brazilianCellphoneRegexPattern }, errorMessages);

    expect(result).toBe(errorMessages.REQUIRED_VALID_CELLPHONE);
  });

  it('returns error message for invalid cellphone', () => {
    const result = validateField({ required: true, type: 'phone', value: '(11) 5367-8741', regexPattern: brazilianCellphoneRegexPattern }, errorMessages);

    expect(result).toBe(errorMessages.REQUIRED_VALID_CELLPHONE);
  });

  it('returns error message for invalid email', () => {
    const result = validateField({ required: true, type: 'email', value: 'xpto@' }, errorMessages);

    expect(result).toBe(errorMessages.REQUIRED_VALID_EMAIL);
  });

  it('returns error message for invalid zipcode', () => {
    const result = validateField({ required: true, type: 'zipcode', value: '1111-111', regexPattern: brazilianZipcodeRegexPattern }, errorMessages);

    expect(result).toBe(errorMessages.REQUIRED_VALID_ZIPCODE);
  });

  it('returns error message for invalid checkbox', () => {
    const result = validateField({ required: true, type: 'checkbox', value: [7692, undefined] }, errorMessages);

    expect(result).toBe(errorMessages.REQUIRED_CHECKBOX_FIELD);
  });

  it('returns error message for empty value', () => {
    const result = validateField({ required: true, value: '' }, errorMessages);

    expect(result).toBe(errorMessages.REQUIRED_FIELD);
  });

  it('returns error message for value smaller than minlength', () => {
    const result = validateField({ required: true, value: 'ab', minLength: 3 }, errorMessages);

    expect(result).toBe('Este campo requer ao menos 3 caracteres.');
  });

  it('returns empty error message', () => {
    const result = validateField({ required: true, type: 'text', value: 'xpto', minLength: 3 }, errorMessages);

    expect(result).toBe('');
  });
});

describe('.validateStep', () => {
  it('expects output to be invalid', () => {
    const steps = [...form.steps];
    const result = validateStep(steps[0].fields, errorMessages);

    expect(result.isValid).toBe(false);
  });

  it('expects output to be valid', () => {
    const steps = [...form.steps];
    const data = Object.assign({}, { steps });

    data.steps = fillFormFields(data.steps);

    const result = validateStep(data.steps[0].fields, errorMessages);

    expect(result.isValid).toBe(true);
  });
});

describe('.validateWhenEmailRequired', () => {
  it('returns false when field is required and email is valid', () => {
    expect(validateWhenEmailRequired(true, 'xpto@xpto.com')).toBe(false);
  });

  it('returns true when field is required and email is invalid', () => {
    expect(validateWhenEmailRequired(true, 'xpto@xp')).toBe(true);
  });

  it('returns true when field is required and email is blank', () => {
    expect(validateWhenEmailRequired(true, '')).toBe(true);
  });
});

describe('.validateWhenEmailNonRequired', () => {
  it('returns true when field is not required and email is filled valid', () => {
    expect(validateWhenEmailNonRequired(false, 'xpto@xpto.com')).toBe(false);
  });

  it('returns true when field is not required and email is filled invalid', () => {
    expect(validateWhenEmailNonRequired(false, 'xpto@xp')).toBe(true);
  });

  it('returns false when field is not required and email is blank', () => {
    expect(validateWhenEmailNonRequired(false, '')).toBe(false);
  });
});

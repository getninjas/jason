import { getInputType, maxLengthTrim } from '../../src/helpers/input';

describe('getInputType', () => {
  it('returns type tel for input type phone', () => {
    const result = getInputType('phone');

    expect(result).toEqual('tel');
  });

  it('returns same type for input not equal phone', () => {
    const result = getInputType('text');

    expect(result).toEqual('text');
  });
});

describe('maxLengthTrim', () => {
  it('returns same string when length less or equal', () => {
    const result = maxLengthTrim('ola', 3);

    expect(result).toEqual('ola');
  });

  it('returns trimed string when length greather than length', () => {
    const result = maxLengthTrim('John Doe', 4);

    expect(result).toEqual('John');
  });
});

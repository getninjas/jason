import { display } from '../../src/helpers/step';

describe('.display', () => {
  it('returns none to receive false', () => {
    const result = display(false);

    expect(result).toEqual('none');
  });

  it('returns block to receive true', () => {
    const result = display(true);

    expect(result).toEqual('block');
  });
});

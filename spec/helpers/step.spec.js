import { display, addHeaderMarkup } from '../../src/helpers/step';

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

describe('.addHeaderMarkup', () => {
  it('returns header markup', () => {
    const headerHTML = '<h2 class="widget__title section-title--high-contrast">Lorem Ipsum is simply dummy text <small>It has survived not</small></h2>';

    const result = addHeaderMarkup(headerHTML);

    expect(result.props.className).toEqual('__headerMarkup__');
  });

  it('does not add header markup', () => {
    const headerHTML = '';

    const result = addHeaderMarkup(headerHTML);

    expect(result).toEqual('');
  });
});

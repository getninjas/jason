import triggerNativeEvent from '../../src/helpers/domEvent';

describe('.triggerNativeEvent', () => {
  it('trigger blur event', () => {
    document.body.innerHTML = '<input type="text" class="name input" name="name" value="">';

    const elmt = document.querySelector('.input');
    elmt.dispatchEvent = jest.fn();

    triggerNativeEvent('.input', 'blur');

    expect(elmt.dispatchEvent).toBeCalled();
  });
});

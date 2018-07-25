import triggerNativeEvent from '../../src/helpers/domEvent';

describe('.triggerNativeEvent', () => {
  it('trigger blur event', () => {
    document.body.innerHTML = '<input type="text" class="name input" name="name" value="">';

    const elmt = [...document.querySelectorAll('.input')];
    elmt[0].dispatchEvent = jest.fn();

    triggerNativeEvent('.input', 'blur');

    expect(elmt[0].dispatchEvent).toBeCalled();
  });
});

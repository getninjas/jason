import { JSDOM } from 'jsdom';
import Jason from '../src/index';
import { form } from '../src/form.json';
import { enzymeConfig } from './enzymeConfig';
import { sleep } from './helper';

enzymeConfig();

describe('Jason', () => {
  const documentHTML = '<!doctype html><div id="root"></div>';
  const doc = (new JSDOM(documentHTML)).window.document;

  const onReady = jest.fn();
  const formElementContainer = doc.querySelector('#root');

  const jasonForm = new Jason({
    element: formElementContainer,
    data: { form },
    name: 'form-name',
    scope: this,
    action: 'http://www.mocky.io/v2/5afb459c2f00005b00f7c7ab',
    onReady,
  });

  jasonForm.init();

  it('renders jason form to the DOM', () => {
    expect(formElementContainer.children.length).toEqual(2);
  });

  it('calls onReady callback', () => {
    expect(jasonForm.onReady).toHaveBeenCalled();
  });

  it('calls post method', () => {
    jasonForm.form.formSubmit = jest.fn();

    jasonForm.post();

    expect(jasonForm.form.formSubmit).toHaveBeenCalled();
  });

  describe('.updateState', () => {
    it('calls form.updateState', () => {
      jasonForm.form.updateState = jest.fn();
      jasonForm.updateState([]);

      expect(jasonForm.form.updateState).toHaveBeenCalled();
    });
  });
});

describe('Markup outside form', () => {
  const documentHTML = '<!doctype html><div id="root"></div>';
  const doc = (new JSDOM(documentHTML)).window.document;

  const onReady = jest.fn();
  const formElementContainer = doc.querySelector('#root');
  const newForm = new Jason({
    element: formElementContainer,
    data: { form },
    name: 'form-name',
    scope: this,
    action: 'http://www.mocky.io/v2/5afb459c2f00005b00f7c7ab',
    onReady,
  });

  it('header markup must be visible by default', async () => {
    newForm.init();
    expect(formElementContainer.innerHTML.includes('__headerMarkup__')).toBe(true);
    expect(formElementContainer.innerHTML.includes('widget__title')).toBe(true);
  });

  it('adds header markup outside steps form after category choise', async () => {
    newForm.init();
    await sleep(100);

    const checkbox = doc.querySelector('input[type="radio"]');
    const button = doc.querySelector('button');
    checkbox.click();
    button.click();

    await sleep(100);

    expect(formElementContainer.innerHTML.includes('__headerMarkup__')).toBe(true);
    expect(formElementContainer.innerHTML.includes('widget__title')).toBe(true);
  });
});

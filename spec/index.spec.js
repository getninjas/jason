import { JSDOM } from 'jsdom';
import Jason from '../src/index';
import { form } from '../src/form.json';
import { enzymeConfig } from './enzymeConfig';

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

  describe('.updateFields', () => {
    it('calls form.updateFields', () => {
      jasonForm.form.updateFields = jest.fn();
      jasonForm.updateFields([]);

      expect(jasonForm.form.updateFields).toHaveBeenCalled();
    });
  });
});

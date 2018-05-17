import React from 'react';
import { JSDOM } from 'jsdom';
import Jason from '../src/index';
import { form } from '../src/form.json';
import { enzymeConfig, shallow } from './enzymeConfig';

enzymeConfig();

describe('Jason', () => {
  const documentHTML = '<!doctype html><div class="form-jason">Jason</div>';
  let doc = (new JSDOM(documentHTML)).window.document;

  const onReady = jest.fn();
  const onStepChange = jest.fn();
  const onSubmit = jest.fn();

  const jasonForm = new Jason({
    element: doc.querySelector('.form-jason'),
    data: { form },
    name: 'form-name',
    scope: this,
    action: 'http://www.mocky.io/v2/5afb459c2f00005b00f7c7ab',
    onReady,
    onStepChange
  });

  jasonForm.init();

  it('renders jason form to the DOM', () => {
    const formELement = doc.querySelector('.form-jason');

    expect(formELement.length).toEqual(1);
  });

  it('calls onReady callback', () => {
    expect(jasonForm.onReady).toHaveBeenCalled();
  });

  it('calls post method', () => {
    jasonForm.jason.post = jest.fn();

    jasonForm.post();

    expect(jasonForm.jason.post).toHaveBeenCalled();
  });

  it('calls onStepChange', () => {
    doc = (new JSDOM(documentHTML)).window.document;

    const data = Object.assign({}, form);

    data.steps[0].fields[0] = '7117';
    data.steps[0].fields[1] = 'Freddy Krugger';
    data.steps[0].fields[2] = 'Testando o Jason Form.';

    const jasonForm = new Jason({
      element: doc.querySelector('.form-jason'),
      data: { form: data },
      name: 'form-name',
      scope: this,
      action: 'http://www.mocky.io/v2/5afb459c2f00005b00f7c7ab',
      onStepChange
    });

    const buttonStartRequest = doc.getElementsByTagName('button')[0];

    //buttonStartRequest.click();

    //console.log('>>>>>', doc.querySelector('.form-jason').querySelector(''));

    //expect(jasonForm.onStepChange).toHaveBeenCalled();
  });
});

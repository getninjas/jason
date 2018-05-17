import React from 'react';
import { JSDOM } from 'jsdom';
import Jason from '../src/index';
import App from '../src/App';
import { form } from '../src/form.json';
import { enzymeConfig, shallow, mount } from './enzymeConfig';

enzymeConfig();

const getComponentWithContext = (context = { onZipcodeFetchSuccess: zipcode => zipcode }) => {
  jest.doMock('../src/AppContext', () => {
    return {
      AppContext: {
        Consumer: props => (props.children(context)),
      },
    };
  });

  return require('../src/App').default;
};

describe('Jason init', () => {
  const documentHTML = '<!doctype html><div id="form-jason">Jason</div>';
  const doc = (new JSDOM(documentHTML)).window.document;

  const onReady = jest.fn();
  const onStepChange = jest.fn();

  const jasonForm = new Jason({
    element: doc.getElementById('form-jason'),
    data: { form },
    name: 'form-name',
    scope: this,
    action: 'http://www.mocky.io/v2/5afb459c2f00005b00f7c7ab',
    onReady,
    onStepChange,
  });

  jasonForm.init();

  it('renders jason form to the DOM', () => {
    const formELement = doc.getElementsByName('form-name');

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

  // it('calls onStepChange callback', () => {
  //   const selectElement = doc.getElementById('form-name-1_id');
  //   const inputElement = doc.getElementById('form-name-2_id');
  //   const textareaElement = doc.getElementById('form-name-3_id');
  //   const buttonStartRequest = doc.getElementsByTagName('button')[0];

  //   selectElement.value = '7117';
  //   inputElement.value = 'Freddy Krugger';
  //   textareaElement.value = 'Testando o Jason Form.';
  //   buttonStartRequest.click();

  //   expect(jasonForm.onStepChange).toHaveBeenCalled();
  // });
});

describe('Jason callbacks', () => {
  it('should behave...', () => {
    const {
      onReady,
      onZipcodeFetchSuccess,
      onZipcodeFetchError,
      onSubmit,
      onSubmitSuccess,
      onSubmitError,
      onStepChange,
    } = jest.fn();

    form.steps[0].fields[0].value = '7117';
    form.steps[0].fields[1].value = 'Freddy Krugger';
    form.steps[0].fields[2].value = 'Testando o form.';

    const AppComponent = getComponentWithContext();
    const component = mount(
      <AppComponent data={form}
        name={'form-name'}
        action={''}
        onReady={ onReady }
        onZipcodeFetchSuccess={ onZipcodeFetchSuccess }
        onZipcodeFetchError={ onZipcodeFetchError }
        onSubmit={ onSubmit }
        onSubmitSuccess={ onSubmitSuccess }
        onSubmitError={ onSubmitError }
        onStepChange={ onStepChange } />,
    );

    console.log(component.instance());

    // component.instance().handleStepChange();

    // expect(component.instance().onStepChange()).toHaveBeenCalled();
  });
});

import 'react-app-polyfill/ie11';
import './polyfill/custom-event';
import Jason from './index';
import { form } from './form.json';

const jason = new Jason({
  name: 'form-name',
  action: 'http://www.mocky.io/v2/5afb459c2f00005b00f7c7ab',
  data: { form },
  onReady: () => { },
  onZipcodeFetchSuccess: data => data,
  onZipcodeFetchError: data => data,
  onSubmit: () => { },
  onSubmitSuccess: data => data,
  onSubmitFieldError: data => data,
  onSubmitError: data => data,
  onStepChange: () => { },
  element: document.getElementById('root'),
  mustShowBreadcrumb: true,
  buttonCustomClasses: '',
});

jason.init();

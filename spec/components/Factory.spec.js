import Factory from '../../src/components/Factory';
import { form } from '../../src/form.json';

const select = form.steps[0].fields[0];
const textArea = form.steps[0].fields[2];
const input = form.steps[0].fields[1];

describe('Factory', () => {
  it('renders select', () => {
    const result = Factory.getComponent(select, 1);

    expect(result.type.name).toEqual('Select');
  });

  it('renders textarea', () => {
    const result = Factory.getComponent(textArea, 1);

    expect(result.type.name).toEqual('TextArea');
  });

  it('renders input on text', () => {
    const result = Factory.getComponent(input, 1);

    expect(result.type.name).toEqual('Input');
  });

  it('renders input on phone', () => {
    const phone = Object.assign({}, input, { type: 'phone' });

    const result = Factory.getComponent(phone, 1);

    expect(result.type.name).toEqual('Input');
  });

  it('renders input on email', () => {
    const email = Object.assign({}, input, { type: 'email' });

    const result = Factory.getComponent(email, 1);

    expect(result.type.name).toEqual('Input');
  });

  it('throws exception when argument is invalid', () => {
    const invalidArg = Object.assign({}, input, { type: 'xpto' });

    expect(() => {
      Factory.getComponent(invalidArg, 1)
    }).toThrow('Invalid argument type');
  });
});

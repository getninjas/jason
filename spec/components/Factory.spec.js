import Factory from '../../src/components/Factory';
import { form } from '../../src/form.json';

const select = form.steps[0].fields[0];
const textArea = form.steps[0].fields[2];
const input = form.steps[0].fields[1];

const commonProps = {
  onFieldChange: () => {},
  formName: 'formNameTest',
  index: 1,
};

describe('Factory', () => {
  it('renders select', () => {
    const result = Factory.getComponent({ item: select, ...commonProps });

    expect(result.type.name).toEqual('Select');
  });

  it('renders textarea', () => {
    const result = Factory.getComponent({ item: textArea, ...commonProps });

    expect(result.type.name).toEqual('TextArea');
  });

  it('renders input type text', () => {
    const result = Factory.getComponent({ item: input, ...commonProps });

    expect(result.type.name).toEqual('Input');
  });

  it('renders input type phone', () => {
    const phone = Object.assign({}, input, { type: 'phone' });
    const result = Factory.getComponent({ item: phone, ...commonProps });

    expect(result.type.name).toEqual('Input');
  });

  it('renders input type email', () => {
    const email = Object.assign({}, input, { type: 'email' });

    const result = Factory.getComponent({ item: email, ...commonProps });

    expect(result.type.name).toEqual('Input');
  });

  it('throws exception when argument is invalid', () => {
    const invalidArg = Object.assign({}, input, { type: 'xpto' });

    expect(() => {
      Factory.getComponent({ item: invalidArg, ...commonProps });
    }).toThrow(`JasonForm: Invalid component type: ${invalidArg.type}`);
  });
});

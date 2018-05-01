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

  it('renders input', () => {
    const result = Factory.getComponent(input, 1);

    expect(result.type.name).toEqual('Input');
  });
});

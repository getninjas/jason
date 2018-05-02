import React from 'react';
import renderer from 'react-test-renderer';
import Field from '../../src/components/Field';
import Input from '../../src/components/Input';
import { enzymeConfig, shallow } from '../enzymeConfig';

enzymeConfig();

describe('Field', () => {
  it('renders defaultProps', () => {
    const component = renderer.create(<Field label={'test'} id={'test'}>Bora pra action</Field>);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders custom props', () => {
    const component = renderer.create(
      <Field label={'test'} id={'test'} errorMessage={'Erro!'}>
        Bora pra action
      </Field>
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('label htmlFor matches id prop', () => {
    const field = shallow(
      <Field label={'test'} id={'bora-pra-action'}>
        <Input id={'bora-pra-action'} />
      </Field>
    );

    expect(field.find('label').prop('htmlFor')).toEqual('bora-pra-action');
  });
});

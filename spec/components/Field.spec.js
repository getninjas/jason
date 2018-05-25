import React from 'react';
import renderer from 'react-test-renderer';
import Field from '../../src/components/Field';
import Input from '../../src/components/Input';
import { enzymeConfig, shallow } from '../enzymeConfig';

enzymeConfig();

describe('Field', () => {
  it('renders defaultProps', () => {
    const component = renderer.create(
      <Field label={'test'} id={'test'} errorMessage={'Erro!'} value={'test value'} isFluid={true}>
        <Input id={'bora-pra-action'} name={'nameTest'} onFieldChange={() => {}} />
      </Field>,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('label htmlFor matches id prop', () => {
    const component = shallow(
      <Field label={'test'} id={'bora-pra-action'}>
        <Input id={'bora-pra-action'} name={'nameTest'} onFieldChange={() => {}} />
      </Field>,
    );

    expect(component.find('label').prop('htmlFor')).toEqual('bora-pra-action');
  });

  describe('.style', () => {
    describe('with erroMessage', () => {
      it('returns string containing --invalid', () => {
        const component = shallow(
          <Field label={'test'} id={'bora-pra-action'} errorMessage={'Erro!'}>
            <Input id={'bora-pra-action'} name={'nameTest'} onFieldChange={() => {}} />
          </Field>,
        );

        expect(component.instance().style).toMatch(/--invalid/);
      });
    });

    describe('without erroMessage', () => {
      it('returns string not containing --invalid', () => {
        const component = shallow(
          <Field label={'test'} id={'bora-pra-action'}>
            <Input id={'bora-pra-action'} name={'nameTest'} onFieldChange={() => {}} />
          </Field>,
        );

        expect(component.instance().style).not.toMatch(/--invalid/);
      });
    });

    describe('with isFluid', () => {
      it('returns className contains form__field--fluid', () => {
        const component = shallow(
          <Field label={'test'} id={'bora-pra-action'} isFluid={true}>
            <Input id={'bora-pra-action'} name={'nameTest'} onFieldChange={() => { }} />
          </Field>,
        );

        expect(component.instance().wrapperStyle).toMatch(/form__field--fluid/);
      });
    });

    describe('without isFluid', () => {
      it('returns className not contains form__field--fluid', () => {
        const component = shallow(
          <Field label={'test'} id={'bora-pra-action'} isFluid={false}>
            <Input id={'bora-pra-action'} name={'nameTest'} onFieldChange={() => { }} />
          </Field>,
        );

        expect(component.instance().wrapperStyle).not.toMatch(/form__field--fluid/);
      });
    });
  });
});

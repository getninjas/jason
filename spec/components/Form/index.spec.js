import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../../../src/components/Form';
import { form } from '../../../src/form.json';
import { enzymeConfig, shallow } from '../../enzymeConfig';
import fillFormFields, { sleep } from '../../helper';

enzymeConfig();

function createNodeMock(element) {
  if (element.type === 'input') {
    return {
      addEventListener() { },
      value: '',
    };
  }

  return null;
}

const copyState = data => (JSON.parse(JSON.stringify(data)));

describe('Form', () => {
  it('renders defaultProps ', () => {
    const data = copyState(form);
    const options = { createNodeMock };
    const component = renderer.create(
      <Form name={'form'} action={'/'} data={data} />, options,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('.formSubmit', () => {
    describe('when is not the last step', () => {
      it('does not call .handleSubmit', () => {
        const data = copyState(form);
        const component = shallow(
          <Form name={'form'} action={'/'} data={data} />,
        );
        const instance = component.instance();

        instance.handleStepChange = jest.fn();
        instance.isLastStep = jest.fn();
        instance.handleSubmit = jest.fn();

        instance.formSubmit();

        expect(instance.handleStepChange).toBeCalled();
        expect(instance.isLastStep).toBeCalledWith(0);
        expect(instance.handleSubmit).not.toBeCalled();
      });
    });

    describe('when is last step', () => {
      it('calls .handleSubmit', () => {
        const data = copyState(form);
        data.steps = fillFormFields(data.steps);
        data.steps[1].fields[2].required = false;

        const component = shallow(
          <Form name={'form'} action={'/'} data={data} />,
        );
        const instance = component.instance();
        const evt = { preventDefault() { } };

        instance.handleSubmit = jest.fn();

        data.steps.map(() => instance.nextStep(component.state()));

        instance.onSubmit(evt);

        expect(instance.handleSubmit).toBeCalled();
      });
    });
  });

  describe('.getFields', () => {
    it('returns all form fields plus address object', () => {
      const data = copyState(form);
      const address = {
        type_street: 'type_street',
        street: 'street',
        neighborhood: 'neighborhood',
        city: 'city',
        uf: 'uf',
      };

      data.steps = fillFormFields(data.steps);

      const component = shallow(
        <Form name={'form'} action={'/'} data={data} />,
      );

      const fields = component.state().steps.map(step => step.fields);
      const mockFields = { data: { ...fields, address: { ...address } } };

      component.state().address = { ...address };

      const result = component.instance().getFields();

      expect(result).toEqual(mockFields);
    });
  });

  describe('.updateState', () => {
    describe('with prefilled zipcode', () => {
      it('matches updated state', () => {
        const data = copyState(form);
        const component = shallow(
          <Form name={'form'} data={data} action={'/'} />,
        );

        const mock = [{
          title: 'Zipcode',
          required: false,
          type: 'zipcode',
          id: 'zipcode',
          name: 'zipcode',
          placeholder: '00000-000',
          value: '04904-160',
          wrapperClassName: 'form__field input',
          values: [],
        }];

        const last = data.steps.length - 1;
        const userFields = data.steps[last];

        Object.assign(userFields, { fields: [...mock] });

        component.instance().updateState(data);

        expect(component.state().steps[last].fields).toBe(userFields.fields);
      });
    });

    describe('with default values', () => {
      it('does not change state', () => {
        const data = copyState(form);
        const component = shallow(
          <Form name={'form'} data={data} action={'/'} />,
        );

        component.instance().updateState(data);

        expect(component.state()).toEqual(data);
      });
    });
  });

  describe('.submitRequest', () => {
    it('calls .props.onSubmitSuccess, getFields', async () => {
      const onSubmit = jest.fn();
      const onSubmitSuccess = jest.fn();
      const component = shallow(
        <Form name={'form'} onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} action={'/'} data={form} />,
      );

      component.instance().getFields = jest.fn();

      await component.instance().submitRequest();

      expect(component.instance().props.onSubmit).toBeCalled();
      expect(component.instance().getFields).toBeCalled();
      expect(component.instance().props.onSubmitSuccess).toBeCalled();
    });
  });

  describe('.isStepVisible', () => {
    const component = shallow(
      <Form name={'form'} action={'/'} data={form} />,
    );

    it('returns true for activeStepIndex', () => {
      const stepOneIsVisible = component
        .instance()
        .isStepVisible(component.state().activeStepIndex);

      expect(stepOneIsVisible).toBe(true);
    });

    it('returns false for secondStep', () => {
      const stepTwoIsVisible = component
        .instance()
        .isStepVisible(component.state().activeStepIndex + 1);

      expect(stepTwoIsVisible).toBe(false);
    });
  });

  describe('.isLastStep', () => {
    const component = shallow(
      <Form name={'form'} action={'/'} data={form} />,
    );

    it('returns false for firstStep ', () => {
      const stepOne = component.state().activeStepIndex;
      const stepOneIsLast = component.instance().isLastStep(stepOne);

      expect(stepOneIsLast).toBe(false);
    });

    it('returns true for thirdStep ', () => {
      const stepThree = component.state().activeStepIndex + 2;
      const stepThreeIsLast = component.instance().isLastStep(stepThree);

      expect(stepThreeIsLast).toBe(true);
    });
  });

  describe('.nextStep', () => {
    const component = shallow(
      <Form name={'form'} action={'/'} data={form} />,
    );

    it('moves to nextStep', () => {
      const currentStepIndex = component.state().activeStepIndex;

      component.instance().nextStep(component.state());

      expect(component.state().activeStepIndex).toBe(currentStepIndex + 1);
    });

    it('stays on the currentStep', () => {
      component.instance().nextStep(component.state());

      const currentStepIndex = component.state().activeStepIndex;
      component.instance().nextStep(component.state());

      expect(currentStepIndex).toBe(component.state().activeStepIndex);
    });
  });

  describe('.handleStepChange', () => {
    it('calls .updateStep', () => {
      const onSubmitFieldError = jest.fn();
      const component = shallow(
        <Form name={'form'} action={'/'} data={form} onSubmitFieldError={onSubmitFieldError} />,
      );

      component.instance().updateStep = jest.fn();
      component.instance().nextStep = jest.fn();

      component.instance().handleStepChange();

      expect(component.instance().updateStep).toBeCalled();
      expect(component.instance().nextStep).not.toBeCalled();
      expect(component.instance().props.onSubmitFieldError).toBeCalled();
    });

    it('calls .nextStep', async () => {
      const data = copyState(form);
      const onSubmitFieldError = jest.fn();

      data.steps = fillFormFields(data.steps);

      const component = shallow(
        <Form name={'form'} action={'/'} data={data} onSubmitFieldError={onSubmitFieldError} />,
      );

      component.instance().updateStep = jest.fn();
      component.instance().nextStep = jest.fn();

      component.instance().handleStepChange();

      await sleep(100);

      expect(component.instance().updateStep).toBeCalled();
      expect(component.instance().nextStep).toBeCalled();
      expect(component.instance().props.onSubmitFieldError).not.toBeCalled();
    });
  });

  describe('.onFieldChange', () => {
    it('calls .updateStep', () => {
      const component = shallow(
        <Form name={'form'} action={'/'} data={form} />,
      );

      component.instance().updateStep = jest.fn();

      const evt = { preventDefault() { } };
      component.instance().onSubmit(evt);

      expect(component.instance().updateStep).toBeCalled();
    });

    it('expects initial state to differ from current state', async () => {
      const data = copyState(form);

      data.steps = fillFormFields(data.steps);

      const component = shallow(
        <Form name={'form'} action={'/'} data={data} />,
      );

      const evt = { preventDefault() { } };
      const instance = component.instance();

      instance.onSubmit(evt);

      await sleep(100);

      const initialSecondStepState = instance.state;
      const field = { value: '', id: '2_id' };
      instance.onFieldChange(field);

      const updatedState = instance.state;

      expect(updatedState).not.toEqual(initialSecondStepState);
    });

    it('expects updated select with dynamic options', async () => {
      const data = copyState(form);

      data.steps = fillFormFields(data.steps);

      const component = shallow(
        <Form name={'form'} action={'/'} data={data} />,
      );
      const evt = { preventDefault() { } };

      component.instance().onSubmit(evt);

      await sleep(100);

      const updatedOptions = form.steps[1].fields[2].nested_values['124'].values;
      const field = { value: 124, id: '10_id' };

      component.instance().onFieldChange(field);

      const updatedState = component.instance().state;

      expect(updatedState.steps[1].fields[2].values).toEqual(updatedOptions);
    });

    it('does not updated select with dynamic options', () => {
      const component = shallow(
        <Form name={'form'} action={'/'} data={form} />,
      );
      const initialSecondStepState = form.steps[1].fields[2].values;
      const field = { value: '', id: '10_id' };

      component.instance().onFieldChange(field);

      const updatedState = component.instance().state;

      expect(updatedState.steps[1].fields[2].values).toEqual(initialSecondStepState);
    });
  });

  describe('.handleSubmit', () => {
    it('calls .isStepsValid', () => {
      const component = shallow(
        <Form name={'form'} action={'/'} data={form} />,
      );
      component.instance().isStepsValid = jest.fn();

      const evt = { preventDefault() { } };
      component.instance().handleSubmit(evt);

      expect(component.instance().isStepsValid).toBeCalled();
    });

    it('calls .submitRequest when step is valid', () => {
      const CONTACT_FIELD = 2;
      const data = copyState(form);
      data.steps = fillFormFields(data.steps);
      data.steps[CONTACT_FIELD].fields[0].value = '11111-111';
      data.steps[CONTACT_FIELD].fields[2].value = 'iondr@ig.com';
      data.steps[CONTACT_FIELD].fields[3].value = '(11) 98888-9999';

      const component = shallow(
        <Form name={'form'} action={'/'} data={data} />,
      );

      component.instance().submitRequest = jest.fn();
      component.instance().handleSubmit();

      expect(component.instance().submitRequest).toHaveBeenCalled();
    });

    it('does not display next step', () => {
      const component = shallow(
        <Form name={'form'} action={'/'} data={form} />,
      );
      const evt = { preventDefault() { } };
      component.instance().handleSubmit(evt);

      const { activeStepIndex } = component.state();

      expect(activeStepIndex).toEqual(0);
    });

    it('goes to next step', async () => {
      const data = copyState(form);
      data.steps = fillFormFields(data.steps);

      const component = shallow(
        <Form name={'form'} action={'/'} data={data} />,
      );

      const initialStep = component.state().activeStepIndex;

      component.instance().formSubmit();

      await sleep(100);
      const { activeStepIndex } = component.state();

      expect(initialStep).toEqual(0);
      expect(activeStepIndex).toEqual(initialStep + 1);
    });
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../../../src/components/Form';
import { form } from '../../../src/form.json';
import { enzymeConfig, shallow } from '../../enzymeConfig';
import fillFormFields from '../../helper';

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
  it('renders defaultProps', () => {
    const options = { createNodeMock };
    const component = renderer.create(
      <Form name={'form'} action={'/'} data={form} />, options,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('.formSubmit', () => {
    describe('when is not the last step', () => {
      it('does not call .handleSubmit', () => {
        const component = shallow(
          <Form name={'form'} action={'/'} data={form} />,
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
        data.steps[0].fields[2].required = false;

        const component = shallow(
          <Form name={'form'} action={'/'} data={data} />,
        );
        const instance = component.instance();
        const evt = { preventDefault() {} };

        instance.handleSubmit = jest.fn();

        data.steps.map(() => instance.onSubmit(evt));

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

  describe('.updateUserFields', () => {
    describe('with prefilled zipcode', () => {
      it('matches updated state', () => {
        const component = shallow(
          <Form name={'form'} data={form} action={'/'} />,
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

        component.instance().updateUserFields(mock);

        expect(component.state().steps[1].fields).toBe(mock);
      });
    });

    describe('with default values', () => {
      it('does not change state', () => {
        const component = shallow(
          <Form name={'form'} data={form} action={'/'} />,
        );

        const fields = [...component.state().steps[1].fields];

        component.instance().updateUserFields(fields);

        expect(component.state().steps[1].fields).toBe(fields);
      });
    });
  });

  describe('.submitRequest', () => {
    it('calls .props.onSubmitSuccess, getFields', async () => {
      const onSubmit = jest.fn();
      const onSubmitSuccess = jest.fn();
      const component = shallow(
        <Form name={'form'} onSubmit={ onSubmit } onSubmitSuccess={ onSubmitSuccess } action={'/'} data={form} />,
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

    it('returns true for secondStep ', () => {
      const stepTwo = component.state().activeStepIndex + 1;
      const stepTwoIsLast = component.instance().isLastStep(stepTwo);

      expect(stepTwoIsLast).toBe(true);
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
        <Form name={'form'} action={'/'} data={form} onSubmitFieldError={ onSubmitFieldError } />,
      );

      component.instance().updateStep = jest.fn();
      component.instance().nextStep = jest.fn();

      component.instance().handleStepChange();

      expect(component.instance().updateStep).toBeCalled();
      expect(component.instance().nextStep).not.toBeCalled();
      expect(component.instance().props.onSubmitFieldError).toBeCalled();
    });

    it('calls .nextStep', () => {
      const data = copyState(form);
      const onSubmitFieldError = jest.fn();

      data.steps = fillFormFields(data.steps);

      const component = shallow(
        <Form name={'form'} action={'/'} data={data} onSubmitFieldError={ onSubmitFieldError } />,
      );

      component.instance().updateStep = jest.fn();
      component.instance().nextStep = jest.fn();

      component.instance().handleStepChange();

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

    it('expects initial state to differ from current state', () => {
      const component = shallow(
        <Form name={'form'} action={'/'} data={form} />,
      );

      const initialState = component.instance().state;

      const field = { value: '', id: '2_id', required: true, type: 'text', minLength: 3 };
      component.instance().onFieldChange(field);

      const updatedState = component.instance().state;

      expect(initialState).not.toEqual(updatedState);
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
      const data = copyState(form);
      data.steps = fillFormFields(data.steps);
      data.steps[1].fields[0].value = '11111-111';
      data.steps[1].fields[2].value = 'iondr@ig.com';
      data.steps[1].fields[3].value = '(11) 98888-9999';

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

    it('goes to next step', () => {
      const data = copyState(form);
      data.steps = fillFormFields(data.steps);

      const component = shallow(
        <Form name={'form'} action={'/'} data={data} />,
      );

      const initialStep = component.state().activeStepIndex;

      component.instance().formSubmit();

      const { activeStepIndex } = component.state();

      expect(initialStep).toEqual(0);
      expect(activeStepIndex).toEqual(initialStep + 1);
    });
  });
});

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

describe('Form', () => {
  it('renders defaultProps', () => {
    const options = { createNodeMock };
    const component = renderer.create(
      <Form name={'form'} action={'/'} data={form} />, options
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('.handleButtonClick', () => {
    it('calls .handleStepChange', () => {
      const component = shallow(
        <Form name={'form'} action={'/'} data={form} />,
      );

      component.instance().handleStepChange = jest.fn();

      const evt = { preventDefault() { } };
      component.instance().handleButtonClick(evt);

      expect(component.instance().handleStepChange).toBeCalled();
    });

    it('does not display next step', () => {
      const component = shallow(
        <Form name={'form'} action={'/'} data={form} />,
      );

      const evt = { preventDefault() { } };
      component.instance().handleButtonClick(evt);

      const { activeStepIndex } = component.state();

      expect(activeStepIndex).toEqual(0);
    });

    it('goes to next step', () => {
      const steps = [...form.steps];
      const data = Object.assign({}, { steps });

      data.steps = fillFormFields(data.steps);

      const component = shallow(
        <Form name={'form'} action={'/'} data={data} />,
      );

      const initialStep = component.state().activeStepIndex;

      const evt = { preventDefault() { } };
      component.instance().handleButtonClick(evt);

      const { activeStepIndex } = component.state();

      expect(initialStep).toEqual(0);
      expect(activeStepIndex).toEqual(initialStep + 1);
    });
  });

  describe('.isStepVisible', () => {
    const component = shallow(
      <Form name={'form'} action={'/'} data={form} />,
    );

    it('returns true for activeStepIndex', () => {
      const stepOneIsVisible = component.instance().isStepVisible(component.state().activeStepIndex);

      expect(stepOneIsVisible).toBe(true);
    });

    it('returns false for secondStep', () => {
      const stepTwoIsVisible = component.instance().isStepVisible(component.state().activeStepIndex + 1);

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
      const component = shallow(
        <Form name={'form'} action={'/'} data={form} />,
      );

      component.instance().updateStep = jest.fn();
      component.instance().nextStep = jest.fn();

      component.instance().handleStepChange();

      expect(component.instance().updateStep).toBeCalled();
      expect(component.instance().nextStep).not.toBeCalled();
    });

    it('calls .nextStep', () => {
      const steps = [...form.steps];
      const data = Object.assign({}, { steps });

      data.steps = fillFormFields(data.steps);

      const component = shallow(
        <Form name={'form'} action={'/'} data={data} />,
      );

      component.instance().updateStep = jest.fn();
      component.instance().nextStep = jest.fn();

      component.instance().handleStepChange();

      expect(component.instance().updateStep).toBeCalled();
      expect(component.instance().nextStep).toBeCalled();
    });
  });

  describe('.onFieldChange', () => {
    it('calls .updateStep', () => {
      const component = shallow(
        <Form name={'form'} action={'/'} data={form} />,
      );

      component.instance().updateStep = jest.fn();

      const evt = { preventDefault() { } };
      component.instance().handleButtonClick(evt);

      expect(component.instance().updateStep).toBeCalled();
    });

    it('expects initial state to differ from current state', () => {
      const component = shallow(
        <Form name={'form'} action={'/'} data={form} />,
      );

      const initialState = component.instance().state;

      const evt = { preventDefault() { } };
      component.instance().handleButtonClick(evt);

      const updatedState = component.instance().state;

      expect(initialState).not.toEqual(updatedState);
    });
  });

  describe('.handleSubmit', () => {
    const component = shallow(
      <Form name={'form'} action={'/'} data={form} />,
    );

    it('calls .handleStepChange', () => {
      component.instance().handleStepChange = jest.fn();

      const evt = { preventDefault() { } };
      component.instance().handleSubmit(evt);

      expect(component.instance().handleStepChange).toBeCalled();
    });

    it('does not display next step', () => {
      const evt = { preventDefault() { } };
      component.instance().handleSubmit(evt);

      const { activeStepIndex } = component.state();

      expect(activeStepIndex).toEqual(0);
    });

    it('goes to next step', () => {
      const steps = [...form.steps];
      const data = Object.assign({}, { steps });

      data.steps = fillFormFields(data.steps);

      const formComponent = shallow(
        <Form name={'form'} action={'/'} data={data} />,
      );

      const initialStep = formComponent.state().activeStepIndex;

      const evt = { preventDefault() { } };
      formComponent.instance().handleSubmit(evt);

      const { activeStepIndex } = formComponent.state();

      expect(initialStep).toEqual(0);
      expect(activeStepIndex).toEqual(initialStep + 1);
    });
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../../src/components/Form';
import { form } from '../../src/form.json';
import { enzymeConfig, shallow } from '../enzymeConfig';

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

function fillStepFields(steps) {
  return steps.map((step) => {
    step.fields = step.fields.map((field) => {
      const updatedField = Object.assign({}, field);
      updatedField.value = '1111111';

      return updatedField;
    });

    return step;
  });
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

  it('.handleButtonClick', () => {
    form.steps = fillStepFields(form.steps);

    const component = shallow(
      <Form name={'form'} action={'/'} data={form} />,
    );

    const initialStep = component.state().activeStep;

    const evt = { preventDefault() { } };
    component.instance().handleButtonClick(evt);

    const { activeStep } = component.state();

    expect(initialStep).toEqual(0);
    expect(activeStep).toEqual(initialStep + 1);
  });

  it('.isStepVisible', () => {
    const component = shallow(
      <Form name={'form'} action={'/'} data={form} />,
    );

    const stepOneIsVisible = component.instance().isStepVisible(0);
    const stepTwoIsVisible = component.instance().isStepVisible(1);

    expect(stepOneIsVisible).toBe(true);
    expect(stepTwoIsVisible).toBe(false);
  });

  it('.isLastStep', () => {
    const component = shallow(
      <Form name={'form'} action={'/'} data={form} />,
    );

    const stepOne = component.state().activeStep;

    const evt = { preventDefault() { } };
    component.instance().handleButtonClick(evt);

    const stepTwo = component.state().activeStep;

    const stepOneIsLast = component.instance().isLastStep(stepOne);
    const stepTwoIsLast = component.instance().isLastStep(stepTwo);

    expect(stepOneIsLast).toBe(false);
    expect(stepTwoIsLast).toBe(true);
  });
});

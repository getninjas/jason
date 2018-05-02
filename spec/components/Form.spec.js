import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../../src/components/Form';
import { form } from '../../src/form.json';
import { enzymeConfig, shallow } from '../enzymeConfig';

enzymeConfig();

describe('Form', () => {
  it('renders custom props', () => {
    const component = renderer.create(
      <Form name={'form'} data={form} />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders defaultProps', () => {
    const component = renderer.create(
      <Form name={'form'} data={form} />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('.handleButtonClick', () => {
    const component = shallow(
      <Form name={'form'} data={form} />,
    );

    const initialStep = component.state().activeStep;

    component.instance().handleButtonClick();

    const { activeStep } = component.state();

    expect(initialStep).toEqual(0);
    expect(activeStep).toEqual(initialStep + 1);
  });

  it('.isStepVisible', () => {
    const component = shallow(
      <Form name={'form'} data={form} />,
    );

    const stepOneIsVisible = component.instance().isStepVisible(0);
    const stepTwoIsVisible = component.instance().isStepVisible(1);

    expect(stepOneIsVisible).toBe(true);
    expect(stepTwoIsVisible).toBe(false);
  });

  it('.isLastStep', () => {
    const component = shallow(
      <Form name={'form'} data={form} />,
    );

    const stepOne = component.state().activeStep;

    component.instance().handleButtonClick();

    const stepTwo = component.state().activeStep;

    const stepOneIsLast = component.instance().isLastStep(stepOne);
    const stepTwoIsLast = component.instance().isLastStep(stepTwo);

    expect(stepOneIsLast).toBe(false);
    expect(stepTwoIsLast).toBe(true);
  });
});

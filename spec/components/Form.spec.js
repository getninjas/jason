import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../../src/components/Form';
import data from '../../src/form.json';
import { enzimeConfig, shallow } from '../enzimeConfig';

enzimeConfig();

describe('Form', () => {
  it('renders custom props', () => {
    const component = renderer.create(
      <Form name={'form'} form={data.form} />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders defaultProps', () => {
    const component = renderer.create(
      <Form name={'form'} form={data.form} />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('.handleButtonClick', () => {
    const component = shallow(
      <Form name={'form'} form={data.form} />,
    );

    const { activeStep } = component.state();

    component.instance().handleButtonClick();

    const changedStep = component.state().activeStep;

    expect(activeStep).toEqual(0);
    expect(changedStep).toEqual(activeStep + 1);
  });

  it('.isStepVisible', () => {
    const component = shallow(
      <Form name={'form'} form={data.form} />,
    );

    const result = component.instance().isStepVisible(0);
    const secondResult = component.instance().isStepVisible(1);

    expect(result).toBe(true);
    expect(secondResult).toBe(false);
  });

  it('.isLastStep', () => {
    const component = shallow(
      <Form name={'form'} form={data.form} />,
    );

    const { activeStep } = component.state();

    component.instance().handleButtonClick();

    const changedStep = component.state().activeStep;

    expect(component.instance().isLastStep(activeStep)).toBe(false);
    expect(component.instance().isLastStep(changedStep)).toBe(true);
  });
});

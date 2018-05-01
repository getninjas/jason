import React from 'react';
import renderer from 'react-test-renderer';
import Step from '../../src/components/Step';
import formData from '../../src/form.json';
import { enzimeConfig, shallow } from '../enzimeConfig';

enzimeConfig();

describe('Step', () => {
  it('renders with props', () => {
    const step = formData.form.steps[0];

    const component = renderer.create(
      <Step
        visible={true}
        key={'step'}
        step={step}
        isLast={false}
        handleButtonClick={()=>{}}
      />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('shows header html when exists', () => {
    const step = formData.form.steps[0];

    const component = shallow(
      <Step
        visible={true}
        key={'step'}
        step={step}
        isLast={false}
        handleButtonClick={() => {}}
      />,
    );

    const header = component.find('fieldset').html();

    expect(header).stringContaining('widget__title');
  });
});

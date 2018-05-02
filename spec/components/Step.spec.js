import React from 'react';
import renderer from 'react-test-renderer';
import Step from '../../src/components/Step';
import formData from '../../src/form.json';
import { enzymeConfig, shallow } from '../enzymeConfig';

enzymeConfig();

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

    const result = component.html();

    expect(result).toContain('widget__title')
  });

  it('shows inputs, select and textarea inner component', () => {
    const step = formData.form.steps[0];

    const component = shallow(
      <Step
        visible={true}
        key={'step'}
        step={step}
        isLast={false}
        handleButtonClick={() => { }}
      />,
    );

    const result = component.html();

    expect(result.includes('1_name_select')).toBe(true);
    expect(result.includes('2_name_text')).toBe(true);
    expect(result.includes('3_name_textarea')).toBe(true);
    expect(result.includes('breadcrumb')).toBe(false);
  });
});

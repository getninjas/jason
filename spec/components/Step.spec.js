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
        key={'step'}
        buttonText={'next step'}
        fields={step.fields}
        formName={'formNameTest'}
        onSubmit={() => {}}
        isLast={false}
        step={step}
        zipcodeUrlService={formData.form.zipcodeUrlService}
        onFieldChange={() => {}}
        onFieldBlur={() => {}}
        visible={true}
        mustShowBreadcrumb={true}
      />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders without breadcrumb', () => {
    const step = formData.form.steps[0];

    const component = renderer.create(
      <Step
        key={'step'}
        buttonText={'next step'}
        fields={step.fields}
        formName={'formNameTest'}
        onSubmit={() => {}}
        isLast={false}
        step={step}
        zipcodeUrlService={formData.form.zipcodeUrlService}
        onFieldChange={() => {}}
        onFieldBlur={() => {}}
        visible={true}
        mustShowBreadcrumb={false}
      />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('do not show header html inside steps, even if is passed', () => {
    const step = formData.form.steps[0];

    const component = shallow(
      <Step
        key={'step'}
        buttonText={'next step'}
        fields={step.fields}
        formName={'formNameTest'}
        onSubmit={() => {}}
        headerMarkup={step.headerMarkup}
        isLast={false}
        step={step}
        zipcodeUrlService={formData.form.zipcodeUrlService}
        onFieldChange={() => {}}
        onFieldBlur={() => {}}
        visible={true}
        mustShowBreadcrumb={true}
      />,
    );

    const result = component.html();

    expect(result).not.toContain('widget__title');
  });

  it('shows inputs, select and textarea inner component', () => {
    const step = formData.form.steps[1];

    const component = shallow(
      <Step
        key={'step'}
        buttonText={'next step'}
        fields={step.fields}
        formName={'formNameTest'}
        onSubmit={() => {}}
        isLast={false}
        step={step}
        onFieldChange={() => {}}
        onFieldBlur={() => {}}
        zipcodeUrlService={formData.form.zipcodeUrlService}
        visible={true}
        mustShowBreadcrumb={true}
      />,
    );

    const result = component.html();

    expect(result.includes('1_name_select')).toBe(true);
    expect(result.includes('2_name_text')).toBe(true);
    expect(result.includes('3_name_textarea')).toBe(true);
    expect(result.includes('breadcrumb')).toBe(false);
  });

  describe('.addHeaderMarkup does not exists inside steps', () => {
    it('does not add header markup', () => {
      const step = formData.form.steps[0];

      const component = shallow(
        <Step
          key={'step'}
          buttonText={'next step'}
          fields={step.fields}
          formName={'formNameTest'}
          onSubmit={() => {}}
          isLast={false}
          step={step}
          onFieldChange={() => {}}
          onFieldBlur={() => {}}
          zipcodeUrlService={formData.form.zipcodeUrlService}
          visible={true}
          mustShowBreadcrumb={true}
        />,
      );

      const result = component.html();

      expect(result.includes('__headerMarkup__')).toBe(false);
    });

    it('adds header markup will not work inside steps form', () => {
      const step = formData.form.steps[0];

      const component = shallow(
        <Step
          key={'step'}
          buttonText={'next step'}
          fields={step.fields}
          formName={'formNameTest'}
          onSubmit={() => {}}
          headerMarkup={step.headerMarkup}
          isLast={false}
          step={step}
          onFieldChange={() => {}}
          onFieldBlur={() => {}}
          zipcodeUrlService={formData.form.zipcodeUrlService}
          visible={true}
          mustShowBreadcrumb={true}
        />,
      );

      const result = component.html();

      expect(result.includes('__headerMarkup__')).toBe(false);
      expect(result.includes('widget__title')).toBe(false);
    });
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../../src/components/Button';
import { enzymeConfig, shallow } from '../enzymeConfig';

enzymeConfig();

describe('Button', () => {
  it('renders defaultProps', () => {
    const component = renderer.create(<Button handleButtonClick={() => {}}>Test</Button>);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('when prop submit is true', () => {
    it('renders button with type=submit', () => {
      const component = shallow(<Button isSubmit={true} handleButtonClick={() => {}}>Test</Button>);

      expect(component.prop('type')).toBe('submit');
    });
  });
});

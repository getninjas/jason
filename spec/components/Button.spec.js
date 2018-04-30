import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../../src/components/Button';
import {config, shallow} from '../config';

config();

describe('Button', () => {
  it('renders custom props', () => {
    const component = renderer.create(
      <Button
        isSubmit={false}
        handleButtonClick={()=>{}}
      >Test</Button>,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders defaultProps', () => {
    const component = renderer.create(<Button handleButtonClick={() => { }}>Test</Button>);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('when prop submit is true', () => {
    it('renders button with type=submit', () => {
      const component = shallow(<Button isSubmit={true} handleButtonClick={() => { }}>Test</Button>);

      expect(component.find('.btn').prop('type')).toBe('submit');
    });
  });
});

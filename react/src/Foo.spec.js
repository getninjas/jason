import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Foo from "./Foo";

configure({ adapter: new Adapter() });

const wrapper = shallow(<Foo />);

describe('#One', () => {
  it('#One__', () => {
    expect(wrapper.contains(<h1>
      Hello</h1>)).toEqual(true);
  });
});

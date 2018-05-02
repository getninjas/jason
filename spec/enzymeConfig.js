import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

const enzymeConfig = () => { Enzyme.configure({ adapter: new Adapter() }); }

export { shallow, enzymeConfig };

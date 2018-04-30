import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

const config = () => { Enzyme.configure({ adapter: new Adapter() }); }

export { Adapter, Enzyme, shallow, config };

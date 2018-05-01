import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

const enzimeConfig = () => { Enzyme.configure({ adapter: new Adapter() }); }

export { Adapter, Enzyme, shallow, enzimeConfig };

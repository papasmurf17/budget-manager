import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'unfetch/polyfill';

configure({ adapter: new Adapter() });

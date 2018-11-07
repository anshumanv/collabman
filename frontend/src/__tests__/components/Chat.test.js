import React from 'react';
import Chat from '../../components/Chat';
import Enzyme, { shallow, render } from 'enzyme';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { getStore } from '../../store';

Enzyme.configure({ adapter: new Adapter() });

describe('<Chat />', () => {
  const store = getStore();
  it('renders without crashing', () => {
    // DOM Rendering
    /*const div = document.createElement('div');
    ReactDOM.render(<Chat store={store} />, div);
    ReactDOM.unmountComponentAtNode(div);
	*/
    // Shallow Rendering
    shallow(<Chat store={store} />); // Todo - Need to mock server for shallow rendering to work
  });
});

import React from 'react';
import Enzyme, { shallow, render } from 'enzyme';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';

import Profile from '../../containers/Profile';

import { getStore } from '../../store';

Enzyme.configure({ adapter: new Adapter() });

// Mock redux store
const store = getStore();

describe('<Profile />', () => {
  it('renders without crashing', () => {
    // DOM Rendering
    // const div = document.createElement('div');
    // ReactDOM.render(<Profile store={store} />, div);
    // ReactDOM.unmountComponentAtNode(div);

    // Shallow Rendering
    shallow(<Profile store={store} />);
  });
});

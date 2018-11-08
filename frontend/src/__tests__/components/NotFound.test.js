import React from 'react';
import Enzyme, { shallow, render } from 'enzyme';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';

import NotFound from '../../containers/NotFound';

import { getStore } from '../../store';

Enzyme.configure({ adapter: new Adapter() });

// Mock redux store for component
const store = getStore();

describe('<NotFound />', () => {
  it('renders without crashing', () => {
    // DOM Rendering
    // const div = document.createElement('div');
    // ReactDOM.render(<NotFound store={store} />, div);
    // ReactDOM.unmountComponentAtNode(div);

    // Shallow Rendering
    shallow(<NotFound store={store} />);
  });
});

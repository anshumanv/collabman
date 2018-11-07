import React from 'react';
import Dashboard from '../../containers/Dashboard';
import Enzyme, { shallow, render } from 'enzyme';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { getStore } from '../../store';

Enzyme.configure({ adapter: new Adapter() });

describe('<Dashboard />', () => {
  const store = getStore();
  it('renders without crashing', () => {
    const div = document.createElement('div');
    // DOM Rendering
    // ReactDOM.render(<Dashboard store={store} />, div);
    // ReactDOM.unmountComponentAtNode(div);

    // Shallow Rendering
    shallow(<Dashboard store={store} />);
  });
});

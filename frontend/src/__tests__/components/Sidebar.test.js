import React from 'react';
import Sidebar from '../../components/Sidebar';
import Enzyme, { shallow, render } from 'enzyme';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { getStore } from '../../store';

Enzyme.configure({ adapter: new Adapter() });

describe('<Sidebar />', () => {
  // Pass the redux store
  const store = getStore();

  it('renders without crashing', () => {
    // DOM Rendering
    // const div = document.createElement('div');
    // ReactDOM.render(<Sidebar store={store} />, div);
    // ReactDOM.unmountComponentAtNode(div);

    // Shallow Rendering
    shallow(<Sidebar store={store} />);
  });
});

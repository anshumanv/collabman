import React from 'react';
import Contributions from '../../components/Contributions';
import Enzyme, { shallow, render } from 'enzyme';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { getStore } from '../../store';

Enzyme.configure({ adapter: new Adapter() });

describe('<Contributions />', () => {
  // Pass the redux store
  const store = getStore();

  it('renders without crashing', () => {
    const div = document.createElement('div');
    // DOM Rendering
    // ReactDOM.render(<Contributions store={store} />, div);
    // ReactDOM.unmountComponentAtNode(div);

    // Shallow Rendering
    shallow(<Contributions store={store} />);
  });
});

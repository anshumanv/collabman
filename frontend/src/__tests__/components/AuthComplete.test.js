import React from 'react';
import AuthComplete from '../../containers/AuthComplete';
import Enzyme, { shallow, render } from 'enzyme';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { getStore } from '../../store';

Enzyme.configure({ adapter: new Adapter() });

describe('<AuthComplete />', () => {
  const store = getStore();
  it('renders without crashing', () => {
    const div = document.createElement('div');
    // DOM Rendering
    // ReactDOM.render(<AuthComplete store={store} />, div);
    // ReactDOM.unmountComponentAtNode(div);

    // Shallow Rendering
    shallow(<AuthComplete store={store} />);
  });
});

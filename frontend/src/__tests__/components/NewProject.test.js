import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NewProject from '../../containers/NewProject';

import { getStore } from '../../store';

Enzyme.configure({ adapter: new Adapter() });

const store = getStore();

describe('<NewProject />', () => {
  it('renders without crashing', () => {
    // DOM Rendering
    // const div = document.createElement('div');
    // ReactDOM.render(<NewProject store={store} />, div);
    // ReactDOM.unmountComponentAtNode(div);

    // Shallow Rendering
    shallow(<NewProject store={store} />);
  });
});

import React from 'react';
import NewProjectForm from '../../components/NewProjectForm';
import Enzyme, { shallow, render } from 'enzyme';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { getStore } from '../../store';

Enzyme.configure({ adapter: new Adapter() });

describe('<NewProjectForm />', () => {
  // Pass the redux store
  const store = getStore();

  it('renders without crashing', () => {
    // DOM Rendering
    // const div = document.createElement('div');
    // ReactDOM.render(<NewProjectForm store={store} />, div);
    // ReactDOM.unmountComponentAtNode(div);

    // Shallow Rendering
    shallow(<NewProjectForm store={store} />);
  });
});

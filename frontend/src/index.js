import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import RootReducer from './reducers';
import App from './components/App';
import NotFound from './containers/NotFound';
import NewProject from './containers/NewProject';
import Dashboard from './containers/Dashboard';
import Profile from './containers/Profile';
import Auth from './containers/Auth';


import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';

// Redux Store
let store = createStore(RootReducer, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Switch>
					<Route exact path='/' component={App} />
					<Route exact path='/new' component={NewProject} />
					<Route exact path='/project/:projectId' component={Dashboard} />
					<Route exact path='/profile/:username' component={Profile} />
					<Route exact path='/auth' component={Auth} />
					<Route exact path='*' component={NotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();

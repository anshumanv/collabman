import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import RootReducer from './reducers';
import App from './components/App';
import NotFound from './components/NotFound';

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
					<Route exact path='*' component={NotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();

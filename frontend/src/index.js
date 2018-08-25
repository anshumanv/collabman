import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import App from './components/App';
import NotFound from './components/NotFound';

import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<BrowserRouter>
		<div>
			<Switch>
				<Route exact path='/' component={App} />
				<Route exact path='*' component={NotFound} />
			</Switch>
		</div>
	</BrowserRouter>,
	document.getElementById('root'));
registerServiceWorker();

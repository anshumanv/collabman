import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { getStore, getState } from './store';

import App from './components/App';
import NotFound from './containers/NotFound';
import NewProject from './containers/NewProject';
import Dashboard from './containers/Dashboard';
import Profile from './containers/Profile';
import Auth from './containers/Auth';
import AuthComplete from './containers/AuthComplete';

import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';

// Redux Store
const store = getStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route
            exact
            path="/new"
            render={() => {
              if (localStorage.getItem('access_token')) {
                return <NewProject />;
              } else {
                return <NotFound />;
              }
            }}
          />
          <Route
            exact
            path="/dashboard"
            render={() => {
              if (localStorage.getItem('access_token')) {
                return <Dashboard />;
              } else {
                return <NotFound />;
              }
            }}
          />
          <Route
            exact
            path="/profile/:username"
            render={() => {
              if (localStorage.getItem('access_token')) {
                return <Profile />;
              } else {
                return <NotFound />;
              }
            }}
          />
          <Route exact path="/auth/complete" component={AuthComplete} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = null;

export const getStore = () => {
  if (!store) {
    store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)));
  }
  return store;
};

export const getState = () => {
  return getStore().getState();
};

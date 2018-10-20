import { combineReducers } from 'redux';

import { projectReducer } from './projectReducer';

const RootReducer = combineReducers({
  projects: projectReducer,
});

export default RootReducer;

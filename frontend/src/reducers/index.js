import { combineReducers } from 'redux';

import { projectReducer } from './projectReducer';
import { statsReducer } from './statsReducer';

const RootReducer = combineReducers({
  projects: projectReducer,
  stats: statsReducer,
});

export default RootReducer;

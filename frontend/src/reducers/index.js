import { combineReducers } from 'redux';

import { projectReducer } from './projectReducer';
import { statsReducer } from './statsReducer';
import { taskReducer } from './taskReducer';

const RootReducer = combineReducers({
  projects: projectReducer,
  stats: statsReducer,
  tasks: taskReducer,
});

export default RootReducer;

import { combineReducers } from 'redux';

import { projectReducer } from './projectReducer';
import { statsReducer } from './statsReducer';
import { taskReducer } from './taskReducer';
import { docsReducer } from './docsReducer';
import { authReducer } from './authReducer';

const RootReducer = combineReducers({
  projects: projectReducer,
  stats: statsReducer,
  tasks: taskReducer,
  documents: docsReducer,
  auth: authReducer,
});

export default RootReducer;

import { combineReducers } from 'redux';

import { projectReducer } from './projectReducer';
import { statsReducer } from './statsReducer';
import { taskReducer } from './taskReducer';
import { docsReducer } from './docsReducer';

const RootReducer = combineReducers({
  projects: projectReducer,
  stats: statsReducer,
  tasks: taskReducer,
  documents: docsReducer,
});

export default RootReducer;

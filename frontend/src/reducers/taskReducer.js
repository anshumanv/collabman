import { taskActions } from '../constants';

const initialState = {
  tasks: [],
  tasksLoaded: false,
  newTask: {},
  postingNewTask: false,
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case taskActions.FETCH_TASKS_SUCCESS:
      return { ...state, tasks: action.tasks, tasksLoaded: true };
    case taskActions.FETCH_TASKS_FAILED:
      return { ...state, tasks: [], tasksLoaded: true };
    case taskActions.TASK_POST_SUCCESS:
      return { ...state, postingNewTask: false, newTask: action.newTask };
    case taskActions.FETCH_TASKS_LOADING:
      return { ...state, tasksLoaded: false };
    case taskActions.TASK_POST_FAILED:
      return state;
    case taskActions.TASK_DELETE_SUCCESS:
      return state;
    case taskActions.TASK_DELETE_FAILED:
      return state;
    default:
      return state;
  }
};

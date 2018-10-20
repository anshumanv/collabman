import { taskActions } from '../constants';

const initialState = {
  tasks: [],
  tasksLoaded: false,
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case taskActions.FETCH_TASKS_SUCCESS:
      console.log(action);
      return { ...state, tasks: action.tasks, tasksLoaded: true };
    case taskActions.FETCH_TASKS_FAILED:
      return state;
    default:
      return state;
  }
};

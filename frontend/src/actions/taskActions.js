import { taskActions } from '../constants';

import { fetchProjectTasks } from '../API/tasks';

export const fetchTasks = project => {
  return (dispatch, getState) => {
    return fetchProjectTasks(project)
      .then(response => {
        dispatch(tasksFetched(response.data));
      })
      .catch(err => {
        dispatch(tasksFailed());
      });
  };
};

const tasksFetched = tasks => {
  return {
    type: taskActions.FETCH_TASKS_SUCCESS,
    tasks,
  };
};

const tasksFailed = () => {
  return {
    type: taskActions.FETCH_TASKS_FAILED,
  };
};
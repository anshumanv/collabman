import { taskActions } from '../constants';

import { fetchProjectTasks } from '../API/tasks';

export const fetchTasks = (username, project) => {
  return (dispatch, getState) => {
    return fetchProjectTasks(username, project)
      .then(response => {
        dispatch(tasksFetched(response.data));
      })
      .catch(err => {
        console.log(err);
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

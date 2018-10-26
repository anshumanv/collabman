import { taskActions } from '../constants';

import { fetchProjectTasks, postTask } from '../API/tasks';

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

export const postNewTask = payload => {
  return (dispatch, getState) => {
    dispatch(postingNewTask());
    return postTask('test', getState().projects.currentProject.slug, payload) // gommenasai
      .then(response => {
        dispatch(taskPostSuccess(response.data));
        dispatch(fetchTasks('test', getState().projects.currentProject.slug)); // gommenasai
      })
      .catch(err => {
        console.log(err);
        dispatch(taskPostFailed(err.response.request.responseText));
      });
  };
};

export const taskPostSuccess = newTask => {
  return {
    type: taskActions.TASK_POST_SUCCESS,
    newTask: newTask,
  };
};

export const postingNewTask = () => {
  return {
    type: taskActions.TASK_POSTING,
    postingNewTask: true,
  };
};

export const taskPostFailed = newTask => {
  return {
    type: taskActions.TASK_POST_FAILED,
  };
};

import { taskActions } from '../constants';

import { fetchProjectTasks, postTask, deleteTask } from '../API/tasks';

export const fetchTasks = () => {
  return (dispatch, getState) => {
    dispatch(fetchingTasks());
    const username = getState().auth.username;
    const token = getState().auth.token;
    const projectSlug = getState().projects.currentProject.slug;
    return fetchProjectTasks(username, projectSlug, token)
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

const fetchingTasks = () => {
  return {
    type: taskActions.FETCH_TASKS_LOADING,
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
    const projectSlug = getState().projects.currentProject.slug;
    const token = getState().auth.token;
    const username = getState().auth.username;
    return postTask(username, projectSlug, payload, token)
      .then(response => {
        dispatch(taskPostSuccess(response.data));
        dispatch(fetchTasks(username, projectSlug, token)); // gommenasai
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

export const taskPostFailed = () => {
  return {
    type: taskActions.TASK_POST_FAILED,
  };
};

export const deleteSelectedTask = taskId => {
  return (dispatch, getState) => {
    const username = getState().auth.username;
    const token = getState().auth.token;
    const projectSlug = getState().projects.currentProject.slug;
    return deleteTask(username, projectSlug, taskId, token)
      .then(response => {
        dispatch(taskDeletionSucceeded());
        dispatch(fetchTasks(username, projectSlug, token));
      })
      .catch(err => {
        console.log(err);
        dispatch(taskDeletionFailed());
      });
  };
};

const taskDeletionSucceeded = () => {
  return {
    type: taskActions.TASK_DELETE_SUCCESS,
  };
};

const taskDeletionFailed = () => {
  return {
    type: taskActions.TASK_DELETE_FAILED,
  };
};

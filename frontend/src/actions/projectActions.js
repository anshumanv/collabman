import { projectActions } from '../constants';
import { fetchTasks } from './taskActions';
import { fetchUserProjects } from '../API/projects';

export const getUserProjects = username => {
  return (dispatch, getState) => {
    dispatch(projectsLoading());
    return fetchUserProjects(username)
      .then(response => {
        dispatch(projectsFetched(response.data));
        if (response.data.length) {
          dispatch(setCurrentProject(response.data[0]));
        }
      })
      .catch(err => {
        dispatch(projectsFailed());
      });
  };
};

const projectsLoading = () => {
  return { type: projectActions.FETCH_USER_PROJECT_LOADING, isLoaded: false };
};

const projectsFetched = projects => {
  return {
    type: projectActions.FETCH_USER_PROJECT_DONE,
    userProjects: projects,
  };
};

const projectsFailed = () => {
  return { type: projectActions.FETCH_USER_PROJECT_FAILED };
};

export const setCurrentProject = curProject => {
  return (dispatch, getState) => {
    dispatch(updateProject(curProject));
    dispatch(fetchTasks(curProject.id)); // gommenasai
  };
};

const updateProject = curProject => {
  return {
    type: projectActions.SET_CURRENT_PROJECT,
    curProject,
  };
};

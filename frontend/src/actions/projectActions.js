import { projectActions } from '../constants';

import { fetchUserProjects } from '../API/projects';

export const getUserProjects = userId => {
  return (dispatch, getState) => {
    dispatch(projectsLoading());
    return fetchUserProjects(userId)
      .then(response => {
        dispatch(projectsFetched(response.data));
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

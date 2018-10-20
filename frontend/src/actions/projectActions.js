import { projectActions } from '../constants';

import { fetchUserProjects } from '../API/projects';

export const getUserProjects = userId => {
  return (dispatch, getState) => {
    dispatch({ type: projectActions.FETCH_USER_PROJECT_LOADING });
    const userProjects = fetchUserProjects(userId);
    dispatch({
      type: projectActions.FETCH_USER_PROJECT_DONE,
      userProjects,
    });
  };
};

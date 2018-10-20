import { projectActions } from '../constants';

const initialState = {
  projects: [],
  isLoaded: false,
  currentProject: null,
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case projectActions.FETCH_USER_PROJECT_DONE:
      return { ...state, userProjects: action.userProjects, isLoaded: true };
    case projectActions.FETCH_USER_PROJECT_LOADING:
      return { isLoaded: false };
    case projectActions.SET_CURRENT_PROJECT:
      return { ...state, currentProject: action.curProject };
    default:
      return state;
  }
};

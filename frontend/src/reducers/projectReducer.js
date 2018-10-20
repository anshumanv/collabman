import { projectActions } from '../constants';

const initialState = {
  projects: [],
  isLoaded: false,
  currentProject: null,
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case projectActions.FETCH_USER_PROJECT_DONE:
      console.log(action);
      return { ...state, userProjects: action.userProjects, isLoaded: true };
    case projectActions.FETCH_USER_PROJECT_LOADING:
      return { isLoaded: false };
    default:
      return state;
  }
};

import { projectActions } from '../constants';

const initialState = {
  projects: [],
  isLoaded: false,
  currentProject: null,
  newProject: [],
  creatingNewProject: false,
  creationError: '',
  success: false,
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case projectActions.FETCH_USER_PROJECT_DONE:
      return { ...state, userProjects: action.userProjects, isLoaded: true };
    case projectActions.FETCH_USER_PROJECT_LOADING:
      return { isLoaded: false };
    case projectActions.SET_CURRENT_PROJECT:
      return { ...state, currentProject: action.curProject };
    case projectActions.CREATE_NEW_PROJECT_SUCCESS:
      return {
        ...state,
        newProject: action.payload,
        creatingNewProject: false,
        success: true,
      };
    case projectActions.CREATE_NEW_PROJECT_FAILED:
      return {
        ...state,
        creatingNewProject: false,
        creationError: action.creationError,
        success: false,
      };
    case projectActions.CREATING_NEW_PROJECT:
      return { ...state, creatingNewProject: true };
    default:
      return state;
  }
};

import { projectActions } from '../constants';
import { fetchTasks } from './taskActions';
import { fetchDocuments } from './documentActions';
import { fetchUserProjects, createProject } from '../API/projects';
import { fetchContributors } from '../actions/statsActions';

// Function to fetch user projects
export const getUserProjects = username => {
  return (dispatch, getState) => {
    dispatch(projectsLoading());
    const token = getState().auth.token;
    const username = getState().auth.username;
    return fetchUserProjects(username, token)
      .then(response => {
        dispatch(projectsFetched(response.data));
        if (response.data.length) {
          dispatch(setCurrentProject(response.data[0]));
        }
      })
      .catch(err => {
        console.log(err);
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
    const userName = getState().auth.username;
    dispatch(updateProject(curProject));
    dispatch(fetchTasks(userName, curProject.slug));
    dispatch(fetchDocuments(userName, curProject.slug));
    dispatch(fetchContributors(curProject.project_link));
  };
};

const updateProject = curProject => {
  return {
    type: projectActions.SET_CURRENT_PROJECT,
    curProject,
  };
};

export const createNewProject = payload => {
  return (dispatch, getState) => {
    dispatch(creatingNewProject());
    console.log(payload);
    const token = getState().auth.token;
    const username = getState().auth.username;
    return createProject(username, payload, token)
      .then(response => {
        dispatch(projectsCreationSucceed(response.data));
        window.location('/dashboard');
      })
      .catch(err => {
        console.log(err.response.request.responseText);
        dispatch(projectsCreationFailed(err.response.request.responseText));
      });
  };
};

const creatingNewProject = () => {
  return {
    type: projectActions.CREATING_NEW_PROJECT,
    creatingNewProject: true,
  };
};

const projectsCreationSucceed = newProject => {
  return {
    type: projectActions.CREATE_NEW_PROJECT_SUCCESS,
    payload: newProject,
    success: true,
  };
};

const projectsCreationFailed = err => {
  return { type: projectActions.CREATE_NEW_PROJECT_FAILED, creationError: err };
};

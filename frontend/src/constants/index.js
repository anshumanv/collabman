// API Constants
export const API_URL = 'http://localhost:8000';
export const GITHUB_API_URL = 'https://api.github.com';

// Actions listed below

// Projects Actions
export const projectActions = {
  FETCH_USER_PROJECT_FAILED: 'FETCH_USER_PROJECT_FAILED',
  FETCH_USER_PROJECT_DONE: 'FETCH_USER_PROJECT_DONE',
  FETCH_USER_PROJECT_LOADING: 'FETCH_USER_PROJECT_LOADING',
  SET_CURRENT_PROJECT: 'SET_CURRENT_PROJECT',
};

export const githubActions = {
  FETCH_CONTRIBUTION_SUCCESS: 'FETCH_CONTRIBUTION_SUCCESS',
  FETCH_CONTRIBUTION_FAILED: 'FETCH_CONTRIBUTION_FAILED',
};

export const taskActions = {
  FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
  FETCH_TASKS_FAILED: 'FETCH_TASKS_FAILED',
};

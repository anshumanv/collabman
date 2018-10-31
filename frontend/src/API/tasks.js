import axios from 'axios';
import { API_URL } from '../constants';

// Get user tasks
export const fetchProjectTasks = (username, projectSlug) => {
  return axios.get(
    `${API_URL}/api/v1/${username}/project/${projectSlug}/task/`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'TOKEN 35357beeb260c710c15bbaa9b0deedbe859555f0', // gommenasai
      },
    },
  );
};

// Create new task
export const postTask = (username, projectSlug, payload) => {
  return axios.post(
    `${API_URL}/api/v1/${username}/project/${projectSlug}/task/`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'TOKEN 35357beeb260c710c15bbaa9b0deedbe859555f0', // gommenasai
      },
    },
  );
};

// Delete selected task
export const deleteTask = (username, projectSlug, taskId) => {
  return axios.delete(
    `${API_URL}/api/v1/${username}/project/${projectSlug}/task/${taskId}/`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'TOKEN 35357beeb260c710c15bbaa9b0deedbe859555f0', // gommenasai
      },
    },
  );
};

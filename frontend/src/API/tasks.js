import axios from 'axios';
import { API_URL } from '../constants';

// Get user tasks
export const fetchProjectTasks = (username, projectSlug, token) => {
  return axios.get(
    `${API_URL}/api/v1/${username}/project/${projectSlug}/task/`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `TOKEN ${token}`,
      },
    },
  );
};

// Create new task
export const postTask = (username, projectSlug, payload, token) => {
  return axios.post(
    `${API_URL}/api/v1/${username}/project/${projectSlug}/task/`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `TOKEN ${token}`,
      },
    },
  );
};

// Delete selected task
export const deleteTask = (username, projectSlug, taskId, token) => {
  return axios.delete(
    `${API_URL}/api/v1/${username}/project/${projectSlug}/task/${taskId}/`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `TOKEN ${token}`, // gommenasai
      },
    },
  );
};

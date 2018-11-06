import axios from 'axios';
import { API_URL } from '../constants';

// Get user projects
export const fetchUserProjects = (username, token) => {
  return axios.get(`${API_URL}/api/v1/${username}/project/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `TOKEN ${token}`,
    },
  });
};

// Create new project
export const createProject = (username, payload, token) => {
  return axios.post(`${API_URL}/api/v1/${username}/project/`, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `TOKEN ${token}`,
    },
  });
};

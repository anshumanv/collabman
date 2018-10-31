import axios from 'axios';
import { API_URL } from '../constants';

// Get user projects
export const fetchUserProjects = username => {
  return axios.get(`${API_URL}/api/v1/${username}/project/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'TOKEN 35357beeb260c710c15bbaa9b0deedbe859555f0',
    },
  });
};

// Create new project
export const createProject = (username, payload) => {
  return axios.post(`${API_URL}/api/v1/${username}/project/`, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'TOKEN 35357beeb260c710c15bbaa9b0deedbe859555f0',
    },
  });
};

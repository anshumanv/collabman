import axios from 'axios';
import { API_URL } from '../constants';

// Get user projects
export const fetchUserProjects = userId => {
  return axios.get(`${API_URL}/api/v1/project/${userId}/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'TOKEN 0702d860af5173686417121fe4300671ef9969ec',
    },
  });
};

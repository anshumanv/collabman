import axios from 'axios';
import { API_URL } from '../constants';

// Get project documents
export const fetchProjectDocuments = (username, projectSlug) => {
  return axios.get(
    `${API_URL}/api/v1/${username}/project/${projectSlug}/document/`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'TOKEN 0702d860af5173686417121fe4300671ef9969ec', // gommenasai
      },
    },
  );
};

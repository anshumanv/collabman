import axios from 'axios';
import { API_URL } from '../constants';

// Get project documents
export const fetchProjectDocuments = (username, projectSlug) => {
  return axios.get(
    `${API_URL}/api/v1/${username}/project/${projectSlug}/document/`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'TOKEN 35357beeb260c710c15bbaa9b0deedbe859555f0', // gommenasai
      },
    },
  );
};

// Create new doc
export const postDocument = (username, projectSlug, payload) => {
  return axios.post(
    `${API_URL}/api/v1/${username}/project/${projectSlug}/document/`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'TOKEN 35357beeb260c710c15bbaa9b0deedbe859555f0', // gommenasai
      },
    },
  );
};

// Delete selected doc
export const deleteDocument = (username, projectSlug, docId) => {
  return axios.delete(
    `${API_URL}/api/v1/${username}/project/${projectSlug}/document/${docId}/`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'TOKEN 35357beeb260c710c15bbaa9b0deedbe859555f0', // gommenasai
      },
    },
  );
};

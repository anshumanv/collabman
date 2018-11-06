import axios from 'axios';
import { API_URL } from '../constants';

// Get project documents
export const fetchProjectDocuments = (username, projectSlug, token) => {
  return axios.get(
    `${API_URL}/api/v1/${username}/project/${projectSlug}/document/`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `TOKEN ${token}`,
      },
    },
  );
};

// Create new doc
export const postDocument = (username, projectSlug, payload, token) => {
  return axios.post(
    `${API_URL}/api/v1/${username}/project/${projectSlug}/document/`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `TOKEN ${token}`,
      },
    },
  );
};

// Delete selected doc
export const deleteDocument = (username, projectSlug, docId, token) => {
  return axios.delete(
    `${API_URL}/api/v1/${username}/project/${projectSlug}/document/${docId}/`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `TOKEN ${token}`,
      },
    },
  );
};

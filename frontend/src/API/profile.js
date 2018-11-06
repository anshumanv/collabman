import axios from 'axios';
import { API_URL } from '../constants';

// Fetch user profile data
export const fetchProfileData = (username, token) => {
  return axios.get(`${API_URL}/api/v1/user/${username}/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `TOKEN ${token}`,
    },
  });
};

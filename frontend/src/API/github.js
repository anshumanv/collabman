import axios from 'axios';
import { GITHUB_API_URL } from '../constants';

// Get repository contributors
export const fetchRepoContributors = repoName => {
  return axios.get(
    `${GITHUB_API_URL}/repos/anshumanv/ongaku-desktop/stats/contributors`,
  );
};

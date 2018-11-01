import axios from 'axios';
import { GITHUB_API_URL } from '../constants';

// Get repository contributors
export const fetchRepoContributors = repoLink => {
  const [userName, repoName] = repoLink.split('/').slice(-2); // I love this
  return axios.get(
    `${GITHUB_API_URL}/repos/${userName}/${repoName}/stats/contributors`,
  );
};

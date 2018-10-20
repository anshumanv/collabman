import { githubActions } from '../constants';

import { fetchRepoContributors } from '../API/github';

export const fetchContributors = project => {
  return (dispatch, getState) => {
    return fetchRepoContributors(project)
      .then(response => {
        dispatch(contributorsFetched(response.data));
      })
      .catch(err => {
        dispatch(contributorsFailed());
      });
  };
};

const contributorsFetched = cons => {
  let contributors = [];
  cons.forEach(contributor => {
    contributors.push({
      username: contributor.author.login,
      commits: contributor.total,
    });
  });
  return {
    type: githubActions.FETCH_CONTRIBUTION_SUCCESS,
    contributors,
  };
};

const contributorsFailed = () => {
  return {
    type: githubActions.FETCH_CONTRIBUTION_FAILED,
  };
};

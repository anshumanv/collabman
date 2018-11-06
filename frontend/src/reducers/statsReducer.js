import { githubActions } from '../constants';

const initialState = {
  contributors: [],
  contributorsFetched: false,
};

export const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case githubActions.FETCH_CONTRIBUTION_SUCCESS:
      return {
        ...state,
        contributors: action.contributors,
        contributorsFetched: true,
      };
    case githubActions.FETCH_CONTRIBUTION_FAILED:
      return { ...state, contributorsFetched: true, contributors: [] };
    default:
      return state;
  }
};

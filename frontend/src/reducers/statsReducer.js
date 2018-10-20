import { statsActions } from '../constants';

const initialState = {
  contributors: [],
  contributorsFetched: false,
};

export const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case statsActions.FETCH_CONTRIBUTION_SUCCESS:
      return {
        ...state,
        contributors: action.contributors,
        contributorsFetched: true,
      };
    case statsActions.FETCH_CONTRIBUTION_FAILED:
      return state;
    default:
      return state;
  }
};

import { profileActions } from '../constants';

import { fetchProfileData } from '../API/profile';

export const fetchUserProfile = () => {
  return (dispatch, getState) => {
    const username = getState().auth.username;
    const token = getState().auth.token;
    return fetchProfileData(username, token)
      .then(response => {
        dispatch(profileFetched(response.data));
      })
      .catch(err => {
        dispatch(profileFailed());
      });
  };
};

const profileFetched = profile => {
  return {
    type: profileActions.PROFILE_FETCH_SUCCESS,
    profile: profile,
  };
};

const profileFailed = () => {
  return {
    type: profileActions.PROFILE_FETCH_FAILURE,
  };
};

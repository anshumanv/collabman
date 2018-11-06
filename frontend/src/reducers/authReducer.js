import { authActions, profileActions } from '../constants';

const initialState = {
  loggedIn: false,
  token: '',
  username: null,
  profile: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.AUTH_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        token: action.token,
        username: action.username,
      };
    case authActions.AUTH_FAILURE:
      return {
        ...state,
      };
    case profileActions.PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        profile: action.profile,
      };
    case profileActions.PROFILE_FETCH_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

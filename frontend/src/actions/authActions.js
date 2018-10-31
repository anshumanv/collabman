import { authActions } from '../constants';

export const authSuccess = (token, username) => {
  return (dispatch, getState) => {
    dispatch({
      type: authActions.AUTH_SUCCESS,
      token,
      username,
    });
  };
};

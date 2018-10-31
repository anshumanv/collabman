import { authActions } from '../constants';

export const authSuccess = token => {
  return (dispatch, getState) => {
    dispatch({
      type: authActions.AUTH_SUCCESS,
      token,
    });
  };
};

import { authActions } from '../constants';

const initialState = {
  loggedIn: false,
  token: '',
  username: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.AUTH_SUCCESS:
      console.log(action);
      return {
        ...state,
        loggedIn: true,
        token: action.token,
        username: action.username,
      };
    default:
      return state;
  }
};

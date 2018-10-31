import { authActions } from '../constants';

const initialState = {
  loggedIn: false,
  token: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.AUTH_SUCCESS:
      return { ...state, loggedIn: true, token: action.token };
    default:
      return state;
  }
};

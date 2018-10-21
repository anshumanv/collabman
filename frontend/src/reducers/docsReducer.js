import { documentActions } from '../constants';

const initialState = {
  docs: [],
  docsFetched: false,
};

export const docsReducer = (state = initialState, action) => {
  switch (action.type) {
    case documentActions.FETCH_DOCS_SUCCESS:
      return { ...state, docs: action.docs, docsFetched: true };
    case documentActions.FETCH_DOCS_FAILED:
      return state;
    default:
      return state;
  }
};

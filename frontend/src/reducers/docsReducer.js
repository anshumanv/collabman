import { documentActions } from '../constants';

const initialState = {
  docs: [],
  docsFetched: false,
  newDoc: {},
  postingNewDoc: false,
};

export const docsReducer = (state = initialState, action) => {
  switch (action.type) {
    case documentActions.FETCH_DOCS_SUCCESS:
      return { ...state, docs: action.docs, docsFetched: true };
    case documentActions.FETCH_DOCS_FAILED:
      return state;
    case documentActions.DOCUMENT_POST_SUCCESS:
      return { ...state, postingNewDoc: false, newDoc: action.newDoc };
    case documentActions.DOCUMENT_POST_FAILED:
      return { ...state, postingNewDoc: false };
    case documentActions.DOCUMENT_DELETE_SUCCESS:
      return state;
    case documentActions.DOCUMENT_DELETE_FAILED:
      return state;
    default:
      return state;
  }
};

import { documentActions } from '../constants';

import { fetchProjectDocuments } from '../API/documents';

export const fetchDocuments = (username, project) => {
  return (dispatch, getState) => {
    return fetchProjectDocuments(username, project)
      .then(response => {
        console.log(response.data);
        dispatch(docsFetched(response.data));
      })
      .catch(err => {
        dispatch(docsFailed());
      });
  };
};

const docsFetched = docs => {
  return {
    type: documentActions.FETCH_DOCS_SUCCESS,
    docs,
  };
};

const docsFailed = () => {
  return {
    type: documentActions.FETCH_DOCS_FAILED,
  };
};

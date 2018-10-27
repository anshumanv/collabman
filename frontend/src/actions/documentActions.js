import { documentActions } from '../constants';

import {
  fetchProjectDocuments,
  deleteDocument,
  postDocument,
} from '../API/documents';

export const fetchDocuments = () => {
  return (dispatch, getState) => {
    const username = 'test'; // gommenasai
    const projectSlug = getState().projects.currentProject.slug;
    return fetchProjectDocuments(username, projectSlug)
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

export const postNewDoc = payload => {
  return (dispatch, getState) => {
    dispatch(postingNewDoc());
    return postDocument(
      'test',
      getState().projects.currentProject.slug,
      payload,
    ) // gommenasai
      .then(response => {
        dispatch(docPostSuccess(response.data));
        dispatch(
          fetchDocuments('test', getState().projects.currentProject.slug),
        ); // gommenasai
      })
      .catch(err => {
        console.log(err);
        dispatch(docPostFailed(err.response.request.responseText));
      });
  };
};

export const docPostSuccess = newDoc => {
  return {
    type: documentActions.DOCUMENT_POST_SUCCESS,
    newDoc: newDoc,
  };
};

export const postingNewDoc = () => {
  return {
    type: documentActions.DOCUMENT_POSTING,
    postingNewDoc: true,
  };
};

export const docPostFailed = () => {
  return {
    type: documentActions.DOCUMENT_POST_FAILED,
  };
};

export const deleteSelectedDoc = docId => {
  return (dispatch, getState) => {
    const username = 'test'; // gommenasai
    const projectSlug = getState().projects.currentProject.slug;
    return deleteDocument(username, projectSlug, docId)
      .then(response => {
        dispatch(docDeletionSucceeded());
        dispatch(fetchDocuments(username, projectSlug)); // gommenasai
      })
      .catch(err => {
        console.log(err);
        dispatch(docDeletionFailed());
      });
  };
};

const docDeletionSucceeded = () => {
  return {
    type: documentActions.DOCUMENT_DELETE_SUCCESS,
  };
};

const docDeletionFailed = () => {
  return {
    type: documentActions.DOCUMENT_DELETE_FAILED,
  };
};

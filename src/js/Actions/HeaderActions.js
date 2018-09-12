import {BASE_URL} from "../utils/api_list";


export const FETCH_TITLE_BEGIN   = 'FETCH_TITLE_BEGIN';
export const FETCH_TITLE_SUCCESS = 'FETCH_TITLE_SUCCESS';
export const FETCH_TITLE_FAILURE = 'FETCH_TITLE_FAILURE';
export const FETCH_CHAPTER_SUCCESS = 'FETCH_CHAPTER_SUCCESS'
export const FETCH_QUESTION_TYPE_SUCCESS = "FETCH_QUESTION_TYPE_SUCCESS"
export const CHANGE_QUESTION_CATEGORY = "CHANGE_QUESTION_CATEGORY"


export const fetchTitleBegin = () => ({
  type: FETCH_TITLE_BEGIN
});

export const fetchSuccess = (data,action_type) => ({
  type: action_type,
  payload: { data }
});


export const fetchTitleError = error => ({
  type: FETCH_TITLE_FAILURE,
  payload: { error }
});



export const fetchHeaderData = (api_link,action_type) =>{
  return dispatch => {
    dispatch(fetchTitleBegin());
    return fetch(BASE_URL+api_link)
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      dispatch(fetchSuccess(json.data,action_type));
      return json.data;
    })
    .catch(error => dispatch(fetchTitleError(error)));
  };
}




export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

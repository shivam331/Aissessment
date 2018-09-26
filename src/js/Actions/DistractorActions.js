import {BASE_URL,API} from "../utils/api_list";
import handleErrors from './HeaderActions'

export const ADD_DISTRACTORS_BEGIN   = 'ADD_DISTRACTORS_BEGIN';
export const ADD_DISTRACTORS_SUCCESS = 'ADD_DISTRACTORS_SUCCESS';
export const ADD_DISTRACTORS_FAILURE = 'ADD_DISTRACTORS_FAILURE';
export const UPDATE_DISTRACTORS_SUCCESS = 'UPDATE_DISTRACTORS_SUCCESS'



export const addDistractorsBegin = () => ({
  type: ADD_DISTRACTORS_BEGIN
});

export const addDistractorsSuccess = (status) => ({
  type: ADD_DISTRACTORS_SUCCESS,
  payload: { status }
});

export const updateDistractorSuccess = (status) =>({
  type : UPDATE_DISTRACTORS_SUCCESS,
  payload: {status}
})
export const addDistractorsFailure = error => ({
  type: ADD_DISTRACTORS_FAILURE,
  payload: { error }
});



export const blacklistDistractors = (distractor) =>{
  return dispatch => {
    dispatch(addDistractorsBegin());
    return   fetch(BASE_URL+API.BLACKLIST_DISTRACTORS, {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({distractor:distractor})
    })    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
       console.log(json);
      dispatch(addDistractorsSuccess(json.status));
      return json.data;
    })
    .catch(error => dispatch(addDistractorsFailure(error)));
  };
}

export const updateDistractors = (data) =>{
  return dispatch => {
    dispatch(addDistractorsBegin());
    return   fetch(BASE_URL+API.UPDATE_DISTRACTORS, {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data)
    })    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
       console.log(json);
      dispatch(updateDistractorSuccess(json.status));
      return json.data;
    })
    .catch(error => dispatch(addDistractorsFailure(error)));
  };
}

import {BASE_URL,API} from "../utils/api_list";
import handleErrors from './HeaderActions'

export const SAVE_FEEDBACK_BEGIN   = 'SAVE_FEEDBACK_BEGIN';
export const SAVE_FEEDBACK_SUCCESS = 'SAVE_FEEDBACK_SUCCESS';
export const SAVE_FEEDBACK_FAILURE = 'SAVE_FEEDBACK_FAILURE';



 const saveFeedbackBegin = () => ({
  type: SAVE_FEEDBACK_BEGIN
});

 const saveFeedbackSuccess = (status) => ({
  type: SAVE_FEEDBACK_SUCCESS,
  payload: { status }
});


 const saveFeedbackFailure = error => ({
  type: SAVE_FEEDBACK_FAILURE,
  payload: { error }
});

export const submitfeedback = (feedback) =>{
  console.log(feedback);
return dispatch => {
  dispatch(saveFeedbackBegin())
  return   fetch(BASE_URL+API.SUBMIT_FEEDBACK, {
    method: 'post',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(feedback)
  })    .then(handleErrors)
  .then(res => res.json())
  .then(json => {
     console.log(json);
    dispatch(saveFeedbackSuccess(json.status));
     return json.status;
  })
  .catch(error => dispatch(saveFeedbackFailure(error)));
}
}

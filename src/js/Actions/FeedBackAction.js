import {BASE_URL,API} from "../utils/api_list";
import handleErrors from './HeaderActions'
import {question} from "../utils/Questions"

export const SAVE_FEEDBACK_BEGIN   = 'SAVE_FEEDBACK_BEGIN';
export const SAVE_FEEDBACK_SUCCESS = 'SAVE_FEEDBACK_SUCCESS';
export const SAVE_FEEDBACK_FAILURE = 'SAVE_FEEDBACK_FAILURE';
export const FETCH_FEEDBACK_QUESTION_BEGIN = 'FETCH_FEEDBACK_QUESTION_BEGIN'
export const FETCH_FEEDBACK_QUESTION_SUCCESS = 'FETCH_FEEDBACK_QUESTION_SUCCESS'
export const FETCH_FEEDBACK_QUESTION_FAILURE = 'FETCH_FEEDBACK_QUESTION_FAILURE'



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

const fetchQuestionBegin = () =>({
  type : FETCH_FEEDBACK_QUESTION_BEGIN
})

const fetchQuestionSuccess = (data,new_page_no,total) => ({
  type : FETCH_FEEDBACK_QUESTION_SUCCESS,
  payload : {data},
  new_page_no: new_page_no,
  total : total
})
const fetchQuestionError = (error) => ({
  type : FETCH_FEEDBACK_QUESTION_FAILURE,
  payload : {error}
})

export const submitfeedback = (feedback) =>{
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
    dispatch(saveFeedbackSuccess(json.status));
     return json.status;
  })
  .catch(error => dispatch(saveFeedbackFailure(error)));
}
}

export const feedbackQuestionFetch = (url,category_id,reset_questions,new_page_no) =>{
  console.log(BASE_URL + url);
  return dispatch =>{
  dispatch(fetchQuestionBegin())
  return fetch(BASE_URL + url)
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          let total = json.data.total
          let question_list = [...question(category_id,json,reset_questions)];

          dispatch(fetchQuestionSuccess(question_list,new_page_no,total));
        })
        .catch(error => dispatch(fetchQuestionError(error)));
  }
}

export const deleteFeedback = (postData) =>{
  console.log(postData);
     return   fetch(BASE_URL+API.DELETE_FEEDBACK, {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(postData)
    })    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(error => {return error});
}

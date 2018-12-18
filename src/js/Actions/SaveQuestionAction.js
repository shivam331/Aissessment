import handleErrors from './HeaderActions'
import {BASE_URL,API} from "../utils/api_list";

export const SAVE_QUESTION_BEGIN = "SAVE_QUESTION_BEGIN"
export const SAVE_QUESTION_SUCCESS =  "SAVE_QUESTION_SUCCESS"
export const SAVE_QUESTION_FAILURE = "SAVE_QUESTION_FAILURE"


const saveQuestionBegin = () =>({
  type : SAVE_QUESTION_BEGIN
})

const saveQuestionSuccess  = (status) =>({
  type : SAVE_QUESTION_SUCCESS,
  status : status
})
const saveQuestionFailure = (error) =>({
  type:SAVE_QUESTION_FAILURE,
  error : error
})


export const saveQuestion = (data,api) => {
console.log(api);
return dispatch =>{
   dispatch(saveQuestionBegin())
   return fetch(BASE_URL+api, {
     method: 'post',
     headers: {
       "Content-Type": "application/json; charset=utf-8",
     },
     body: JSON.stringify(data)
   })
   .then(handleErrors)
   .then(res => res.json())
   .then(json =>{
     console.log(json);
     dispatch(saveQuestionSuccess(json.status));
      return json.status;
   })
  .catch(error => dispatch(saveQuestionFailure(error)));
}

}

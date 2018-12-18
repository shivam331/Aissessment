import {question} from "../utils/Questions"
import handleErrors from './HeaderActions'
import {BASE_URL,API} from "../utils/api_list";


export const FETCH_QUESTION_BEGIN   = 'FETCH_QUESTION_BEGIN';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE';
export const LOAD_MORE_QUESTION = 'LOAD_MORE_QUESTION';
export const CHANGE_SORTING = "CHANGE_SORTING"


export const fetchQuestionBegin = () => ({
  type: FETCH_QUESTION_BEGIN
});

export const fetchQuestionSuccess = (data,action_type,new_page_no,total) => ({
  type: action_type,
  payload: { data },
  new_page_no: new_page_no,
  total : total
});


export const fetchQuestionError = error => ({
  type: FETCH_QUESTION_FAILURE,
  payload: { error }
});


const changeSorting = sortingBy =>({
  type : CHANGE_SORTING,
  sortingBy : sortingBy
})

export var fetchQuestionData = (api_link,action_type,category_id,new_page_no,reset_question) =>{

  return dispatch => {
    dispatch(fetchQuestionBegin());
    return fetch(BASE_URL+api_link)
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
       console.log(BASE_URL+api_link);
      let total = 0
      let question_list = []
      if(json.data.length != 0){
       total = json.data.total
     question_list = question(category_id,json,reset_question);
     }
      dispatch(fetchQuestionSuccess(question_list,action_type,new_page_no,total));
      return json.data;
    })
    .catch(error => dispatch(fetchQuestionError(error)));
  };
}




export const newSorting = (sortingBy) =>{
  return dispatch =>{
    dispatch(changeSorting(sortingBy))
  }
}

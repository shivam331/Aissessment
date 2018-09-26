import {question} from "../utils/Questions"
import handleErrors from './HeaderActions'
import {BASE_URL} from "../utils/api_list";


export const FETCH_QUESTION_BEGIN   = 'FETCH_QUESTION_BEGIN';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE';
export const LOAD_MORE_QUESTION = 'LOAD_MORE_QUESTION';
export const CHANGE_CHAPTER = "CHANGE_CHAPTER"
export const CHANGE_QUESTION_TYPE = "CHANGE_QUESTION_TYPE"
export const CHANGE_QUESTION_CATEGORY = "CHANGE_QUESTION_CATEGORY"


export const fetchQuestionBegin = () => ({
  type: FETCH_QUESTION_BEGIN
});

export const fetchQuestionSuccess = (data,action_type,new_page_no) => ({
  type: action_type,
  payload: { data },
  new_page_no: new_page_no
});


export const fetchQuestionError = error => ({
  type: FETCH_QUESTION_FAILURE,
  payload: { error }
});

export const changeChapter = chapter =>({
  type: CHANGE_CHAPTER,
  chapter : chapter
})

export const changeType = questiontype =>({
  type : CHANGE_QUESTION_TYPE,
  questiontype : questiontype
})

export const changeCategory = category_id =>({
  type : CHANGE_QUESTION_CATEGORY,
  category_id : category_id
})



export var fetchQuestionData = (api_link,action_type,category_id,new_page_no,reset_question) =>{
  return dispatch => {
    dispatch(fetchQuestionBegin());
    return fetch(BASE_URL+api_link)
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
       console.log(BASE_URL+api_link);
      let question_list = question(category_id,json,reset_question);
      dispatch(fetchQuestionSuccess(question_list,action_type,new_page_no));
      return json.data;
    })
    .catch(error => dispatch(fetchQuestionError(error)));
  };
}

export var newChapter = (chapter) =>{
  return dispatch => {
    dispatch(changeChapter(chapter))
  }
}

export var newType = (questiontype) =>{
  return dispatch => {
    dispatch(changeType(questiontype))
  }
}

export var newCategory = category_id =>{
  return dispatch => {
    dispatch(changeCategory(category_id))
  }
}

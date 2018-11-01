import {question} from "../utils/Questions"
import handleErrors from './HeaderActions'
import {BASE_URL,API} from "../utils/api_list";


export const FETCH_QUESTION_BEGIN   = 'FETCH_QUESTION_BEGIN';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE';
export const LOAD_MORE_QUESTION = 'LOAD_MORE_QUESTION';
export const CHANGE_CHAPTER = "CHANGE_CHAPTER"
export const CHANGE_QUESTION_TYPE = "CHANGE_QUESTION_TYPE"
export const CHANGE_QUESTION_CATEGORY = "CHANGE_QUESTION_CATEGORY"
export const CHANGE_VIEW_MODE = "CHANGE_VIEW_MODE"


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

const changeMode = (mode) =>({
  type :CHANGE_VIEW_MODE,
  editingMode : mode
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
       total = json.data[0].total
     question_list = question(category_id,json,reset_question);
     }
      dispatch(fetchQuestionSuccess(question_list,action_type,new_page_no,total));
      return json.data;
    })
    .catch(error => dispatch(fetchQuestionError(error)));
  };
}

export const pagesContext = (book_id) =>{

return  fetch(BASE_URL+ API.CONTEXT + book_id)
  .then(handleErrors)
  .then(res => res.json())
  .then(json => {
    return json;
  })
  .catch(error => console.log(error));
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

export var newMode = (editingMode) =>{
  return dispatch =>{
    dispatch(changeMode(editingMode))
  }
}

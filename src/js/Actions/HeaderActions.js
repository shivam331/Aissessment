import {BASE_URL,API} from "../utils/api_list";

export const FETCH_TITLE_BEGIN   = 'FETCH_TITLE_BEGIN';
export const FETCH_TITLE_SUCCESS = 'FETCH_TITLE_SUCCESS';
export const FETCH_TITLE_FAILURE = 'FETCH_TITLE_FAILURE';
export const FETCH_CHAPTER_SUCCESS = 'FETCH_CHAPTER_SUCCESS'
export const FETCH_QUESTION_TYPE_SUCCESS = "FETCH_QUESTION_TYPE_SUCCESS"
export const CHANGE_QUESTION_CATEGORY = "CHANGE_QUESTION_CATEGORY"
export const CHANGE_CHAPTER = "CHANGE_CHAPTER"
export const CHANGE_QUESTION_TYPE = "CHANGE_QUESTION_TYPE"
export const CHANGE_VIEW_MODE = "CHANGE_VIEW_MODE"
export const DATA_COUNT_SUCCESS =  "DATA_COUNT_SUCCESS"
export const BOOK_CONTEXT_SUCCESS = "BOOK_CONTEXT_SUCCESS"

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

const dataCountSuccess = (data) =>({
  type : DATA_COUNT_SUCCESS,
  payload : {data}
})

const bookContextSuccess = (data) =>({
  type : BOOK_CONTEXT_SUCCESS,
  payload : data
})

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

export var dataCount = (book_id,chapter,type) =>{
  return dispatch => {
    return fetch(BASE_URL+API.DATA_COUNT + book_id + "/" + chapter + "/" + type)
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      dispatch(dataCountSuccess(json.data))
    })
    .catch(error => dispatch(fetchTitleError(error)));
  }
}

export const pagesContext = (book_id) =>{

return  dispatch=>{
  return fetch(BASE_URL+ API.CONTEXT + book_id)
  .then(handleErrors)
  .then(res => res.json())
  .then(json => {
    dispatch(bookContextSuccess(json.data))
    return json;
  })
  .catch(error => console.log(error));
}}


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


export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

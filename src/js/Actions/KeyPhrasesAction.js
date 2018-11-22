import handleErrors from './HeaderActions'
import {BASE_URL,API} from "../utils/api_list";
import {question} from "../utils/Questions"

export const FETCH_KEYPHRASES_BEGIN = "FETCH_KEYPHRASES_BEGIN"
export const FETCH_KEYPHRASES_SUCCESS = "FETCH_KEYPHRASES_SUCCESS"
export const FETCH_KEYPHRASES_FAILURE = "FETCH_KEYPHRASES_FAILURE"
export const SAVE_KEYPHRASES_RATING_BEGIN = "SAVE_KEYPHRASES_RATING_BEGIN"
export const SAVE_KEYPHRASES_RATING_SUCCESS = "SAVE_KEYPHRASES_RATING_SUCCESS"
export const SAVE_KEYPHRASES_RATING_FAILURE = "SAVE_KEYPHRASES_RATING_FAILURE"
export const LOAD_MORE_KEYPHRASES = "LOAD_MORE_KEYPHRASES"
export const RESET_KEYPHRASES_STATE = "RESET_KEYPHRASES_STATE"
export const FETCH_KEYPHRASES_COUNT_SUCCESS =  "FETCH_KEYPHRASES_COUNT_SUCCESS"

 const fetchKeyPhrasesBegin = () => ({
  type: FETCH_KEYPHRASES_BEGIN
});

 const fetchKeyPhrasesSuccess = (data,action_type,new_page_no,total) => ({
  type: action_type,
  payload: { data },
  new_page_no: new_page_no,
  total : total
});


 const fetchKeyPhrasesError = error => ({
  type: FETCH_KEYPHRASES_FAILURE,
  payload: { error }
});

const saveKeyPhrasebegin = () =>({
    type: SAVE_KEYPHRASES_RATING_BEGIN
})

const saveKeyPhrasesSuccess = (status) =>({
    type: SAVE_KEYPHRASES_RATING_SUCCESS,
    payload: { status }
})
const saveKeyPhrasesFailed = (err) =>({
    type: SAVE_KEYPHRASES_RATING_FAILURE,
    payload: { error }
})

const resetState = () =>({
  type : RESET_KEYPHRASES_STATE
})

const fetchKeyPhraseCountSuccess = (data) =>({
  type : FETCH_KEYPHRASES_COUNT_SUCCESS,
  payload : {data}
})

export var fetchKeyPhrases = (api_link,action_type,category_id,new_page_no,reset_question) =>{
  return dispatch => {
    dispatch(fetchKeyPhrasesBegin());
    return fetch(BASE_URL+api_link)
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      let question_list = []
     question_list = question(category_id,json,reset_question);
 let total = json.data[0].total
      dispatch(fetchKeyPhrasesSuccess(question_list,action_type,new_page_no,total));
    })
    .catch(error => dispatch(fetchKeyPhrasesError(error)));
  };
}

export var saveKeyphraseRating = (data) =>{
  return dispatch => {
    dispatch(saveKeyPhrasebegin())
    return   fetch(BASE_URL+API.SAVE_KEYPHRASES_RATING, {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data)
    })    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      dispatch(saveKeyPhrasesSuccess(json.status));
        return json.status;
    })
    .catch(error => dispatch(saveKeyPhrasesFailed(error)));
  }
}

export var keyPhrasesCount = (book_id) =>{

  return dispatch => {
    dispatch(fetchKeyPhrasesBegin());
    return fetch(BASE_URL+API.KEYPHRASES_COUNT + book_id)
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      dispatch(fetchKeyPhraseCountSuccess(json.data))
      // return json
    })
    .catch(error => dispatch(fetchKeyPhrasesError(error)));
  }

}


export var resetKeyphrasesState = () =>{
  return dispatch=>{
    dispatch(resetState())
  }
}

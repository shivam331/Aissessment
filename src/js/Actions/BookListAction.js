import {BASE_URL,API} from "../utils/api_list";
import handleErrors from './HeaderActions'

export const FETCH_BOOKLIST_BEGIN   = 'FETCH_BOOKLIST_BEGIN';
export const FETCH_BOOKLIST_SUCCESS = 'FETCH_BOOKLIST_SUCCESS';
export const FETCH_BOOKLIST_FAILURE = 'FETCH_BOOKLIST_FAILURE';
export const CHANGE_BOOK_ID = 'CHANGE_BOOK_ID'
export const SHOW_QUESTIONS  = "SHOW_QUESTIONS"
export const FETCH_BOOK_METADATA_BEGIN = "FETCH_BOOK_METADATA_BEGIN"
export const FETCH_BOOK_METADATA_SUCCESS = "FETCH_BOOK_METADATA_SUCCESS"
export const FETCH_BOOK_METADATA_FAILURE = "FETCH_BOOK_METADATA_FAILURE"


 const fetchBooksBegin = () => ({
  type: FETCH_BOOKLIST_BEGIN
});

 const fetchBooksSuccess = (books) => ({
  type: FETCH_BOOKLIST_SUCCESS,
  payload: { books }
});

 const fetchBooksFailure = (error) => ({
  type: FETCH_BOOKLIST_FAILURE,
  payload: { error }
});

 const changeCurrentBook = (bookid,showQuestions) =>({
  type : CHANGE_BOOK_ID,
  bookid : bookid,
  showQuestions:showQuestions
})

const fetchBookMetaDataBegin = () =>({
  type : FETCH_BOOK_METADATA_BEGIN,
})

 const fetchBookMetaDataSuccess = (data) => ({
  type: FETCH_BOOK_METADATA_SUCCESS,
  payload: {data}
})
const fetchBookMetaDatafailure = (error) =>({
  type : FETCH_BOOK_METADATA_FAILURE
})

export const fetchBookList = () =>{
  return dispatch => {
    dispatch(fetchBooksBegin());
    return fetch(BASE_URL+API.BOOKS)
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      console.log(BASE_URL+API.BOOKS);
      // console.log(json.data);
      dispatch(fetchBooksSuccess(json.data));
      //return json.data;
    })
    .catch(error => dispatch(fetchBooksFailure(error)));
  };
}

export const fetchBookActivitySummary = () =>{
  return dispatch => {
dispatch(fetchBookMetaDataBegin());
return fetch(BASE_URL+API.BOOKS_METADATA)
.then(handleErrors)
.then(res => res.json())
.then(json => {
  console.log(BASE_URL+API.BOOKS_METADATA);
  // console.log(json.data);
  dispatch(fetchBookMetaDataSuccess(json.data));
  //return json.data;
})
.catch(error => dispatch(fetchBookMetaDatafailure(error)));
  }
}


export var setCurrentBookId = (bookid,showQuestions) =>{
  return dispatch => {
    dispatch(changeCurrentBook(bookid,showQuestions))
  }
}

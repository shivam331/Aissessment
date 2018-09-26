import {BASE_URL,API} from "../utils/api_list";
import handleErrors from './HeaderActions'

export const FETCH_BOOKLIST_BEGIN   = 'FETCH_BOOKLIST_BEGIN';
export const FETCH_BOOKLIST_SUCCESS = 'FETCH_BOOKLIST_SUCCESS';
export const FETCH_BOOKLIST_FAILURE = 'FETCH_BOOKLIST_FAILURE';
export const CHANGE_BOOK_ID = 'CHANGE_BOOK_ID'


export const fetchBooksBegin = () => ({
  type: FETCH_BOOKLIST_BEGIN
});

export const fetchBooksSuccess = (books) => ({
  type: FETCH_BOOKLIST_SUCCESS,
  payload: { books }
});

export const fetchBooksFailure = (error) => ({
  type: FETCH_BOOKLIST_FAILURE,
  payload: { error }
});

export const changeCurrentBook = bookid =>({
  type : CHANGE_BOOK_ID,
  bookid : bookid
})

export const fetchBookList = () =>{
  return dispatch => {
    dispatch(fetchBooksBegin());
    return fetch(BASE_URL+API.BOOKS)
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      dispatch(fetchBooksSuccess(json.data));
      //return json.data;
    })
    .catch(error => dispatch(fetchBooksFailure(error)));
  };
}


export var setCurrentBookId = (bookid) =>{
  return dispatch => {
    dispatch(changeCurrentBook(bookid))
  }
}

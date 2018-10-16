import {FETCH_BOOKLIST_BEGIN,
       FETCH_BOOKLIST_SUCCESS,
       FETCH_BOOKLIST_FAILURE,
       CHANGE_BOOK_ID
} from '../Actions/BookListAction';

const bookCache = localStorage.getItem('book')
const initialState = {
  Books: [],
  loading: false,
  error: null,
  currentBookId : bookCache && JSON.parse(bookCache).id,
  showQuestions : true
}

export  const  BookListReducer = (state = initialState, action) =>{

  switch (action.type) {
    case FETCH_BOOKLIST_BEGIN:
    return Object.assign({}, state, {
      loading: true,
      error: null
    });

    case FETCH_BOOKLIST_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      Books: action.payload.books
    });

    case FETCH_BOOKLIST_FAILURE:
    return Object.assign({}, state, {
      loading: false,
      error: action.payload.error,
      Books: []
    });

    case CHANGE_BOOK_ID:
    localStorage.setItem('book',JSON.stringify({id:action.bookid}))
    return Object.assign({}, state, {
      currentBookId : action.bookid,
      showQuestions : action.showQuestions
    })

    default:
     return state;
  }

}

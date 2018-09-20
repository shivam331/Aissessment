import {FETCH_BOOKLIST_BEGIN,
       FETCH_BOOKLIST_SUCCESS,
       FETCH_BOOKLIST_FAILURE
} from '../Actions/BookListAction';

const initialState = {
  Books: [],
  loading: false,
  error: null,
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
    default:
     return state;
  }

}

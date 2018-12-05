import {
  FETCH_QUESTION_BEGIN,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  LOAD_MORE_QUESTION,
  CHANGE_SORTING
} from '../Actions/QuestionBoxActions';

const initialState = {
  questions: [],
  loading: false,
  error: null,
  page_no : 0,
  total : 0,
  sorting : "Default"
};


export default function questionBoxReducer(state = initialState, action) {
  switch(action.type) {

    case FETCH_QUESTION_BEGIN:
    return Object.assign({}, state, {
      loading: true,
      error: null,
      questions: [],
    });

    case FETCH_QUESTION_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      questions: action.payload.data,
      page_no: action.new_page_no,
      total : action.total
    });


    case FETCH_QUESTION_FAILURE:
    return Object.assign({}, state, {
      loading: false,
      error: action.payload.error,
      questions: []
    });

    case LOAD_MORE_QUESTION:
      // return Object.assign({},state)
    return Object.assign({},state,{
      loading : false,
      questions:  action.payload.data,
      page_no: action.new_page_no
    })

    case CHANGE_SORTING:
    return Object.assign({}, state, {
      sorting : action.sortingBy,
    })



    default:
    return state;
  }
}

import {
  FETCH_QUESTION_BEGIN,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  LOAD_MORE_QUESTION,
  CHANGE_CHAPTER,
  CHANGE_QUESTION_TYPE,
  CHANGE_QUESTION_CATEGORY,
  CHANGE_VIEW_MODE,
  CHANGE_SORTING
} from '../Actions/QuestionBoxActions';
// import {CHANGE_BOOK_ID} from '../Actions/BookListAction'
const modeCache = localStorage.getItem('editingMode')
const initialState = {
  // current_book_id : "",
  questions: [],
  loading: false,
  error: null,
  page_no : 0,
  chapter : "All Chapters",
  questiontypes : "Example",
  current_category : 1,
  total : 0,
  editingMode:  modeCache && JSON.parse(modeCache).status,
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

    case CHANGE_CHAPTER:
    return Object.assign({},state,{
      page_no : 0,
      chapter : action.chapter,
      // questions: []
    })
    case CHANGE_QUESTION_TYPE:
    return Object.assign({},state,{
      page_no : 0,
      questiontypes : action.questiontype,
      // questions: []
    })
    case CHANGE_VIEW_MODE:
    localStorage.setItem('editingMode',JSON.stringify({status:action.editingMode}))
    return  Object.assign({},state,{
      page_no : 0,
      editingMode : action.editingMode,
      // questions: []
    })

    case CHANGE_QUESTION_CATEGORY:
    return Object.assign({}, state, {
      current_category : action.category_id
    })

    case CHANGE_SORTING:
    return Object.assign({}, state, {
      sorting : action.sortingBy,
      page_no : 0
    })



    default:
    return state;
  }
}

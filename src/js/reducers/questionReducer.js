import {
  FETCH_QUESTION_BEGIN,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  LOAD_MORE_QUESTION,
  CHANGE_CHAPTER,
  CHANGE_QUESTION_TYPE
} from '../Actions/QuestionBoxActions';

const initialState = {
  questions: [],
  loading: false,
  error: null,
  page_no : 0,
  chapter : "All Chapters",
  questiontypes : "All Question Types"
};


  export default function questionBoxReducer(state = initialState, action) {
    switch(action.type) {

      case FETCH_QUESTION_BEGIN:
        return Object.assign({}, state, {
          loading: true,
          error: null
        });

      case FETCH_QUESTION_SUCCESS:
        return Object.assign({}, state, {
          loading: false,
          questions: action.payload.data
        });


      case FETCH_QUESTION_FAILURE:
        return Object.assign({}, state, {
          loading: false,
          error: action.payload.error,
          questions: []
        });

      case LOAD_MORE_QUESTION:
      return Object.assign({},state,{
        loading : false,
        questions:  action.payload.data,
        page_no: action.new_page_no
      })

      case CHANGE_CHAPTER:
      return Object.assign({},state,{
        page_no : 0,
        chapter : action.chapter
      })
      case CHANGE_QUESTION_TYPE:
      return Object.assign({},state,{
        page_no : 0,
        questiontypes : action.questiontype
      })
      default:
        return state;
    }
}

const  new_page_no = () => {

}

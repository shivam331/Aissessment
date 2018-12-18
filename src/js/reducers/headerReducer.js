import {
  FETCH_TITLE_BEGIN,
  FETCH_TITLE_SUCCESS,
  FETCH_CHAPTER_SUCCESS,
  FETCH_QUESTION_TYPE_SUCCESS,
  FETCH_TITLE_FAILURE,
  SHOW_QUESTIONS,
  CHANGE_CHAPTER,
  CHANGE_QUESTION_TYPE,
  CHANGE_VIEW_MODE,
  CHANGE_QUESTION_CATEGORY,
  DATA_COUNT_SUCCESS,
  BOOK_CONTEXT_SUCCESS
} from '../Actions/HeaderActions';
import {QuestionCode,QuestionTypes} from '../utils/Constants'

const modeCache = localStorage.getItem('editingMode')
const initialState = {
  title: "",
  loading: false,
  error: null,
  currentChapter : "All Chapters",
  currentQuestiontype : "Example", // It refer to the content type like date, example, etc.
  chapters : ["All Chapters"],
  questionstype : ["All Question Types"],
  editingMode:  modeCache && JSON.parse(modeCache).status,
  current_category : QuestionCode.MultipleChoice,
  totalQuestion : 0,
  savedQuestion : 0,
  totalKeyphrases : 0,
  rankedKeyphrases : 0,
  context : [],
  questionCategories : QuestionTypes
};

export default function titleReducer(state = initialState, action) {

  switch(action.type) {
    case FETCH_TITLE_BEGIN:
    return Object.assign({}, state, {
      loading: true,
      error: null
    });

    case FETCH_TITLE_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      title: action.payload.data
    });

    case FETCH_CHAPTER_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      chapters: ["All Chapters", ...action.payload.data[0].chapter.sort()]
    });
    case FETCH_QUESTION_TYPE_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      questionstype: ["All Question Types", ...action.payload.data.sort()]
    });
    case FETCH_TITLE_FAILURE:
    return Object.assign({}, state, {
      loading: false,
      error: action.payload.error,
      title: ""
    });

    case CHANGE_CHAPTER:
    return Object.assign({},state,{
      // page_no : 0,
      currentChapter : action.chapter,
      // questions: []
    })

    case CHANGE_QUESTION_TYPE:
    return Object.assign({},state,{
      // page_no : 0,
      currentQuestiontype : action.questiontype,
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

    case DATA_COUNT_SUCCESS:
    return Object.assign({}, state, {
      totalQuestion : action.payload.data.totalQuestion,
      savedQuestion : action.payload.data.savedQuestion,
      totalKeyphrases : action.payload.data.totalKeyphrases,
      rankedKeyphrases : action.payload.data.rankedKeyPhrases
    })

    case BOOK_CONTEXT_SUCCESS:
    return Object.assign({},state,{
      context : action.payload
    })

    default:
    return state;
  }
}

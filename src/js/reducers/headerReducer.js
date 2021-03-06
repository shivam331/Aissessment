import {
  FETCH_TITLE_BEGIN,
  FETCH_TITLE_SUCCESS,
  FETCH_CHAPTER_SUCCESS,
  FETCH_QUESTION_TYPE_SUCCESS,
  FETCH_TITLE_FAILURE
} from '../Actions/HeaderActions';

const initialState = {
  title: "",
  loading: false,
  error: null,
  chapters : ["All Chapters"],
  questionstype : ["All Question Types"]
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


    default:
    return state;
  }
}

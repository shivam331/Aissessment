import {
SAVE_FEEDBACK_BEGIN,
SAVE_FEEDBACK_SUCCESS,
SAVE_FEEDBACK_FAILURE,
FETCH_FEEDBACK_QUESTION_BEGIN,
FETCH_FEEDBACK_QUESTION_SUCCESS,
FETCH_FEEDBACK_QUESTION_FAILURE
} from '../Actions/FeedBackAction'


const initialState = {
  loading: false,
  error: null,
  status : "failure",
  questions :[],
  page_no : 0,
  total : 0,
}

export  const  feedbackReducer = (state = initialState, action) =>{
// console.log(action);
  switch (action.type) {
    case SAVE_FEEDBACK_BEGIN:
    return Object.assign({}, state, {
      loading: true,
      error: null,
      status : "failure"
    });

    case SAVE_FEEDBACK_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      status : action.payload.status
    });

    case SAVE_FEEDBACK_FAILURE:
    return Object.assign({}, state, {
      loading: false,
      error: action.payload.error,
      status: "failure"
    });

    case FETCH_FEEDBACK_QUESTION_BEGIN:
    // console.log("in the begin");
    return Object.assign({},state,{
      loading : true,
      error : null,
      // questions : []
    })

    case FETCH_FEEDBACK_QUESTION_SUCCESS:

    return Object.assign({},state,{
      loading : false,
      questions : action.payload.data,
      page_no : action.new_page_no,
      total : action.total
    })

    case FETCH_FEEDBACK_QUESTION_FAILURE:
    return Object.assign({},state,{
      loading: false,
      error : action.payload.error
    })

    default:
     return state;
  }

}

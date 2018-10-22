import {
SAVE_QUESTION_BEGIN,
SAVE_QUESTION_SUCCESS,
SAVE_QUESTION_FAILURE
} from '../Actions/SaveQuestionAction'


const initialState = {
  loading: false,
  error: null,
  status : "failure"
}


export  const  saveQuestionReducer = (state = initialState, action) =>{

  switch (action.type) {
    case SAVE_QUESTION_BEGIN:
    return Object.assign({}, state, {
      loading: true,
      error: null,
      status : "failure"
    });

    case SAVE_QUESTION_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      status : action.status
    });

    case SAVE_QUESTION_FAILURE:
    return Object.assign({}, state, {
      loading: false,
      error: action.error,
      status: "failure"
    });
    default:
     return state;
  }

}

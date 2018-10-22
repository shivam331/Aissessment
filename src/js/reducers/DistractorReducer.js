import {ADD_DISTRACTORS_BEGIN,
       ADD_DISTRACTORS_SUCCESS,
       ADD_DISTRACTORS_FAILURE,
       UPDATE_DISTRACTORS_SUCCESS
} from '../Actions/DistractorActions';

const initialState = {
  loading: false,
  error: null,
  status : "failure"
}

export  const  blacklistDistractorsReducer = (state = initialState, action) =>{

  switch (action.type) {
    case ADD_DISTRACTORS_BEGIN:
    return Object.assign({}, state, {
      loading: true,
      error: null,
      status : "failure"
    });

    case ADD_DISTRACTORS_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      status : action.payload.status
    });

    case UPDATE_DISTRACTORS_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      status : action.payload.status
    });

    case ADD_DISTRACTORS_FAILURE:
    return Object.assign({}, state, {
      loading: false,
      error: action.payload.error,
      status: "failure"
    });
    default:
     return state;
  }

}

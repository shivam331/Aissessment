import {USER_SIGNIN_BEGIN,
       USER_SIGNIN_SUCCESS,
       USER_SIGNIN_FAILURE
} from '../Actions/loginActions';

const initialState = {
  user: "",
  loading: false,
  error: null,
}

export  const  loginReducer = (state = initialState, action) =>{

  switch (action.type) {
    case USER_SIGNIN_BEGIN:
    return Object.assign({}, state, {
      loading: true,
      error: null
    });

    case USER_SIGNIN_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      user: action.payload.user
    });

    case USER_SIGNIN_FAILURE:
    return Object.assign({}, state, {
      loading: false,
      error: action.payload.error,
      user: ""
    });
    default:
     return state;
  }

}

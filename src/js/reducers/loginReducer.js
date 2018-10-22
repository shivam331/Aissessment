import {USER_SIGNIN_BEGIN,
       USER_SIGNIN_SUCCESS,
       USER_SIGNIN_FAILURE,
       USER_LOGOUT_SUCCESS
} from '../Actions/loginActions';

  // loading: (authCache && JSON.parse(authCache).user) || false

const authCache = localStorage.getItem('auth')
const authName = localStorage.getItem('authName')
const initialState = {
  user:  authCache && JSON.parse(authCache).user,
  name: authName && JSON.parse(authName).name,
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
      user: action.payload.user,
      name: action.payload.name
    });

    case USER_SIGNIN_FAILURE:
    return Object.assign({}, state, {
      loading: false,
      error: action.payload.error,
    });

    case USER_LOGOUT_SUCCESS:
    return Object.assign({}, state, {
     user : undefined,
     loading : false
     });


    default:
     return state;
  }

}

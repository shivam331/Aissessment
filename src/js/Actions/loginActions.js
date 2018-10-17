import handleErrors from './HeaderActions'
import {BASE_URL,API} from "../utils/api_list";


export const USER_SIGNIN_BEGIN   = 'USER_SIGNIN_BEGIN';
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
export const USER_SIGNIN_FAILURE = 'USER_SIGNIN_FAILURE';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'

export const userLoginBegin = () => ({
  type: USER_SIGNIN_BEGIN
});

export const userLoginSuccess = (user,name) => ({
  type: USER_SIGNIN_SUCCESS,
  payload: { user,name }
});

export const userLoginFailure = (error) => ({
  type: USER_SIGNIN_FAILURE,
  payload: { error }
});

export const userLogOutSuccess = () =>({
  type: USER_LOGOUT_SUCCESS
})


export const userlogin = (credentials) =>{
  return dispatch => {
    dispatch(userLoginBegin());
    return   fetch(BASE_URL+API.LOGIN, {
    method: 'post',
    headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
    body: JSON.stringify(credentials)
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      let user = json.data.email
      let name = json.data.name
      console.log("name-------------  "+name);
      if (json.data.email === undefined) {
        user = ""
      }
      localStorage.setItem('auth',JSON.stringify({user}));
      localStorage.setItem('authName',JSON.stringify({name}));
      dispatch(userLoginSuccess(user,name));
    //  return json.data;
    })
    .catch(error => dispatch(userLoginFailure(error)));
  };
}

export const userLogOut = () =>{
  localStorage.setItem('auth',JSON.stringify({}));
  localStorage.setItem('authName',JSON.stringify({}));
  return dispatch=>
{  dispatch(userLogOutSuccess())}
}

import axios from 'axios';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

export function signUpAction({firstName, lastName, email, userName, password}, history){
  return async (dispatch) => {
    try {
      const res = await axios.post('api/auth/signup', {firstName, lastName, email, userName, password});
      dispatch({ type: UNAUTHENTICATED});
      history.push('/signin');
    } catch(error) {
      // console.log(error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: error.response.data.error
      });
    }
  }
}

export function signInAction({ userName, password }, history) {
  return async (dispatch) => {
    try {
      const res = await axios.post('api/auth//signin', { userName, password });
      localStorage.setItem('userName', userName)
      dispatch({ type: AUTHENTICATED});
      localStorage.setItem('user', res.data.token);
      history.push('/');
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}

export function signOutAction() {
  localStorage.clear();
  return {
    type: UNAUTHENTICATED
  };
}

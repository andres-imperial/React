import axios from 'axios';


export function userSignupRequest(userData){
  return dispatch => {
    return axios.post('/api/users', userData)
    .then((res) =>{
      console.log(res);
    })
    .catch(e =>{
      console.log(e.response);
      return Promise.reject(e.response);
    });
  }
}

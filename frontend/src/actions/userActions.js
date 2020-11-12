import axios from 'axios';

export const displayNextUsersSet = (token, url) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${url}`,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((userdata) => {
        // console.log(userdata);

        dispatch({
          type: 'USER_SUCCESS',
          user: {
            ...userdata
          }
        });
      })
      .catch((err) => {
        // console.log(err);
        if (err.response.status === 401) {
          dispatch({
            type: 'USER_ERROR',
            err,
            errorCode: 401
          });
        }
        dispatch({ type: 'USER_ERROR', err, errorCode: 400 });
      });
  };
};

export const createUser = (email, token) => {
  // console.log(token, password, email);
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_USERS}`,
      headers: {
        Authorization: 'Token '.concat(token),
        'Content-Type': 'application/json'
      },
      data: {
        email: email
      }
    })
      .then((userdata) => {
        // console.log(userdata.data);
        dispatch({
          type: 'CREATE_USER_SUCCESS',
          createUser: true
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({ type: 'USER_ERROR', errorDetails: err.response.data });
      });
  };
};

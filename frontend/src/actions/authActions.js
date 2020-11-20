import axios from 'axios';
import 'regenerator-runtime/runtime';

export const signIn = (credentials) => {
  const {email} = JSON.parse(credentials);
  var config = {
    method: 'POST',
    url: `${process.env.REACT_APP_LOGIN_URL}`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : credentials
  };

  return async (dispatch) => {
    dispatch({
      type: 'LOGIN_LOADING',
      state: {
        token: 'loading'
      }
    });

    // fetch(`${process.env.REACT_APP_LOGIN_URL}`, requestOptions)
    return await axios(config)
      // .then((response) => response.json())
      .then((resp) => {
        if (resp.message) {
          dispatch({
            type: 'LOGIN_ERROR',
            errorDetails: resp.message
          });
        } else {
          axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_PROFILES}`,
            headers: {
              Authorization: 'Token '.concat(resp.data.token)
            }
          })
            .then((res) => {
              // console.log(res);
              const loginState = {
                ...res.data.results[0],
                email: email,
                token: resp.data.token,
                location: 'affiliatesDashboard'
              }
              // console.log(loginState.token, loginState.email);
              localStorage.setItem('auth', JSON.stringify(loginState));
              dispatch({
                type: 'LOGIN_SUCCESS',
                state: {
                  ...loginState
                }
              });
            })
            .catch((err) => {
              console.log(err);
              dispatch({ type: 'LOGIN_ERROR', err });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  }
};

export const logOut = (token) => {
  return async (dispatch) => {
    return axios({
      method: 'POST',
      url: `${process.env.REACT_APP_LOGOUT_URL}`,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((res) => {
        dispatch({
          type: 'LOG_OUT',
          state: {
            firstname: null,
            lastname: null,
            useremail: null,
            token: null,
            image: null
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: 'LOGIN_ERROR',
          state: {
            firstname: null,
            lastname: null,
            useremail: null,
            token: null,
            image: null
          }
        });
      });
  };
};

export const setNewLocation = (newLocation) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_LOCATION',
      newLocation: newLocation
    });

  }
};

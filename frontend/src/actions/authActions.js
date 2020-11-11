import axios from 'axios';

export const signIn = (credentials) => {
  const {email} = JSON.parse(credentials);
  console.log(email);
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'csrftoken=4bI7Q82EiKpReY68yzqnVcfokOMQlUUiEXBCnywbyrFMRNEHIUkWH0sQgVARbRz5'
  );

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: credentials,
    redirect: 'follow'
  };

  return (dispatch) => {
    dispatch({
      type: 'LOGIN_LOADING',
      state: {
        token: 'loading'
      }
    });

    fetch(`${process.env.REACT_APP_LOGIN_URL}`, requestOptions)
      .then((response) => response.json())
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
              Authorization: 'Token '.concat(resp.token)
            }
          })
            .then((res) => {
              const loginState = {
                ...res.data.results[0],
                email: email,
                token: resp.token
              }
              console.log(loginState.token, loginState.email);
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
  }
};

export const logOut = (token) => {
  return (dispatch) => {
    axios({
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

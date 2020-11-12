import axios from 'axios';

export const displayNextAccountsSet = (token, url) => {
  // console.log(token, url);
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${url}`,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((accountdata) => {
        console.log(accountdata);

        dispatch({
          type: 'ACCOUNT_SUCCESS',
          account: {
            ...accountdata
          }
        });
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 401) {
          dispatch({
            type: 'ACCOUNT_ERROR',
            err,
            errorCode: 401
          });
        }
        dispatch({ type: 'ACCOUNT_ERROR', err, errorCode: 400 });
      });
  };
};

export const createAccount = (accountName, token, categoryURL) => {
  // console.log(accountName, token, categoryURL);
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ACCOUNTS}`,
      headers: {
        Authorization: 'Token '.concat(token),
        'Content-Type': 'application/json'
      },
      data: {
        name: accountName,
        category: categoryURL,
        offers: []
      }
    })
      .then((accountdata) => {
        // console.log(accountdata.data);
        dispatch({
          type: 'CREATE_ACCOUNT_SUCCESS',
          createAccount: true
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'ACCOUNT_ERROR', err });
      });
  };
};

export const getSpecificAccount = (token, url) => {
  //Get all Account Info from API
  return (dispatch) => {
    axios({
      method: 'GET',
      url: url,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((accountdata) => {
        // console.log(accountdata.data);
        dispatch({
          type: 'GET_SPECIFIC_ACCOUNT_SUCCESS',
          currentAccount: accountdata.data
        });
      })
      .catch((err) => {
        console.log('VERT ERR ', err);
        dispatch({ type: 'ACCOUNT_ERROR', err });
      });
  };
};

export const changeAccountName = (value) => {
  //Get all Users Info from API
  return (dispatch) => {
    // console.log(categorydata.data);
    dispatch({
      type: 'UPDATE_ACCOUNT_NAME',
      newAccountName: value
    });
  };
};

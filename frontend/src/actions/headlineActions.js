import axios from 'axios';

export const displayNextHeadlinesSet = (token, url) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${url}`,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((headlinedata) => {
        // console.log(userdata.data);

        dispatch({
          type: 'HEADLINE_SUCCESS',
          headline: {
            ...headlinedata
          }
        });
      })
      .catch((err) => {
        // console.log(err.response.status);
        if (err.response.status === 401) {
          dispatch({
            type: 'HEADLINE_ERROR',
            err,
            errorCode: 401
          });
        }
        dispatch({ type: 'HEADLINE_ERROR', err, errorCode: 400 });
      });
  };
};

export const createHeadline = (headlineName, token, categoryURL) => {
  // console.log(headlineName, token, categoryURL);
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_HEADLINES}`,
      headers: {
        Authorization: 'Token '.concat(token),
        'Content-Type': 'application/json'
      },
      data: {
        name: headlineName,
        category: categoryURL,
        offers: []
      }
    })
      .then((headlinedata) => {
        // console.log(headlinedata.data);
        dispatch({
          type: 'CREATE_HEADLINE_SUCCESS',
          createHeadline: true
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'HEADLINE_ERROR', err });
      });
  };
};

export const getSpecificHeadline = (token, url) => {
  //Get all Headline Info from API
  return (dispatch) => {
    axios({
      method: 'GET',
      url: url,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((headlinedata) => {
        // console.log(headlinedata.data);
        dispatch({
          type: 'GET_SPECIFIC_HEADLINE_SUCCESS',
          currentHeadline: headlinedata.data
        });
      })
      .catch((err) => {
        console.log('VERT ERR ', err);
        dispatch({ type: 'HEADLINE_ERROR', err });
      });
  };
};

export const changeHeadlineName = (value) => {
  //Get all Users Info from API
  return (dispatch) => {
    // console.log(categorydata.data);
    dispatch({
      type: 'UPDATE_HEADLINE_NAME',
      newHeadlineName: value
    });
  };
};

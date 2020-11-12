import axios from 'axios';

export const displaySuccess = verticaldata => {
  return {
    type: "VERTICAL_SUCCESS",
    vertical: {
      ...verticaldata
    } 
  };
};

export const createNewVerticalSuccess = () => {
  return {
    type: 'CREATE_VERTICAL_SUCCESS',
    createVertical: true
  };
};

export const displayNextVerticalsSet = (token, url) => {
  return async (dispatch) => {
    return axios({
      method: 'GET',
      url: `${url}`,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((verticaldata) => {
        // console.log(verticaldata.data);

        dispatch(displaySuccess(verticaldata.data));
      })
      .catch((err) => {
        // console.log(err.response.status);
        if (err.response.status === 401) {
          dispatch({
            type: 'VERTICAL_ERROR',
            err,
            errorCode: 401
          });
        }
        dispatch({ type: 'VERTICAL_ERROR', err, errorCode: 400 });
      });
  };
};

export const createVertical = (verticalName, token, accountURL) => {
  // console.log(verticalName, token, categoryURL);
  return async (dispatch) => {
    return axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_VERTICALS}`,
      headers: {
        Authorization: 'Token '.concat(token),
        'Content-Type': 'application/json'
      },
      data: {
        name: verticalName,
        account: accountURL
      }
    })
      .then((verticaldata) => {
        // console.log(verticaldata.data);
        dispatch(createNewVerticalSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'VERTICAL_ERROR', err });
      });
  };
};

export const getSpecificVertical = (token, url) => {
  //Get all Vertical Info from API
  return (dispatch) => {
    axios({
      method: 'GET',
      url: url,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((verticaldata) => {
        // console.log(verticaldata.data);
        dispatch({
          type: 'GET_SPECIFIC_VERTICAL_SUCCESS',
          currentVertical: verticaldata.data
        });
      })
      .catch((err) => {
        console.log('VERT ERR ', err);
        dispatch({ type: 'VERTICAL_ERROR', err });
      });
  };
};

export const changeVerticalName = (value, currentVertical) => {
  //Get all Users Info from API
  return (dispatch) => {
    // console.log(categorydata.data);
    dispatch({
      type: 'UPDATE_VERTICAL_NAME',
      newVerticalName: value,
      currentVertical: currentVertical
    });
  };
};

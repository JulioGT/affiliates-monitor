import axios from 'axios';

export const displayNextAdvertiserSet = (token, url) => {
  // console.log(token, url);
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${url}`,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((advertiserdata) => {
        // console.log(advertiserdata);

        dispatch({
          type: 'ADVERTISER_SUCCESS',
          advertiser: {
            ...advertiserdata
          }
        });
      })
      .catch((err) => {
        // console.log(err.response.status);
        if (err.response.status === 401) {
          dispatch({
            type: 'ADVERTISER_ERROR',
            err,
            errorCode: 401
          });
        }
        dispatch({ type: 'ADVERTISER_ERROR', err, errorCode: 400 });
      });
  };
};

export const createAdvertiser = (advrtiserName, token) => {
  // console.log(token, advrtiserName);
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_BUYERS}`,
      headers: {
        Authorization: 'Token '.concat(token),
        'Content-Type': 'application/json'
      },
      data: {
        name: advrtiserName
      }
    })
      .then((advertiserdata) => {
        // console.log(advertiserdata.data);
        dispatch({
          type: 'CREATE_ADVERTISER_SUCCESS',
          createAdvertiser: true
        });
      })
      .catch((err) => {
        // console.log(err);
        dispatch({ type: 'ADVERTISER_ERROR', err });
      });
  };
};

export const getSpecificAdvertiser = (token, url) => {
  //Get specific Advertiser Info from API
  return (dispatch) => {
    axios({
      method: 'GET',
      url: url,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((advertiserdata) => {
        // console.log(advertiserdata.data);
        dispatch({
          type: 'GET_SPECIFIC_ADVERTISER_SUCCESS',
          currentAdvertiser: advertiserdata.data
        });
      })
      .catch((err) => {
        console.log('ADV ERR ', err);
        dispatch({ type: 'ADVERTISER_ERROR', err });
      });
  };
};

export const changeAdvertiserName = (value, currentAdvertiser) => {
  //Get all Advertiser Info from API
  return (dispatch) => {
    // console.log(categorydata.data);
    dispatch({
      type: 'UPDATE_ADVERTISER_NAME',
      newAdvertiserName: value,
      currentAdvertiser: currentAdvertiser
    });
  };
};

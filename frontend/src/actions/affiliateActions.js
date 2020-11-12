import axios from 'axios';

export const displayNextAffiliateSet = (token, url) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${url}`,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((affiliatedata) => {
        // console.log(affiliatedata.data);

        dispatch({
          type: 'AFFILIATE_SUCCESS',
          affiliate: {
            ...affiliatedata
          }
        });
      })
      .catch((err) => {
        // console.log(err.response.status);
        if (err.response.status === 401) {
          dispatch({
            type: 'AFFILIATE_ERROR',
            err,
            errorCode: 401
          });
        }
        dispatch({ type: 'AFFILIATE_ERROR', err, errorCode: 400 });
      });
  };
};

export const createAffiliate = (affiliateName, token) => {
  // console.log(token, password, email);
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_AFFILIATES}`,
      headers: {
        Authorization: 'Token '.concat(token),
        'Content-Type': 'application/json'
      },
      data: {
        name: affiliateName
      }
    })
      .then((affiliatedata) => {
        // console.log(affiliatedata.data);
        dispatch({
          type: 'CREATE_AFFILIATE_SUCCESS',
          createAffiliate: true
        });
      })
      .catch((err) => {
        dispatch({ type: 'AFFILIATE_ERROR', err });
      });
  };
};

export const getSpecificAffiliate = (token, url) => {
  //Get specific Affiliate Info from API
  return (dispatch) => {
    axios({
      method: 'GET',
      url: url,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((affiliatedata) => {
        // console.log(affiliatedata.data);
        dispatch({
          type: 'GET_SPECIFIC_AFFILIATE_SUCCESS',
          currentAffiliate: affiliatedata.data
        });
      })
      .catch((err) => {
        console.log('AFF ERR ', err);
        dispatch({ type: 'AFFILIATE_ERROR', err });
      });
  };
};

export const changeAffiliateName = (value, currentAffiliate) => {
  //Get all Affiliate Info from API
  return (dispatch) => {
    // console.log(categorydata.data);
    dispatch({
      type: 'UPDATE_AFFILIATE_NAME',
      newAffiliateName: value,
      currentAffiliate: currentAffiliate
    });
  };
};

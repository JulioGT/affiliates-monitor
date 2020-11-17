import axios from 'axios';

export const displayNextClickSet = (token, url) => {
  // console.log(token,url);
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${url}`,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((clickdata) => {
        // console.log(clickdata.data);

        dispatch({
          type: 'CLICK_SUCCESS',
          click: {
            ...clickdata
          }
        });
      })
      .catch((err) => {
        // console.log(err.response.status);
        if (err.response && err.response.status === 401) {
          dispatch({
            type: 'CLICK_ERROR',
            err,
            errorCode: 401
          });
        }
        dispatch({ type: 'CLICK_ERROR', err, errorCode: 400 });
      });
  };
};

export const getSpecificClick = (token, url) => {
  //Get specific Affiliate Info from API
  return (dispatch) => {
    axios({
      method: 'GET',
      url: url,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((clickdata) => {
        // console.log(clickdata.data);
        dispatch({
          type: 'GET_SPECIFIC_CLICK_SUCCESS',
          currentAffiliate: clickdata.data
        });
      })
      .catch((err) => {
        console.log('AFF ERR ', err);
        dispatch({ type: 'CLICK_ERROR', err });
      });
  };
};

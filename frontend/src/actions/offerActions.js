import axios from 'axios';

export const displayNextOfferSet = (token, url) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${url}`,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((offerdata) => {
        // console.log(offerdata.data);

        dispatch({
          type: 'OFFER_SUCCESS',
          offer: {
            ...offerdata
          }
        });
      })
      .catch((err) => {
        // console.log(err.response.status);
        if (err.response.status === 401) {
          dispatch({
            type: 'OFFER_ERROR',
            err,
            errorCode: 401
          });
        }
        dispatch({ type: 'OFFER_ERROR', err, errorCode: 400 });
      });
  };
};

export const createOffer = (offerData, token) => {
  // console.log(token, offerData);

  return (dispatch) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_OFFERS}`,
      headers: {
        Authorization: 'Token '.concat(token),
        'Content-Type': 'application/json'
      },
      data: offerData
    })
      .then((offerdata) => {
        dispatch({
          type: 'CREATE_OFFER_SUCCESS',
          createOffer: true
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'OFFER_ERROR', err });
      });
  };
};

export const getSpecificOffer = (token, url) => {
  //Get specific Offer Info from API
  return (dispatch) => {
    axios({
      method: 'GET',
      url: url,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((offerdata) => {
        dispatch({
          type: 'GET_SPECIFIC_OFFER_SUCCESS',
          currentOffer: offerdata.data
        });
      })
      .catch((err) => {
        console.log('OFF ERR ', err);
        dispatch({ type: 'OFFER_ERROR', err });
      });
  };
};

export const changeOfferName = (value) => {
  //Get all Offer Info from API
  return (dispatch, getState) => {
    // console.log(getState().offer.currentOffer);
    dispatch({
      type: 'UPDATE_OFFER_NAME',
      newOfferName: { ...getState().offer.currentOffer, name: value }
    });
  };
};

export const changePreviewURL = (value) => {
  return (dispatch, getState) => {
    // console.log(getState().offer.currentOffer);
    dispatch({
      type: 'UPDATE_PREVIEW_URL',
      newPreviewURL: { ...getState().offer.currentOffer, preview_url: value }
    });
  };
};

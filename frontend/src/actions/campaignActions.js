import axios from 'axios';

export const displayNextCampaignSet = (token, url) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${url}`,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((campaigndata) => {
        // console.log(campaigndata.data);

        dispatch({
          type: 'CAMPAIGN_SUCCESS',
          campaign: {
            ...campaigndata
          }
        });
      })
      .catch((err) => {
        // console.log(err.response.status);
        if (err.response.status === 401) {
          dispatch({
            type: 'CAMPAIGN_ERROR',
            err,
            errorCode: 401
          });
        }
        dispatch({ type: 'CAMPAIGN_ERROR', err, errorCode: 400 });
      });
  };
};

export const createCampaign = (campaignData, token) => {
  // console.log(token, campaignData);

  return (dispatch) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_CAMPAIGNS}`,
      headers: {
        Authorization: 'Token '.concat(token),
        'Content-Type': 'application/json'
      },
      data: campaignData
    })
      .then((campaigndata) => {
        dispatch({
          type: 'CREATE_CAMPAIGN_SUCCESS',
          createCampaign: true
        });
      })
      .catch((err) => {
        console.log(err);
        //dispatch({ type: 'CAMPAIGN_ERROR', err });
      });
  };
};

export const getSpecificCampaign = (token, url) => {
  //Get specific Campaign Info from API
  return (dispatch) => {
    axios({
      method: 'GET',
      url: url,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((campaigndata) => {
        // console.log(campaigndata.data);

        dispatch({
          type: 'GET_SPECIFIC_CAMPAIGN_SUCCESS',
          currentCampaign: campaigndata.data
        });
      })
      .catch((err) => {
        console.log('CAMP ERR ', err);
        dispatch({ type: 'CAMPAIGN_ERROR', err });
      });
  };
};

export const changeCampaignName = (value) => {
  //Get all Campaign Info from API
  return (dispatch, getState) => {
    // console.log(getState().campaign.currentCampaign);
    dispatch({
      type: 'UPDATE_CAMPAIGN_NAME',
      newCampaignName: { ...getState().campaign.currentCampaign, name: value }
    });
  };
};

const initState = {
  campaignError: false,
  campaignLoading: true,
  campaignCreated: false
};

const campaignReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CAMPAIGN_ERROR':
      // console.log(action.errorCode);
      if (action.errorCode === 401) {
        return {
          ...state,
          ...action.campaign,
          campaignError: true,
          campaignLoading: true,
          campaignCreated: false,
          campaignErrorCode: 401,
          errorDetails: action.errorDetails
        };
      }
      return {
        ...state,
        ...action.campaign,
        campaignError: true,
        campaignLoading: true,
        campaignCreated: false,
        campaignErrorCode: 401,
        errorDetails: action.errorDetails
      };
    case 'CAMPAIGN_SUCCESS':
      // console.log('CAMPAIGN_SUCCESS');
      return {
        ...state,
        ...action.campaign,
        campaignError: false,
        campaignLoading: false,
        campaignCreated: false,
        campaignErrorCode: 200
      };
    case 'CAMPAIGN_LOADING':
      // console.log('CAMPAIGN_LOADING');
      return {
        ...state,
        ...action.campaign,
        campaignError: false,
        campaignLoading: true,
        campaignCreated: false,
        campaignErrorCode: 200
      };
    case 'CREATE_CAMPAIGN_SUCCESS':
      return {
        ...state,
        ...action.campaign,
        campaignError: false,
        campaignLoading: true,
        campaignCreated: true,
        campaignErrorCode: 200
      };
    case 'GET_SPECIFIC_CAMPAIGN_SUCCESS':
      // console.log(action.currentCampaign);
      return {
        ...state,
        currentCampaign: action.currentCampaign,
        currentCampaignAffiliate: action.affiliateCampaignName,
        currentCampaignOffer: action.offerCampaignName,
        campaignError: false,
        campaignLoading: false,
        campaignCreated: false,
        campaignErrorCode: 200
      };
    case 'UPDATE_CAMPAIGN_NAME':
      return {
        ...state,
        currentCampaign: { ...action.newCampaignName },
        campaignError: false,
        campaignLoading: false,
        campaignCreated: false,
        campaignErrorCode: 200
      };
    default:
      // console.log('default');
      return {
        ...state,
        ...action.campaign,
        campaignError: false,
        campaignLoading: true,
        campaignCreated: false,
        campaignErrorCode: 200
      };
  }
};

export default campaignReducer;

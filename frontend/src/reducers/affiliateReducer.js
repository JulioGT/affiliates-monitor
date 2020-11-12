const initState = {
  affiliateError: false,
  affiliateLoading: true,
  affiliateCreated: false
};

const affiliateReducer = (state = initState, action) => {
  switch (action.type) {
    case 'AFFILIATE_ERROR':
      // console.log(action.errorCode);
      if (action.errorCode === 401) {
        return {
          ...state,
          affiliateError: true,
          affiliateLoading: true,
          affiliateCreated: false,
          affiliateErrorCode: 401
        };
      }
      return {
        ...state,
        ...action.affiliate,
        affiliateError: true,
        affiliateLoading: false,
        affiliateCreated: false,
        affiliateErrorCode: 401
      };
    case 'AFFILIATE_SUCCESS':
      // console.log('AFFILIATE_SUCCESS');
      return {
        ...state,
        ...action.affiliate,
        affiliateError: false,
        affiliateLoading: false,
        affiliateCreated: false,
        affiliateErrorCode: 200
      };
    case 'AFFILIATE_LOADING':
      // console.log('AFFILIATE_LOADING');
      return {
        ...state,
        ...action.affiliate,
        affiliateError: false,
        affiliateLoading: true,
        affiliateCreated: false,
        affiliateErrorCode: 200
      };
    case 'CREATE_AFFILIATE_SUCCESS':
      return {
        ...state,
        ...action.affiliate,
        affiliateError: false,
        affiliateLoading: true,
        affiliateCreated: true,
        affiliateErrorCode: 200
      };
    case 'GET_SPECIFIC_AFFILIATE_SUCCESS':
      // console.log(action.currentAffiliate);
      return {
        ...state,
        currentAffiliate: action.currentAffiliate,
        affiliateError: false,
        affiliateLoading: false,
        affiliateCreated: false,
        affiliateErrorCode: 200
      };
    case 'UPDATE_AFFILIATE_NAME':
      // console.log(action.currentAffiliate);
      return {
        ...state,
        currentAffiliate: {
          ...action.currentAffiliate,
          name: action.newAffiliateName
        },
        affiliateError: false,
        affiliateLoading: false,
        affiliateCreated: false,
        affiliateErrorCode: 200
      };
    default:
      // console.log('default');
      return {
        ...state,
        ...action.affiliate,
        affiliateError: false,
        affiliateLoading: true,
        affiliateCreated: false,
        affiliateErrorCode: 200
      };
  }
};

export default affiliateReducer;

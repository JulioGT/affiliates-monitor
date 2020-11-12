const initState = {
  advertiserError: false,
  advertiserLoading: true,
  advertiserCreated: false
};

const advertiserReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADVERTISER_ERROR':
      // console.log(action.errorCode);
      if (action.errorCode === 401) {
        return {
          ...state,
          advertiserError: true,
          advertiserLoading: true,
          advertiserCreated: false,
          advertiserErrorCode: 401
        };
      }
      return {
        ...state,
        ...action.advertiser,
        advertiserError: true,
        advertiserLoading: false,
        advertiserCreated: false,
        advertiserErrorCode: 401
      };
    case 'ADVERTISER_SUCCESS':
      return {
        ...state,
        ...action.advertiser,
        advertiserError: false,
        advertiserLoading: false,
        advertiserCreated: false,
        advertiserErrorCode: 200
      };
    case 'ADVERTISER_LOADING':
      return {
        ...state,
        ...action.advertiser,
        advertiserError: false,
        advertiserLoading: true,
        advertiserCreated: false,
        advertiserErrorCode: 200
      };
    case 'CREATE_ADVERTISER_SUCCESS':
      return {
        ...state,
        ...action.advertiser,
        advertiserError: false,
        advertiserLoading: true,
        advertiserCreated: true,
        advertiserErrorCode: 200
      };
    case 'GET_SPECIFIC_ADVERTISER_SUCCESS':
      // console.log(action.currentAdvertiser);
      return {
        ...state,
        currentAdvertiser: action.currentAdvertiser,
        advertiserError: false,
        advertiserLoading: false,
        advertiserCreated: false,
        advertiserErrorCode: 200
      };
    case 'UPDATE_ADVERTISER_NAME':
      // console.log(action.currentAdvertiser);
      return {
        ...state,
        currentAdvertiser: {
          ...action.currentAdvertiser,
          name: action.newAdvertiserName
        },
        advertiserError: false,
        advertiserLoading: false,
        advertiserCreated: false,
        advertiserErrorCode: 200
      };
    default:
      // console.log('default');
      return {
        ...state,
        ...action.advertiser,
        advertiserError: false,
        advertiserLoading: true,
        advertiserCreated: false,
        advertiserErrorCode: 200
      };
  }
};

export default advertiserReducer;

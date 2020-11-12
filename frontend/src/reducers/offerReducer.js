const initState = {
  offerError: false,
  offerLoading: true,
  offerCreated: false
};

const offerReducer = (state = initState, action) => {
  switch (action.type) {
    case 'OFFER_ERROR':
      // console.log(action.errorCode);
      //Unauthorized: Session not valid anymore
      if (action.errorCode === 401) {
        return {
          ...state,
          ...action.offer,
          offerError: true,
          offerLoading: true,
          offerCreated: false,
          offerErrorCode: 401,
          errorDetails: action.errorDetails
        };
      }
      //Bad Request: Couldn't create Offer for any reason. Ex. Bad URL
      return {
        ...state,
        ...action.offer,
        offerError: true,
        offerLoading: false,
        offerCreated: false,
        offerErrorCode: 400,
        errorDetails: action.errorDetails
      };
    case 'OFFER_SUCCESS':
      // console.log('OFFER_SUCCESS');
      return {
        ...state,
        ...action.offer,
        offerError: false,
        offerLoading: false,
        offerCreated: false,
        offerErrorCode: 200
      };
    case 'OFFER_LOADING':
      // console.log('OFFER_LOADING');
      return {
        ...state,
        ...action.offer,
        offerError: false,
        offerLoading: true,
        offerCreated: false,
        offerErrorCode: 200
      };
    case 'CREATE_OFFER_SUCCESS':
      return {
        ...state,
        ...action.offer,
        offerError: false,
        offerLoading: true,
        offerCreated: true,
        offerErrorCode: 200
      };
    case 'GET_SPECIFIC_OFFER_SUCCESS':
      // console.log(action.currentOffer);
      return {
        ...state,
        currentOffer: action.currentOffer,
        currentOfferAdvertiser: action.advertiserOfferName,
        currentOfferVertical: action.verticalOfferName,
        offerError: false,
        offerLoading: false,
        offerCreated: false,
        offerErrorCode: 200
      };
    case 'UPDATE_OFFER_NAME':
      return {
        ...state,
        currentOffer: { ...action.newOfferName },
        offerError: false,
        offerLoading: false,
        offerCreated: false,
        offerErrorCode: 200
      };
    case 'UPDATE_PREVIEW_URL':
      return {
        ...state,
        currentOffer: { ...action.newPreviewURL },
        offerError: false,
        offerLoading: false,
        offerCreated: false,
        offerErrorCode: 200
      };
    default:
      // console.log('default');
      return {
        ...state,
        ...action.offer,
        offerError: false,
        offerLoading: true,
        offerCreated: false,
        offerErrorCode: 200
      };
  }
};

export default offerReducer;

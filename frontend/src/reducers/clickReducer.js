const initState = {
  clickError: false,
  clickLoading: true,
  clickCreated: false
};

const clickReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CLICK_ERROR':
      // console.log(action.errorCode);
      if (action.errorCode === 401) {
        return {
          ...state,
          clickError: true,
          clickLoading: true,
          clickCreated: false,
          clickErrorCode: 401
        };
      }
      return {
        ...state,
        ...action.click,
        clickError: true,
        clickLoading: false,
        clickCreated: false,
        clickErrorCode: 401
      };
    case 'CLICK_SUCCESS':
      // console.log('CLICK_SUCCESS');
      return {
        ...state,
        ...action.click,
        clickError: false,
        clickLoading: false,
        clickCreated: false,
        clickErrorCode: 200
      };
    case 'CLICK_LOADING':
      // console.log('CLICK_LOADING');
      return {
        ...state,
        ...action.click,
        clickError: false,
        clickLoading: true,
        clickCreated: false,
        clickErrorCode: 200
      };
    case 'CREATE_CLICK_SUCCESS':
      return {
        ...state,
        ...action.click,
        clickError: false,
        clickLoading: true,
        clickCreated: true,
        clickErrorCode: 200
      };
    case 'GET_SPECIFIC_CLICK_SUCCESS':
      // console.log(action.currentClick);
      return {
        ...state,
        currentClick: action.currentClick,
        clickError: false,
        clickLoading: false,
        clickCreated: false,
        clickErrorCode: 200
      };
    case 'UPDATE_CLICK_NAME':
      // console.log(action.currentClick);
      return {
        ...state,
        currentClick: {
          ...action.currentClick,
          name: action.newClickName
        },
        clickError: false,
        clickLoading: false,
        clickCreated: false,
        clickErrorCode: 200
      };
    default:
      // console.log('default');
      return {
        ...state,
        ...action.click,
        clickError: false,
        clickLoading: true,
        clickCreated: false,
        clickErrorCode: 200
      };
  }
};

export default clickReducer;

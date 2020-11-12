// console.log(auth);
const initState = {
  headlineError: false,
  headlineLoading: true,
  headlineCreated: false
};

const headlineReducer = (state = initState, action) => {
  switch (action.type) {
    case 'HEADLINE_ERROR':
      console.log('ERROR', action.errorCode);
      if (action.errorCode === 401) {
        return {
          ...state,
          headlineError: true,
          headlineLoading: true,
          headlineCreated: false,
          headlineErrorCode: 401
        };
      }
      return {
        ...state,
        ...action.headline,
        headlineError: true,
        headlineLoading: false,
        headlineCreated: false,
        headlineErrorCode: 200
      };
    case 'HEADLINE_SUCCESS':
      // console.log('HEADLINE_SUCCESS');
      return {
        ...state,
        ...action.headline,
        headlineError: false,
        headlineLoading: false,
        headlineCreated: false,
        headlineErrorCode: 200
      };
    case 'HEADLINE_LOADING':
      // console.log('USER_LOADING');
      return {
        ...state,
        ...action.headline,
        headlineError: false,
        headlineLoading: true,
        headlineCreated: false,
        headlineErrorCode: 200
      };
    case 'CREATE_HEADLINE_SUCCESS':
      return {
        ...state,
        ...action.headline,
        headlineError: false,
        headlineLoading: true,
        headlineCreated: true,
        headlineErrorCode: 200
      };
    case 'GET_SPECIFIC_HEADLINE_SUCCESS':
      // console.log(action.currentHeadline);
      return {
        ...state,
        currentHeadline: action.currentHeadline,
        headlineError: false,
        headlineLoading: false,
        headlineCreated: false,
        headlineErrorCode: 200
      };
    case 'UPDATE_HEADLINE_NAME':
      // console.log(action.currentHeadline);
      return {
        ...state,
        currentHeadline: { name: action.newHeadlineName },
        headlineError: false,
        headlineLoading: false,
        headlineCreated: false,
        headlineErrorCode: 200
      };
    default:
      // console.log('REDUCER: default');
      return {
        ...state,
        ...action.headline,
        headlineError: false,
        headlineLoading: true,
        headlineCreated: false,
        headlineErrorCode: 200
      };
  }
};

export default headlineReducer;

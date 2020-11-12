// console.log(auth);
const initState = {
  verticalError: false,
  verticalLoading: true,
  verticalCreated: false
};

const verticalReducer = (state = initState, action) => {
  switch (action.type) {
    case 'VERTICAL_ERROR':
      if (action.errorCode === 401) {
        return {
          ...state,
          ...action.vertical,
          verticalError: true,
          verticalLoading: true,
          verticalCreated: false,
          verticalErrorCode: 401,
          errorDetails: action.errorDetails
        };
      }
      return {
        ...state,
        ...action.vertical,
        verticalError: true,
        verticalLoading: true,
        verticalCreated: false,
        verticalErrorCode: 401,
        errorDetails: action.errorDetails
      };
    case 'VERTICAL_SUCCESS':
      // console.log(action.vertical);
      return {
        ...state,
        ...action.vertical,
        verticalError: false,
        verticalLoading: false,
        verticalCreated: false,
        verticalErrorCode: 200
      };
    case 'VERTICAL_LOADING':
      // console.log('USER_LOADING');
      return {
        ...state,
        ...action.vertical,
        verticalError: false,
        verticalLoading: true,
        verticalCreated: false,
        verticalErrorCode: 200
      };
    case 'CREATE_VERTICAL_SUCCESS':
      return {
        ...state,
        ...action.vertical,
        verticalError: false,
        verticalLoading: true,
        verticalCreated: true,
        verticalErrorCode: 200
      };
    case 'GET_SPECIFIC_VERTICAL_SUCCESS':
      // console.log(action.currentVertical);
      return {
        ...state,
        currentVertical: action.currentVertical,
        verticalError: false,
        verticalLoading: false,
        verticalCreated: false,
        verticalErrorCode: 200
      };
    case 'UPDATE_VERTICAL_NAME':
      // console.log(action.currentVertical);
      return {
        ...state,
        currentVertical: {
          ...action.currentVertical,
          name: action.newVerticalName
        },
        verticalError: false,
        verticalLoading: false,
        verticalCreated: false,
        verticalErrorCode: 200
      };
    default:
      // console.log('REDUCER: default');
      return {
        ...state,
        ...action.vertical,
        verticalError: false,
        verticalLoading: true,
        verticalCreated: false,
        verticalErrorCode: 200
      };
  }
};

export default verticalReducer;

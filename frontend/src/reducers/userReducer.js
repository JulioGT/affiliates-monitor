// console.log(auth);
const initState = { userError: false, userLoading: true, userCreated: false };

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'USER_ERROR':
      if (action.errorCode === 401) {
        return {
          ...state,
          ...action.user,
          userError: true,
          userLoading: true,
          userCreated: false,
          userErrorCode: 401,
          errorDetails: action.errorDetails
        };
      }
      return {
        ...state,
        ...action.user,
        userError: true,
        userLoading: true,
        userCreated: false,
        userErrorCode: 401,
        errorDetails: action.errorDetails
      };
    case 'USER_SUCCESS':
      return {
        ...state,
        ...action.user,
        userError: false,
        userLoading: false,
        userCreated: false,
        userErrorCode: 200
      };
    case 'USER_LOADING':
      return {
        ...state,
        ...action.user,
        userError: false,
        userLoading: true,
        userCreated: false,
        userErrorCode: 200
      };
    case 'CREATE_USER_SUCCESS':
      return {
        ...state,
        userError: false,
        userLoading: true,
        userCreated: true,
        userErrorCode: 200
      };
    default:
      return {
        ...state,
        ...action.user,
        userError: false,
        userLoading: true,
        userCreated: false,
        userErrorCode: 200
      };
  }
};

export default userReducer;

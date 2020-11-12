// console.log(auth);
const initState = {
  accountError: false,
  accountLoading: true,
  accountCreated: false
};

const accountReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ACCOUNT_ERROR':
      console.log('ERROR', action.errorCode);
      if (action.errorCode === 401) {
        return {
          ...state,
          accountError: true,
          accountLoading: true,
          accountCreated: false,
          accountErrorCode: 401
        };
      }
      return {
        ...state,
        ...action.account,
        accountError: true,
        accountLoading: false,
        accountCreated: false,
        accountErrorCode: 200
      };
    case 'ACCOUNT_SUCCESS':
      // console.log('ACCOUNT_SUCCESS');
      return {
        ...state,
        ...action.account,
        accountError: false,
        accountLoading: false,
        accountCreated: false,
        accountErrorCode: 200
      };
    case 'ACCOUNT_LOADING':
      // console.log('USER_LOADING');
      return {
        ...state,
        ...action.account,
        accountError: false,
        accountLoading: true,
        accountCreated: false,
        accountErrorCode: 200
      };
    case 'CREATE_ACCOUNT_SUCCESS':
      return {
        ...state,
        ...action.account,
        accountError: false,
        accountLoading: true,
        accountCreated: true,
        accountErrorCode: 200
      };
    case 'GET_SPECIFIC_ACCOUNT_SUCCESS':
      // console.log(action.currentAccount);
      return {
        ...state,
        currentAccount: action.currentAccount,
        accountError: false,
        accountLoading: false,
        accountCreated: false,
        accountErrorCode: 200
      };
    case 'UPDATE_ACCOUNT_NAME':
      // console.log(action.currentAccount);
      return {
        ...state,
        currentAccount: { name: action.newAccountName },
        accountError: false,
        accountLoading: false,
        accountCreated: false,
        accountErrorCode: 200
      };
    default:
      // console.log('REDUCER: default');
      return {
        ...state,
        ...action.account,
        accountError: false,
        accountLoading: true,
        accountCreated: false,
        accountErrorCode: 200
      };
  }
};

export default accountReducer;

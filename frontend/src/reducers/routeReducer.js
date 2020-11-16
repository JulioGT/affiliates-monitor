// console.log(auth);
const initState = {
  accountError: false,
  accountLoading: true,
  accountCreated: false
};

const accountReducer = (state = initState, action) => {
  switch (action.type) {
    
    case 'SET_LOCATION':
      // console.log(action.currentAccount);
      return {
        ...state,
        authError: null,
        isAuthenticated: true,
        location: action.newLocation
      };
    default:
      // console.log('REDUCER: default');
      return {
        ...state,
        authError: null,
        isAuthenticated: true,
        location: 'affiliatesDashboard'
      };
  }
};

export default accountReducer;

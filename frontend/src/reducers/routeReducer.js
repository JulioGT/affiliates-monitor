// console.log(auth);
const initState = {
  accountError: false,
  accountLoading: true,
  accountCreated: false,
  location: 'affiliatesDashboard'
};

const routeReducer = (state = initState, action) => {
  console.log(action.newLocation);
  switch (action.type) {
    
    case 'SET_LOCATION':
      console.log(action, state);
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

export default routeReducer;

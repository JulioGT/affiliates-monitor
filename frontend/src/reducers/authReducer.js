const ls = localStorage.getItem('state')
  ? JSON.parse(localStorage.getItem('state'))
  : undefined;
const initState = {
  useremail: ls ? ls.useremail : '',
  password: '',
  firstName: ls ? ls.firstname : '',
  lastName: ls ? ls.lastname : '',
  avatarurl: '',
  authError: null,
  token: ls ? ls.token : '',
  isAuthenticated: ls ? ls.isAuthenticated : '',
  image: ls ? ls.image : ''
};

const authReducer = (state = initState, action) => {
  // console.log(state);
  switch (action.type) {
    case 'LOGIN_ERROR':
      if (action.errorDetails) {
        return {
          ...state,
          ...action.state,
          authError: action.errorDetails,
          isAuthenticated: false,
          token: null,
          location: 'login'
        };
      }
      return {
        ...state,
        ...action.state,
        authError: 'Login Failed',
        isAuthenticated: false,
        token: null,
        location: 'login'
      };
    case 'LOGIN_SUCCESS':
      // localStorage.setItem('state', JSON.stringify(state));
      return {
        ...state,
        ...action.state,
        authError: null,
        isAuthenticated: true,
        location: 'affiliatesDashboard'
      };
    case 'LOGIN_LOADING':
      return {
        ...state,
        ...action.state,
        authError: null,
        isAuthenticated: false,
        location: 'login'
      };
    case 'SET_LOCATION':
      // localStorage.setItem('state', JSON.stringify(state));
        return {
          ...state,
          ...action.state,
          authError: null,
          isAuthenticated: true,
          location: action.newLocation
        };
    case 'LOG_OUT':
      localStorage.removeItem('state');
      return {
        ...state,
        ...action.state,
        authError: null,
        isAuthenticated: false,
        token: null,
        image: null,
        location: 'login'
      };
    default:
      return {
        ...state,
        ...action.state,
        authError: null
      };
  }
};

export default authReducer;

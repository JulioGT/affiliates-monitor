const ls = localStorage.getItem('state')
  ? JSON.parse(localStorage.getItem('state'))
  : undefined;
const initState = {
  useremail: ls ? ls.useremail : '',
  password: '',
  firstname: ls ? ls.firstname : '',
  lastname: ls ? ls.lastname : '',
  avatarurl: '',
  authError: null,
  token: ls ? ls.token : '',
  isAuthenticated: ls ? ls.isAuthenticated : '',
  image: ls ? ls.image : ''
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      if (action.errorDetails) {
        return {
          ...state,
          ...action.state,
          authError: action.errorDetails,
          isAuthenticated: false,
          token: null
        };
      }
      return {
        ...state,
        ...action.state,
        authError: 'Login Failed',
        isAuthenticated: false,
        token: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...action.state,
        authError: null,
        isAuthenticated: true
      };
    case 'LOGIN_LOADING':
      return {
        ...state,
        ...action.state,
        authError: null,
        isAuthenticated: false
      };
    case 'LOG_OUT':
      localStorage.removeItem('state');
      return {
        ...state,
        ...action.state,
        authError: null,
        isAuthenticated: false,
        token: null,
        image: null
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

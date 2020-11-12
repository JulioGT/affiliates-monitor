import { types } from 'node-sass';
import authReducer from './authReducer.js';

const ls = localStorage.getItem('state')
  ? JSON.parse(localStorage.getItem('state'))
  : undefined;
// console.log(auth);
const initState = {
  useremail: ls ? ls.auth.useremail : '',
  password: '',
  firstname: ls ? ls.auth.firstname : '',
  lastname: ls ? ls.auth.lastname : '',
  avatarurl: '',
  authError: null,
  token: ls ? ls.auth.token : '',
  isAuthenticated: ls ? ls.auth.isAuthenticated : '',
  image: ls ? ls.auth.image : '',
  authError: null
};

describe('Auth Reducer', () => {
  it('Should return default state', () => {
    const newState = authReducer(initState, {});
    expect(newState).toEqual(initState);
  });

  it('Should return isAuthenticated = true if LOGIN SUCCESS', () => {
    const posts = { ...initState, authError: null, isAuthenticated: true };
    const newState = authReducer(undefined, {
      type: 'LOGIN_SUCCESS',
      state: { ...initState, authError: null, isAuthenticated: true }
    });
    expect(newState).toEqual(posts);
  });

  it('Should return authError if LOGIN ERROR', () => {
    const post = {
      ...initState,
      authError: 'Login Failed',
      isAuthenticated: false,
      token: null
    };
    const newState = authReducer(undefined, {
      type: 'LOGIN_ERROR',
      state: {
        ...initState,
        authError: 'Login failed',
        isAuthenticated: false,
        token: null
      }
    });
    expect(newState).toEqual(post);
  });
});

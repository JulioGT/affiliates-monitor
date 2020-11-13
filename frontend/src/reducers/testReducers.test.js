import { types } from 'node-sass';
import authReducer from './authReducer.js';

const ls = localStorage.getItem('state')
  ? JSON.parse(localStorage.getItem('state'))
  : undefined;

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
  it('Should return default state (location: "login")', () => {
    const post = {...initState, location: 'login'}
    const newState = authReducer(initState, {});
    expect(newState).toEqual(post);
  });

  it('Should return location: "affiliatesDashboard" if LOGIN SUCCESS', () => {
    const postsSuccess = { ...initState, authError: null, isAuthenticated: true, location: 'affiliatesDashboard' };
    const newStateSuccess = authReducer(undefined, {
      type: 'LOGIN_SUCCESS',
      state: {}
    });
    expect(newStateSuccess).toEqual(postsSuccess);
  });

  it('Should return authError if LOGIN ERROR', () => {
    const post = {...initState, authError: 'Login Failed', isAuthenticated: false, token: null, location: 'login' };
    const newState = authReducer(undefined, {
      type: 'LOGIN_ERROR',
      state: {}
    });
    expect(newState).toEqual(post);
  });

  it('Should return location: "login" when LOGIN LOADING', () => {
    const post = { ...initState, authError: null, isAuthenticated: false, location: 'login' }
    const newState =  authReducer(undefined, { type: 'LOGIN_LOADING', state: {}});
    expect(newState).toEqual(post);
  })

  it('should return token: null when LOGOUT', () => {
    const post = { ...initState, authError: null, isAuthenticated: false, token: null, image: null, location: 'login'}
    const newState = authReducer(undefined, { type: 'LOG_OUT' , state: {}});
    expect(newState).toEqual(post);
  })
});

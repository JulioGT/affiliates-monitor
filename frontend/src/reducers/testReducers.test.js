import { types } from 'node-sass';
import authReducer from './authReducer';
import campReducer from './campaignReducer';

const ls = localStorage.getItem('state')
  ? JSON.parse(localStorage.getItem('state'))
  : undefined;

const initState = {
  avatarurl: '',
  password: '',
  authError: null,
  location: 'login',
  token: ls ? ls.auth.token : '',
  image: ls ? ls.auth.image : '',
  lastName: ls ? ls.auth.lastname : '',
  useremail: ls ? ls.auth.useremail : '',
  firstName: ls ? ls.auth.firstname : '',
  isAuthenticated: ls ? ls.auth.isAuthenticated : ''
};

describe('Auth Reducer', () => {
  it('Should return default state (location: "login")', () => {
    const post = {...initState}
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

  it('should return location: affiliatesLeadsDashboard on SET_LOCATION', () => {
    const post = {...initState,  authError: null, isAuthenticated: true, location: 'affiliatesLeadsDashboard'};
    const newState = authReducer(undefined, {type: 'SET_LOCATION', newLocation: 'affiliatesLeadsDashboard', state: {}});
    expect(newState).toEqual(post);
  })

  it('should return location: affiliatesCampaignsDashboard on SET_LOCATION', () => {
    const post = {...initState,  authError: null, isAuthenticated: true, location: 'affiliatesCampaignsDashboard'};
    const newState = authReducer(undefined, {type: 'SET_LOCATION', newLocation: 'affiliatesCampaignsDashboard', state: {}});
    expect(newState).toEqual(post);
  })
});

/* BEGIN CAMPAIGN TESTS */
describe('Campagin Reducer', () => {
  const init = {
    campaignError: false,
    campaignLoading: true,
    campaignCreated: false
  };
  let post = {};
  let newState = {};

  it('should return 401 in case of error', () => {
    post = {...init, campaignError: true, campaignLoading: true, campaignCreated: false, campaignErrorCode: 401, errorDetails: 'Error Details'};
    newState = campReducer(undefined, {type: 'CAMPAIGN_ERROR', errorDetails: 'Error Details', errorCode: 401 })
    expect(newState).toEqual(post);
  });

  it('should return campaign data if CAMPAIGN_SUCCESS', () => {
    post = {...init, campaignError: false, campaignLoading: false, campaignCreated: false, campaignErrorCode: 200, name: 'test'};
    newState = campReducer(undefined, {type: 'CAMPAIGN_SUCCESS', campaign: {name: 'test'}});
    expect(newState).toEqual(post);
  });

  it('should return 200 if CAMPAIGN_LOADING', () => {
    post = {...init, campaignError: false, campaignLoading: true, campaignCreated: false, campaignErrorCode: 200};
    newState = campReducer(undefined, { type: 'CAMPAIGN_LOADING' });
    expect(newState).toEqual(post);
  });

  it('should return createCampaign=true when type: CREATE_CAMPAIGN_SUCCESS', () => {
    post = {...init, campaignError: false, campaignLoading: true, campaignCreated: true, campaignErrorCode: 200};
    newState = campReducer(undefined, { type: 'CREATE_CAMPAIGN_SUCCESS'});
    expect(newState).toEqual(post);
  });

  it('should return currentCampaign data', () => {
    post = {...init, currentCampaign: 'action.currentCampaign', currentCampaignAffiliate: 'action.affiliateCampaignName', currentCampaignOffer: 'action.offerCampaignName', campaignError: false, campaignLoading: false, campaignCreated: false, campaignErrorCode: 200};
    newState = campReducer(undefined, { type: 'GET_SPECIFIC_CAMPAIGN_SUCCESS', currentCampaign: 'action.currentCampaign', affiliateCampaignName: 'action.affiliateCampaignName', offerCampaignName: 'action.offerCampaignName'});
    expect(newState).toEqual(post);
  });

  it('should return campaign name updated', () => {
    post = { ...init, currentCampaign: { name: 'newCampaignName' }, campaignError: false, campaignLoading: false, campaignCreated: false, campaignErrorCode: 200};
    newState = campReducer(undefined, { type: 'UPDATE_CAMPAIGN_NAME', newCampaignName: {name: 'newCampaignName'}, campaignError: false, campaignLoading: false, campaignCreated: false, campaignErrorCode: 200})
    expect(newState).toEqual(post);
  });

  it('should return default state', () => {
    post = { campaignError: false, campaignLoading: true, campaignCreated: false, campaignErrorCode: 200 };
    newState = campReducer(undefined, {});
    expect(newState).toEqual(post);
  })
})
/* END CAMPAIGN TESTS */
import thunk from "redux-thunk";
import * as PostsActionCreators from "./authActions";
// import * as RouteActions from "./routeActions"
import fetchMock from 'fetch-mock'
import expect from "expect";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";

const token = "25f3d97afbd1c37538f71d7673462235fd385907043d6fe0d7a57879c6f6d924";
const email = "someone@tujeyo.com"
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
var credentials = JSON.stringify({
  email: email,
  password: "password"
});
const initialState = {account: null,
  createdDate: "2020-10-05T10:51:12.530292-05:00",
  firstName: "Julio",
  id: 1,
  lastName: "González",
  phone: "6546546541",
  profilePhoto: "https://s3.amazonaws.com/test.tujeyo.com/profiles/blacklist_ks.jpg?AWSAccessKeyId=AKIAW7Y7TQYKDKXBIWOV&Signature=uS1%2B1RUyeiDwHPVUGwFyco7xRVU%3D&Expires=1605239450",
  role: "Developer",
  updatedDate: "2020-10-28T19:45:41.280567-05:00",
  url: "https://tujeyo-server-staging.herokuapp.com/api/profiles/1/",
  user: "https://tujeyo-server-staging.herokuapp.com/api/users/3/"}


describe("Test Auth Actions", () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = mockStore(initialState);
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("verifies if login was successful", () => {
    moxios.wait(function() {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          "0":{
            account: null,
            createdDate: "2020-10-05T10:51:12.530292-05:00",
            firstName: "Julio",
            id: 1,
            lastName: "González",
            phone: "6546546541",
            profilePhoto: "https://s3.amazonaws.com/test.tujeyo.com/profiles/blacklist_ks.jpg?AWSAccessKeyId=AKIAW7Y7TQYKDKXBIWOV&Signature=uS1%2B1RUyeiDwHPVUGwFyco7xRVU%3D&Expires=1605239450",
            role: "Developer",
            updatedDate: "2020-10-28T19:45:41.280567-05:00",
            url: "https://tujeyo-server-staging.herokuapp.com/api/profiles/1/",
            user: "https://tujeyo-server-staging.herokuapp.com/api/users/3/"
          }
        }
      });
    }); 
  
    const expectedActions = [
      {
        type: 'LOGIN_LOADING',
        state: {
          token: 'loading'
        }
      }
      // ,
      // {
      //   type: 'LOGIN_SUCCESS',
      //   state: {
      //     account: null,
      //     createdDate: "2020-10-05T10:51:12.530292-05:00",
      //     firstName: "Julio",
      //     id: 1,
      //     lastName: "González",
      //     phone: "6546546541",
      //     profilePhoto: "https://s3.amazonaws.com/test.tujeyo.com/profiles/blacklist_ks.jpg?AWSAccessKeyId=AKIAW7Y7TQYKDKXBIWOV&Signature=uS1%2B1RUyeiDwHPVUGwFyco7xRVU%3D&Expires=1605239450",
      //     role: "Developer",
      //     updatedDate: "2020-10-28T19:45:41.280567-05:00",
      //     url: "https://tujeyo-server-staging.herokuapp.com/api/profiles/1/",
      //     user: "https://tujeyo-server-staging.herokuapp.com/api/users/3/",
      //     email: email,
      //     token: token
      //   }
      // }
    ];

    return store.dispatch(PostsActionCreators.signIn(credentials)).then(() => {
      const actualAction = store.getActions();
      // console.log(actualAction[0].vertical[0]);
      expect(actualAction).toEqual(expectedActions);
    });

  });

  it("logs out correctly", () => {

    moxios.wait(function() {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: []
      });
    }); 
  
    const expectedActions = [
      {
        type: "LOG_OUT",
        state: {
          firstname: null,
          lastname: null,
          useremail: null,
          token: null,
          image: null
        }
      }
    ];
    return store.dispatch(PostsActionCreators.logOut( token )).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
  });

});

/* BEGIN SET LOCATION/ROUTS SECTION */
describe("Test Location Routes", () => { 
  it("sets the new location/route", () => {
    // Initialize mockstore with empty state
    const initialState = {};
    const store = mockStore(initialState);
    const newLocation = "affiliatesLeadsDashboard";

    // Dispatch the action
    store.dispatch(PostsActionCreators.setNewLocation(newLocation));

    // Test if your store dispatched the expected actions
    const actions = store.getActions()
    const expectedPayload = { type: 'SET_LOCATION', newLocation };
    expect(actions).toEqual([expectedPayload]);
  });

  it("sets the new location/route", () => {
    // Initialize mockstore with empty state
    const initialState = {};
    const store = mockStore(initialState);
    const newLocation = "affiliatesCampaignsDashboard";

    // Dispatch the action
    store.dispatch(PostsActionCreators.setNewLocation(newLocation));

    // Test if your store dispatched the expected actions
    const actions = store.getActions()
    const expectedPayload = { type: 'SET_LOCATION', newLocation };
    expect(actions).toEqual([expectedPayload]);
  });
}); 
/* END SET LOCATION/ROUTS SECTION */

/* BEGIN CAMPAIGN *
describe("Test Campaign section", () => {
  it("sets")
})
/* END CAMPAIGN */

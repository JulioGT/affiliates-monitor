import thunk from "redux-thunk";
import * as PostsActionCreators from "./verticalActions";

import expect from "expect";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";

const verticalAPI = `${process.env.REACT_APP_API_VERTICALS}`;
const token = "25f3d97afbd1c37538f71d7673462235fd385907043d6fe0d7a57879c6f6d924";
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  "vertical": {
    "verticalError": false,
    "verticalLoading": true,
    "verticalCreated": false,
    "verticalErrorCode": 200
  }
};

describe("Test Post Actions", () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = mockStore(initialState);
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("Loads display Next Verticals Set correctly", done => {
    moxios.wait(function() {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          "0": {
            id: 9,
            url: 'https://tujeyo-server-staging.herokuapp.com/api/verticals/9/',      
            name: 'Manual Vertical',
            createdDate: '2020-10-14T15:58:09.462655-05:00',
            updatedDate: '2020-10-14T15:58:09.462704-05:00'
          },
          "1": {
            id: 10,
            url: 'https://tujeyo-server-staging.herokuapp.com/api/verticals/10/',     
            name: 'MGUID VERTICAL',
            createdDate: '2020-10-23T11:40:39.755085-05:00',
            updatedDate: '2020-10-23T11:40:39.755121-05:00'
          },
          "2": {
            id: 11,
            url: 'https://tujeyo-server-staging.herokuapp.com/api/verticals/11/',     
            name: 'Explorer  Vertical',
            createdDate: '2020-10-26T11:59:46.803855-05:00',
            updatedDate: '2020-10-26T11:59:46.803928-05:00'
          }
        }
      });
    }); 
  
    const expectedActions = [
      {
        type: "VERTICAL_SUCCESS",
        vertical:  {
            "0": {
              id: 9,
              url: 'https://tujeyo-server-staging.herokuapp.com/api/verticals/9/',    
              name: 'Manual Vertical',
              createdDate: '2020-10-14T15:58:09.462655-05:00',
              updatedDate: '2020-10-14T15:58:09.462704-05:00'
            },
            "1": {
              id: 10,
              url: 'https://tujeyo-server-staging.herokuapp.com/api/verticals/10/',   
              name: 'MGUID VERTICAL',
              createdDate: '2020-10-23T11:40:39.755085-05:00',
              updatedDate: '2020-10-23T11:40:39.755121-05:00'
            },
            "2": {
              id: 11,
              url: 'https://tujeyo-server-staging.herokuapp.com/api/verticals/11/',   
              name: 'Explorer  Vertical',
              createdDate: '2020-10-26T11:59:46.803855-05:00',
              updatedDate: '2020-10-26T11:59:46.803928-05:00'
            }
        }
        
      }
    ];

    return store.dispatch(PostsActionCreators.displayNextVerticalsSet()).then(() => {
      const actualAction = store.getActions();
      // console.log(actualAction[0].vertical[0]);
      expect(actualAction).toEqual(expectedActions);
      done();
    });

  });

  it("creates a new Vertical correctly", done => {
    const accountName = "https://tujeyo-server-staging.herokuapp.com/api/accounts/10/";
    moxios.wait(function() {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: []
      });
    }); 
  
    const expectedActions = [
      {
        type: "CREATE_VERTICAL_SUCCESS",
        createVertical: true
      }
    ];
    return store.dispatch(PostsActionCreators.createVertical("Jest", token, accountName)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
      done();
    });
  });

});


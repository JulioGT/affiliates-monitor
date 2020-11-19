import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';
// import accountReducer from '../reducers/accountReducer';
import authReducer from '../reducers/authReducer';
// import routeReducer from '../reducers/routeReducer';
// import userReducer from '../reducers/userReducer';
// import verticalReducer from 'reducers/verticalReducer';
// import categoryReducer from 'reducers/categoryReducer';
// import advertiserReducer from 'reducers/advertiserReducer';
// import affiliateReducer from 'reducers/affiliateReducer';
// import offerReducer from 'reducers/offerReducer';
import campaignReducer from '../reducers/campaignReducer';
import clickReducer from '../reducers/clickReducer';

const rootReducer = combineReducers({
  ...reducers
  ,
  // account: accountReducer,
  // advertiser: advertiserReducer,
  // affiliate: affiliateReducer,
  auth: authReducer,
  // route: routeReducer
  campaign: campaignReducer,
  // category: categoryReducer,
  click: clickReducer,
  // offer: offerReducer,
  // user: userReducer,
  // vertical: verticalReducer
});

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware));
}

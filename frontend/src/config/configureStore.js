import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import authReducer from '../reducers/authReducer';
import clickReducer from '../reducers/clickReducer';
import campaignReducer from '../reducers/campaignReducer';

// import offerReducer from 'reducers/offerReducer';
// import userReducer from '../reducers/userReducer';
// import routeReducer from '../reducers/routeReducer';
// import verticalReducer from 'reducers/verticalReducer';
// import categoryReducer from 'reducers/categoryReducer';
// import accountReducer from '../reducers/accountReducer';
// import affiliateReducer from 'reducers/affiliateReducer';
// import advertiserReducer from 'reducers/advertiserReducer';

const rootReducer = combineReducers({
  ...reducers,
  auth: authReducer,
  click: clickReducer,
  campaign: campaignReducer,
  // account: accountReducer,
  // advertiser: advertiserReducer,
  // affiliate: affiliateReducer,
  // route: routeReducer
  // category: categoryReducer,
  // offer: offerReducer,
  // user: userReducer,
  // vertical: verticalReducer
});

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware));
}

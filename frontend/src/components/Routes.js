import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { ClimbingBoxLoader } from 'react-spinners';

// Layout Blueprints

import {
  LeftSidebar,
  PresentationLayout
} from './layout-blueprints';

const PageLoginBasic = lazy(() => import('./pages/PageLoginBasic'));
const DashboardClicks = lazy(() => import('./pages/DashboardClicks'));

const fakeAuth = {
  isAuthenticated: !!localStorage.getItem('auth'),
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    localStorage.removeItem('auth');
    localStorage.removeItem('state');
    setTimeout(cb, 100);
  }
};

const Routes = (props) => {
  console.log(props);
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  const SuspenseLoading = () => {
    return (
      <>
        <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
          <div className="d-flex align-items-center flex-column px-4">
            <ClimbingBoxLoader color={'#3c44b1'} loading={true} />
          </div>
          <div className="text-muted font-size-xl text-center pt-3">
            We are loading the only marketing application that you will ever
            need...
          </div>
        </div>
      </>
    );
  };

  const returnLocationComponent = () => {
    if(props.auth){
      switch(props.auth.location){
        case 'affiliatesDashboard':
          return (
            <LeftSidebar>
              <DashboardClicks />
            </LeftSidebar>
          )
          break;
        default:
          return(
            <PresentationLayout>
              <PageLoginBasic />  
            </PresentationLayout>
          )
        break;
      }
    }
    return(
      <PresentationLayout>
        <PageLoginBasic />  
      </PresentationLayout>
    )
  }

  return (
    <AnimatePresence>
      <Suspense fallback={<SuspenseLoading />}>
          {returnLocationComponent()}
          {props.auth && props.auth.location === 'affiliatesDashboard' ? 
            (
              <LeftSidebar>
                <DashboardClicks />
              </LeftSidebar>
            ) : ''
          }
      </Suspense>
    </AnimatePresence>
  );
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

const mapStateToProps = (state) => {
  const persistedState = loadFromLocalStorage();
  return {
    ...state,
    auth: persistedState ? persistedState.auth : null,
    authError: state.auth.authError
  };
};

export default connect(mapStateToProps)(Routes);

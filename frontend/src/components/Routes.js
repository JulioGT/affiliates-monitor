import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { ClimbingBoxLoader } from 'react-spinners';

// Layout Blueprints
import {
  LeftSidebar,
  PresentationLayout
} from './layout-blueprints';
import { loadFromLocalStorage } from '../utils/ScrollToTop';

const PageLoginBasic = lazy(() => import('./pages/PageLoginBasic'));
const DashboardClicks = lazy(() => import('./pages/DashboardClicks'));
const DashboardLeads = lazy(() => import('./pages/DashboardLeads'));
const DashboardCampaigns = lazy(() => import('./pages/DashboardCampaigns'));

const Routes = (props) => {
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
        
          case 'login':
            return(
              <PresentationLayout>
                <PageLoginBasic />
              </PresentationLayout>
            )
            break;
        default:
          return(
            ''
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
          {/* {returnLocationComponent()} */}
          {props.auth === null || props.auth.location === 'login' ? 
            (
              <PresentationLayout>
                <PageLoginBasic />  
              </PresentationLayout>
            ) : ''
          }
          {props.auth && props.auth.location === 'affiliatesDashboard' ? 
            (
              <LeftSidebar>
                <DashboardClicks />
              </LeftSidebar>
            ) : ''
          }
          {props.auth && props.auth.location === 'affiliatesLeadsDashboard' ? 
            (
              <LeftSidebar>
                <DashboardLeads />
              </LeftSidebar>
            ) : ''
          }
          {props.auth && props.auth.location === 'affiliatesCampaignsDashboard' ? 
            (
              <LeftSidebar>
                <DashboardCampaigns />
              </LeftSidebar>
            ) : ''
          }
      </Suspense>
    </AnimatePresence>
  );
};

const mapStateToProps = (state) => {
  const persistedState = loadFromLocalStorage();
  return {
    ...state,
    auth: persistedState ? persistedState : null,
    authError: state.auth.authError
  };
};

export default connect(mapStateToProps)(Routes);

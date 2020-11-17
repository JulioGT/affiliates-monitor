import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Collapse } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setSidebarToggleMobile } from '../../../reducers/ThemeOptions';
import SidebarUserbox from '../SidebarUserbox';
import { setNewLocation } from '../../../actions/authActions';

import {
  Users,
  Grid,
  ChevronRight,
  Shield
} from 'react-feather';

const SidebarMenu = (props) => {

  const [changeLocation, setChangeNewLocation] = props.auth && props.auth.location ? useState(props.auth.location) : useState('affiliatesLeadsDashboard');
  const { setSidebarToggleMobile, sidebarUserbox, setNewLocation } = props;

  useEffect(() => {
    setNewLocation(changeLocation);
  }, [changeLocation]);

  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(false);
  }

  const [dashboardOpen, setDashboardOpen] = useState(false);
  const toggleDashboard = (event) => {
    setDashboardOpen(!dashboardOpen);
    event.preventDefault();
  };

  /* T U J E Y O */
  //Expands/Collapses the Advertisers menu option
  const [advertisersOpen, setAdvertisersOpen] = useState(false);
  const toggleAdvertisers = (event) => {
    setAdvertisersOpen(!advertisersOpen);
    event.preventDefault();
  };

  //Expands/Collapses the Affiliates menu option
  const [affiliatesOpen, setAffiliatesOpen] = useState(false);
  const toggleAffiliates = (event) => {
    setAffiliatesOpen(!affiliatesOpen);
    event.preventDefault();
  };

  //Expands/Collapses the Verticals menu option
  const [verticalsOpen, setVerticalsOpen] = useState(false);
  const toggleVerticals = (event) => {
    setVerticalsOpen(!verticalsOpen);
    event.preventDefault();
  };

  //Expands/Collapses the MyAccount menu option
  const [myAccountOpen, setMyAccountOpen] = useState(false);
  const toggleMyAccount = (event) => {
    setMyAccountOpen(!myAccountOpen);
    event.preventDefault();
  };

  //Expands/Collapses the Accounts menu option
  const [accountsOpen, setAccountsOpen] = useState(false);
  const toggleAccounts = (event) => {
    setAccountsOpen(!accountsOpen);
    event.preventDefault();
  };
  //Triggers an Action to change the component (clicksDashboard, LeadsDashboard, campaigns, etc)
  const changeToNewLocation = (e, location) => {
    e.preventDefault();
    toggleSidebarMobile();
    setChangeNewLocation(location);
  }
  /* */
  return (
    <>
      <PerfectScrollbar>
        {sidebarUserbox && <SidebarUserbox />}
        <div className="sidebar-navigation">
          <div className="sidebar-header">
            <span>Navigation menu</span>
          </div>
          
              <ul>
                <li>
                  <a
                    href="#/"
                    onClick={toggleDashboard}
                    className={clsx({ active: dashboardOpen })}>
                    <span className="sidebar-icon">
                      <Shield />
                    </span>
                    <span className="sidebar-item-label">Dashboards</span>
                    <span className="sidebar-icon-indicator">
                      <ChevronRight />
                    </span>
                  </a>
                  <Collapse isOpen={dashboardOpen}>
                    <ul>
                      <li>
                        <NavLink
                          onClick={(e) => changeToNewLocation(e, 'affiliatesDashboard')}
                          to="">
                          Clicks
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={(e) => changeToNewLocation(e, 'affiliatesLeadsDashboard')}
                          to="">
                          Leads
                        </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                
              </ul>
              
          <div className="sidebar-header">
            <span>Tujeyo</span>
          </div>
          <ul>
            {/*Accounts*/}
            <li>
              <a
                href="#/"
                onClick={toggleAccounts}
                className={clsx({ active: accountsOpen })}>
                <span className="sidebar-icon">
                  <Grid />
                </span>
                <span className="sidebar-item-label">Accounts</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRight />
                </span>
              </a>
              <Collapse isOpen={accountsOpen}>
                <ul className="pb-0">
                  {/* <li>
                    <NavLink onClick={toggleSidebarMobile} to="/accounts">
                      Accounts
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/users">
                      Users
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            {/*Advertisers*/}
            <li>
              <a
                href="#/"
                onClick={toggleAdvertisers}
                className={clsx({ active: advertisersOpen })}>
                <span className="sidebar-icon">
                  <Grid />
                </span>
                <span className="sidebar-item-label">Advertisers</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRight />
                </span>
              </a>
              <Collapse isOpen={advertisersOpen}>
                <ul className="pb-0">
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/advertisers">
                      Advertisers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/offers">
                      Offers
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            {/*Affiliates*/}
            <li>
              <a
                href="#/"
                onClick={toggleAffiliates}
                className={clsx({ active: affiliatesOpen })}>
                <span className="sidebar-icon">
                  <Grid />
                </span>
                <span className="sidebar-item-label">Affiliates</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRight />
                </span>
              </a>
              <Collapse isOpen={affiliatesOpen}>
                <ul className="pb-0">
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/affiliates">
                      Affiliates
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/campaigns">
                      Campaigns
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            {/*ads*/}

            {/*Verticals*/}
            <li>
              <a
                href="#/"
                onClick={toggleVerticals}
                className={clsx({ active: verticalsOpen })}>
                <span className="sidebar-icon">
                  <Grid />
                </span>
                <span className="sidebar-item-label">Verticals</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRight />
                </span>
              </a>
              <Collapse isOpen={verticalsOpen}>
                <ul className="pb-0">
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/verticals">
                      Verticals
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink onClick={toggleSidebarMobile} to="/categories">
                      Categories
                    </NavLink>
                  </li> */}
                </ul>
              </Collapse>
            </li>
            {/*My Account*/}
            <li>
              <a
                href="#/"
                onClick={toggleMyAccount}
                className={clsx({ active: myAccountOpen })}>
                <span className="sidebar-icon">
                  <Users />
                </span>
                <span className="sidebar-item-label">My Account</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRight />
                </span>
              </a>
              <Collapse isOpen={myAccountOpen}>
                <ul className="pb-0">
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/myprofile">
                      Profile
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
          </ul>
          
        </div>
      </PerfectScrollbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarUserbox: state.ThemeOptions.sidebarUserbox,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
    ,
    setNewLocation: (location) => dispatch(setNewLocation(location))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);

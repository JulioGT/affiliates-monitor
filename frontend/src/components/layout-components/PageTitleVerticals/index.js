import React, { useState } from 'react';

import clsx from 'clsx';
import people3 from '../../../assets/images/stock-photos/people-3.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  UncontrolledTooltip,
  Nav,
  NavItem,
  Button,
  Modal,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { PieChart } from 'react-feather';

import { VerticalModalContent } from '../../layout-components';
import { loadFromLocalStorage } from '../../../utils/ScrollToTop'; 

const PageTitleClicks = (props) => {
  // console.log(props);
  // const { token } = props.auth;
  const {
    pageTitleStyle,
    pageTitleBackground,
    pageTitleShadow,
    pageTitleIconBox,
    pageTitleDescription,
    children
  } = props.ThemeOptions;

  const {
    titleHeading,
    titleDescription,
    buttonText,
    actionMessage
  } = props;

  const [modal, setModal] = useState(false);

  //Brings in the Create New Vertical Window
  const toggleModal = () => {
    setModal(!modal);
  };

  //New Offer created, refresh display offers in the dropdown
  if ((props.vertical.verticalCreated === true) && modal === true) {
    toggleModal();
  }

  return (
    <>
      <div
        className={clsx('app-page-title', pageTitleStyle, pageTitleBackground, {
          'app-page-title--shadow': pageTitleShadow
        })}>
        <div>
          <div className="app-page-title--first">
            {pageTitleIconBox && (
              <div className="app-page-title--iconbox d-70">
                <div className="d-70 d-flex align-items-center justify-content-center">
                  <PieChart className="display-2 text-primary" />
                </div>
              </div>
            )}
            <div className="app-page-title--heading">
              <h1>{titleHeading}</h1>
              {pageTitleDescription && (
                <div className="app-page-title--description">
                  {titleDescription}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          {children}

          <UncontrolledDropdown className="mx-3">
            <DropdownToggle size="sm" color="primary" caret>
              <span className="btn-wrapper--label pr-2">{buttonText}</span>
            </DropdownToggle>
            <DropdownMenu right className="dropdown-menu-xl p-0">
              <div className="bg-composed-wrapper bg-vicious-stance mt-0">
                <div className="bg-composed-wrapper--image bg-composed-img-5" />
                <div className="bg-composed-wrapper--content text-white text-center p-4">
                  <h5 className="mb-1">{buttonText}</h5>
                </div>
              </div>
              <div className="scroll-area-sm shadow-overflow">
                <PerfectScrollbar options={{ wheelPropagation: false }}>
                  <Nav className="flex-column py-2">
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon">
                          <FontAwesomeIcon icon={['far', 'lightbulb']} />
                        </div>
                        <span>{titleHeading}</span>
                        <Badge color="warning" className="ml-auto">
                          {props.vertical.data && props.vertical.data.count}
                        </Badge>
                      </NavLinkStrap>
                    </NavItem>
                    {/* <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        active>
                        <div className="nav-link-icon">
                          <FontAwesomeIcon icon={['far', 'question-circle']} />
                        </div>
                        <span>Offers</span>
                        <Badge color="warning" className="ml-auto">
                          12
                        </Badge>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="">
                        <div className="nav-link-icon">
                          <FontAwesomeIcon icon={['fa', 'object-group']} />
                        </div>
                        <span>Marketplaces</span>
                        <Badge color="warning" className="ml-auto">
                          3
                        </Badge>
                      </NavLinkStrap>
                    </NavItem> 
                    <NavItem className="nav-item--header px-3">
                      <span className="font-weight-bold text-uppercase font-size-xs text-dark">
                        CATEGORIES
                      </span>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <ArrowUpRight />
                        <span>Staff</span>
                        <Badge color="warning" className="ml-auto">
                          {props.vertical.data && isStaff(true)}
                        </Badge>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <ArrowDownRight />
                        <span>No Staff</span>
                        <Badge color="warning" className="ml-auto">
                          {props.vertical.data && isStaff(false)}
                        </Badge>
                      </NavLinkStrap>
                    </NavItem>*/}
                  </Nav>
                </PerfectScrollbar>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Button
            onClick={toggleModal}
            size="sm"
            color="success"
            id="AddEntryTooltip20">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fas', 'plus']}
                className="opacity-8 font-size-xs"
              />
            </span>
          </Button>
          <UncontrolledTooltip target="AddEntryTooltip20">
            {actionMessage}
          </UncontrolledTooltip>
        </div>
      </div>

      <Modal
        centered
        size="md"
        isOpen={modal}
        zIndex={1300}
        toggle={toggleModal}
        contentClassName="border-0 bg-transparent">
        <div className="hero-wrapper bg-composed-wrapper bg-skim-blue h-100 rounded-top">
          <div className="flex-grow-1 w-100 d-flex align-items-center">
            <div
              className="bg-composed-wrapper--image rounded-top opacity-4"
              style={{ backgroundImage: 'url(' + people3 + ')' }}
            />
            <div className="bg-composed-wrapper--bg bg-second opacity-4 rounded-top" />
            <div className="bg-composed-wrapper--content text-center pt-3">
              <div className="text-white">
                <h1 className="display-3 my-3 font-weight-bold">
                  {actionMessage}
                </h1>
                <p className="font-size-lg mb-0 text-white-50">
                  Fill in the fields below to {actionMessage}
                </p>
              </div>
              <div className="shape-container-top-1" style={{ margin: 0 }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill="var(--white)"
                    fillOpacity="1"
                    d="M0,288L48,250.7C96,213,192,139,288,106.7C384,75,480,85,576,112C672,139,768,181,864,176C960,171,1056,117,1152,128C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <VerticalModalContent />
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  const persistedState = loadFromLocalStorage('auth');
  return {
    ...state,
    token: persistedState ? persistedState.token : undefined
  };
};

export default connect(mapStateToProps)(PageTitleClicks);

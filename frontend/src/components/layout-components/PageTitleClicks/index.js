import React, { useState } from 'react';

import clsx from 'clsx';
import people3 from '../../../assets/images/stock-photos/people-3.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Col,
  Form,
  Label,
  FormGroup,
  Input,
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
import { ArrowDownRight, ArrowUpRight } from 'react-feather';
import { NavLink as NavLinkStrap } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { PieChart } from 'react-feather';

import { createUser } from '../../../actions/userActions.js';

const PageTitleClicks = (props) => {
  // console.log(props);
  const {
    pageTitleStyle,
    pageTitleBackground,
    pageTitleShadow,
    pageTitleIconBox,
    pageTitleDescription,
    children
  } = props.ThemeOptions;

  const { titleHeading, titleDescription, buttonText, actionMessage } = props;

  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRPassword] = useState('');
  const [noMatch, setNoMatch] = useState(false);
  const [badEmail, setBadEmail] = useState(false);

  const toggleModal = () => {
    setNoMatch(false);
    setBadEmail(false);
    setModal(!modal);
  };

  const createUserCall = (e) => {
    e.preventDefault();
    if (password !== rpassword || password.trim().length === 0) {
      setNoMatch(true);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setBadEmail(true);
    } else {
      props.createUser(email, password, props.auth.token);
      setModal(false);
    }
  };

  const isStaff = (type) => {
    const countTypes = props.user.data.results
      ? props.user.data.results.filter((user) => user.is_staff === type)
      : 0;
    return countTypes.length;
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setBadEmail(false);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setNoMatch(false);
    setPassword(e.target.value);
  };

  const handleRPasswordChange = (e) => {
    e.preventDefault();
    setNoMatch(false);
    setRPassword(e.target.value);
  };

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
                          {/* {props.user.data && props.user.data.count} */}
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
                    </NavItem> */}
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
                          {/* {props.user.data && isStaff(true)} */}
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
                          {/* {props.user.data && isStaff(false)} */}
                        </Badge>
                      </NavLinkStrap>
                    </NavItem>
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
        <div
          className="bg-white rounded pt-0 pt-lg-0"
          style={{ marginTop: '-80px' }}>
          <Col lg="10" xl="9" className="z-over pt-0 pt-lg-4 pb-4 mx-auto">
            <div className="px-4 py-0">
              {/* <Form onSubmit={(e) => createUserCall(e)}> */}
              <Form onSubmit={(e) => e.preventDefault}>
                <FormGroup>
                  <Label htmlFor="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="tujeyo@tujeyo.com"
                    onChange={(e) => handleEmailChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  {badEmail ? (
                    <Alert className="alerts-alternate" color="danger">
                      <div className="d-flex align-items-center align-content-start">
                        <span className="font-size-lg d-block d-40 btn-icon mr-3 text-center bg-danger text-white rounded-sm">
                          <FontAwesomeIcon icon={['far', 'keyboard']} />
                        </span>
                        <span>
                          <strong className="d-block">Warning!</strong> Please
                          verify your email!
                        </span>
                      </div>
                    </Alert>
                  ) : (
                    ''
                  )}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => handlePasswordChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="rpassword">Re-enter Password</Label>
                  <Input
                    type="password"
                    name="rpassword"
                    id="rpassword"
                    onChange={(e) => handleRPasswordChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  {noMatch ? (
                    <Alert className="alerts-alternate" color="danger">
                      <div className="d-flex align-items-center align-content-start">
                        <span className="font-size-lg d-block d-40 btn-icon mr-3 text-center bg-danger text-white rounded-sm">
                          <FontAwesomeIcon icon={['far', 'keyboard']} />
                        </span>
                        <span>
                          <strong className="d-block">Warning!</strong> Please
                          verify your passwords!
                        </span>
                      </div>
                    </Alert>
                  ) : (
                    ''
                  )}
                </FormGroup>
                <Button color="primary" className="mt-1" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (email, password, token) =>
      dispatch(createUser(email, password, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageTitleClicks);

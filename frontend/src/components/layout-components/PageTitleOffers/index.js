import React, { useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import people3 from '../../../assets/images/stock-photos/people-3.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Col,
  Row,
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
import { NavLink as NavLinkStrap } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { PieChart } from 'react-feather';

import { createOffer } from '../../../actions/offerActions.js';
import { displayNextAdvertiserSet } from '../../../actions/advertiserActions.js';
import { displayNextVerticalsSet } from '../../../actions/verticalActions.js';
import { loadFromLocalStorage, notifySuccess } from '../../../utils/ScrollToTop';
import { AdvertiserModalContent, VerticalModalContent } from '../../layout-components';

const PageTitleOffers = (props) => {
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
    actionMessage,
    displayNextAdvertiserSet,
    displayNextVerticalsSet
  } = props;
  //Main Offer Name Modal
  const [offerName, setOfferName] = useState('');
  const [landingPageUrl, setLandingPageUrl] = useState('');
  const urlPattern = /^((http|https):\/\/)www\.([A-z0-9]+)\.([A-z]{2,})/;
  // const [validURL, setValidURL] = useState(false);
  const [badURL, setBadURL] = useState(false);
  //Selected Buyer dropdown when creating a new Offer
  const [buyer, setBuyer] = useState('');
  const [badBuyer, setBadBuyer] = useState(false);
  //Selected Vertical dropdown when creating a new Offer
  const [vertical, setVertical] = useState('');
  const [badVertical, setBadVertical] = useState(false);

  const [modal, setModal] = useState(false);
  const [modalVertical, setModalVertical] = useState(false);
  const [modalBuyer, setModalBuyer] = useState(false);
  const [badOfferName, setBadOfferName] = useState(false);

  const buyerAPI = `${process.env.REACT_APP_API_BUYERS}`;
  const verticalAPI = `${process.env.REACT_APP_API_VERTICALS}`;

  //Brings in the Create New Offer Window and populate the Advertiser and Vertical dropdown
  const toggleModal = () => {
    displayNextVerticalsSet(props.token, verticalAPI);
    displayNextAdvertiserSet(props.token, buyerAPI);
    setOfferName('');
    setBuyer('');
    setVertical('');
    setBadBuyer(false);
    setBadVertical(false);
    setBadOfferName(false);
    setModalVertical(false);
    setModalBuyer(false);
    setModal(!modal);
  };

  //API call. verb:  POST
  const createOfferCall = (e) => {
    e.preventDefault();
    if (urlPattern.test(landingPageUrl) || landingPageUrl.trim().length === 0) {
      // setValidURL(true);
      setBadURL(false);
    } else {
      // setValidURL(false);
      setBadURL(true);
    }

    // console.log(offerName, buyer, vertical, props.token);
    // if (offerName !== '' && buyer !== '' && vertical !== '' && validURL) {
      if (offerName !== '' && buyer !== '' && vertical !== '' && (urlPattern.test(landingPageUrl) || landingPageUrl.trim().length === 0)) {
      const offerData = {
        name: offerName,
        landingPageUrl: landingPageUrl,
        buyer: buyer,
        vertical: vertical
      };
      
      props.createOffer(offerData, props.token);

      setModal(false);
      setOfferName('');
      setBuyer('');
      setVertical('');
      // setValidURL(false);
    } else {
      offerName === '' ? setBadOfferName(true) : setBadOfferName(false);
      buyer === '' ? setBadBuyer(true) : setBadBuyer(false);
      vertical === '' ? setBadVertical(true) : setBadVertical(false);
    }
  };

  //Prepares the Offer Name value to create, prior to POST
  const handleOfferNameChange = (e) => {
    e.preventDefault();
    setBadOfferName(false);
    setOfferName(e.target.value);
  };

  //Prepares the Buyer Name value to create, prior to POST. MAIN MODAL
  const handleBuyerNameChangeOnSelect = (e) => {
    e.preventDefault();
    setBuyer(e.target.value);
    setBadBuyer(false);
  };

  //Prepares the Vertical Name value to create, prior to POST. MAIN MODAL
  const handleVerticalNameChangeOnSelect = (e) => {
    e.preventDefault();
    setVertical(e.target.value);
    setBadVertical(false);
  };

  //Prepares the Buyer Name value to create, prior to POST
  const handleLandingURLChange = (e) => {
    e.preventDefault();
    setLandingPageUrl(e.target.value);
    setBadURL(false);
  };

  //Loads all Buyers in the dropdown
  const loadBuyer = () => {
    if (props.advertiser.data !== undefined) {
      const results = props.advertiser.data.results;
      const advertiserOptions = results.map((res, id) => (
        <option key={id} value={res.url}>
          {res.name}
        </option>
      ));
      return advertiserOptions;
    }
  };

  //Loads all Vertical in the dropdown
  const loadVertical = () => {
    if (props.vertical.data !== undefined) {
      const results = props.vertical.data.results;
      const verticalOptions = results.map((res, id) => (
        <option key={id} value={res.url}>
          {res.name}
        </option>
      ));
      return verticalOptions;
    }
  };

  //Brings in the Create New Vertical Window
  const toggleModalVertical = () => {
    setModal(false);
    setModalVertical(!modalVertical);
  };

  //Brings in the Create New Buyer/Advertiser Window
  const toggleModalBuyer = () => {
    setModal(false);
    setModalBuyer(!modalBuyer);
  };

  //New Vertical created, refresh display them (including the new one) in the dropdown
  if ((props.vertical.verticalCreated === true) & (modal === false)) {
    notifySuccess('Success! The Vertical was succesfully created!');
    toggleModal();
  }

  //New Advertiser created, refresh display them (including the new one) in the dropdown
  if ((props.advertiser.advertiserCreated === true) & (modal === false)) {
    notifySuccess('Success! The Advertiser was succesfully created!');
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
                          {props.offer.data && props.offer.data.count}
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
        size="lg"
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
              <Form onSubmit={(e) => createOfferCall(e)}>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="offerName">Offer Name</Label>
                      <Input
                        type="text"
                        name="offerName"
                        id="offerName"
                        placeholder="Example Offer"
                        onChange={(e) => handleOfferNameChange(e)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      {badOfferName ? (
                        <Alert className="alerts-alternate" color="danger">
                          <div className="d-flex align-items-center align-content-start">
                            <span className="font-size-lg d-block d-40 btn-icon mr-3 text-center bg-danger text-white rounded-sm">
                              <FontAwesomeIcon icon={['far', 'keyboard']} />
                            </span>
                            <span>
                              <strong className="d-block">Warning!</strong>{' '}
                              Please verify the offer name!
                            </span>
                          </div>
                        </Alert>
                      ) : (
                        ''
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="previewurl">Preview URL</Label>
                      <Input
                        type="text"
                        name="previewurl"
                        id="previewurl"
                        onChange={(e) => handleLandingURLChange(e)}
                        defaultValue=""></Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      {badURL ? (
                        <Alert className="alerts-alternate" color="danger">
                          <div className="d-flex align-items-center align-content-start">
                            <span className="font-size-lg d-block d-40 btn-icon mr-3 text-center bg-danger text-white rounded-sm">
                              <FontAwesomeIcon icon={['far', 'keyboard']} />
                            </span>
                            <span>
                              <strong className="d-block">Warning!</strong>{' '}
                              Please write a valid URL!
                            </span>
                          </div>
                        </Alert>
                      ) : (
                        ''
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="border border-primary rounded py-3 my-3">
                  <Col>
                    <FormGroup>
                      <Label htmlFor="verticalName">Vertical Name</Label>
                      <Row>
                        <Col sm={8} className="pr-0">
                          <Input
                            type="select"
                            name="verticalName"
                            id="verticalName"
                            onChange={(e) =>
                              handleVerticalNameChangeOnSelect(e)
                            }>
                            <option key="1s" value="">
                              Select one
                            </option>
                            {loadVertical()}
                          </Input>
                        </Col>
                        <Col sm={4} className="text-right">
                          <Button
                            size="sm"
                            id="newVerticalsRedirect"
                            color="success"
                            className=""
                            onClick={toggleModalVertical}>
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['fas', 'plus']}
                                className="opacity-8 font-size-xs"
                              />
                            </span>
                          </Button>
                          <UncontrolledTooltip target="newVerticalsRedirect">
                            Add New Vertical
                          </UncontrolledTooltip>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="buyerName">Buyer Name</Label>
                      <Row>
                        <Col sm={8} className="pr-0">
                          <Input
                            type="select"
                            name="buyerName"
                            id="buyerName"
                            onChange={(e) => handleBuyerNameChangeOnSelect(e)}>
                            <option key="1s" value="">
                              Select one
                            </option>
                            {loadBuyer()}
                          </Input>
                        </Col>
                        <Col sm={4} className="text-right">
                          <Button
                            size="sm"
                            id="newBuyerRedirect"
                            color="success"
                            className=""
                            type="button"
                            onClick={toggleModalBuyer}>
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['fas', 'plus']}
                                className="opacity-8 font-size-xs"
                              />
                            </span>
                          </Button>
                          <UncontrolledTooltip target="newBuyerRedirect">
                            Add New Buyer <br />
                            <span className="font-size-sm">
                              (you will be redirected to the Buyers view)
                            </span>
                          </UncontrolledTooltip>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      {badVertical ? (
                        <Alert className="alerts-alternate" color="danger">
                          <div className="d-flex align-items-center align-content-start">
                            <span className="font-size-lg d-block d-40 btn-icon mr-3 text-center bg-danger text-white rounded-sm">
                              <FontAwesomeIcon icon={['far', 'keyboard']} />
                            </span>
                            <span>
                              <strong className="d-block">Warning!</strong>{' '}
                              Please select a Vertical!
                            </span>
                          </div>
                        </Alert>
                      ) : (
                        ''
                      )}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      {badBuyer ? (
                        <Alert className="alerts-alternate" color="danger">
                          <div className="d-flex align-items-center align-content-start">
                            <span className="font-size-lg d-block d-40 btn-icon mr-3 text-center bg-danger text-white rounded-sm">
                              <FontAwesomeIcon icon={['far', 'keyboard']} />
                            </span>
                            <span>
                              <strong className="d-block">Warning!</strong>{' '}
                              Please select a Buyer!
                            </span>
                          </div>
                        </Alert>
                      ) : (
                        ''
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Button color="primary" className="mt-1" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </div>
      </Modal>

      <Modal
        centered
        size="md"
        isOpen={modalVertical}
        zIndex={1300}
        toggle={toggleModalVertical}
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
                  Add New Vertical
                </h1>
                <p className="font-size-lg mb-0 text-white-50">
                  Fill in the fields below to Add a New Vertical
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

      <Modal
        centered
        size="md"
        isOpen={modalBuyer}
        zIndex={1300}
        toggle={toggleModalBuyer}
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
                  Add a new Buyer
                </h1>
                <p className="font-size-lg mb-0 text-white-50">
                  Fill in the fields below to add a new Buyer
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
        <AdvertiserModalContent />
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  const persistedState = loadFromLocalStorage();
  return {
    ...state,
    token: persistedState ? persistedState.token : undefined
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOffer: (offerName, token, categoryURL) =>
      dispatch(createOffer(offerName, token, categoryURL)),
    displayNextAdvertiserSet: (token, url) =>
      dispatch(displayNextAdvertiserSet(token, url)),
    displayNextVerticalsSet: (token, url) =>
      dispatch(displayNextVerticalsSet(token, url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageTitleOffers);

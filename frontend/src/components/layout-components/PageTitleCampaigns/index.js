import React, { useState } from 'react';

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
import { connect } from 'react-redux';
import { PieChart } from 'react-feather';

import { ModalAffiliates, ModalOffers } from '../../layout-components';
import { displayNextOfferSet } from '../../../actions/offerActions.js';
import { displayNextAffiliateSet } from '../../../actions/affiliateActions.js';
import { createCampaign } from '../../../actions/campaignActions.js';
import { loadFromLocalStorage, notifySuccess } from '../../../utils/ScrollToTop';

const PageTitleCampaigns = (props) => {
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
    actionMessage,
    displayNextOfferSet,
    displayNextAffiliateSet
  } = props;
  const [modal, setModal] = useState(false);
  const [modalSource, setModalSource] = useState(false);
  const [modalOffer, setModalOffer] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [offer, setOffer] = useState('SelectOne');
  const [source, setSource] = useState('SelectOne');
  const [badCampaignName, setBadCampaignName] = useState(false);
  const [badSourceName, setBadSourceName] = useState(false);
  const [badOfferName, setBadOfferName] = useState(false);

  const offerAPI = `${process.env.REACT_APP_API_OFFERS}`;
  const affiliateAPI = `${process.env.REACT_APP_API_AFFILIATES}`;

  //Brings in the Create New Campaign Window and populate the Affiliate and Offer dropdown
  const toggleModal = () => {
    if (!modal) {
      // console.log(offerAPI);
      displayNextOfferSet(props.token, offerAPI);
      displayNextAffiliateSet(props.token, affiliateAPI);
    }
    setModalSource(false);
    setModalOffer(false);
    setSource('SelectOne');
    setOffer('SelectOne');
    //Initialize Warning messages
    setBadSourceName(false);
    setBadOfferName(false);
    setBadCampaignName(false);
    setModal(!modal);
  };

  const createCampaignCall = (e) => {
    e.preventDefault();
    console.log(offer);
    console.log(source);
    if (campaignName !== '' && source !== 'SelectOne' && offer !== 'SelectOne') {
      const campaignData = {
        name: campaignName,
        source: source,
        offer: offer
      };

      props.createCampaign(campaignData, props.token);
      setModal(false);
    } else {
      campaignName === ''
        ? setBadCampaignName(true)
        : setBadCampaignName(false);

      source === 'SelectOne' ? setBadSourceName(true) : setBadSourceName(false);
      offer === 'SelectOne' ? setBadOfferName(true) : setBadOfferName(false);
    }
  };

  const handleCampaignNameChange = (e) => {
    e.preventDefault();
    setBadCampaignName(false);
    setCampaignName(e.target.value);
  };

  // const handleSourceNameChange = (e) => {
  //   e.preventDefault();
  //   setBadSourceName(false);
  //   setSourceName(e.target.value);
  // };

  //Loads all Sources in the dropdown
  const loadSource = () => {
    if (props.affiliate.data !== undefined) {
      const results = props.affiliate.data.results;
      const affiliateOptions = results.map((res, id) => (
        <option key={id} value={res.url}>
          {res.name}
        </option>
      ));
      return affiliateOptions;
    }
  };

  //Loads all Offers in the dropdown
  const loadOffers = () => {
    if (props.offer.data !== undefined) {
      const results = props.offer.data.results;
      const offerOptions = results.map((res, id) => (
        <option key={id} value={res.url}>
          {res.name}
        </option>
      ));
      return offerOptions;
    }
  };

  const toggleModalSource = (e) => {
    e.preventDefault();
    setModal(false);
    setModalSource(true);
  };

  const toggleModalOffer = (e) => {
    e.preventDefault();
    setModal(false);
    setModalOffer(true);
  };

  //New Affiliate/Source created, refresh display users
  if ((props.affiliate.affiliateCreated === true) & (modal === false)) {
    // console.log(affiliateAPI);
    displayNextAffiliateSet(props.token, affiliateAPI);
    notifySuccess('Success! The Affiliate was succesfully created!');
    toggleModal();
  }

  //New Offer created, refresh display offers in the dropdown
  if ((props.offer.offerCreated === true) & (modal === false)) {
    // console.log(affiliateAPI);
    displayNextOfferSet(props.token, offerAPI);
    notifySuccess('Success! The Offer was succesfully created!');
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
                          {props.campaign.data && props.campaign.data.count}
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
              <Form onSubmit={(e) => createCampaignCall(e)}>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="exampleEmail">Campaign Name</Label>
                      <Input
                        type="text"
                        name="campaignName"
                        id="campaignName"
                        placeholder="Example Campaign"
                        onChange={(e) => handleCampaignNameChange(e)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      {badCampaignName ? (
                        <Alert className="alerts-alternate" color="danger">
                          <div className="d-flex align-items-center align-content-start">
                            <span className="font-size-lg d-block d-40 btn-icon mr-3 text-center bg-danger text-white rounded-sm">
                              <FontAwesomeIcon icon={['far', 'keyboard']} />
                            </span>
                            <span>
                              <strong className="d-block">Warning!</strong>{' '}
                              Please verify the campaign name!
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
                      <Label htmlFor="sourceName">Source Name</Label>
                      <Row>
                        <Col sm={8} className="pr-0">
                          <Input
                            type="select"
                            name="sourceName"
                            id="sourceName"
                            onChange={(e) => setSource(e.target.value)}>
                            <option key="1s" value="SelectOne">
                              Select one
                            </option>
                            {loadSource()}
                          </Input>
                        </Col>
                        <Col sm={4} className="text-right">
                          <Button
                            size="sm"
                            id="newSourceRedirect"
                            color="success"
                            className=""
                            type="button"
                            onClick={(e) => toggleModalSource(e)}>
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['fas', 'plus']}
                                className="opacity-8 font-size-xs"
                              />
                            </span>
                          </Button>
                          <UncontrolledTooltip target="newSourceRedirect">
                            Add New Source
                          </UncontrolledTooltip>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="offer">Offer Name</Label>
                      <Row>
                        <Col sm={8} className="pr-0">
                          <Input
                            type="select"
                            name="offer"
                            id="offer"
                            onChange={(e) => setOffer(e.target.value)}>
                            <option key="1s" value="SelectOne">
                              Select one
                            </option>
                            {loadOffers()}
                          </Input>
                        </Col>
                        <Col sm={4} className="text-right">
                          <Button
                            size="sm"
                            id="newOfferRedirect"
                            color="success"
                            className=""
                            type="button"
                            onClick={(e) => toggleModalOffer(e)}>
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['fas', 'plus']}
                                className="opacity-8 font-size-xs"
                              />
                            </span>
                          </Button>
                          <UncontrolledTooltip target="newOfferRedirect">
                            Add New Offer
                          </UncontrolledTooltip>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      {badSourceName ? (
                        <Alert className="alerts-alternate" color="danger">
                          <div className="d-flex align-items-center align-content-start">
                            <span className="font-size-lg d-block d-40 btn-icon mr-3 text-center bg-danger text-white rounded-sm">
                              <FontAwesomeIcon icon={['far', 'keyboard']} />
                            </span>
                            <span>
                              <strong className="d-block">Warning!</strong>{' '}
                              Please select a Source!
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
                      {badOfferName ? (
                        <Alert className="alerts-alternate" color="danger">
                          <div className="d-flex align-items-center align-content-start">
                            <span className="font-size-lg d-block d-40 btn-icon mr-3 text-center bg-danger text-white rounded-sm">
                              <FontAwesomeIcon icon={['far', 'keyboard']} />
                            </span>
                            <span>
                              <strong className="d-block">Warning!</strong>{' '}
                              Please select an Offer!
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

      {modalSource ? <ModalAffiliates modal={true} /> : ''}

      {modalOffer ? <ModalOffers modal={true} /> : ''}
    </>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  const persistedState = loadFromLocalStorage();
  return {
    ...state,
    token: persistedState ? persistedState.token : undefined
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCampaign: (campaignName, token, categoryURL) =>
      dispatch(createCampaign(campaignName, token, categoryURL)),
    displayNextAffiliateSet: (token, url) =>
      dispatch(displayNextAffiliateSet(token, url)),
    displayNextOfferSet: (token, url) =>
      dispatch(displayNextOfferSet(token, url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageTitleCampaigns);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Row,
  Table,
  Col,
  Card,
  CardHeader,
  Input,
  Nav,
  NavItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Modal,
  Form,
  Label
} from 'reactstrap';
import { NavLink as NavLinkStrap, Badge } from 'reactstrap';
import Select from 'react-select';
import {
  Settings,
  Filter,
  Trash,
  Save,
  ArrowDownCircle,
  ArrowUpCircle,
  Circle
} from 'react-feather';
import Switch from 'rc-switch';
import {
  displayNextCampaignSet,
  getSpecificCampaign,
  changeCampaignName
} from '../../../../actions/campaignActions';
import { logOut } from '../../../../actions/authActions.js';
import {
  loadFromLocalStorage,
  notifySuccess,
  notifyError
} from '../../../../utils/ScrollToTop';

const LivePreviewExample = (props) => {
  // const { token } = props.auth;
  const {
    displayNextCampaignSet,
    getSpecificCampaign,
    changeCampaignName
  } = props;
  const campaignAPI = `${process.env.REACT_APP_API_CAMPAIGNS}`;

  useEffect(() => {
    // console.log(campaignAPI);
    displayNextCampaignSet(props.token, campaignAPI);
  }, [displayNextCampaignSet, props.token, campaignAPI]);

  const [searchOpen, setSearchOpen] = useState(false);
  const [modal5, setModal5] = useState(false);
  const [createdDate, setCreatedDate] = useState(false);
  // const [validURL, setValidURL] = useState(false);
  const [currentCampaignURL, setCurrentCampaignURL] = useState('');
  const [checked, setChecked] = useState(true);
  const [checkedCampaignMode, setCheckedCampaignMode] = useState(true);
  // const [previewURL, setPreviewURL] = useState('');
  const [emptyCampaignName, setEmptyCampaignName] = useState(false);

  const setStatus = () => {
    // setChecked(!checked);
    if (props.campaign.currentCampaign) {
      if (props.campaign.currentCampaign.status === 'Active' && checked) {
        setChecked(!checked);
      } else {
        setChecked(!checked);
      }
    } else {
      setChecked(!checked);
    }
  };

  const toggleCampaignMode = () => {
    // setChecked(!checked);
    if (props.campaign.currentCampaign) {
      if (
        props.campaign.currentCampaign.Mode === 'Live' &&
        checkedCampaignMode
      ) {
        setCheckedCampaignMode(!checkedCampaignMode);
      } else {
        setCheckedCampaignMode(!checkedCampaignMode);
      }
    } else {
      setCheckedCampaignMode(!checkedCampaignMode);
    }
  };

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  //display Modal when the user clicks on the magnifying glass from the "All Campaigns" section
  const toggle5 = (e, url, createdDate) => {
    e.preventDefault();
    setEmptyCampaignName(false);
    //Get all Campaigns Info from API
    if (url !== undefined) {
      getSpecificCampaign(props.token, url);
      setCreatedDate(createdDate);
      setCurrentCampaignURL(url);
    }
    setModal5(!modal5);
  };

  const handleCampaignName = (e) => {
    // //prepare the new Campaign Name to update
    // setCampaignName(e.target.value);

    //Modify state only
    changeCampaignName(e.target.value);

    e.target.value.trim().length === 0
      ? setEmptyCampaignName(true)
      : setEmptyCampaignName(false);
  };

  //Update the Campaign name when the user clicks 'Update' on the Campaign Details window.
  const updateCampaign = (e) => {
    e.preventDefault();
    //Send Updated Info to the API
    // console.log(props.campaign.currentCampaign.name);
    if (props.campaign.currentCampaign.name.trim().length > 0) {
      const campaignData = {
        name: props.campaign.currentCampaign.name,
        source: props.campaign.currentCampaign.source,
        offer: props.campaign.currentCampaign.offer
      };
      axios({
        method: 'PATCH',
        url: currentCampaignURL,
        headers: {
          Authorization: 'Token '.concat(props.token),
          'Content-Type': 'application/json'
        },
        data: campaignData
      })
        .then((campaigndata) => {
          //Refresh "All Campaigns" Section because the Campaign name was modified.
          displayNextCampaignSet(props.token, campaignAPI);
          setCurrentCampaignURL('');
          notifySuccess('Success! The Campaign was succesfully updated!');
        })
        .catch((err) => {
          // setCampaignDetails(false);
          notifyError('Warning! The Campaign was not updated.');
          console.log(err);
        });
      // setCampaignName('');
      // setLastName('');
      setModal5(false);
    }
  };

  //Pagination: Enables the previous button user set if the current result set has another page.
  const previousCampaignSet = () => {
    try {
      if (props.campaign.data.previous === null) return true;

      return false;
    } catch {
      return false;
    }
  };

  //Pagination: Enables the next button user set if the current result set has a previous page.
  const nextCampaignSet = () => {
    try {
      if (props.campaign.data.next === null) return true;

      return false;
    } catch {
      return false;
    }
  };

  //Get the next or previous user set from de API
  const getNextCampaignSet = (e, direction) => {
    e.preventDefault();
    try {
      direction === 'next'
        ? props.displayNextCampaignSet(props.token, props.campaign.data.next)
        : props.displayNextCampaignSet(
            props.token,
            props.campaign.data.previous
          );
    } catch {
      console.log('no next dataset... please proceed!');
    }
  };

  //Display all the created Campaigns in the "All Campaigns" section
  const displayTBody = () => {
    try {
      if (props.campaign.campaignLoading) {
        return (
          <tr>
            <td className="text-center font-size-lg pt-5 mt-5">
              <span
                className="btn-wrapper--icon spinner-border spinner-border-lg"
                role="status"
                aria-hidden="true"></span>
              <br />
              <br />
              <span className="sr-only font-size-lg"> Loading...</span>
            </td>
          </tr>
        );
      } else {
        // console.log(props.campaign);
        return Object.values(props.campaign.data.results).map((val, id) => {
          return (
            <tr key={id} className="nopadding">
              <td className="text-left nopadding">
                <div>
                  <div className="font-size-sm font-weight-bold">
                    {val.name}
                  </div>
                </div>
              </td>
              <td className=" nopadding">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="font-size-sm font-weight-bold">
                      {new Date(val.createdDate).toLocaleDateString(
                        [],
                        options
                      )}
                    </div>
                  </div>
                </div>
              </td>

              <td className="text-left nopadding">
                <div className="font-size-sm font-weight-bold">
                  <Badge
                    className="m-1"
                    color={val.status === 'Active' ? 'success' : 'warning'}>
                    {val.status === 'Active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </td>

              <td className="text-left nopadding">
                <div className="font-size-sm font-weight-bold">
                  <Badge
                    className="m-1"
                    color={val.mode === 'Live' ? 'success' : 'warning'}>
                    {val.mode === 'Live' ? 'Live' : 'Not Live'}
                  </Badge>
                </div>
              </td>

              <td className="text-left nopadding">
                <div className="font-size-sm font-weight-bold">
                  {val.revenue}
                </div>
              </td>
              <td className="text-center ">
                <Button
                  color="neutral-primary"
                  className="mx-1 shadow-none d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                  onClick={(e) => toggle5(e, val.url, val.createdDate)}>
                  <FontAwesomeIcon
                    icon={['fas', 'user-edit']}
                    className="font-size-sm"
                  />
                </Button>
              </td>
            </tr>
          );
        });
      }
    } catch (err) {
      console.log(err);
      props.logOut(props.token);
    }
  };

  const searchTypeOptions = [
    { value: 'any', label: 'All types' },
    { value: 'deposit', label: 'Deposit' },
    { value: 'buy', label: 'Buy Crypto' },
    { value: 'sell', label: 'Sell Crypto' },
    { value: 'withdraw', label: 'Withdraw' },
    { value: 'transfer', label: 'Transfer Funds' }
  ];

  const statusOptions = [
    { value: 'any', label: 'All statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'processing', label: 'Processing' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  //Date format setup for modified and created user
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  };

  //New Campaign created, refresh display users
  if (props.campaign.campaignCreated === true) {
    // console.log(campaignAPI);
    props.displayNextCampaignSet(props.token, campaignAPI);
    notifySuccess('Success! The Campaign was succesfully created!');
  }
  //Unauthorized? then logOut.
  //Example: The session is still open, 24 hours later
  if (props.campaign.campaignErrorCode === 401) {
    if (!props.user.errorDetails) {
      props.logOut(props.token);
      localStorage.removeItem('auth');
      localStorage.removeItem('state');
      window.location = '/login';
    } else {
      notifyError('Warning! We could not create your email');
      props.displayNextCampaignSet(props.token, campaignAPI);
    }
  }
  if (props.campaign.campaignLoading === true) {
    // console.log(campaignAPI);
    props.displayNextCampaignSet(props.token, campaignAPI);
  }

  return (
    <div data-section="campaignsInventory">
      <Card className="card-box mb-5">
        <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-4">
          <div className={clsx('', { 'd-none': searchOpen })}>
            <h6 className="font-weight-bold font-size-lg mb-0 text-black">
              All Campaigns
            </h6>
          </div>
          <div
            className={clsx('d-flex align-items-center', {
              'w-100': searchOpen
            })}>
            <div
              className={clsx('search-wrapper search-wrapper--grow w-100', {
                'is-active': searchOpen
              })}>
              <span className="icon-wrapper text-black">
                <FontAwesomeIcon icon={['fas', 'search']} />
              </span>
              <Input
                type="search"
                onFocus={openSearch}
                onBlur={closeSearch}
                placeholder="Search terms..."
              />
            </div>
          </div>
        </CardHeader>

        <div className="divider" />
        <div className="divider" />
        <div className="d-flex align-items-center justify-content-between px-4 py-3">
          <UncontrolledDropdown>
            <DropdownToggle
              size="sm"
              outline
              color="primary"
              className="d-flex align-items-center justify-content-center mr-2">
              <Filter className="w-50" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-xxl p-0">
              <div className="p-3">
                <Row>
                  <Col md="6">
                    <small className="font-weight-bold pb-2 text-uppercase text-primary d-block">
                      Type
                    </small>
                    <Select
                      placeholder="Select..."
                      options={searchTypeOptions}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: '0.29rem',
                        borderWidth: 1,
                        colors: {
                          ...theme.colors,
                          primary25: 'rgba(60,68,177,0.15)',
                          primary50: 'rgba(60,68,177,0.15)',
                          primary: '#3c44b1'
                        }
                      })}
                    />
                  </Col>
                  <Col md="6">
                    <small className="font-weight-bold pb-2 text-uppercase text-primary d-block">
                      Status
                    </small>
                    <Select
                      placeholder="Select..."
                      options={statusOptions}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: '0.29rem',
                        borderWidth: 1,
                        colors: {
                          ...theme.colors,
                          primary25: 'rgba(60,68,177,0.15)',
                          primary50: 'rgba(60,68,177,0.15)',
                          primary: '#3c44b1'
                        }
                      })}
                    />
                  </Col>
                </Row>
              </div>
              <div className="divider" />
              <div className="p-3 text-center bg-secondary">
                <Button color="primary" size="sm">
                  Filter results
                </Button>
              </div>
              <div className="divider" />
              <div className="p-3">
                <Row>
                  <Col md="6">
                    <Nav className="nav-neutral-danger flex-column p-0">
                      <NavItem>
                        <NavLinkStrap
                          className="d-flex rounded-sm justify-content-center"
                          href="#/"
                          onClick={(e) => e.preventDefault()}>
                          <div className="nav-link-icon">
                            <Trash />
                          </div>
                          <span>Cancel</span>
                        </NavLinkStrap>
                      </NavItem>
                    </Nav>
                  </Col>
                  <Col md="6">
                    <Nav className="nav-neutral-success flex-column p-0">
                      <NavItem>
                        <NavLinkStrap
                          className="d-flex rounded-sm justify-content-center"
                          href="#/"
                          onClick={(e) => e.preventDefault()}>
                          <div className="nav-link-icon">
                            <Save />
                          </div>
                          <span>Save filter</span>
                        </NavLinkStrap>
                      </NavItem>
                    </Nav>
                  </Col>
                </Row>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown>
            <DropdownToggle
              size="sm"
              outline
              color="primary"
              className="d-flex align-items-center justify-content-center">
              <Settings className="w-50" />
            </DropdownToggle>
            <DropdownMenu
              right
              className="dropdown-menu-lg overflow-hidden p-0">
              <div className="font-weight-bold px-4 pt-3">Results</div>
              <Nav className="nav-neutral-first nav-pills-rounded flex-column p-2">
                <NavItem>
                  <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                    <div className="nav-link-icon mr-2">
                      <Circle />
                    </div>
                    <span className="font-size-md">
                      <b>10</b> results per page
                    </span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                    <div className="nav-link-icon mr-2">
                      <Circle />
                    </div>
                    <span className="font-size-md">
                      <b>20</b> results per page
                    </span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                    <div className="nav-link-icon mr-2">
                      <Circle />
                    </div>
                    <span className="font-size-md">
                      <b>30</b> results per page
                    </span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
              <div className="divider" />
              <div className="font-weight-bold px-4 pt-4">Order</div>
              <Nav className="nav-neutral-first nav-pills-rounded flex-column p-2">
                <NavItem>
                  <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                    <div className="nav-link-icon mr-2">
                      <ArrowUpCircle />
                    </div>
                    <span className="font-size-md">Ascending</span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                    <div className="nav-link-icon mr-2">
                      <ArrowDownCircle />
                    </div>
                    <span className="font-size-md">Descending</span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <div className="divider" />
        <div className="pt-4 px-4">
          <PerfectScrollbar className="scroll-area-lg mb-2">
            <div className="table-responsive-md">
              <Table responsive className="table-alternate-spaced mb-0">
                {!props.campaign.userLoading ? (
                  <thead className="thead-light text-capitalize font-size-sm font-weight-bold">
                    <tr>
                      <th className="text-left nopadding">Name</th>
                      <th className="text-left nopadding">Created</th>
                      <th className="text-left nopadding">Status</th>
                      <th className="text-left nopadding">Mode</th>
                      <th className="text-left nopadding">Revenue</th>
                      <th className="text-center nopadding">Actions</th>
                    </tr>
                  </thead>
                ) : (
                  <></>
                )}
                <tbody>{displayTBody()}</tbody>
                {props.campaign.userError ? (
                  <tfoot>
                    <tr>
                      <td>
                        <span className="sr-only">Oops! </span>
                      </td>
                    </tr>
                  </tfoot>
                ) : (
                  <></>
                )}
              </Table>
            </div>
          </PerfectScrollbar>
        </div>
        <div className="divider mt-3" />
        <div className="card-footer p-4 d-flex justify-content-center">
          <Pagination className="pagination-primary">
            <PaginationItem disabled={previousCampaignSet()}>
              <PaginationLink
                previous
                href="#/"
                onClick={(e) => getNextCampaignSet(e, 'previous')}>
                <FontAwesomeIcon icon={['fas', 'chevron-left']} />
              </PaginationLink>
            </PaginationItem>

            <PaginationItem disabled={nextCampaignSet()}>
              <PaginationLink
                next
                href="#/"
                onClick={(e) => getNextCampaignSet(e, 'next')}>
                <FontAwesomeIcon icon={['fas', 'chevron-right']} />
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
      </Card>

      <Modal zIndex={2000} centered isOpen={modal5} toggle={toggle5}>
        <div>
          <Card className="bg-secondary shadow-none border-0">
            <div className="bg-composed-wrapper bg-plum-plate">
              <div className="bg-composed-wrapper--image bg-premium-dark opacity-2" />
              <div className="bg-composed-wrapper--image bg-composed-img-1" />
              <div className="bg-composed-wrapper--content text-center text-light p-3">
                <h5 className="mb-2 font-size-xl font-weight-bold">
                  Campaign Details
                </h5>
                <p className="mb-0 font-size-lg opacity-8">
                  Here is the detailed information about the selected campaign.
                </p>
              </div>
            </div>
            <div className="card-body px-lg-5 font-size-md ">
              <div className="bg-white mb-3 container py-3">
                <Row>
                  <Col xs="6">
                    <Label htmlFor="leadid " className="font-weight-bold">
                      ID
                    </Label>
                    <br />
                    <Label>{props.campaign.currentCampaign && props.campaign.currentCampaign.id}</Label>
                  </Col>
                  <Col xs="6">
                    <Label htmlFor="createdon" className=" font-weight-bold">
                      Created On
                    </Label>
                    <br />
                    <Label>
                      {new Date(createdDate).toLocaleDateString([], options)}
                    </Label>
                  </Col>
                </Row>

                <Row className="pt-3">
                  <Col xs="6">
                    <Label htmlFor="leadid " className="font-weight-bold">
                      Status
                    </Label>

                    <div className="d-flex">
                      <div>
                        <Switch
                          className="switch-small toggle-switch-success"
                          checked={checked}
                          onClick={setStatus}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xs="6">
                    <Label htmlFor="createdon" className=" font-weight-bold">
                      Mode
                    </Label>

                    <div className="d-flex">
                      <div>
                        <Switch
                          className="switch-small toggle-switch-success"
                          checked={checkedCampaignMode}
                          onClick={toggleCampaignMode}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="divider mb-3"></div>
              <PerfectScrollbar className="scroll-area-lg mb-2">
                <h6 className="font-weight-bold">Campaign Information</h6>
                <Form className="mr-3" onSubmit={(e) => updateCampaign(e)}>
                  <Row>
                    <Col>
                      <Label htmlFor="campaignName">Campaign Name</Label>
                      <Input
                        type="text"
                        name="campaignName"
                        id="campaignName"
                        className="input-sizing mb-2"
                        onChange={(e) => handleCampaignName(e)}
                        value={
                          props.campaign.currentCampaign
                            ? props.campaign.currentCampaign.name
                            : ''
                        }
                      />
                    </Col>
                  </Row>

                  {emptyCampaignName ? (
                    <Row>
                      <Col>
                        <Alert className="alerts-alternate" color="danger">
                          <div className="d-flex align-items-center align-content-start">
                            <span className="font-size-lg d-block d-40 btn-icon mr-3 text-center bg-danger text-white rounded-sm">
                              <FontAwesomeIcon icon={['far', 'keyboard']} />
                            </span>
                            <span>
                              <strong className="d-block">Warning!</strong>{' '}
                              Campaign Name cannot be empty!
                            </span>
                          </div>
                        </Alert>
                      </Col>
                    </Row>
                  ) : (
                    ''
                  )}

                  <Button color="primary" className="mt-1" type="submit">
                    Update
                  </Button>
                </Form>
              </PerfectScrollbar>
            </div>
          </Card>
        </div>
      </Modal>
    </div>
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
    logOut: (token) => dispatch(logOut(token)),
    displayNextCampaignSet: (token, url) =>
      dispatch(displayNextCampaignSet(token, url)),
    getSpecificCampaign: (token, url) =>
      dispatch(getSpecificCampaign(token, url)),
    changeCampaignName: (value) => dispatch(changeCampaignName(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LivePreviewExample);

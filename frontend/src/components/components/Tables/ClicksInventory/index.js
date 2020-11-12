import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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
import { NavLink as NavLinkStrap } from 'reactstrap';
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

import {
  displayNextClickSet,
  getSpecificClick
} from '../../../../actions/clickActions.js';
import { logOut } from '../../../../actions/authActions.js';
import { loadFromLocalStorage } from '../../../../utils/ScrollToTop';

const LivePreviewExample = (props) => {
  const { displayNextClickSet } = props;

  const [searchOpen, setSearchOpen] = useState(false);
  const [modal5, setModal5] = useState(false);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);
  const toggle5 = () => setModal5(!modal5);
  const clickAPI = `${process.env.REACT_APP_API_EVENTS}`;

  // useEffect(() => {
  //   displayNextClickSet(props.token, clickAPI);
  // }, [displayNextClickSet, props.token, clickAPI]);

  const displayTBody = () => {
    try {
      if (props.click.clickLoading) {
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
        return Object.values(props.click.data.results).map((val, id) => {
          return (
            <tr key={id} className="nopadding">
              <td className="text-left nopadding">
                <div>
                  <div className="font-size-sm font-weight-bold">{val.id}</div>
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
                  {val.url.substr(0, 50)}
                </div>
              </td>
              <td className="text-left nopadding">
                <div className="font-size-sm font-weight-bold">{val.ip}</div>
              </td>
              <td className="text-left nopadding">
                <div className="font-size-sm font-weight-bold">
                  {val.session}
                </div>
              </td>
              <td className="text-left nopadding">
                <div className="font-size-sm font-weight-bold">
                  {val.userAgent}
                </div>
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

  //Pagination: Enables the previous button user set if the current result set has another page.
  const previousClickSet = () => {
    try {
      if (props.click.data.previous === null) return true;

      return false;
    } catch {
      return false;
    }
  };

  //Pagination: Enables the next button user set if the current result set has a previous page.
  const nextClickSet = () => {
    try {
      if (props.click.data.next === null) return true;

      return false;
    } catch {
      return false;
    }
  };

  //Get the next or previous user set from de API
  const getNextClickSet = (e, direction) => {
    e.preventDefault();
    try {
      direction === 'next'
        ? displayNextClickSet(props.token, props.click.data.next)
        : displayNextClickSet(props.token, props.click.data.previous);
    } catch {
      console.log('no next dataset... proceed');
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

  //Unauthorized? then logOut.
  //Example: The session is still open, 24 hours later
  // if (
  //   props.click.clickErrorCode === 401 ||
  //   props.click.clickErrorCode === 400
  // ) {
  //   if (!props.user.errorDetails && props.click.clickErrorCode === 401) {
  //     props.logOut(props.token);
  //     localStorage.removeItem('auth');
  //     localStorage.removeItem('state');
  //     window.location = '/login';
  //   }
  // }
  // if (props.click.clickLoading === true) {
  //   // console.log(offerAPI);
  //   displayNextClickSet(props.token, clickAPI);
  // }
  return (
    <div data-section="clicksInventory">
      <Card className="card-box mb-5">
        <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-4">
          <div className={clsx('', { 'd-none': searchOpen })}>
            <h6 className="font-weight-bold font-size-lg mb-0 text-black">
              All Clicks
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
                <thead className="thead-light text-capitalize font-size-sm font-weight-bold">
                  <tr>
                    <th className="text-left px-4">Click ID</th>
                    <th className="text-center">CREATED</th>
                    <th className="text-left">URL</th>
                    <th className="text-left">IP</th>
                    <th className="text-left">SESSION</th>
                    <th className="text-left">uSER AGENT</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {displayTBody()} */}
                  </tbody>
                {/* {props.click.userError ? (
                  <tfoot>
                    <tr>
                      <td>
                        <span className="sr-only">Oops! </span>
                      </td>
                    </tr>
                  </tfoot>
                ) : (
                  <></>
                )} */}
              </Table>
            </div>
          </PerfectScrollbar>
        </div>
        <div className="divider mt-3" />
        <div className="card-footer p-4 d-flex justify-content-center">
          <Pagination className="pagination-primary">
            <PaginationItem disabled={previousClickSet()}>
              <PaginationLink
                previous
                href="#/"
                onClick={(e) => getNextClickSet(e, 'previous')}>
                <FontAwesomeIcon icon={['fas', 'chevron-left']} />
              </PaginationLink>
            </PaginationItem>

            <PaginationItem disabled={nextClickSet()}>
              <PaginationLink
                next
                href="#/"
                onClick={(e) => getNextClickSet(e, 'next')}>
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
                  Click Details
                </h5>
                <p className="mb-0 font-size-lg opacity-8">
                  Here is the information you have posted from your sources to
                  our API with additional tracking information.
                </p>
              </div>
            </div>
            <div className="card-body px-lg-5 font-size-sm ">
              <div className="bg-white mb-3 container py-3">
                <Row>
                  <Col>
                    <h6 className="font-weight-bold">Tracking Information</h6>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Label htmlFor="leadid">Click ID</Label>
                    <Input
                      type="text"
                      name="leadid"
                      id="leadid"
                      disabled
                      className="input-sizing"
                    />
                  </Col>
                  <Col md="6">
                    <Label htmlFor="createdon">Created On</Label>
                    <Input
                      type="text"
                      name="createdon"
                      id="createdon"
                      disabled
                      className="input-sizing"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Label htmlFor="ipaddress">IP Address</Label>
                    <Input
                      type="text"
                      name="ipaddress"
                      id="ipaddress"
                      disabled
                      className="input-sizing"
                    />
                  </Col>
                  <Col md="6">
                    <Label htmlFor="campaignID">Campaign ID</Label>
                    <Input
                      type="text"
                      name="campaignid"
                      id="campaignid"
                      disabled
                      className="input-sizing"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Label htmlFor="offerid">Offer</Label>
                    <Input
                      type="text"
                      name="offerid"
                      id="offerid"
                      disabled
                      className="input-sizing"
                    />
                  </Col>
                  <Col md="6"></Col>
                </Row>
              </div>
              <div className="divider mb-3"></div>
              <PerfectScrollbar className="scroll-area-sm mb-2">
                <h6 className="font-weight-bold">Click Information</h6>
                <Form className="mr-3">
                  <Label htmlFor="fname">First Name</Label>
                  <Input
                    type="text"
                    name="fname"
                    id="fname"
                    className="input-sizing"
                  />

                  <Label htmlFor="lname">Last Name</Label>
                  <Input
                    type="text"
                    name="lname"
                    id="lname"
                    className="input-sizing"
                  />

                  <Label htmlFor="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    className="input-sizing"
                  />

                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    className="input-sizing"
                  />

                  <Label htmlFor="city">City</Label>
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    className="input-sizing"
                  />

                  <Label htmlFor="state">State</Label>
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    className="input-sizing"
                  />

                  <Label htmlFor="zipcode">Zip Code</Label>
                  <Input
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    className="input-sizing"
                  />

                  <Button color="primary" className="mt-1">
                    Submit
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
    displayNextClickSet: (token, url) =>
      dispatch(displayNextClickSet(token, url)),
    getSpecificClick: (token, url) => dispatch(getSpecificClick(token, url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LivePreviewExample);

import clsx from 'clsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowDownRight, ArrowLeft, ArrowUpRight, Upload, Check, X, User } from 'react-feather';
import {
  Row,
  Col,
  Card,
  Label,
  FormGroup,
  Modal,
  Form,
  CardHeader,
  Container,
  Input,
  Badge,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Button,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';
// import hero1 from '../../../assets/images/hero-bg/hero-8.jpg';
import hero1 from '../../../../assets/images/stock-photos/stock-5.jpg';
import people3 from '../../../../assets/images/stock-photos/people-3.jpg';
import { loadFromLocalStorage, notifySuccess, notifyError } from '../../../../utils/ScrollToTop';

const LivePreviewExample = (props) => {
  let user = JSON.parse(localStorage.getItem('auth'));
  const userProfile = user;  
  const [inputBg, setInputBg] = useState(false);
  const toggleInputBg = () => setInputBg(!inputBg);
  const [activeTab, setActiveTab] = useState('1');
  const [phoneNumber, setPhoneNumber] = useState(userProfile.phone);
  const [role, setRole] = useState(userProfile.role);
  
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // Update profile Modal
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [files, setFiles] = useState(
    [Object.assign({},{preview: userProfile && userProfile.profilePhoto.split('?')[0]})]
  );
  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
    getRootProps,
    getInputProps
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = files.map((file,idx) => (
    <div
      key={idx}
      className="rounded-circle avatar-image overflow-hidden d-140 bg-neutral-success text-center font-weight-bold text-success d-flex justify-content-center align-items-center">
      <img
        className="img-fluid img-fit-container rounded-sm"
        src={file.preview}
        alt="..."
      />
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },[files]
  );

  const updateUser = (e) => {
    e.preventDefault();
    //Send Updated Info to the API
    // console.log(props.token, files);
    let formData = new FormData();
    localStorage.removeItem('auth');
    files.forEach( file => {
      if (file.name) formData.append('photo', file);
    })
    
    formData.append('phone', phoneNumber);
    formData.append('role', role);
    
    axios({
      method: 'PATCH',
      url: userProfile.url,
      headers: {
        Authorization: 'Token '.concat(props.token),
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then((userdata) => {
        user = userdata.data;
        localStorage.setItem('auth',JSON.stringify(user));
        notifySuccess('Success! The user was successfuly modified!');
      })
      .catch((err) => {
        notifyError('Warning! We could not update the user');
        console.log(err);
      });
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
  };
  
  return (
    <>
      <div className="app-inner-content-layout">
        <div className="app-inner-content-layout--main bg-white p-0">
          <Container className="z-over pt-3">
            <Row>
              <Col>
                <div className="hero-wrapper rounded mt-3 shadow-xxl bg-composed-wrapper bg-second">
                  <div className="flex-grow-1 d-flex align-items-center">
                    <div
                className="bg-composed-wrapper--image opacity-3"
                style={{ backgroundImage: 'url(' + hero1 + ')' }}
              />
                    <div className="bg-composed-wrapper--bg bg-deep-sky opacity-4 rounded" />
                    <div className="bg-composed-wrapper--content px-3 pt-5">
                      <Container className="pt-4">
                        <div className="d-block d-md-flex align-items-start">
                          <div className="dropzone rounded-circle shadow-sm-dark mr-md-3">
                            <div
                              {...getRootProps({
                                className: 'dropzone-upload-wrapper'
                              })}>
                              <input {...getInputProps()} />
                              <div className="dropzone-inner-wrapper d-140 rounded-circle dropzone-avatar">
                                <div className="avatar-icon-wrapper d-140 rounded-circle m-2">
                                  <Button
                                    color="link"
                                    onClick={open}
                                    className="avatar-button badge shadow-sm-dark btn-icon badge-position badge-position--bottom-right border-2 text-indent-0 d-40 badge-circle badge-first text-white">
                                    <Upload className="d-20" />
                                  </Button>

                                  <div>
                                    {isDragAccept && (
                                      <div className="rounded-circle overflow-hidden d-140 bg-success text-center font-weight-bold text-white d-flex justify-content-center align-items-center">
                                        <Check className="d-40" />
                                      </div>
                                    )}
                                    {isDragReject && (
                                      <div className="rounded-circle overflow-hidden d-140 bg-danger text-center font-weight-bold text-white d-flex justify-content-center align-items-center">
                                        <X className="d-60" />
                                      </div>
                                    )}
                                    {!isDragActive && (
                                      <div className="rounded-circle overflow-hidden d-140 bg-second text-center font-weight-bold text-white-50 d-flex justify-content-center align-items-center">
                                        <User className="d-50" />
                                      </div>
                                    )}
                                  </div>

                                  {thumbs.length > 0 && <div>{thumbs}</div>}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex text-white flex-column pl-md-2">
                            <div className="d-block d-md-flex align-items-center">
                              <div className="my-3 my-md-0">
                                <div className="d-flex align-items-end">
                                  <div className="font-size-xxl font-weight-bold">
                                    {userProfile.firstName} {userProfile.lastName}
                                  </div>
                                </div>
                                <div className=" mt-1 font-size-lg">
                                  <Label htmlFor="role">Role: </Label>
                                  <Input
                                    type="text"
                                    name="role"
                                    id="role"
                                    className="input-sizing"
                                    onChange={(e) => handleRole(e)}
                                    defaultValue={userProfile ? userProfile.role : ''}
                                    />
                                </div>
                              </div>
                              {/* <div className="ml-auto">
                          <Button
                            size="sm"
                            color="first"
                            className="mr-4 shadow-none rounded-lg text-uppercase line-height-1 font-weight-bold font-size-xs px-3 w-auto py-0 d-40">
                            Profile
                          </Button>
                          <Button
                            size="sm"
                            color="first"
                            className="mr-4 shadow-none rounded-lg text-uppercase line-height-1 font-weight-bold font-size-xs px-3 w-auto py-0 d-40">
                            History
                          </Button>
                          <Button
                            className="btn-icon rounded-lg shadow-none hover-scale-lg d-40 p-0"
                            color="success">
                            <FontAwesomeIcon icon={['fas', 'plus']} />
                          </Button>
                        </div> */}
                            </div>
                            <div className="d-flex font-size-xl py-1 align-items-center">
                              <div className="mr-2">
                                <span className="font-size-sm text-white-50">
                                  {/* New York Greater Area,{' '} */}
                                </span>
                              </div>
                              <div className="mr-2">
                                <span className="font-size-sm text-white-50">
                                  {/* 10101.{' '} */}
                                </span>
                              </div>
                              <div className="mr-2">
                                <span className="font-size-sm text-white-50">
                                  {/* NY */}
                                </span>
                              </div>
                            </div>
                            <div className="font-size-lg">
                              <Label htmlFor="phone">Phone Number:</Label>
                              <Input
                                type="tel"
                                name="phone"
                                id="phone"
                                className="input-sizing"
                                onChange={(e) => handlePhoneNumber(e)}
                                defaultValue={userProfile ? userProfile.phone : ''}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="my-5 nav-tabs-success tabs-animated tabs-animated-shadow">
                          <Nav tabs className="justify-content-center">
                            <NavItem className="px-3">
                              {/* <NavLinkStrap
                                className={clsx(
                                  'bg-white-10 m-3 m-lg-0 rounded-lg',
                                  {
                                    active: activeTab2 === '1'
                                  }
                                )}
                                onClick={toggleModal}> */}
                              <NavLinkStrap
                                className={clsx(
                                  'bg-white-10 m-3 m-lg-0 rounded-lg'
                                )}
                                >
                                {/* onClick={toggleModal}> */}
                                <span className="font-size-lg text-white px-2">
                                  <Button
                                    color="success"
                                    id="AddEntryTooltip20" onClick={(e) => updateUser(e)}>
                                    <span className="btn-wrapper--icon">
                                      Update Profile
                                    </span>
                                  </Button>
                                </span>
                                <div className="divider" />
                              </NavLinkStrap>
                            </NavItem>
                          </Nav>
                        </div>
                      </Container>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <Container className="z-over pt-3">
            {/* <TabContent activeTab={activeTab2}> */}
            <TabContent activeTab={'1'}>
              <TabPane tabId="1">
                {/* <ExampleWrapperSimple>
                  <FormsValidation2 />
                </ExampleWrapperSimple> */}

                <Row>
                  <Col lg="6" className="d-flex">
                    <Card className="card-box w-100 shadow-xxl mb-5">
                      <CardHeader>
                        <div className="card-header--title">
                          <small className="d-block text-uppercase mt-1">
                            Activity
                          </small>
                          <b>Your recent activity</b>
                        </div>
                      </CardHeader>
                      <div className="bg-secondary py-2 text-center px-4">
                        <div className="btn-group btn-group-sm" role="group">
                          <Button
                            className={clsx('font-size-sm', {
                              active: activeTab === '1'
                            })}
                            onClick={() => {
                              toggle('1');
                            }}
                            color="primary">
                            Activity
                          </Button>
                          {/* <Button
                            className={clsx('font-size-sm', {
                              active: activeTab === '2'
                            })}
                            onClick={() => {
                              toggle('2');
                            }}
                            color="primary">
                            Trading
                          </Button> */}
                        </div>
                      </div>
                      <div className="divider" />
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                          <div className="pl-3">
                            <div className="scroll-area shadow-overflow">
                              <PerfectScrollbar>
                                <div className="timeline-list timeline-list-offset timeline-list-offset-dot py-3">
                                  <div className="timeline-item">
                                    <div className="timeline-item-offset">
                                      6 Feb
                                    </div>
                                    <div className="timeline-item--content">
                                      <div className="timeline-item--icon" />
                                      <h4 className="timeline-item--label mb-2 font-weight-bold">
                                        Joined Tujeyo
                                      </h4>
                                      <p>
                                        Welcome to the platform. Enjoy your stay
                                        here!
                                      </p>
                                    </div>
                                  </div>
                                  <div className="timeline-item">
                                    <div className="timeline-item-offset">
                                      12 Feb
                                    </div>
                                    <div className="timeline-item--content">
                                      <div className="timeline-item--icon" />
                                      <h4 className="timeline-item--label mb-2 font-weight-bold">
                                        <div className="badge badge-success">
                                          Welcome
                                        </div>
                                      </h4>
                                      <p>
                                        Your account was{' '}
                                        <b>succesfully ceated.</b>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="timeline-item">
                                    <div className="timeline-item-offset">
                                      12 Feb
                                    </div>
                                    <div className="timeline-item--content">
                                      <div className="timeline-item--icon" />
                                      <h4 className="timeline-item--label mb-2 font-weight-bold">
                                        Profile verification
                                      </h4>
                                      <p>
                                        You confirmed your identity by the
                                        provided email.
                                      </p>
                                      <div className="mt-2">
                                        <Button size="sm" color="warning">
                                          Account verified
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="timeline-item">
                                    <div className="timeline-item-offset">
                                      13 Feb
                                    </div>
                                    <div className="timeline-item--content">
                                      <div className="timeline-item--icon" />
                                      <h4 className="timeline-item--label mb-2 font-weight-bold">
                                        Profile updated
                                      </h4>
                                      <p>
                                        You succesfully updated your profile.
                                      </p>
                                      {/* <div className="avatar-wrapper-overlap mt-2 mb-1">
                                        <div className="avatar-icon-wrapper avatar-icon-sm">
                                          <div className="avatar-icon">
                                            <img alt="..." src={avatar1} />
                                          </div>
                                        </div>
                                        <div className="avatar-icon-wrapper avatar-icon-sm">
                                          <div className="avatar-icon">
                                            <img alt="..." src={avatar2} />
                                          </div>
                                        </div>
                                        <div className="avatar-icon-wrapper avatar-icon-sm">
                                          <div className="avatar-icon">
                                            <img alt="..." src={avatar6} />
                                          </div>
                                        </div>
                                      </div> */}
                                    </div>
                                  </div>
                                  <div className="timeline-item">
                                    <div className="timeline-item-offset">
                                      14 Feb
                                    </div>
                                    <div className="timeline-item--content">
                                      <div className="timeline-item--icon" />
                                      <h4 className="timeline-item--label mb-2 font-weight-bold">
                                        Campaign created
                                      </h4>
                                      <p>
                                        You successfully created a new campaign.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </PerfectScrollbar>
                            </div>
                          </div>
                          {/* <div className="card-footer p-3 text-center">
                            <Button
                              size="sm"
                              className="py-2 px-4"
                              color="primary">
                              <span className="btn-wrapper--label text-uppercase font-weight-bold">
                                View all activity
                              </span>
                            </Button>
                          </div> */}
                        </TabPane>
                        <TabPane tabId="2">
                          <div className="scroll-area shadow-overflow">
                            <PerfectScrollbar>
                              <ListGroup flush>
                                <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                                  <div className="d-flex align-items-center mr-4">
                                    <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill font-size-lg mr-3 bg-success">
                                      <ArrowDownRight />
                                    </div>
                                    <div>
                                      <div className="font-weight-bold">
                                        Received Bitcoin
                                      </div>
                                      <span className="text-black opacity-5 d-block">
                                        To <b>My Bitcoin Wallet</b>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <div className="text-right mr-3">
                                      <div className="font-weight-bold font-size-lg">
                                        0.234894 BTC
                                      </div>
                                      <div className="font-weight-bold text-black opacity-4">
                                        $438
                                      </div>
                                    </div>
                                  </div>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                                  <div className="d-flex align-items-center mr-4">
                                    <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill font-size-lg mr-3 bg-first">
                                      <ArrowUpRight />
                                    </div>
                                    <div>
                                      <div className="font-weight-bold">
                                        Sent Ethereum
                                      </div>
                                      <span className="text-black opacity-5 d-block">
                                        From <b>Ether Wallet</b>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <div className="text-right mr-3">
                                      <div className="font-weight-bold font-size-lg">
                                        1.3984 ETH
                                      </div>
                                      <div className="font-weight-bold text-black opacity-4">
                                        $1,495 USD
                                      </div>
                                    </div>
                                  </div>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                                  <div className="d-flex align-items-center mr-4">
                                    <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill font-size-lg mr-3 bg-danger">
                                      <ArrowLeft />
                                    </div>
                                    <div>
                                      <div className="font-weight-bold">
                                        Withdraw to bank account
                                      </div>
                                      <span className="text-black opacity-5 d-block">
                                        From <b>Total Balance</b>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <div className="text-right mr-3">
                                      <div className="font-weight-bold text-danger font-size-lg">
                                        -23,549 USD
                                      </div>
                                    </div>
                                  </div>
                                </ListGroupItem>
                                <ListGroupItem className="py-4 text-center text-black-50">
                                  You've reached the end of the trading list!
                                </ListGroupItem>
                              </ListGroup>
                            </PerfectScrollbar>
                          </div>
                          <div className="card-footer p-3 text-center">
                            <Button
                              size="sm"
                              className="py-2 px-4"
                              color="primary">
                              <span className="btn-wrapper--label text-uppercase font-weight-bold">
                                View all transactions
                              </span>
                            </Button>
                          </div>
                        </TabPane>
                      </TabContent>
                    </Card>
                  </Col>
                  <Col lg="6">
                    <Card className="card-box mb-5 w-100">
                      <CardHeader>
                        <div className="card-header--title">
                          <small className="d-block text-uppercase mt-1">
                            Messages
                          </small>
                          <b>Messages Window</b>
                        </div>
                        <div className="avatar-icon-wrapper avatar-initials shadow-none d-40 mr-0">
                          <div className="avatar-icon text-white bg-night-sky d-40 font-size-sm">
                            ET
                          </div>
                          <Badge
                            color="success"
                            className="badge-position badge-position--bottom-center badge-circle-inner"
                            title="Badge bottom center">
                            Online
                          </Badge>
                        </div>
                      </CardHeader>
                      <div
                        className={clsx(
                          'd-flex transition-base align-items-center justify-content-between py-2 px-4',
                          { 'bg-secondary': !inputBg }
                        )}>
                        <div>
                          <Button
                            size="sm"
                            color="link"
                            className="p-0 btn-transition-none btn-link-danger">
                            <span className="btn-wrapper--label font-size-sm">
                              {/* Delete all */}
                            </span>
                          </Button>
                        </div>
                        <div className="font-size-sm font-weight-bold">
                          Emma Taylor
                        </div>
                      </div>
                      <div className="divider" />
                      <div
                        className={clsx(
                          'd-flex align-items-center transition-base px-4 py-1',
                          { 'py-3 bg-secondary': inputBg }
                        )}>
                        <div className="search-wrapper w-100">
                          <span className="icon-wrapper text-black">
                            <FontAwesomeIcon icon={['fas', 'search']} />
                          </span>
                          <Input
                            onFocus={toggleInputBg}
                            onBlur={toggleInputBg}
                            className="border-0 bg-white transition-base"
                            placeholder="Search messages..."
                          />
                        </div>
                      </div>
                      <div className="divider" />
                      <ListGroup flush>
                        <ListGroupItem
                          tag="a"
                          action
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                          <div className="d-flex align-items-center">
                            <div className="avatar-icon-wrapper d-50 mr-3">
                              <div className="avatar-icon rounded-circle d-50">
                                {/* <img alt="..." src={avatar7} /> */}
                              </div>
                            </div>
                            <div>
                              <div className="font-weight-bold font-size-sm text-black">
                                Action needed: A verification email was sent.
                              </div>
                              {/* <div className="d-flex align-items-center font-size-xs">
                                <Badge
                                  color="success"
                                  className="badge-circle border-white border-1 mr-2">
                                  Completed
                                </Badge>
                                <div className="text-success">Online</div>
                              </div> */}
                            </div>
                          </div>
                          {/* <div>
                            <Button
                              size="sm"
                              color="neutral-dark"
                              className="px-3">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon icon={['fas', 'plus']} />
                              </span>
                              <span className="btn-wrapper--label">Add</span>
                            </Button>
                          </div> */}
                        </ListGroupItem>
                        <ListGroupItem
                          tag="a"
                          action
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                          <div className="d-flex align-items-center">
                            <div className="avatar-icon-wrapper d-50 mr-3">
                              <div className="avatar-icon rounded-circle d-50">
                                {/* <img alt="..." src={avatar7} /> */}
                              </div>
                            </div>
                            <div>
                              <div className="font-weight-bold font-size-sm text-black">
                                An reset password email was sent.
                              </div>
                            </div>
                          </div>
                        </ListGroupItem>
                        <ListGroupItem
                          tag="a"
                          action
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                          <div className="d-flex align-items-center">
                            <div className="avatar-icon-wrapper d-50 mr-3">
                              <div className="avatar-icon rounded-circle d-50">
                                {/* <img alt="..." src={avatar7} /> */}
                              </div>
                            </div>
                            <div>
                              <div className="font-weight-bold font-size-sm text-black">
                                Your invoice is ready, please verify your
                                account.
                              </div>
                            </div>
                          </div>
                        </ListGroupItem>
                        {/* <ListGroupItem
                          tag="a"
                          action
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                          <div className="d-flex align-items-center">
                            <div className="avatar-icon-wrapper d-50 mr-3">
                              <div className="avatar-icon rounded-circle d-50">
                                <img alt="..." src={avatar6} />
                              </div>
                            </div>
                            <div>
                              <div className="font-weight-bold font-size-sm text-black">
                                Karla Byrne
                              </div>
                              <div className="d-flex align-items-center font-size-xs">
                                <Badge
                                  color="success"
                                  className="badge-circle border-white border-1 mr-2">
                                  Completed
                                </Badge>
                                <div className="text-success">Online</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Button
                              size="sm"
                              color="neutral-dark"
                              className="px-3">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon icon={['fas', 'plus']} />
                              </span>
                              <span className="btn-wrapper--label">Add</span>
                            </Button>
                          </div>
                        </ListGroupItem>
                        <ListGroupItem
                          tag="a"
                          action
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                          <div className="d-flex align-items-center">
                            <div className="avatar-icon-wrapper d-50 mr-3">
                              <div className="avatar-icon rounded-circle d-50">
                                <img alt="..." src={avatar5} />
                              </div>
                            </div>
                            <div>
                              <div className="font-weight-bold font-size-sm text-black">
                                Eden Hays
                              </div>
                              <div className="d-flex align-items-center font-size-xs">
                                <Badge
                                  color="danger"
                                  className="badge-circle border-white border-1 mr-2">
                                  Completed
                                </Badge>
                                <div className="text-danger">Offline</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Button
                              size="sm"
                              color="neutral-dark"
                              className="px-3 disabled">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon icon={['fas', 'plus']} />
                              </span>
                              <span className="btn-wrapper--label">Add</span>
                            </Button>
                          </div>
                        </ListGroupItem>
                        <ListGroupItem
                          tag="a"
                          action
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                          <div className="d-flex align-items-center">
                            <div className="avatar-icon-wrapper d-50 mr-3">
                              <div className="avatar-icon rounded-circle d-50">
                                <img alt="..." src={avatar4} />
                              </div>
                            </div>
                            <div>
                              <div className="font-weight-bold font-size-sm text-black">
                                Janine Benton
                              </div>
                              <div className="d-flex align-items-center font-size-xs">
                                <Badge
                                  color="warning"
                                  className="badge-circle border-white border-1 mr-2">
                                  Completed
                                </Badge>
                                <div className="text-warning">In a meeting</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Button
                              size="sm"
                              color="neutral-dark"
                              className="px-3">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon icon={['fas', 'plus']} />
                              </span>
                              <span className="btn-wrapper--label">Add</span>
                            </Button>
                          </div>
                        </ListGroupItem>*/}
                      </ListGroup>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Container>
        </div>
      </div>

      <Modal
        centered
        size="md"
        isOpen={modal}
        zIndex={1300}
        toggle={toggleModal}
        contentClassName="border-0 bg-transparent">
        <div className="hero-wrapper bg-composed-wrapper bg-plum-plate h-100 rounded-top">
          <div className="flex-grow-1 w-100 d-flex align-items-center">
            <div
              className="bg-composed-wrapper--image rounded-top opacity-4"
              style={{ backgroundImage: 'url(' + people3 + ')' }}
            />
            <div className="bg-composed-wrapper--bg bg-second opacity-4 rounded-top" />
            <div className="bg-composed-wrapper--content text-center pt-3">
              <div className="text-white">
                <h1 className="display-3 my-3 font-weight-bold">
                  Update your Profile
                </h1>
                <p className="font-size-lg mb-0 text-white-50">
                  Fill in the fields below to update your profile
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
              <Form onSubmit={(e) => updateUser(e)}>
                <FormGroup>
                  <Label htmlFor="comanyname">Company Name</Label>
                  <Input
                    type="text"
                    name="comanyname"
                    id="comanyname"
                    placeholder="Company Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="fname">First Name</Label>
                  <Input type="text" name="fname" id="fname" />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="lname">Last Name</Label>
                  <Input type="text" name="lname" id="lname" />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phonenumber">Phone Number</Label>
                  <Input type="text" name="phonenumber" id="phonenumber" />
                </FormGroup>

                <Button color="primary" className="mt-1" type="submit">
                  Update
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
  const persistedState = loadFromLocalStorage();
  return {
    ...state,
    token: persistedState ? persistedState.token : undefined
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     changeProfile: (value, currentProfile) =>
//       dispatch(changeProfile(value, currentProfile))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LivePreviewExample);
export default connect(mapStateToProps)(LivePreviewExample);

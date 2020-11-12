import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Col,
  Form,
  Label,
  FormGroup,
  Input,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { createVertical } from '../../../actions/verticalActions.js'; 
import { loadFromLocalStorage } from '../../../utils/ScrollToTop';

const VerticalModalContent = (props) => {
  // console.log(props);
  // const { token } = props.auth;

  const [verticalName, setVerticalName] = useState('');
  const [badVerticalName, setBadVerticalName] = useState(false);
  // const [accountName, setAccountName] = useState('');

  const createVerticalCall = (e) => {
    e.preventDefault();
    if (verticalName !== '') {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const accountName = auth.user.account.url;
      // console.log(auth.user.account.url);
      // setAccountName(auth.user.account.url);
      // console.log(verticalName, props.token, accountName);
      props.createVertical(verticalName, props.token, accountName);
      // setAccountURL(false);
      setBadVerticalName(false);
      // setModal(false);
    } else {
      if (verticalName === '') setBadVerticalName(true);
    }
  };

  const handleVerticalNameChange = (e) => {
    e.preventDefault();
    setBadVerticalName(false);
    setVerticalName(e.target.value);
  };

  return (
    <div
          className="bg-white rounded pt-0 pt-lg-0"
          style={{ marginTop: '-80px' }}>
          <Col lg="10" xl="9" className="z-over pt-0 pt-lg-4 pb-4 mx-auto">
            <div className="px-4 py-0">
              
              <Form onSubmit={(e) => createVerticalCall(e)}>
                <FormGroup>
                  <Label htmlFor="verticalName">Vertical Name</Label>
                  <Input
                    type="text"
                    name="verticalName"
                    id="verticalName"
                    placeholder="Example Vertical"
                    onChange={(e) => handleVerticalNameChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  {badVerticalName ? (
                    <Alert className="alerts-alternate" color="danger">
                      <div className="d-flex align-items-center align-content-start">
                        <span className="font-size-lg d-block d-40 btn-icon mr-3 text-center bg-danger text-white rounded-sm">
                          <FontAwesomeIcon icon={['far', 'keyboard']} />
                        </span>
                        <span>
                          <strong className="d-block">Warning!</strong> Please
                          verify the vertical name!
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

const mapDispatchToProps = (dispatch) => {
  return {
    createVertical: (verticalName, token, categoryURL) =>
      dispatch(createVertical(verticalName, token, categoryURL))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalModalContent);

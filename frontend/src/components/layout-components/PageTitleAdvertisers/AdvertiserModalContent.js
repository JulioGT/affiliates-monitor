import React, { useState } from 'react';
import { connect } from 'react-redux';
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

import { createAdvertiser } from '../../../actions/advertiserActions.js';
import { loadFromLocalStorage } from '../../../utils/ScrollToTop';

const AdvertiserModalContent = (props) => {
  // console.log(props);

  const [advertiserName, setAdvertiserName] = useState('');
  const [badAdvertiserName, setBadAdvertiserName] = useState(false);

  const createAdvertiserCall = (e) => {
    e.preventDefault();
    if (advertiserName !== '') {
      // console.log(advertiserName, props.auth.token);
      props.createAdvertiser(advertiserName, props.token);
      setBadAdvertiserName(false);
    } else {
      setBadAdvertiserName(true);
    }
  };

  const handleAdvertiserChange = (e) => {
    e.preventDefault();
    setBadAdvertiserName(false);
    setAdvertiserName(e.target.value);
  };

  return (
    <>
      <div
          className="bg-white rounded pt-0 pt-lg-0"
          style={{ marginTop: '-80px' }}>
          <Col lg="10" xl="9" className="z-over pt-0 pt-lg-4 pb-4 mx-auto">
            <div className="px-4 py-0">
              <Form onSubmit={(e) => createAdvertiserCall(e)}>
                <FormGroup>
                  <Label htmlFor="advertiserName">Advertiser Name</Label>
                  <Input
                    type="text"
                    name="advertiserName"
                    id="advertiserName"
                    placeholder="Name"
                    onChange={(e) => handleAdvertiserChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  {badAdvertiserName ? (
                    <Alert className="alerts-alternate" color="danger">
                      <div className="d-flex align-items-center align-content-start">
                        <span className="font-size-lg d-block d-40 btn-icon mr-3 text-center bg-danger text-white rounded-sm">
                          <FontAwesomeIcon icon={['far', 'keyboard']} />
                        </span>
                        <span>
                          <strong className="d-block">Warning!</strong> Please
                          verify the Name of your New Advertiser!
                        </span>
                      </div>
                    </Alert>
                  ) : (
                    ''
                  )}
                </FormGroup>

                <Button color="primary" className="mt-2" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </div>
      
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

const mapDispatchToProps = (dispatch) => {
  return {
    createAdvertiser: (advertiserName, token) =>
      dispatch(createAdvertiser(advertiserName, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertiserModalContent);

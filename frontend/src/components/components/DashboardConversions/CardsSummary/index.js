import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Row, Col, CardBody, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { loadFromLocalStorage } from '../../../../utils/ScrollToTop';

const LivePreviewExample = (props) => {

  const [clickCounter, setClickCounter] = useState(0);
  const [eventCounter, setEventCounter] = useState(0);
  const [leadCounter, setLeadCounter] = useState(0); //Verify Event Card
  const [earnings, setEarnings] = useState(0);

  useEffect (() => {
    totalClicks(props.click);
  }, [props.click]);


  const totalClicks  = (click) => {
    let subEarnings = 0; 
    let subClick = 0;
    let subEvent = 0;
    let subLead = 0;
    
    if(click.data){
      click.data.results.forEach(el => {
        if(el.cost !== null) subEarnings+= el.cost;
        switch (el.event) {
          case "click":
            subClick++;
          break;
          case "event":
            subEvent++;
          break;
          case "lead":
            subLead++
          break;
          default:
            break;
        } 
      })
      setEarnings(subEarnings);
      setClickCounter(subClick); 
      setEventCounter(subEvent); 
      setLeadCounter(subLead); 
    }
  }

  return (
    <>
      <Row>
        <Col lg="6" xl="3">
          <Card className="card-box mb-5 bg-premium-dark border-0 text-light">
            <CardBody>
              <div className="align-box-row align-items-start">
                <div className="font-weight-bold">
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    Impressions
                  </small>
                  <span className="font-size-xxl mt-1">{eventCounter + clickCounter}</span>
                </div>
                <div className="ml-auto">
                  <div className="bg-white text-center text-success font-size-xl d-50 rounded-circle btn-icon">
                    <FontAwesomeIcon icon={['far', 'object-group']} />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <FontAwesomeIcon
                  icon={['fas', 'arrow-up']}
                  className="text-success"
                />
                <span className="text-success px-1">25.4%</span>
                <span className="text-white-50">increase this month</span>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="card-box mb-5 bg-night-sky text-light">
            <CardBody>
              <div className="align-box-row align-items-start">
                <div className="font-weight-bold">
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    Conversions
                  </small>
                  <span className="font-size-xxl mt-1">
                    {leadCounter}
                  </span>
                </div>
                <div className="ml-auto">
                  <div className="bg-white text-center text-primary font-size-xl d-50 rounded-circle btn-icon">
                    <FontAwesomeIcon icon={['far', 'dot-circle']} />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <FontAwesomeIcon
                  icon={['fas', 'arrow-up']}
                  className="text-success"
                />
                <span className="text-success px-1">22.65%</span>
                <span className="text-white-50">same as before</span>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="card-box mb-5 bg-plum-plate text-white">
            <CardBody>
              <div className="align-box-row align-items-start">
                <div className="font-weight-bold">
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    CTR
                  </small>
                  <span className="font-size-xxl mt-1">39%</span>
                </div>
                <div className="ml-auto">
                  <div className="bg-white text-center text-warning font-size-xl d-50 rounded-circle btn-icon">
                    <FontAwesomeIcon icon={['far', 'chart-bar']} />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <FontAwesomeIcon
                  icon={['fas', 'arrow-up']}
                  className="text-warning"
                />
                <span className="text-warning px-1">5.2%</span>
                <span className="text-white-50">lower order numbers</span>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="card-box mb-5 bg-midnight-bloom text-white">
            <CardBody>
              <div className="align-box-row align-items-start">
                <div className="font-weight-bold">
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    Earnings
                  </small>
                  <span className="font-size-xxl mt-1">$ {earnings}</span>
                </div>
                <div className="ml-auto">
                  <div className="bg-white text-center text-danger font-size-xl d-50 rounded-circle btn-icon">
                    <FontAwesomeIcon icon={['far', 'gem']} />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <FontAwesomeIcon
                  icon={['fas', 'arrow-up']}
                  className="text-warning"
                />
                <span className="text-warning px-1">5.2%</span>
                <span className="text-white-50">lower order numbers</span>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
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

export default connect(mapStateToProps)(LivePreviewExample);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, CardBody, Card, CardHeader, Progress } from 'reactstrap';
import { Activity } from 'react-feather';
import Chart from 'react-apexcharts';

import { loadFromLocalStorage } from '../../../../utils/ScrollToTop';

const LivePreviewExample = (props) => {
  const monthsOfTheYear = ['January' , 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [chartDashboardStatistics2AData, setChartDashboardStatistics2AData] = useState([]);
  const [chartDashboardStatistics2BData, setChartDashboardStatistics2BData] = useState([]);
  const [chartDashboardStatistics2AOptions, setChartDashboardStatistics2AOptions] = useState({});
  const [chartDashboardStatistics2BOptions, setChartDashboardStatistics2BOptions] = useState({});

  const displayData = (click) => {
    let clickDate = [];
    let clicksArray = [];
    let clicksIncome = 0;
    let eventsArray = [];
    let eventsIncome = 0;
    let AData = [];
    let BData = [];
    let AOptions = {};
    let BOptions = {};
    let clickMonths = {};
    let eventMonths = {};
    let clickMonthsArray = [];
    let eventMonthsArray = [];
    let pivotDate = new Date('');

    if(click && click.data){
      click.data.results.forEach(item => {
        switch(item.event){
          case "click":
            clicksArray.push(item);
            if(item.cost) clicksIncome+= item.cost;

            if(`${new Date(item.createdDate).getMonth()}` in clickMonths){
              clickMonths[`${new Date(item.createdDate).getMonth()}`] += 1;
            } else {
              clickMonths[`${new Date(item.createdDate).getMonth()}`] = 1;
              clickMonthsArray.push(monthsOfTheYear[`${new Date(item.createdDate).getMonth()}`]);
            }
          break;
          default:
            eventsArray.push(item);
            if(item.cost) eventsIncome+= item.cost;

            if(`${new Date(item.createdDate).getMonth()}` in eventMonths){
              eventMonths[`${new Date(item.createdDate).getMonth()}`] += 1;
            } else {
              eventMonths[`${new Date(item.createdDate).getMonth()}`] = 1;
              eventMonthsArray.push(monthsOfTheYear[`${new Date(item.createdDate).getMonth()}`]);
            }
          break;
        }

        pivotDate = new Date(item.createdDate);
        clickDate.push(pivotDate);
      })

      BData.push({
        name: 'Clicks',
        data: [...Object.values(clickMonths)]
      },
      {
        name: 'Events',
        data: [...Object.values(eventMonths)]
      });
      // console.log(...Object.values(clickMonthsArray));
      AData.push({
        name: 'Clicks',
        data: [0, clicksIncome]
      },
      {
        name: 'Events',
        data: [0, eventsIncome]
      })

      AOptions ={
        chart: {
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        grid: {
          strokeDashArray: '5',
          borderColor: 'rgba(125, 138, 156, 0.3)'
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        fill: {
          color: '#3c44b1',
          gradient: {
            shade: 'light',
            type: 'vertical',
            shadeIntensity: 0.2,
            inverseColors: false,
            opacityFrom: 0.8,
            opacityTo: 0,
            stops: [0, 100]
          }
        },
        colors: ['#3c44b1'],
        legend: {
          show: false
        },
        labels: [...Object.values(clickMonthsArray)]
      }
      // console.log(clicksArray.length, eventsArray.length);

      BOptions = {
        chart: {
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#3c44b1', 'rgba(60, 68, 177, 0.27)'],
        fill: {
          opacity: 0.85,
          colors: ['#3c44b1', 'rgba(60, 68, 177, 0.27)']
        },
        grid: {
          strokeDashArray: '5',
          borderColor: 'rgba(125, 138, 156, 0.3)'
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        legend: {
          show: false
        },
        labels: [...Object.values(eventMonthsArray)]
      }
    }
    setChartDashboardStatistics2AData(AData);
    setChartDashboardStatistics2BData(BData);
    setChartDashboardStatistics2AOptions(AOptions);
    setChartDashboardStatistics2BOptions(BOptions);
  };

  useEffect(() => {
    displayData(props.click);
  }, [props.click]);

  return (
    <>
      <Row>
        <Col xl="6">
          <Card className="card-box mb-5">
            <CardHeader>
              <div className="card-header--title">
                <h4 className="font-size-lg mb-0 py-2 font-weight-bold">
                  Income Reports
                </h4>
              </div>
              <div className="card-header--actions">
                <FontAwesomeIcon
                  icon={['far', 'chart-bar']}
                  className="font-size-xxl text-primary"
                />

                {/*<Button size="sm" color="neutral-primary">
                  <span className="btn-wrapper--label">Export</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-down']}
                      className="opacity-8 font-size-xs"
                    />
                  </span>
                </Button>*/}
              </div>
            </CardHeader>
            <div className="card-body pb-1 font-weight-bold">
              <Row className="pt-3">
                <Col sm="6" md="5">
                  <div className="pb-4 px-3">
                    <span className="text-dark pb-4">YoY Income</span>
                    <span className="font-size-lg d-block">
                      <small>$</small> 165,239
                    </span>
                  </div>
                  {/* <div className="pb-4 px-3">
                    <span className="text-dark pb-4">Orders Volume</span>
                    <span className="font-size-lg d-block">
                      <small>$</small> 384
                    </span>
                  </div> */}
                </Col>
                <Col sm="6" md="7">
                  <div className="pb-4 px-3">
                    <span className="text-dark pb-4">Best Month</span>
                    <span className="font-size-lg d-block">April</span>
                  </div>
                  {/* <div className="pb-4 px-3">
                    <span className="text-dark pb-4">Sales Target</span>
                    <span className="d-flex align-items-center font-size-lg d-block">
                      <Progress
                        value="65"
                        striped
                        animated
                        color="warning"
                        className="progress-sm flex-grow-1 progress-bar-rounded"
                      />
                      <span className="pl-3">65%</span>
                    </span>
                  </div> */}
                </Col>
              </Row>
              <Chart
                options={chartDashboardStatistics2AOptions}
                series={chartDashboardStatistics2AData}
                type="area"
                height={317}
              />
            </div>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="card-box mb-5">
            <CardHeader>
              <div className="card-header--title">
                <h4 className="font-size-lg mb-0 py-2 font-weight-bold">
                  Impressions & Clicks
                </h4>
              </div>
              <div className="card-header--actions">
                <div className="blob-icon-wrapper text-primary">
                  <Activity />
                </div>

                {/*<Button size="sm" color="neutral-first">
                  <span className="btn-wrapper--label">Actions</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-down']}
                      className="opacity-8 font-size-xs"
                    />
                  </span>
                </Button>*/}
              </div>
            </CardHeader>
            <CardBody>
              <Chart
                options={chartDashboardStatistics2BOptions}
                series={chartDashboardStatistics2BData}
                type="bar"
                height={300}
              />
              <Row>
                <Col md="6">
                  <div className="p-3">
                    <div className="mb-1 font-weight-bold">Impressions</div>
                    <Progress
                      animated
                      className="progress-xs progress-animated-alt"
                      color="primary"
                      value="34"
                    />
                    <div className="align-box-row progress-bar--label mt-1 text-muted">
                      <small className="text-dark">0</small>
                      <div className="ml-auto">100%</div>
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="p-3">
                    <div className="mb-1 font-weight-bold">Clicks</div>
                    <Progress
                      animated
                      className="progress-xs progress-animated-alt opacity-6"
                      color="primary"
                      value="51"
                    />
                    <div className="align-box-row progress-bar--label mt-1 text-muted">
                      <small className="text-dark">0</small>
                      <div className="ml-auto">100%</div>
                    </div>
                  </div>
                </Col>
                {/* <Col md="6">
                  <div className="p-3">
                    <div className="mb-1 font-weight-bold">Users</div>
                    <Progress
                      animated
                      className="progress-xs progress-animated-alt"
                      color="warning"
                      value="29"
                    />
                    <div className="align-box-row progress-bar--label mt-1 text-muted">
                      <small className="text-dark">0</small>
                      <div className="ml-auto">100%</div>
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="p-3">
                    <div className="mb-1 font-weight-bold">Customers</div>
                    <Progress
                      animated
                      className="progress-xs progress-animated-alt"
                      color="danger"
                      value="76"
                    />
                    <div className="align-box-row progress-bar--label mt-1 text-muted">
                      <small className="text-dark">0</small>
                      <div className="ml-auto">100%</div>
                    </div>
                  </div>
                </Col> */}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  // console.log(state);
  const persistedState = loadFromLocalStorage();
  return {
    ...state,
    token: persistedState ? persistedState.token : undefined
  };
};

export default connect(mapStateToProps)(LivePreviewExample);
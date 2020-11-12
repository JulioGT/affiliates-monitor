import React, { useState } from 'react';
import Switch from 'rc-switch';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Table,
  CardBody,
  Card,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button
} from 'reactstrap';

export default function LivePreviewExample() {
  const [checked, setChecked] = useState(true);

  const toggle = () => {
    setChecked(!checked);
  };

  return (
    <>
      <Card className="card-box mb-5">
        <div className="card-header">
          <div className="card-header--title">
            <b>My Campaigns</b>
          </div>
          <div className="card-header--actions">
            <Button size="sm" color="primary" className="d-40 btn-icon p-0">
              <FontAwesomeIcon
                icon={['far', 'lightbulb']}
                className="font-size-lg"
              />
            </Button>
          </div>
        </div>
        <CardBody className="p-0">
          <div className="table-responsive-md">
            <PerfectScrollbar className="scroll-area-lg mb-2">
              <div className="table-responsive-md">
                <Table hover striped className="text-nowrap mb-0">
                  <thead className="thead-light">
                    <tr>
                      <th style={{ width: '40%' }}>Campaigns</th>
                      <th className="text-center">Marketplace</th>
                      {/* <th className="text-center">Status</th> */}
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper avatar-initials ">
                            <div className="avatar-icon text-white bg-primary">
                              A
                            </div>
                          </div>
                          <div>
                            <a
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                              className="font-weight-bold text-black"
                              title="...">
                              Auto Insurance Direct
                            </a>
                            <span className="text-black-50 d-block">
                              Organic traffic from autoinsurance.com.
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="d-flex align-items-center">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black w-100"
                            title="...">
                            Auto Insurance
                          </a>
                        </div>
                      </td>
                      {/* <td className="text-center">
                        <Badge color="success" className="h-auto py-0 px-3">
                          Active
                        </Badge>
                      </td> */}
                      <td className="text-center">
                        {/* <div>
                          <Button
                            color="success"
                            size="sm"
                            className="btn-icon d-40 p-0 btn-animated-icon-sm">
                            <FontAwesomeIcon
                              icon={['fas', 'arrow-right']}
                              className="font-size-lg"
                            />
                          </Button>
                        </div> */}
                        <div className="m-2">
                          <Switch
                            checked={checked}
                            onClick={toggle}
                            className="switch-small toggle-switch-success"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper avatar-initials ">
                            <div className="avatar-icon text-white bg-primary">
                              M
                            </div>
                          </div>
                          <div>
                            <a
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                              className="font-weight-bold text-black"
                              title="...">
                              Mortgage Source A
                            </a>
                            <span className="text-black-50 d-block">
                              Traffic from Source A in a daily basis.
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="d-flex align-items-center">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black w-100"
                            title="...">
                            Mortgage
                          </a>
                        </div>
                      </td>
                      {/* <td className="text-center">
                        <Badge color="success" className="h-auto py-0 px-3">
                          Active
                        </Badge>
                      </td> */}
                      <td className="text-center">
                        {/* <div>
                          <Button
                            color="success"
                            size="sm"
                            className="btn-icon d-40 p-0 btn-animated-icon-sm">
                            <FontAwesomeIcon
                              icon={['fas', 'arrow-right']}
                              className="font-size-lg"
                            />
                          </Button>
                        </div> */}
                        <div className="m-2">
                          <Switch
                            checked={checked}
                            onClick={toggle}
                            className="switch-small toggle-switch-success"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper avatar-initials ">
                            <div className="avatar-icon text-white bg-primary">
                              R
                            </div>
                          </div>
                          <div>
                            <a
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                              className="font-weight-bold text-black"
                              title="...">
                              Rent to Own Facebook
                            </a>
                            <span className="text-black-50 d-block">
                              Traffic from Facebook for regular consumers.
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="d-flex align-items-center">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black w-100"
                            title="...">
                            Rent to Own
                          </a>
                        </div>
                      </td>
                      {/* <td className="text-center">
                        <Badge color="danger" className="h-auto py-0 px-3">
                          Inactive
                        </Badge>
                      </td> */}
                      <td className="text-center">
                        {/* <div>
                          <Button
                            color="success"
                            size="sm"
                            className="btn-icon d-40 p-0 btn-animated-icon-sm">
                            <FontAwesomeIcon
                              icon={['fas', 'arrow-right']}
                              className="font-size-lg"
                            />
                          </Button>
                        </div> */}
                        <div className="m-2">
                          <Switch
                            checked={checked}
                            onClick={toggle}
                            className="switch-small toggle-switch-success"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </PerfectScrollbar>
          </div>
          <div className="divider" />
          <div className="divider" />
          <div className="p-3 d-flex justify-content-center">
            <Pagination className="pagination-primary">
              <PaginationItem disabled>
                <PaginationLink
                  first
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <FontAwesomeIcon icon={['fas', 'angle-double-left']} />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem disabled>
                <PaginationLink
                  previous
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                  3
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  next
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  last
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <FontAwesomeIcon icon={['fas', 'angle-double-right']} />
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

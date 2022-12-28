import React, { Fragment, useState } from "react";
import PageHeader from '../../../shared/layout-components/page-header/page-header'
import Seo from '../../../shared/layout-components/seo/seo';
import {Col, Pagination, Row, Card, Nav, Form, Collapse } from "react-bootstrap";
import Link from "next/link"

import user6 from "../../../public/assets/img/users/6.jpg"

let active = 0;
let items = [];
for (let number = 1; number <= 3; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>
  );
}
const Paginations = () => {
  const [BasicPagination, setBasicPagination] = useState(false);
  const [PaginationwithIcons, setPaginationwithIcons] = useState(false);
  const [Disabledp, setDisabledp] = useState(false);
  const [PaginationSizes, setPaginationSizes] = useState(false);
  const [CircledPagination1, setCircledPagination1] = useState(false);
  const [CircledPaginationStyle2, setCircledPaginationStyle2] = useState(false);
  const [RadiusPagination, setRadiusPagination] = useState(false);
  const [AlignmentPagination, setAlignmentPagination] = useState(false);
  return (
    <div>
      <Seo title="Pagination"/>

      <PageHeader title="Pagination" item="Elements" active_item="Pagination"/>
      

      {/* <!-- Row --> */}
      <Row className="row-sm">
        <Col xl={9} lg={12}>
          <Card className="custom-card overflow-hidden" id="basic">
            <Card.Header className="d-sm-flex  justify-content-between align-items-center">
              <div>
                <h6 className="main-content-label mb-1">Basic Pagination</h6>
                <p className="text-muted card-sub-title">
                  Below are basic pagination navigation.
                </p>
              </div>
              <Form.Check className="mb-3 mb-sm-0"
                aria-controls="example-collapse-text"
                onClick={() => setBasicPagination(!BasicPagination)}
                type="switch"
                label="ShowCode"
              />
            </Card.Header>
            <Card.Body>

              <div className="text-wrap">
                <div className="example">
                  <Pagination className="pagination mb-0">
                    <Pagination.Item>Previous</Pagination.Item>
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Item>{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Item>Next</Pagination.Item>
                  </Pagination>
                </div>
              </div>

              <Collapse in={BasicPagination}>
                <pre>
                  <code>
                    {
                      `
<Pagination className="pagination mb-0">
<Pagination.Item>Previous</Pagination.Item>
<Pagination.Item>{1}</Pagination.Item>
<Pagination.Item>{2}</Pagination.Item>
<Pagination.Item>{3}</Pagination.Item>
<Pagination.Item>Next</Pagination.Item>
</Pagination>
                        `
                    }

                  </code>
                </pre>
              </Collapse>
            </Card.Body>
          </Card>
          <Card className="custom-card overflow-hidden" id="icon">
            <Card.Header className="d-sm-flex  justify-content-between align-items-center">
              <div>
                <h6 className="main-content-label mb-1">Pagination with Icons</h6>
                <p className="text-muted card-sub-title">
                  Looking to use an icon or symbol in place of text for some
                  pagination links? Be sure to provide proper screen reader
                  support with aria attributes.
                </p>
              </div>
              <Form.Check className="mb-3 mb-sm-0"
                aria-controls="example-collapse-text"
                onClick={() => setPaginationwithIcons(!PaginationwithIcons)}
                type="switch"
                label="ShowCode"
              />
            </Card.Header>
            <Card.Body>
              <div className="text-wrap">
                <div className="example">
                  <nav>
                    <Pagination className="pagination mb-0">
                      <Pagination.First />
                      <Pagination.Item>{1}</Pagination.Item>
                      <Pagination.Item>{2}</Pagination.Item>
                      <Pagination.Item>{3}</Pagination.Item>
                      <Pagination.Last />
                    </Pagination>
                  </nav>
                </div>
              </div>

              <Collapse in={PaginationwithIcons}>
                <pre>
                  <code>
                    {
                      `
<nav>
<Pagination className="pagination mb-0">
<Pagination.First />
<Pagination.Item>{1}</Pagination.Item>
<Pagination.Item>{2}</Pagination.Item>
<Pagination.Item>{3}</Pagination.Item>
<Pagination.Last />
</Pagination>
</nav>
                        `
                    }

                  </code>
                </pre>
              </Collapse>
            </Card.Body>
          </Card>
          <Card className="custom-card overflow-hidden" id="disactive">
            <Card.Header className="d-sm-flex  justify-content-between align-items-center">
              <div>
                <h6 className="main-content-label mb-1">
                  Disabled and active Pagination
                </h6>
                <p className="text-muted card-sub-title">
                  Pagination links are customizable for different circumstances.
                </p>
              </div>
              <Form.Check className="mb-3 mb-sm-0"
                aria-controls="example-collapse-text"
                onClick={() => setDisabledp(!Disabledp)}
                type="switch"
                label="ShowCode"
              />
            </Card.Header>
            <Card.Body>
              <div className="text-wrap">
                <div className="example">
                  <nav>
                    <Pagination className="mb-0">
                      <Pagination.Item>Previous</Pagination.Item>
                      <Pagination.Item className="page-item" disabled>
                        {1}
                      </Pagination.Item>
                      <Pagination.Item className="page-item" active>
                        {2}
                      </Pagination.Item>
                      <Pagination.Item>{3}</Pagination.Item>
                      <Pagination.Item>Next</Pagination.Item>
                    </Pagination>
                  </nav>
                </div>
              </div>

              <Collapse in={Disabledp}>
                <pre>
                  <code>
                    {
                      `
<nav>
<Pagination className="mb-0">
<Pagination.Item>Previous</Pagination.Item>
<Pagination.Item className="page-item" disabled>
{1}
</Pagination.Item>
<Pagination.Item className="page-item" active>
{2}
</Pagination.Item>
<Pagination.Item>{3}</Pagination.Item>
<Pagination.Item>Next</Pagination.Item>
</Pagination>
</nav>
                        `
                    }

                  </code>
                </pre>
              </Collapse>
            </Card.Body>
          </Card>
          <Card className="custom-card overflow-hidden" id="sizes">
            <Card.Header className="d-sm-flex  justify-content-between align-items-center">
              <div>
                <h6 className="main-content-label mb-1">Pagination Sizes</h6>
                <p className="text-muted card-sub-title">
                  Fancy larger or smaller pagination Add
                  <code>.pagination-lg</code> or <code>.pagination-sm</code> for
                  additional sizes..
                </p>
              </div>
              <Form.Check className="mb-3 mb-sm-0"
                aria-controls="example-collapse-text"
                onClick={() => setPaginationSizes(!PaginationSizes)}
                type="switch"
                label="ShowCode"
              />
            </Card.Header>
            <Card.Body>
              <div className="text-wrap">
                <div className="example">
                  <Row className="row-sm">
                    <Col sm={6} md={6}>
                      <nav>
                        <Pagination className=" pagination pagination-lg mb-0">
                          <Pagination.Item active>{1}</Pagination.Item>
                          <Pagination.Item>{2}</Pagination.Item>
                          <Pagination.Item>{3}</Pagination.Item>
                        </Pagination>
                      </nav>
                    </Col>
                    <Col sm={6} md={6} className=" mg-t-10 mg-sm-t-0">
                      <Nav>
                        <Pagination className="sm mb-0">
                          <Pagination.Item active>{1}</Pagination.Item>
                          <Pagination.Item>{2}</Pagination.Item>
                          <Pagination.Item>{3}</Pagination.Item>
                        </Pagination>
                      </Nav>
                    </Col>
                  </Row>
                </div>
              </div>
              <Collapse in={PaginationSizes}>
                <pre>
                  <code>
                    {
                      `
<nav>
<Pagination className=" pagination pagination-lg mb-0">
<Pagination.Item active>{1}</Pagination.Item>
<Pagination.Item>{2}</Pagination.Item>
<Pagination.Item>{3}</Pagination.Item>
</Pagination>
</nav>
                        `
                    }

                  </code>
                </pre>
              </Collapse>
            </Card.Body>
          </Card>
          <Card className="custom-card overflow-hidden" id="align">
            <Card.Header className="d-sm-flex  justify-content-between align-items-center">
              <div>
                <h6 className="main-content-label mb-1">Alignment Pagination</h6>
                <p className="text-muted card-sub-title">
                  Change the alignment of pagination components.
                </p>
              </div>
              <Form.Check className="mb-3 mb-sm-0"
                aria-controls="example-collapse-text"
                onClick={() => setAlignmentPagination(!AlignmentPagination)}
                type="switch"
                label="ShowCode"
              />
            </Card.Header>
            <Card.Body>
              <div className="text-wrap">
                <div className="example">
                  <Nav aria-label="Page navigation example">
                    <Pagination>
                      <Pagination.Item className="page-item disabled" disabled>
                        Previous
                      </Pagination.Item>
                      {items}
                      <Pagination.Item>Next</Pagination.Item>
                    </Pagination>
                  </Nav>
                  <Nav aria-label="Page navigation example">
                    <Pagination className="pagination justify-content-center">
                      <Pagination.Item className="page-item disabled" disabled>
                        Previous
                      </Pagination.Item>
                      {items}
                      <Pagination.Item>Next</Pagination.Item>
                    </Pagination>
                  </Nav>
                  <Nav aria-label="Page navigation example">
                    <Pagination className="pagination justify-content-end mb-0">
                      <Pagination.Item className="page-item disabled" disabled>
                        Previous
                      </Pagination.Item>
                      {items}
                      <Pagination.Item>Next</Pagination.Item>
                    </Pagination>
                  </Nav>
                </div>
              </div>

              <Collapse in={AlignmentPagination}>
                <pre>
                  <code>
                    {
                      `
export function CircularDeterminate() {
let active = 0;
let items = [];
for (let number = 1; number <= 3; number++) {
items.push(
<Pagination.Item key={number} active={number === active}>
{number}
</Pagination.Item>
);
}
return (
<div className="example">
<Nav aria-label="Page navigation example">
<Pagination>
<Pagination.Item className="page-item disabled" disabled>revious</Pagination.Item>
{items}
<Pagination.Item>Next</Pagination.Item></Pagination>
</Nav>
<Nav aria-label="Page navigation example">
<Pagination className="pagination justify-content-center">
<Pagination.Item className="page-item disabled" disabled>
Previous
</Pagination.Item>
{items}
<Pagination.Item>Next</Pagination.Item>
</Pagination>
</Nav>
<Nav aria-label="Page navigation example">
<Pagination className="pagination justify-content-end mb-0">
<Pagination.Item className="page-item disabled" disabled>
Previous
</Pagination.Item>
{items}
<Pagination.Item>Next</Pagination.Item>
</Pagination>
</Nav>
</div>
);
}

`
                    }

                  </code>
                </pre>
              </Collapse>
            </Card.Body>
          </Card>
          <Card className="custom-card overflow-hidden" id="circled">
            <Card.Header className="d-sm-flex  justify-content-between align-items-center">
              <div>
                <h6 className="main-content-label mb-1">Circled Pagination</h6>
                <p className="text-muted card-sub-title">
                  Below are basic pagination navigation in circle.
                </p>
              </div>
              <Form.Check className="mb-3 mb-sm-0"
                aria-controls="example-collapse-text"
                onClick={() => setCircledPagination1(!CircledPagination1)}
                type="switch"
                label="ShowCode"
              />
            </Card.Header>
            <Card.Body>
              <div className="text-wrap">
                <div className="example">
                  <Pagination className="pagination-circled mb-0">
                    <Pagination.Item>
                      <i className="icon ion-ios-arrow-back"></i>
                    </Pagination.Item>
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Item className="page-item">{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Item>
                      <i className="icon ion-ios-arrow-forward"></i>
                    </Pagination.Item>
                  </Pagination>
                </div>
              </div>

              <Collapse in={CircledPagination1}>
                <pre>
                  <code>
                    {
                      `
<Pagination className="pagination-circled mb-0">
<Pagination.Item>
<i className="icon ion-ios-arrow-back"></i>
</Pagination.Item>
<Pagination.Item active>{1}</Pagination.Item>
<Pagination.Item className="page-item">{2}</Pagination.Item>
<Pagination.Item>{3}</Pagination.Item>
<Pagination.Item>
<i className="icon ion-ios-arrow-forward"></i>
</Pagination.Item>
</Pagination>
`
                    }

                  </code>
                </pre>
              </Collapse>
            </Card.Body>
          </Card>
          <Card className="custom-card overflow-hidden" id="circled2">
            <Card.Header className="d-sm-flex  justify-content-between align-items-center">
              <div>
                <h6 className="main-content-label mb-1">
                  Circled Pagination Style2
                </h6>
                <p className="text-muted card-sub-title">
                  Below are basic pagination navigation in circle.
                </p>
              </div>
              <Form.Check className="mb-3 mb-sm-0"
                aria-controls="example-collapse-text"
                onClick={() => setCircledPaginationStyle2(!CircledPaginationStyle2)}
                type="switch"
                label="ShowCode"
              />
            </Card.Header>
            <Card.Body>
              <div className="text-wrap">
                <div className="example">
                  <Row className="row-sm">
                    <Pagination className=" pagination-circle mb-0 ms-lg-3">
                      <Pagination.Item>
                        <i className="fas fa-angle-double-left"></i>
                      </Pagination.Item>
                      <Pagination.Item active>{1}</Pagination.Item>
                      <Pagination.Item className="page-item">{2}</Pagination.Item>
                      <Pagination.Item>{3}</Pagination.Item>
                      <Pagination.Item>{4}</Pagination.Item>
                      <Pagination.Item>
                        <i className="fas fa-angle-double-right"></i>
                      </Pagination.Item>
                    </Pagination>
                  </Row>
                </div>
              </div>


              <Collapse in={CircledPaginationStyle2}>
                <pre>
                  <code>
                    {
                      `
<Pagination className=" pagination-circle mb-0 ms-lg-3">
<Pagination.Item><i className="fas fa-angle-double-left"></i></Pagination.Item>
<Pagination.Item active>{1}</Pagination.Item>
<Pagination.Item className="page-item">{2}</Pagination.Item>
<Pagination.Item>{3}</Pagination.Item>
<Pagination.Item>{4}</Pagination.Item>
<Pagination.Item><i className="fas fa-angle-double-right"></i></Pagination.Item>
</Pagination>
`
                    }

                  </code>
                </pre>
              </Collapse>
            </Card.Body>
          </Card>
          <div
            className="card custom-card overflow-hidden"
            id="radius-pagination">
            <Card.Header className="d-sm-flex  justify-content-between align-items-center">
              <div>
                <h6 className="main-content-label mb-1">Radius Pagination</h6>
                <p className="text-muted card-sub-title">
                  Below are basic pagination navigation in border-radius.
                </p>
              </div>
              <Form.Check className="mb-3 mb-sm-0"
                aria-controls="example-collapse-text"
                onClick={() => setRadiusPagination(!RadiusPagination)}
                type="switch"
                label="ShowCode"
              />
            </Card.Header>
            <Card.Body>
              <div className="text-wrap">
                <div className="example">
                  <Row className="row-sm">
                    <Pagination className=" pagination-radius mb-0 ms-lg-3">
                      <Pagination.Item>
                        <i className="fas fa-angle-double-left"></i>
                      </Pagination.Item>
                      <Pagination.Item active>{1}</Pagination.Item>
                      <Pagination.Item className="page-item">{2}</Pagination.Item>
                      <Pagination.Item>{3}</Pagination.Item>
                      <Pagination.Item>{4}</Pagination.Item>
                      <Pagination.Item>
                        <i className="fas fa-angle-double-right"></i>
                      </Pagination.Item>
                    </Pagination>
                  </Row>
                </div>
              </div>

              <Collapse in={RadiusPagination}>
                <pre>
                  <code>
                    {
                      `
<Pagination className=" pagination-radius mb-0 ms-lg-3">
<Pagination.Item><i className="fas fa-angle-double-left"></i></Pagination.Item>
<Pagination.Item active>{1}</Pagination.Item>
<Pagination.Item className="page-item">{2}</Pagination.Item>
<Pagination.Item>{3}</Pagination.Item>
<Pagination.Item>{4}</Pagination.Item>
<Pagination.Item><i className="fas fa-angle-double-right"></i></Pagination.Item>
</Pagination>
                        `
                    }

                  </code>
                </pre>
              </Collapse>
            </Card.Body>
          </div>
        </Col>
        <Col xl={3} lg={12} className=" d-none d-xl-block custom-leftnav">
          <div className="main-content-left-components">
            <Card className="custom-card our-team">
              <Card.Body>
                <div className="picture avatar-lg online text-center">
                  <img alt="avatar" className="rounded-circle" src={user6.src} />
                </div>
                <div className="text-center mt-3">
                  <h5 className="pro-user-username text-dark mt-2 mb-0">
                    Joyce Chua
                  </h5>
                  <p className="pro-user-desc text-muted mb-1">App Developer</p>
                  <p className="user-info-rating">
                    <Link href="#">
                      <a>
                      <i className="fa fa-star text-warning"> </i>
                      </a>
                    </Link>
                    <Link href="#">
                      <a>
                      <i className="fa fa-star text-warning"> </i>
                      </a>
                    </Link>
                    <Link href="#">
                      <a>
                      <i className="fa fa-star text-warning"> </i>
                      </a>
                    </Link>
                    <Link href="#">
                      <a>
                      <i className="fa fa-star text-warning"> </i>
                      </a>
                    </Link>
                    <Link href="#">
                      <a>
                      <i className="far fa-star text-warning"> </i>
                      </a>
                    </Link>
                  </p>
                </div>
                <div className="contact-info mb-0 text-center">
                  <Link href="#" >
                    <a className="contact-icon border text-primary">
                    <i className="fab fa-facebook-f"></i>
                    </a>
                  </Link>
                  <Link href="#" >
                    <a className="contact-icon border text-primary">
                    <i className="fab fa-twitter"></i>
                    </a>
                  </Link>
                  <Link href="#" >
                    <a className="contact-icon border text-primary">
                    <i className="fab fa-google"></i>
                    </a>
                  </Link>
                  <Link href="#" >
                    <a className="contact-icon border text-primary">
                    <i className="fab fa-dribbble"></i>
                    </a>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
						{/* <!-- End Row --> */}
      </div>
  )
}
Paginations.layout = "Contentlayout"

export default Paginations
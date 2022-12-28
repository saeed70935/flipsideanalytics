import React, { Fragment } from 'react'
import Seo from '../../../shared/layout-components/seo/seo'

import Link from "next/link"
import { Row, Col, Card, Container, Form } from "react-bootstrap";



//Images
import logolight from "../../../public/assets/img/brand/logo-light.png"
import user from "../../../public/assets/img/svgs/user.svg"
import logo from "../../../public/assets/img/brand/logo.png"


const ResetPassword = () => {
  function Swicherbutton() {
    document.querySelector(".demo_changer").classList.toggle("active");
    document.querySelector(".demo_changer").style.right = "0px";
 }

 function remove  () {
  document.querySelector(".demo_changer").style.right = "-270px";
  document.querySelector(".demo_changer").classList.remove("active");
}
  return (
    <div>
        <Seo title="Reset Password"/>


{/* <!-- Row --> */}
<Fragment>
    <div className="page main-signin-wrapper">
      <div className="d-flex header-setting-icon demo-icon fa-spin" 
      onClick={() => Swicherbutton()}
      >
			<a className="nav-link icon" >
          <i className="fe fe-settings settings-icon "></i>
			</a>
      </div>
      <Row className="signpages text-center" 
      onClick={() => remove()}
      >

        <Col md={12}>
          <Card>
            <Row className="row-sm">
              <Col
                lg={6}
                xl={5}
                className="d-none d-lg-block text-center bg-primary details"
              >
                <div className="mt-5 pt-5 p-2 pos-absolute">
                  <img
                    src={logolight.src}
                    className="header-brand-img mb-4"
                    alt="logo"
                  />
                  <div className="clearfix"></div>
                  <img
                    src={user.src}
                    className="ht-100 mb-0"
                    alt="user"
                  />
                  <h5 className="mt-4 text-white">Reset Your Password</h5>
                  <span className="tx-white-6 tx-13 mb-5 mt-xl-0">
                    Signup to create, discover and connect with the global
                    community
                  </span>
                </div>
              </Col>
              <Col lg={6} xl={7} xs={12} sm={12} className=" login_form ">
                <Container fluid>
                  <Row className=" row-sm">
                    <Card.Body className="mt-2 mb-2">
                      <img
                        src={logo.src}
                        className=" d-lg-none header-brand-img text-start float-start mb-4 auth-light-logo"
                        alt="logo"
                      />
                      <img
                        src={logolight.src}
                        className=" d-lg-none header-brand-img text-start float-start mb-4 auth-dark-logo"
                        alt="logo"
                      />
                      <div className="clearfix"></div>
                      <h5 className="text-start mb-2">Reset Your Password</h5>
                      <p className="mb-4 text-muted tx-13 ms-0 text-start">
                       {` It's`} free to signup and only takes a minute.
                      </p>
                      <Form>
                        <Form.Group className="text-start form-group" controlId="fromEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            placeholder="Enter your mail"
                            type="text"
                          />
                        </Form.Group>
                        <Form.Group
                          className="text-start form-group"
                          controlId="formNewPassword"
                        >
                          <Form.Label>New Password</Form.Label>
                          <Form.Control
                            placeholder="Enter your password"
                            type="email"
                          />
                        </Form.Group>
                        <Form.Group
                          className="text-start form-group"
                          controlId="formpassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            placeholder="Enter your password"
                            type="password"
                          />
                        </Form.Group>

                        <button className="btn ripple btn-main-primary btn-block mt-2">
                          Create Account
                        </button>
                      </Form>
                      <div className="text-start mt-5 ms-0">
                        <p className="mb-0">
                          Already have an account?
                          <Link
                            href={`/components/authentication/signin`}>
                            Sign In
                          </Link>
                        </p>
                      </div>
                    </Card.Body>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>

    {/* <!-- End Row --> */}
  </Fragment>
			{/* <!-- End Row --> */}
    </div>
  )
}
ResetPassword.layout = "Authenticationlayout"

export default ResetPassword
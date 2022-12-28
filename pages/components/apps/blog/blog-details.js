import React from 'react'
import PageHeader from '../../../../shared/layout-components/page-header/page-header'
import { Row, Col, Button, Card, Breadcrumb, Nav, Form } from 'react-bootstrap';
import Link from "next/link"
import Seo from '../../../../shared/layout-components/seo/seo';



//images 

import blogDetails from "../../../../public/assets/img/media/blog-details.jpg"
import user12 from "../../../../public/assets/img/users/12.jpg"
import user7 from "../../../../public/assets/img/users/7.jpg"
import user5 from "../../../../public/assets/img/users/5.jpg"
import user1 from "../../../../public/assets/img/users/1.jpg"
import user2 from "../../../../public/assets/img/users/2.jpg"
import user3 from "../../../../public/assets/img/users/3.jpg"
import user6 from "../../../../public/assets/img/users/6.jpg"
import media6 from "../../../../public/assets/img/media/6.jpg"
import media7 from "../../../../public/assets/img/media/7.jpg"
import media8 from "../../../../public/assets/img/media/8.jpg"
import media4 from "../../../../public/assets/img/media/4.jpg"










const BlogDetails = () => {
  return (
    <div>
        <Seo title="Blog Details"/>

    <PageHeader title="Blog-Details" item="Advanced UI" active_item="Blog-Details"/>

{/* <!-- Row --> */}
<Row className="row-sm">
			<Col xxl={9} lg={8} md={12}>
				<Card className="custom-card overflow-hidden">
					<div className="px-4 pt-4">
						<Link href={`/components/apps/blog/blog-details/`}>
							<a>
								<span className="rounded-5 w-100">
							<img src={blogDetails.src} alt="img" className='rounded-6 w-100' />
								</span>
							</a>
						</Link>
					</div>
					<Card.Body>
						<div className="item-card-desc d-md-flex mb-3">
							<Link href="#" className="">
								<a className="text-primary fs-18 me-2">
								<i className="fe fe-calendar"></i>
								</a>
							</Link>
							<span className="my-auto text-dark">20-Mar-2021</span>
							<Link href="#" className="">
								<a className="text-primary fs-18 me-2">
								<i className="fe fe-user"></i>
								</a>
							</Link>
							<span className="my-auto text-dark">Dennis Mark</span>
							<Link href="#" ><a className="d-flex ms-auto"></a></Link>
							<Link href="#" >
								<a className="ms-auto">
								<span className="text-primary fs-18 me-2"><i className="mdi mdi-message-outline"></i></span>
								</a>
							</Link>
							<span className="my-auto text-dark">6 Comments</span>
						</div>
						<Link href="#" ><a className="mt-4"><h5 className="font-weight-semibold">Excepteur  occaecat cupidatat</h5></a></Link>
						<p className="">I must explain to you how all this mistaken idea  the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure.</p>
						<p className="">Sunt in culpa qui officia cupidatat non proident, sunt in culpa qui officia deserunt No one rejects, dislikes, or avoids pleasure itself, because it is pleasure of denouncing pleasure and praising pain was born.of denouncing pleasure and praising pain was born.</p>
						<p className="">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure.</p>
						<p className="tag tag-default px-2 py-1  mb-0 me-1">Travel</p>
						<p className="tag tag-default px-2 py-1 mb-0 me-1">Nature</p>
						<p className="tag tag-default px-2 py-1 mb-0 me-1">Life</p>
						<p className="tag tag-default px-2 py-1 mb-0">Discover</p>
					</Card.Body>
					<Card.Footer>
						<div className="media profile-footer">
							<div className="media-user">
								<div className="demo-avatar-group">
									<div className="main-img-user"><img alt="" className="rounded-circle" src={user12.src}/></div>
									<div className="main-img-user"><img alt="" className="rounded-circle" src={user7.src}/></div>
									<div className="main-img-user"><img alt="" className="rounded-circle" src={user5.src}/></div>
									<div className="main-img-user"><img alt="" className="rounded-circle" src={user6.src}/></div>
								</div>
							</div>
						</div>
					</Card.Footer>
				</Card>
			</Col>
			<Col xxl={3} lg={4}>
				<Card className="custom-card mail-container task-container overflow-hidden">
					<div className="">
						<div className="p-4 border-bottom">
							<Link href="#"><a className="btn btn-main-primary btn-block btn-compose" id="btnCompose">Blog Categories</a></Link>
						</div>
						<Card.Body className="tab-list-items">
							<div className="main-content-left main-content-left-mail">
								<div className="main-mail-menu">
									<Nav className=" main-nav-column mg-b-20">

										<Nav.Item>
											<Nav.Link href="#">
												<i className="fe fe-music"></i> music <span>20 post</span>

												<Nav.Item>
												</Nav.Item>
											</Nav.Link>
										</Nav.Item>


										<Nav.Item>
											<Nav.Link href="#">
												<i className="fe fe-truck"></i> Travel <span>3 post</span>

												<Nav.Item>
												</Nav.Item>
											</Nav.Link>
										</Nav.Item>


										<Nav.Item>
											<Nav.Link href="#">
												<i className="fe fe-sunset"></i> Nature & Life <span>10 post</span>

												<Nav.Item>
												</Nav.Item>
											</Nav.Link>
										</Nav.Item>


										<Nav.Item>
											<Nav.Link href="#">
												<i className="fe fe-monitor"></i>Technologie <span>8 post</span>

												<Nav.Item>
												</Nav.Item>
											</Nav.Link>
										</Nav.Item>


										<Nav.Item>
											<Nav.Link href="#">
												<i className="fe fe-heart"></i> Fashion <span>15 post</span></Nav.Link>
										</Nav.Item>

									</Nav>
								</div>
								{/* <!-- main-mail-menu --> */}
							</div>
						</Card.Body>
					</div>
				</Card>
				<Card className="custom-card">
					<Card.Header className="card-header">
						<h6 className="main-content-label">Trending Posts</h6>
					</Card.Header>
					<Card.Body className="card-body">
						<ul className="list-unstyled">
							<li className="media d-block d-sm-flex">
								<span className="wd-100p wd-sm-100  mg-sm-r-10 mg-b-20 mg-sm-b-0">
								<img alt="img"  src={media6.src} />
								</span>
								<div className="media-body my-auto">
									<p className="mb-0 font-weight-bold fs-15">Sed ut perspiciatis unde omnis iste natus error.</p>
									<p className="mb-0 fs-11 text-muted">2 days ago</p>
								</div>
							</li>
							<li className="media d-block d-sm-flex mg-t-25">
								<span className="wd-100p wd-sm-100  mg-sm-r-10 mg-b-20 mg-sm-b-0">
								<img alt="img" src={media7.src} />
								</span>
								<div className="media-body my-auto">
									<p className="mb-0 font-weight-bold fs-15">Excepteur occaecat cupidatat doloremque laudantium.</p>
									<p className="mb-0 fs-11 text-muted">2 days ago</p>
								</div>
							</li>
							<li className="media d-block d-sm-flex mg-t-25">
								<span className="wd-100p wd-sm-100  mg-sm-r-10 mg-b-20 mg-sm-b-0">
								<img alt="img"  src={media8.src} />
								</span>
								<div className="media-body my-auto">
									<p className="mb-0 font-weight-bold fs-15">Sed ut perspiciatis unde omnis iste natus error.</p>
									<p className="mb-0 fs-11 text-muted">2 days ago</p>
								</div>
							</li>
							<li className="media d-block d-sm-flex mg-t-25">
								<span className="wd-100p wd-sm-100  mg-sm-r-10 mg-b-20 mg-sm-b-0">
								<img alt="img"  src={media4.src} />
								</span>
								<div className="media-body my-auto">
									<p className="mb-0 font-weight-bold fs-15">Sed ut perspiciatis unde omnis iste natus error.</p>
									<p className="mb-0 fs-11 text-muted">4 days ago</p>
								</div>
							</li>
						</ul>
					</Card.Body>
				</Card>
			</Col>
			<Col xl={12} lg={12}>
					<Card className=" custom-card">
						<Card.Body>
							<div>
								<h6 className="main-content-label mb-3">Comments</h6>
							</div>
							<div className="text-wrap">
								<div className="example">
									<div className="d-sm-flex comment-section">
										<div className="d-flex me-3">
											<Link href="#"><a><span className="main-avatar avatar"><img className='avatar' alt="img" src={user1.src} /></span></a></Link>
										</div>
										<div className="media-body">
											<h5 className="mt-0 mb-1 font-weight-semibold"> Rohina Klen
												<span className="tx-14 mx-2"><i className="fe fe-check-circle text-success tx-12"></i></span>
												<span className="tx-12 text-muted"> 10mins ago</span>
											</h5>
											<p className="font-13  mb-2 mt-2">
												Lorem ipsum dolor sit amet, quis Neque porro quisquam est, nostrud exercitation ullamco laboris   commodo consequat.
											</p>
											<Link href="#" ><a className="me-2 mt-1"><span className="badge bg-success-light">Reply</span></a></Link>
											<Link href="#" ><a className="me-2 mt-1"><span className="badge bg-danger-light">Delete</span></a></Link>
											<div className="btn-group btn-group-sm mb-1 ms-auto float-sm-end">
												<button className="btn btn-light" ><span className="fe fe-thumbs-up tx-16"></span></button>
												<button className="btn btn-light" ><span className="fe fe-thumbs-down tx-16"></span></button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="text-wrap mt-2">
								<div className="example">
									<div className="d-sm-flex comment-section">
										<div className="d-flex me-3">
											<Link href="#"><a><span className="main-avatar avatar"><img className="main-avatar avatar" alt="img" src={user2.src} /></span></a></Link>
										</div>
										<div className="media-body">
											<h5 className="mt-0 mb-1 font-weight-semibold">Dennis Mark
												<span className="tx-14 mx-2"><i className="fe fe-check-circle text-success tx-12"></i></span>
												<span className="tx-12 text-muted"> 10mins ago</span>
											</h5>
											<p className="font-13  mb-2 mt-2">ipsum dolor sit amet, quis Neque porro quisquam est, nostrud exercitation ullamco laboris   commodo consequat.</p>
											<Link href="#" ><a className="me-2 mt-1"><span className="badge bg-success-light">Reply</span></a></Link>
											<Link href="#" ><a className="me-2 mt-1"><span className="badge bg-danger-light">Delete</span></a></Link>
											<div className="btn-group btn-group-sm mb-1 ms-auto float-sm-end">
												<button className="btn btn-light" ><span className="fe fe-thumbs-up tx-16"></span></button>
												<button className="btn btn-light" ><span className="fe fe-thumbs-down tx-16"></span></button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="text-wrap mt-2">
								<div className="example">
									<div className="d-sm-flex comment-section">
										<div className="d-flex me-3">
											<Link href="#">
												<a>
												<span className="main-avatar avatar"><img className="main-avatar avatar" alt="img" src={user3.src} /></span> </a></Link> </div>
										<div className="media-body">
											<h5 className="mt-0 mb-1 font-weight-semibold">Joanne Scott
												<span className="tx-14 mx-2"><i className="fe fe-check-circle text-success tx-12"></i></span>
												<span className="tx-12 text-muted"> 10mins ago</span>
											</h5>
											<p className="font-13  mb-2 mt-2">
												Lorem ipsum dolor sit amet, quis Neque porro quisquam est, nostrud exercitation ullamco laboris   commodo consequat.
											</p>
											<Link href="#" ><a className="me-2 mt-1"><span className="badge bg-success-light">Reply</span></a></Link>
											<Link href="#" ><a className="me-2 mt-1"><span className="badge bg-danger-light">Delete</span></a></Link>
											<div className="btn-group btn-group-sm mb-1 ms-auto float-sm-end">
												<button className="btn btn-light" ><span className="fe fe-thumbs-up tx-16"></span></button>
												<button className="btn btn-light" ><span className="fe fe-thumbs-down tx-16"></span></button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card.Body>
					</Card>
			</Col>
			<Col xl={12} lg={12}>
					<Card className="custom-card">
						<Card.Body>
							<div>
								<h6 className="main-content-label mb-3">Add A Comment</h6></div>
							<div className="text-wrap">
								<div className="example">
									<div>
										<Form.Group className="form-group">
											<Form.Control type="text" id="name1" placeholder="Your Name" />
										</Form.Group>
										<Form.Group className="form-group">
											<Form.Control type="email" id="email" placeholder="Email Address" />
										</Form.Group>
										<Form.Group className="form-group">
											<Form.Control name="example-textarea-input" as="textarea" rows="6" placeholder="Write Comment" />
										</Form.Group>
										<Link href="#"><a className="btn btn-primary">Send Reply</a></Link>
									</div>
								</div>
							</div>
						</Card.Body>
					</Card>
			</Col>
		</Row>
		{/* <!-- End Row --> */}
    </div>
  )
}

BlogDetails.layout = "Contentlayout"


export default BlogDetails
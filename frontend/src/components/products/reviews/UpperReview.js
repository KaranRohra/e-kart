import React from "react";
import { Row, Col } from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";
import LowerReview from "components/products/reviews/LowerReview";

function UpperReview() {
    return (
        <div className="container px-1 py-5">
            {/* <div className="col-xl-7 col-lg-8 col-md-10 col-12 mb-5"> */}
            <Row>
                <Col xs={3}>
                    <div className="card" style={{ width: "18rem" }}>
                        <div style={{ width: 246, height: 246 }} className="p-3">
                            <img
                                src="http://localhost:8000/media/product_images/img5.jpeg"
                                class="card-img-top"
                                alt="im"
                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                            />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                Some quick example text to build on the card title and make up the bulk of the card's
                                content.
                            </p>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="bg-light p-2">
                        <h4>
                            Some quick example text to build on the card title and make up the bulk of the card's
                            content.
                        </h4>
                    </div>
                    <div className="my-review-card">
                        <div className="d-flex mt-4">
                            <div className="col-md-4">
                                <div className="my-review-rating-box text-center">
                                    <h1 className="pt-4">4.0</h1>
                                    <p className="">out of 5</p>
                                </div>
                                <div className="m-2 text-center">
                                    <p>
                                        <span className="text-muted m-1">4.0</span>
                                        <Icons.StarFill className="m-1 my-review-star-active" />
                                        <Icons.StarFill className="m-1 my-review-star-active" />
                                        <Icons.StarFill className="m-1 my-review-star-active" />
                                        <Icons.StarHalf className="m-1 my-review-star-active" />
                                        <Icons.Star className="m-1 my-review-star-active" />
                                    </p>
                                    <p className="text-secondary">
                                        26,948 Ratings & <br /> 2,561 Reviews
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="my-review-rating-bar0 justify-content-center">
                                    <table className="text-start mx-auto">
                                        <tr>
                                            <td className="my-review-rating-label">Excellent</td>
                                            <td className="my-review-rating-bar">
                                                <div className="my-review-bar-container">
                                                    <div className="my-review-bar-5"></div>
                                                </div>
                                            </td>
                                            <td className="text-right">123</td>
                                        </tr>
                                        <tr>
                                            <td className="my-review-rating-label">Good</td>
                                            <td className="my-review-rating-bar">
                                                <div className="my-review-bar-container">
                                                    <div className="my-review-bar-4"></div>
                                                </div>
                                            </td>
                                            <td className="text-right">23</td>
                                        </tr>
                                        <tr>
                                            <td className="my-review-rating-label">Average</td>
                                            <td className="my-review-rating-bar">
                                                <div className="my-review-bar-container">
                                                    <div className="my-review-bar-3"></div>
                                                </div>
                                            </td>
                                            <td className="text-right">10</td>
                                        </tr>
                                        <tr>
                                            <td className="my-review-rating-label">Poor</td>
                                            <td className="my-review-rating-bar">
                                                <div className="my-review-bar-container">
                                                    <div className="my-review-bar-2"></div>
                                                </div>
                                            </td>
                                            <td className="text-right">3</td>
                                        </tr>
                                        <tr>
                                            <td className="my-review-rating-label">Terrible</td>
                                            <td className="my-review-rating-bar">
                                                <div className="my-review-bar-container">
                                                    <div className="my-review-bar-1"></div>
                                                </div>
                                            </td>
                                            <td className="text-right">0</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <LowerReview />
                </Col>
            </Row>
        </div>
    );
}

export default UpperReview;

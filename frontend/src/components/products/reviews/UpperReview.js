import React from "react";
import { Row, Col } from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";
import LowerReview from "components/products/reviews/LowerReview";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "static/styles/paginator.css";

function UpperReview(props) {
    const itemsPerPage = 5;

    const handlePageClick = (clickedPageNo) => {
        props.setPageNo(clickedPageNo);
    };

    return (
        <div className="container px-1 py-5">
            <Row>
                <Col xs={3}>
                    <div style={{ position: "sticky", top: "5%" }}>
                        <div className="card" style={{ width: "18rem" }}>
                            <div style={{ width: 246, height: 246 }} className="p-3">
                                <img
                                    src={props.product.images[0].image_url}
                                    className="card-img-top"
                                    alt="im"
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{props.product.short_title}</h5>
                                <div className="card-text d-flex">
                                    <h4>₹{props.product.selling_price}</h4>
                                    <strike className="ms-2 text-secondary">₹{props.product.actual_price}</strike>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="bg-light p-2">
                        <h4>
                            <Link to={`/products/${props.productId}`} style={{ textDecoration: "none" }}>
                                {props.product.long_title}
                            </Link>
                        </h4>
                    </div>
                    <div className="my-review-card">
                        <div className="d-flex mt-4">
                            <div className="col-md-4">
                                <div className="my-review-rating-box text-center">
                                    <h1 className="pt-4">{props.ratingsAndReviews.average_stars}</h1>
                                    <p className="">out of 5</p>
                                </div>
                                <div className="m-2 text-center">
                                    <p>
                                        <span className="text-muted m-1">{props.ratingsAndReviews.average_stars}</span>
                                        {[...Array(Math.floor(props.ratingsAndReviews.average_stars)).keys()].map(
                                            (_, key) => (
                                                <Icons.StarFill className="m-1 my-review-star-active" key={key} />
                                            )
                                        )}
                                        {Math.floor(props.ratingsAndReviews.average_stars) <
                                            props.ratingsAndReviews.average_stars &&
                                            props.ratingsAndReviews.average_stars <
                                                Math.ceil(props.ratingsAndReviews.average_stars) && (
                                                <Icons.StarHalf className="m-1 my-review-star-active" />
                                            )}
                                        {[...Array(5 - Math.ceil(props.ratingsAndReviews.average_stars)).keys()].map(
                                            (_, key) => (
                                                <Icons.Star className="m-1 my-review-star-active" key={key} />
                                            )
                                        )}
                                    </p>
                                    <p className="text-secondary">
                                        {props.ratingsAndReviews.number_of_ratings} Ratings & <br />
                                        {props.ratingsAndReviews.number_of_reviews} Reviews
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="my-review-rating-bar0 justify-content-center">
                                    <table className="text-start mx-auto">
                                        <tbody>
                                            <tr>
                                                <td className="my-review-rating-label">Excellent</td>
                                                <td className="my-review-rating-bar">
                                                    <div className="my-review-bar-container">
                                                        <div className="my-review-bar-5"></div>
                                                    </div>
                                                </td>
                                                <td className="text-right">{props.ratingsAndReviews.stars[5]}</td>
                                            </tr>
                                            <tr>
                                                <td className="my-review-rating-label">Good</td>
                                                <td className="my-review-rating-bar">
                                                    <div className="my-review-bar-container">
                                                        <div className="my-review-bar-4"></div>
                                                    </div>
                                                </td>
                                                <td className="text-right">{props.ratingsAndReviews.stars[4]}</td>
                                            </tr>
                                            <tr>
                                                <td className="my-review-rating-label">Average</td>
                                                <td className="my-review-rating-bar">
                                                    <div className="my-review-bar-container">
                                                        <div className="my-review-bar-3"></div>
                                                    </div>
                                                </td>
                                                <td className="text-right">{props.ratingsAndReviews.stars[3]}</td>
                                            </tr>
                                            <tr>
                                                <td className="my-review-rating-label">Poor</td>
                                                <td className="my-review-rating-bar">
                                                    <div className="my-review-bar-container">
                                                        <div className="my-review-bar-2"></div>
                                                    </div>
                                                </td>
                                                <td className="text-right">{props.ratingsAndReviews.stars[2]}</td>
                                            </tr>
                                            <tr>
                                                <td className="my-review-rating-label">Terrible</td>
                                                <td className="my-review-rating-bar">
                                                    <div className="my-review-bar-container">
                                                        <div className="my-review-bar-1"></div>
                                                    </div>
                                                </td>
                                                <td className="text-right">{props.ratingsAndReviews.stars[1]}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <LowerReview
                            ratingsAndReviews={props.ratingsAndReviews}
                            reviews={props.ratingsAndReviews.reviews}
                        />
                        <div className="page__number mt-4">
                            <ReactPaginate
                                breakLabel={<span>...</span>}
                                previousLabel={"Prev"}
                                nextLabel={"Next"}
                                pageCount={Math.ceil(props.ratingsAndReviews.number_of_reviews / itemsPerPage)}
                                onPageChange={(e) => handlePageClick(e.selected + 1)}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                                forcePage={props.pageNo - 1}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default UpperReview;

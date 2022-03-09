import React from "react";
import * as Icons from "react-bootstrap-icons";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { handleLike, handleDislike } from "services/actions/products";

function RatingsAndReviews(props) {
    return (
        <div className="mt-5 border border-light">
            <div>
                <span style={{ fontSize: 24, fontWeight: 500 }}>Ratings & Reviews</span>
                <span style={{ fontSize: 24 }} className="ms-5">
                    <Badge className="p-2">
                        {props.ratingsAndReviews.average_stars} <Icons.StarFill className="mb-1" />
                    </Badge>
                </span>
                <span className="ms-2 text-secondary">
                    {props.ratingsAndReviews.number_of_ratings} Ratings & {props.ratingsAndReviews.number_of_reviews}
                    Reviews
                </span>
            </div>
            <div className="mt-3">
                {props.ratingsAndReviews.reviews.slice(0, 3).map((review, key) => (
                    <React.Fragment key={key}>
                        <div>
                            <div style={{ fontWeight: "bold" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                        <Badge className="me-3">
                                            {review.stars} <Icons.StarFill className="mb-1" />
                                        </Badge>
                                        {review.title}
                                    </div>
                                    <span className="text-secondary">
                                        {new Date(review.created_at).toLocaleDateString("en-us")}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-2"> {review.description} </div>
                            <div className="mt-2" style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <Icons.CheckCircleFill /> {review.user.first_name} {review.user.last_name}
                                </div>
                                <div>
                                    <span className="m-2">
                                        {props.ratingsAndReviews.is_liked_by_user.includes(review.id) ? (
                                            <Icons.HandThumbsUpFill
                                                onClick={() => handleLike(review.id)}
                                                style={{ cursor: "pointer" }}
                                            />
                                        ) : (
                                            <Icons.HandThumbsUp
                                                onClick={() => handleLike(review.id)}
                                                style={{ cursor: "pointer" }}
                                            />
                                        )}
                                        {review.total_likes}
                                    </span>
                                    <span className="m-2">
                                        {props.ratingsAndReviews.is_disliked_by_user.includes(review.id) ? (
                                            <Icons.HandThumbsDownFill
                                                onClick={() => handleDislike(review.id)}
                                                style={{ cursor: "pointer" }}
                                            />
                                        ) : (
                                            <Icons.HandThumbsDown
                                                onClick={() => handleDislike(review.id)}
                                                style={{ cursor: "pointer" }}
                                            />
                                        )}
                                        {review.total_dislikes}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </React.Fragment>
                ))}
            </div>
            {props.ratingsAndReviews.reviews.length > 0 && (
                <div>
                    <Link className="btn btn-primary" to={`/products/${props.productId}/ratings-and-reviews`}>
                        All Reviews
                    </Link>
                </div>
            )}
        </div>
    );
}

export default RatingsAndReviews;

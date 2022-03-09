import React from "react";
import * as Icons from "react-bootstrap-icons";
import { handleLike, handleDislike } from "services/actions/products";
function LowerReview(props) {
    var options = { year: "numeric", month: "short", day: "numeric" };

    return (
        <div>
            {props.reviews.map((review, key) => (
                <div className="my-review-card" key={key}>
                    <div className="d-flex">
                        <div className="col">
                            <h3 className="mt-2 mb-0 text-start">
                                {review.user.first_name} {review.user.last_name}
                            </h3>
                            <div>
                                <p className="text-start">
                                    <span className="text-muted m-1">{review.stars}</span>
                                    {[...Array(review.stars).keys()].map((_, key) => (
                                        <React.Fragment key={key}>
                                            <Icons.StarFill className="m-1 my-review-star-active" />
                                        </React.Fragment>
                                    ))}
                                    {[...Array(5 - review.stars).keys()].map((_, key) => (
                                        <React.Fragment key={key}>
                                            <Icons.Star className="m-1 my-review-star-active" />
                                        </React.Fragment>
                                    ))}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-muted pt-5 pt-sm-3">
                                {new Date(review.created_at).toLocaleDateString("en-us", options)}
                            </p>
                        </div>
                    </div>
                    <div className="row text-start">
                        <h4 className="my-review-blue-text mt-3">"{review.title}"</h4>
                        <p className="my-review-content">{review.description}</p>
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
            ))}
        </div>
    );
}

export default LowerReview;

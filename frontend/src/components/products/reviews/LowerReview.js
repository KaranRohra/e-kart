import React from "react";
import * as Icons from "react-bootstrap-icons";

function LowerReview() {
    return (
        <div>
            <div className="my-review-card">
                <div className="d-flex">
                    <div className="col">
                        <h3 className="mt-2 mb-0 text-start">Vikram jit Singh</h3>
                        <div>
                            <p className="text-start">
                                <span className="text-muted m-1">4.0</span>
                                <Icons.StarFill className="m-1 my-review-star-active" />
                                <Icons.StarFill className="m-1 my-review-star-active" />
                                <Icons.StarFill className="m-1 my-review-star-active" />
                                <Icons.StarHalf className="m-1 my-review-star-active" />
                                <Icons.Star className="m-1 my-review-star-active" />
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="text-muted pt-5 pt-sm-3">10 Sept</p>
                    </div>
                </div>
                <div className="row text-start">
                    <h4 className="my-review-blue-text mt-3">"An awesome activity to experience"</h4>
                    <p className="my-review-content">
                        If you really enjoy spending your vacation 'on water' or would like to try something new and
                        exciting for the first time.
                    </p>
                </div>
                <div className="d-flex text-start mt-4">
                    <div className="my-review-like m-1 my-review-vote">
                        <img src="https://i.imgur.com/mHSQOaX.png" alt="im" />
                        <span className="my-review-blue-text pl-2">20</span>
                    </div>
                    <div className="my-review-unlike my-review-vote m-1">
                        <img src="https://i.imgur.com/bFBO3J7.png" alt="im" />
                        <span className="text-muted pl-2">4</span>
                    </div>
                </div>
            </div>
            <div className="my-review-card">
                <div className="d-flex">
                    <div className="col">
                        <h3 className="mt-2 mb-0 text-start">Vikram jit Singh</h3>
                        <div>
                            <p className="text-start">
                                <span className="text-muted m-1">4.0</span>
                                <Icons.StarFill className="m-1 my-review-star-active" />
                                <Icons.StarFill className="m-1 my-review-star-active" />
                                <Icons.StarFill className="m-1 my-review-star-active" />
                                <Icons.StarHalf className="m-1 my-review-star-active" />
                                <Icons.Star className="m-1 my-review-star-active" />
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="text-muted pt-5 pt-sm-3">10 Sept</p>
                    </div>
                </div>
                <div className="row text-start">
                    <h4 className="my-review-blue-text mt-3">"An awesome activity to experience"</h4>
                    <p className="my-review-content">
                        If you really enjoy spending your vacation 'on water' or would like to try something new and
                        exciting for the first time.
                    </p>
                </div>
                <div className="d-flex text-start mt-4">
                    <div className="my-review-like m-1 my-review-vote">
                        <img src="https://i.imgur.com/mHSQOaX.png" alt="im" />
                        <span className="my-review-blue-text pl-2">20</span>
                    </div>
                    <div className="my-review-unlike my-review-vote m-1">
                        <img src="https://i.imgur.com/bFBO3J7.png" alt="im" />
                        <span className="text-muted pl-2">4</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LowerReview;

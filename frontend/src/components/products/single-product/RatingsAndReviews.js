import React from "react";
import * as Icons from "react-bootstrap-icons";
import { Badge, Button } from "react-bootstrap";

// TODO Connect to Database
function RatingsAndReviews() {
    const lst = [1, 1, 1];
    return (
        <div className="mt-5 border border-light">
            <div>
                <span style={{ fontSize: 24, fontWeight: 500 }}>Ratings & Reviews</span>
                <span style={{ fontSize: 24 }} className="ms-5">
                    <Badge className="p-2">
                        4 <Icons.StarFill className="mb-1" />
                    </Badge>
                </span>
                <span className="ms-2 text-secondary">1234 Ratings & 123 Reviews</span>
            </div>
            <div className="mt-3">
                {lst.map(() => (
                    <>
                        <div>
                            <div style={{ fontWeight: "bold" }}>
                                <Badge className="me-3">
                                    5 <Icons.StarFill className="mb-1" />
                                </Badge>
                                Awesome
                            </div>
                            <div className="mt-2"> Best laptop I have ever used </div>
                            <div className="mt-2" style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    Karan Rohra <Icons.CheckCircleFill />
                                </div>
                                <div>
                                    <span className="m-2">
                                        <Icons.HandThumbsUp /> 100
                                    </span>
                                    <span className="m-2">
                                        <Icons.HandThumbsDown /> 100
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </>
                ))}
            </div>
            <div>
                <Button> All Reviews </Button>
            </div>
        </div>
    );
}

export default RatingsAndReviews;

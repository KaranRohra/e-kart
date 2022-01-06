import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function SaveForLater(props) {
    const productsIds = Object.keys(props.products);
    return (
        <div className="mt-5 bg bg-light p-3">
            <h5 variant="primary">Save For Later</h5>
            <hr />

            {productsIds.map((productID, key) => (
                <React.Fragment key={key}>
                    <Button
                        onClick={() => props.handleRemoveSaveForLaterProduct(productID)}
                        variant="secondary"
                        style={{ float: "right" }}
                    >
                        Remove
                    </Button>
                    <div style={{ display: "flex" }} className="pt-2 pe-2 ps-2">
                        {/* Product Image */}
                        <div style={{ width: 112, height: 78.5 }}>
                            <img
                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                src={props.products[productID].images[0].image_url}
                                alt=""
                            />
                        </div>
                        {/* Product Details */}
                        <div className="ms-3">
                            <Link style={{ textDecoration: "none" }} to={`/products/${productID}`}>
                                <h6>{props.products[productID].long_title}</h6>{" "}
                            </Link>
                            <small className="text-secondary">
                                Seller: {props.products[productID].seller.first_name}{" "}
                                {props.products[productID].seller.last_name}
                            </small>
                            <div className="mt-3" style={{ display: "flex" }}>
                                <span className="me-2" style={{ fontWeight: 600 }}>
                                    ₹{props.products[productID].selling_price}
                                </span>
                                <strike className="text-secondary">₹{props.products[productID].actual_price}</strike>
                            </div>
                            <p
                                onClick={() => props.handleMoveToCart(productID)}
                                className="text-success"
                                style={{ textDecoration: "underline", cursor: "pointer", width: 100 }}
                            >
                                Move to Cart
                            </p>
                        </div>
                    </div>
                    <hr />
                </React.Fragment>
            ))}
        </div>
    );
}
export default SaveForLater;

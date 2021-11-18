import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Selector from "components/cart/Selector";

function ProductView(props) {
    return (
        <div>
            {props.productsIDs.length !== 0 ? (
                <>
                    {props.productsIDs.map((productID, key) => (
                        <React.Fragment key={key}>
                            <Button
                                onClick={() => props.handleRemoveProductFromCart(productID)}
                                variant="secondary"
                                style={{ float: "right" }}
                            >
                                Remove
                            </Button>
                            <div style={{ display: "flex", padding: 24 }}>
                                {/* Product Image */}
                                <div style={{ width: 112, height: 78.5 }}>
                                    <img
                                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                        src={props.products[productID].images[0].image_url}
                                        alt=""
                                    />
                                    <Selector product={props.products[productID]} />
                                </div>
                                {/* Product Details */}
                                <div className="ms-3">
                                    <Link style={{ textDecoration: "none" }} to={`/products/${productID}`}>
                                        <h6>{props.products[productID].long_title}</h6>{" "}
                                    </Link>
                                    <small className="text-secondary">{props.products[productID].tagline}</small> <br />
                                    <small className="text-secondary">
                                        Seller: {props.products[productID].seller.first_name}{" "}
                                        {props.products[productID].seller.last_name}
                                    </small>
                                    <div className="mt-3" style={{ display: "flex" }}>
                                        <span className="me-2" style={{ fontWeight: 600 }}>
                                            ₹{props.products[productID].selling_price}
                                        </span>
                                        <strike className="text-secondary">
                                            ₹{props.products[productID].actual_price}
                                        </strike>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </React.Fragment>
                    ))}
                </>
            ) : (
                <div>
                    <h1>Your cart is empty </h1>
                    <h1> Search product to enjoy shopping</h1>
                </div>
            )}
        </div>
    );
}

export default ProductView;

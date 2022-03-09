import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Icons from "react-bootstrap-icons";

function MultiProductView(props) {
    return (
        <div>
            {Object.keys(props.products).map((productID, key) => {
                const product = props.products[productID];
                return (
                    <React.Fragment key={key}>
                        <div
                            style={{ display: "flex", padding: 24 }}
                            className="mb-4 d-flex justify-content-start bg-light"
                        >
                            {/* Product Image */}
                            <div style={{ width: 112, height: 78.5 }}>
                                <img
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                    src={product.images[0].image_url}
                                    alt=""
                                />
                            </div>
                            {/* Product Details */}
                            <Col className="ms-3" xs={9}>
                                <h6 className="text-truncate" style={{ maxWidth: 700 }}>
                                    <Link to={`/products/${productID}`}>{product.long_title}</Link>
                                </h6>
                                <small className="text-secondary">{product.tagline}</small> <br />
                                <small className="text-secondary">
                                    Seller: {product.seller.first_name} {product.seller.last_name}
                                </small>
                            </Col>
                            {/* Price Details */}
                            <Col xs={2}>
                                <p style={{ fontWeight: "bold" }}>₹{product.selling_price}</p>
                                <strike>₹{product.actual_price}</strike>
                            </Col>
                            {props.showRemoveBtn && (
                                <Col>
                                    <Icons.XLg
                                        onClick={() => {
                                            props.removeProductFromWishlistAPI(productID);
                                            props.handleRemoveFromWishlist(productID);
                                        }}
                                        style={{ cursor: "pointer" }}
                                    />
                                </Col>
                            )}
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default MultiProductView;

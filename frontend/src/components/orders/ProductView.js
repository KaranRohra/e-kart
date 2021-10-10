import React from "react";
import { products } from "components/home/products/dummyProductsData";
import { Button, Col } from "react-bootstrap";

function ProductView() {
    return (
        <div className="border border-dark ms-3">
            {products.map((product, key) => (
                <React.Fragment key={key}>
                    <div style={{ display: "flex", padding: 24 }} className="d-flex justify-content-start">
                        {/* Product Image */}
                        <div style={{ width: 112, height: 78.5 }}>
                            <img
                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                src={product.url}
                                alt=""
                            />
                        </div>
                        {/* Product Details */}
                        <div className="ms-3" style={{ width: 480 }}>
                            <h6 className="text-truncate" style={{ maxWidth: 300 }}>
                                {product.title.longTitle}
                            </h6>
                            <small className="text-secondary">{product.tagline}</small> <br />
                            <small className="text-secondary">Seller: {product.tagline}</small>
                        </div>
                        {/* Price Details */}
                        <Col className="me-3 mt-3">
                            <p style={{ fontWeight: "bold" }} className="me-2">
                                ₹{product.price.mrp}
                            </p>
                        </Col>
                        <Col className="ms-3 mt-3 text-center">
                            <p className="me-2">Delivered on: 27/10/2020</p>
                            <Button>View</Button>
                        </Col>
                    </div>
                    <hr />
                </React.Fragment>
            ))}
        </div>
    );
}

export default ProductView;

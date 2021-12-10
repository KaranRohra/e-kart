import React from "react";
import { Col } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

function ProductView(props) {
    const history = useHistory();

    return (
        <div className="ms-3">
            {props.orders.map((order, orderKey) => {
                const product = order.product;
                return (
                    <React.Fragment key={orderKey}>
                        {(props.filterList.length === 0 ||
                            props.filterList.find((element) => element === order.status)) && (
                            <>
                                <div
                                    style={{ display: "flex", padding: 24, cursor: "pointer" }}
                                    className="d-flex justify-content-start bg-light"
                                    onClick={() => history.push(`/orders/${order.id}`)}
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
                                    <div className="ms-3" style={{ width: 480 }}>
                                        <h6 className="text-truncate text-light" style={{ maxWidth: 400 }}>
                                            <Link to={`/products/${product.id}`}> {product.long_title}</Link>
                                        </h6>
                                        <small className="text-secondary">Seller: {product.seller.first_name}</small>
                                    </div>
                                    {/* Price Details */}
                                    <Col className="me-3 mt-3">
                                        <p style={{ fontWeight: "bold" }} className="me-2">
                                            ₹{product.selling_price}
                                        </p>
                                    </Col>
                                    <Col className="ms-3 mt-3 text-center">
                                        {order.status === "Pending" && (
                                            <h6 className="me-2 text-warning">On the way</h6>
                                        )}
                                        {order.status === "Cancelled" && (
                                            <h6 className="me-2 text-danger">{order.status}</h6>
                                        )}
                                        {order.status === "Delivered" && (
                                            <h6 className="me-2 text-success">{order.status}</h6>
                                        )}
                                        {order.status === "Returned" && (
                                            <h6 className="me-2 text-danger">{order.status}</h6>
                                        )}
                                    </Col>
                                </div>
                                <hr className="text-light" />
                            </>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default ProductView;

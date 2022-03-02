import React from "react";
import { Col } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import NotFoundIcon from "components/common/404/NotFoundIcon";

function ProductView(props) {
    const history = useHistory();
    const ordersToDisplay = props.orders.filter((order) => {
        return props.filterList.length === 0 || props.filterList.includes(order.status);
    });

    return (
        <>
            {ordersToDisplay.length === 0 && (
                <NotFoundIcon
                    btnText="Go to my orders"
                    redirectUrl="/orders"
                    title="Sorry, no result found"
                    detailText="Edit search or go back to My Orders Page"
                />
            )}
            <div className="ms-3">
                {ordersToDisplay.map((order, orderKey) => (
                    <React.Fragment key={orderKey}>
                        <div
                            style={{ display: "flex", padding: 24, cursor: "pointer" }}
                            className="d-flex justify-content-start bg-light"
                            onClick={() => history.push(`/orders/${order.id}`)}
                        >
                            {/* Product Image */}
                            <div style={{ width: 112, height: 78.5 }}>
                                <img
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                    src={order.product.images[0].image_url}
                                    alt=""
                                />
                            </div>
                            {/* Product Details */}
                            <div className="ms-3" style={{ width: 480 }}>
                                <h6 className="text-truncate text-light" style={{ maxWidth: 400 }}>
                                    <Link to={`/products/${order.product.id}`}> {order.product.long_title}</Link>
                                </h6>
                                <small className="text-secondary">Seller: {order.product.seller.first_name}</small>
                            </div>
                            {/* Price Details */}
                            <Col className="me-3 mt-3">
                                <p style={{ fontWeight: "bold" }} className="me-2">
                                    ₹{order.product.selling_price}
                                </p>
                            </Col>
                            <Col className="ms-3 mt-3 text-center">
                                {order.status === "Pending" && <h6 className="me-2 text-warning">On the way</h6>}
                                {order.status === "Cancelled" && <h6 className="me-2 text-danger">{order.status}</h6>}
                                {order.status === "Delivered" && <h6 className="me-2 text-success">{order.status}</h6>}
                                {order.status === "Returned" && <h6 className="me-2 text-danger">{order.status}</h6>}
                            </Col>
                        </div>
                        <hr className="text-light" />
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}

export default ProductView;

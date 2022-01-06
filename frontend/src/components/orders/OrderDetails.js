import React from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import Footer from "components/common/footer/Footer";
import Header from "components/header/Header";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import { getOrderByIdAPI, updateOrderAPI } from "services/apis/orders";

function OrderDetails() {
    const history = useHistory();
    const orderId = useParams().id;
    const [order, setOrder] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchOrder = async () => {
            const response = await getOrderByIdAPI(orderId);
            // if(response.)
            delete response.data.product.seller.email;
            if (response.status === 200) {
                setOrder(response.data);
                setLoading(false);
            } else {
                history.push("/");
                return;
            }
        };
        fetchOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateOrder = async (orderStatus) => {
        order.status = orderStatus;
        updateOrderAPI(orderId, order);
        setOrder({ ...order });
    };

    return (
        <div>
            <Header />
            {loading ? (
                <BoxSpinner message="Fetching order details" />
            ) : (
                <div className="m-3 p-5">
                    <Container className="p-3 bg-light">
                        <Row>
                            <Col xs={8}>
                                <h4>Delivery Address</h4>
                                <h6 style={{ fontWeight: 600 }}> {order.address.name} </h6>
                                <p>
                                    {order.address.address_line_1} <br />
                                    {order.address.address_line_2} <br />
                                    {order.address.city}, {order.address.state}, {order.address.pincode}.
                                </p>

                                <h6 style={{ fontWeight: 600 }}>Phone number</h6>
                                <p>
                                    {order.address.phone_number_1} {order.address.phone_number_2 ? ", " : ""}
                                    {order.address.phone_number_2}{" "}
                                </p>
                            </Col>
                            <Col>
                                <Card.Header>
                                    <h5> Price Details</h5>
                                </Card.Header>
                                <Card.Body>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span>Price </span>
                                        <span>₹{order.product.selling_price}</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span>Discount</span>
                                        <span className="text-success">
                                            -₹{order.product.actual_price - order.product.selling_price}
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span>Shipping Charges</span>
                                        <span className="text-success">₹{order.product.shipping_fee}</span>
                                    </div>
                                </Card.Body>
                                <Card.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h5>Total</h5>
                                    <h5>₹{order.product.selling_price + order.product.shipping_fee}</h5>
                                </Card.Footer>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="mt-4 p-3 bg-light">
                        <Row className="align-items-center">
                            <Col style={{ width: 112, height: 78.5 }}>
                                <img
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                    src={order.product.images[0].image_url}
                                    alt=""
                                />
                            </Col>
                            <Col>
                                <Link to={`/products/${order.product.id}`} style={{ textDecoration: "none" }}>
                                    <h6>{order.product.short_title}</h6>
                                </Link>
                                <p style={{ fontSize: 12 }} className="text-secondary">
                                    Seller: {order.product.seller.first_name} {order.product.seller.last_name}
                                </p>
                                <h5>₹{order.product.selling_price + order.product.shipping_fee}</h5>
                            </Col>

                            <Col xs={{ span: 6 }} className="ms-3 text-center">
                                <h6 style={{ fontWeight: 600 }}>
                                    Ordered on: {new Date(order.created_at).toLocaleString()}
                                </h6>
                                <h6 className="text-center" style={{ fontWeight: 600 }}>
                                    Order Status:
                                    {order.status === "Pending" && (
                                        <span className="me-2 text-warning"> On the way</span>
                                    )}
                                    {order.status === "Cancelled" && (
                                        <span className="me-2 text-danger">{order.status}</span>
                                    )}
                                    {order.status === "Delivered" && (
                                        <span className="me-2 text-success">{order.status}</span>
                                    )}
                                    {order.status === "Returned" && (
                                        <span className="me-2 text-danger">{order.status}</span>
                                    )}
                                </h6>
                            </Col>
                            <Col xs={{ span: 2 }} className="ms-3">
                                {order.status === "Pending" && (
                                    <Button onClick={() => updateOrder("Cancelled")} variant="danger">
                                        Cancel
                                    </Button>
                                )}
                                {order.status === "Delivered" && (
                                    <Button onClick={() => updateOrder("Returned")} variant="danger">
                                        Return
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default OrderDetails;

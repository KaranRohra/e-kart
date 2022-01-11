import React from "react";
import { Context } from "App";
import * as Icons from "react-bootstrap-icons";
import ProductView from "components/cart/ProductView";
import { Container, Badge, Row, Col, Alert } from "react-bootstrap";
import SubTotal from "components/cart/SubTotal";
import ViewAddresses from "components/accounts/ViewAddresses";
import { isUserAuthenticated } from "services/apis/accounts";
import { Redirect } from "react-router";

function ReviewOrder() {
    const context = React.useContext(Context);
    const [selectedAddress, setSelectedAddress] = React.useState();
    const [alert, setAlert] = React.useState({});

    const handleProceedToPayment = () => {
        if (selectedAddress) {
            window.location.href = `${
                process.env.REACT_APP_BACKEND_URL
            }/orders/payment/?t=${isUserAuthenticated()}&aid=${selectedAddress}`;
        } else {
            setAlert({
                type: "danger",
                message: "Please add an address to proceed",
            });
        }
    };

    return (
        <>
            {Object.keys(context.state.cart).length > 0 ? (
                <Container className="mt-5">
                    {alert.message && (
                        <div>
                            <Alert variant={alert.type}> {alert.message} </Alert>
                        </div>
                    )}
                    <Row style={{ display: "flex" }}>
                        <Col xs={8}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h5 variant="primary">
                                    <Badge bg="secondary">
                                        {Object.keys(context.state.cart).length}
                                        <Icons.CartCheckFill />
                                    </Badge>
                                </h5>

                                <button onClick={handleProceedToPayment} className="btn btn-primary">
                                    Proceed to Payment
                                </button>
                            </div>
                            <hr />
                            <ProductView
                                productsIDs={Object.keys(context.state.cart)}
                                products={context.state.cart}
                                hideRemoveButton
                                hideSaveForLater
                            />
                        </Col>
                        <Col>
                            <SubTotal />
                        </Col>
                    </Row>
                    <ViewAddresses showSelectAddressRadioButton setSelectedAddress={setSelectedAddress} />
                </Container>
            ) : (
                <Redirect to="/cart" />
            )}
        </>
    );
}

export default ReviewOrder;

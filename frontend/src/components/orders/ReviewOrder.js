import React from "react";
import { Context } from "App";
import * as Icons from "react-bootstrap-icons";
import ProductView from "components/cart/ProductView";
import { Container, Badge, Row, Col } from "react-bootstrap";
import SubTotal from "components/cart/SubTotal";
import ViewAddresses from "components/accounts/ViewAddresses";
import { isUserAuthenticated } from "services/apis/accounts";
import { Redirect } from "react-router";

function ReviewOrder() {
    const context = React.useContext(Context);
    const [selectedAddress, setSelectedAddress] = React.useState();

    return (
        <>
            {Object.keys(context.state.cart) > 0 ? (
                <Container className="mt-5">
                    <Row style={{ display: "flex" }}>
                        <Col xs={8}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h5 variant="primary">
                                    <Badge bg="secondary">
                                        {Object.keys(context.state.cart).length} {"  "}
                                        <Icons.CartCheckFill />
                                    </Badge>
                                </h5>
                                <a
                                    href={`${
                                        process.env.REACT_APP_BACKEND_URL
                                    }/orders/payment/?t=${isUserAuthenticated()}&aid=${selectedAddress}`}
                                    className="btn btn-primary"
                                >
                                    Proceed to Payment
                                </a>
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
                    <h4 className="mt-5">Select Address</h4>
                    <hr />
                    <ViewAddresses hideHeader showSelectAddressRadioButton setSelectedAddress={setSelectedAddress} />
                </Container>
            ) : (
                <Redirect to="/cart" />
            )}
        </>
    );
}

export default ReviewOrder;

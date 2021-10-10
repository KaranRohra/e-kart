import React from "react";
import { Container } from "react-bootstrap";
import ProductView from "components/orders/ProductView";
import OrderFilter from "components/orders/OrderFilter";

function Order() {
    return (
        <Container style={{ display: "flex" }} className="mt-5">
            <OrderFilter />
            <ProductView />
        </Container>
    );
}

export default Order;

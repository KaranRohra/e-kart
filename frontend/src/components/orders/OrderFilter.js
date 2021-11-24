import React from "react";
import { Card, Form } from "react-bootstrap";

function OrderFilter() {
    return (
        <div>
            <Card bg="light" text="dark" style={{ width: "18rem" }}>
                <Card.Header>
                    {" "}
                    <h4>Filters</h4>
                </Card.Header>
                <Card.Body>
                    <div>
                        <h5>Order Status</h5>
                        <Form.Check type="checkbox" label="On the way" />
                        <Form.Check type="checkbox" label="Delivered" />
                        <Form.Check type="checkbox" label="Cancelled" />
                        <Form.Check type="checkbox" label="Returned" />
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default OrderFilter;

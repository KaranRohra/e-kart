import React from "react";
import { Card } from "react-bootstrap";

function SubTotal() {
    return (
        <Card bg="light" text="dark" style={{ width: "18rem" }}>
            <Card.Header> Price Details</Card.Header>
            <Card.Body>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Price (3 items)</p>
                    <p>₹1,29,898</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Price (3 items)</p>
                    <p>₹1,29,898</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Price (3 items)</p>
                    <p>₹1,29,898</p>
                </div>
            </Card.Body>
            <Card.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                <h5>Total</h5>
                <h5>₹1,29,898</h5>
            </Card.Footer>
        </Card>
    );
}

export default SubTotal;

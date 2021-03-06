import { Context } from "App";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router";

function SubTotal() {
    const context = React.useContext(Context);
    const history = useHistory();
    let subTotal = 0;

    function sum(key) {
        const products = context.state.cart;
        let sum = 0;
        Object.keys(products).forEach((productID) => {
            switch (key) {
                case "discount":
                    sum -=
                        (products[productID].actual_price - products[productID].selling_price) *
                        (products[productID].selected_quantity || 1);
                    break;
                default:
                    sum += products[productID][key] * (products[productID].selected_quantity || 1);
            }
        });
        subTotal += sum;
        return sum;
    }

    return (
        <Card bg="light" text="dark" style={{ width: "18rem" }} className="ms-5">
            {Object.keys(context.state.cart).length === 0 ? (
                <>
                    <Card.Header>
                        <h5>Cart is Empty</h5>{" "}
                    </Card.Header>
                    <Card.Body>
                        <Button variant="warning" onClick={() => history.push("/")}>
                            Explore
                        </Button>
                    </Card.Body>
                </>
            ) : (
                <>
                    <Card.Header>Price Details</Card.Header>
                    <Card.Body>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Price ({Object.keys(context.state.cart).length} items)</p>
                            <p>₹{sum("actual_price")}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Discount</p>
                            <p className="text-success">-₹{-sum("discount")}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Shipping Charges</p>
                            <p className="text-success">₹{sum("shipping_fee") || "Free"}</p>
                        </div>
                    </Card.Body>
                    <Card.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                        <h5>Total</h5>
                        <h5>₹{subTotal}</h5>
                    </Card.Footer>
                </>
            )}
        </Card>
    );
}

export default SubTotal;

import React from "react";
import { Button, Container } from "react-bootstrap";
import ProductView from "components/cart/ProductView";
import SubTotal from "components/cart/SubTotal";
import Header from "components/header/Header";

function Cart() {
    React.useEffect(() => {
        document.title = "Cart";
        document.body.style.backgroundColor = "#f5f5f5";
    });

    return (
        <>
            <Header />
            <Container className="mt-5">
                <div style={{ display: "flex" }}>
                    <div style={{ flexGrow: 0.8, background: "white" }} className="p-3">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h5>My Cart(6)</h5>

                            <Button>Place Order</Button>
                        </div>
                        <hr />
                        <ProductView />
                    </div>
                    <div className="ms-5">
                        <SubTotal />
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Cart;

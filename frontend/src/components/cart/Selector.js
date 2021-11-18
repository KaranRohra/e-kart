import React from "react";
import { Button } from "react-bootstrap";

function Selector(props) {
    const [quantity, setQuantity] = React.useState(props.product.selected_quantity || 1);
    const buttonStyle = {
        width: 58,
        height: 24,
        background: "linear-gradient(rgb(255, 255, 255), rgb(249, 249, 249))",
        display: "inline-block",
        border: "1px solid rgb(194, 194, 194)",
        cursor: "pointer",
        fontSize: 18,
        padding: 1,
        lineHeight: 1,
        margin: "0px 5px 0px 5px",
    };

    const updateQuantity = (q) => {
        if (quantity + q >= 1 && quantity + q <= props.product.max_product_quantity) {
            props.product["selected_quantity"] = quantity + q;
            setQuantity(quantity + q);
        }
    };

    return (
        <div className="mt-4" style={{ display: "flex" }}>
            <Button className="text-dark" style={buttonStyle} onClick={() => updateQuantity(-1)}>
                -
            </Button>
            <input
                value={quantity}
                style={{ width: "100%", height: "100%", objectFit: "contain", fontSize: 14, textAlign: "center" }}
                onChange={() => {}}
            />
            <Button className="text-dark" style={buttonStyle} onClick={() => updateQuantity(1)}>
                +
            </Button>
        </div>
    );
}

export default Selector;
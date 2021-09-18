import React from "react";
import { Button } from "react-bootstrap";

function Selector() {
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

    return (
        <div className="mt-4" style={{ display: "flex" }}>
            <Button className="text-dark" style={buttonStyle}>
                -
            </Button>
            <input
                type="text"
                style={{ width: "100%", height: "100%", objectFit: "contain", fontSize: 14, textAlign: "center" }}
            />
            <Button className="text-dark" style={buttonStyle}>
                +
            </Button>
        </div>
    );
}

export default Selector;

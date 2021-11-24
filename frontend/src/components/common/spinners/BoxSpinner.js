import React from "react";
import { Container } from "react-bootstrap";
import "static/styles/spinners/boxSpinner.css";

function BoxSpinner(props) {
    return (
        <>
            <Container className="boxes mt-5">
                {[...Array(4).keys()].map((i) => (
                    <div key={i} className="box">
                        {[...Array(4).keys()].map((j) => (
                            <div key={j}></div>
                        ))}
                    </div>
                ))}
            </Container>
            <div className="loading-text">
                <h4>{props.message || "Loading Please Wait..."}</h4>
            </div>
        </>
    );
}

export default BoxSpinner;

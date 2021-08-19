import React from "react";
import { useHistory } from "react-router-dom";
import { Nav } from "react-bootstrap";

function LeftHeader() {
    const history = useHistory();

    return (
        <Nav className="me-auto">
            <Nav.Link onClick={() => history.push("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => history.push("/login")}>Login</Nav.Link>
        </Nav>
    );
}

export default LeftHeader;
